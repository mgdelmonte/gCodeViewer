// UI elements and state
var progress, info, edit, gcode, stepPills, slider, sliderHandle, worker;
var sliceNum = null, stepNum = 0, stepFilter = "All";

// the model
var slices = [];
var state = {};
var epilogue = "";


function checkCapabilities() {
    var warnings = [];
    var fatal = [];
    Modernizr.addTest('filereader', function() {
        return !!(window.File && window.FileList && window.FileReader);
    });
    if(!Modernizr.canvas) fatal.push("Your browser does not support HTML5 Canvas.");
    if(!Modernizr.filereader) fatal.push("Your browser does not support HTML5 File API.");
    if(!Modernizr.webworkers) fatal.push("Your browser does not support HTML5 Web Workers.");
    if(!Modernizr.svg) fatal.push("Your browser does not support HTML5 SVG.");
    if(fatal.length > 0) {
        $('body').html("<h1>Your browser cannot run this application.</h1><ul>" + fatal.map(function(f) { return "<li>"+f } ).join('') + '</ul>');
        return false;
    }
    if(!Modernizr.webgl) {
        warnings.push("Your browser should support HTML5 Web GL.  3D rendering may be slow.");
        //GCODE.renderer3d.setOption({ rendererType: "canvas" });
    }
    if(!Modernizr.draganddrop) warnings.push("Your browser doesn't support drag-and-drop.");
    if(warnings.length > 0) {
        info.show().html(warnings.map(function(w) { return `<div class="alert alert-warning"><strong>Warning:</strong> ${w}</div>` }).join('\n'));
        console.log("Initialization succeeded with warnings.")
    }
    return true;
}


function autover() {
    $.get(".git/logs/HEAD", function(d) {
        var x = d.trim().split('\n').slice(-1)[0].split(' '); 
        $('#version').text([x[1].slice(0,8), new Date(x[4]*1000).toLocaleString().replace(',','')].join(' '));
    })
}

function init() {
    info = $('#info');
    if(!checkCapabilities()) return;
    progress = $('#progress');
    edit = $('#edit');
    gcode = new CodeMirror($('#gcode')[0], {
        lineNumbers: true,
        gutters: ['CodeMirror-linenumbers']
    });
    //gcode.on("change", onChangeGcode);
    gcode.on("cursorActivity", onCursorActivityGcode);
    $("#dropZone").on('dragover', onDragover).on('drop', onChangeFile);
    $('#file').on('change', onChangeFile);
    $("#saveas").click(save);
    $('#deleteStep').click(onDeleteStep);
    $('#stepFilter').on('change', function(evt) { setFilter($(this).val()) });
    stepPills = $("#stepPills");
    slider = $("#slider");
    sliderHandle = $("#sliderhandle");
    slider.slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 0,
        value: 0,
        slide: function(event, ui) {
            setSliceNum(ui.value);
        }
    });
    //this stops slider reacting to arrow keys, since we do it below manually
    slider.find(".ui-slider-handle").unbind('keydown');
    //$('body').bind('keydown', 
    window.onkeydown = function(event) {
        if(/^(?:input|textarea)$/i.test(event.target.nodeName))
            return;
        // console.log(event.keyCode);
        if(event.shiftKey)
            return;
        // ctrl
        if(event.ctrlKey) switch(event.keyCode) {
            case 36: setSliceNum(0); return; // home
            case 35: setSliceNum(slices.length - 1); return; // end
            default: return;
        }
        // normal
        switch(event.keyCode) {
            case 38: setSliceNum(sliceNum + 1); break; // up
            case 40: setSliceNum(sliceNum - 1); break; // down
            case 37: setSliceNum(sliceNum, stepNum - 1); break; // left
            case 39: setSliceNum(sliceNum, stepNum + 1); break; // right
            case 36: setSliceNum(sliceNum, 0); break; // home
            case 35: setSliceNum(sliceNum, slices[sliceNum].length - 1); break; // end
            case 70: setFilter(); break; // f
            case 90: case 101: case 12: autozoom(); break // z, 5, numpad 5, numpad 5 in numlock
            case 46: case 8: case 68: onDeleteStep(); break; // del, backspace, d
            default: return;
        }
        // event.stopPropagation();
    }
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    worker = new Worker('js/Worker.js');
    worker.addEventListener('message', processMessage, false);
    console.log("Application initialized");
    startCanvas();
    onResize();
    autover();
}

function onChangeGcode(inst, obj) {
    console.log(inst, obj);
}

function onCursorActivityGcode(inst) {
    if( slices.length && gcode.state.focused && /^G\d.*\sX[\d-].*\sY[\d-]/i.test(step().gcode[gcode.getCursor().line]) )
        render();
}

function setProgress(pct) {
    var v = parseInt(pct) + '%';
    progress.show().find('.bar').width(v).text(v);
}

function revName(fn) {
    return fn.replace(/^(.+?)(?:-v(\d+))?(\.[^.]+)?$/i, function(m,p1,p2,p3) { return [p1, "-v", (Number(p2) || 0)+1, p3 || ""].join("") });
}

function onChangeFile(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer ? evt.dataTransfer.files : evt.target.files;
    var reader = new FileReader();
    $("#filename").val(revName(evt.target.files[0].name));
    reader.onload = function(file) {
        setProgress(0);
        worker.postMessage({ cmd: "parse", msg: file.target.result });
    };
    reader.readAsText(files[0]);
}

function onDragover(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.target.dropEffect = 'copy';
}

function save(evt) {
    if(!slices.length) return;
    // not properly ordered
    // var text = slices.map(function(s) { return s.map(function(v) { return v.gcode.join('\n') }).join('\n') }).join('\n');
    // filtered and ordered
    var steps = [];
    slices.forEach(function(sl) { sl.forEach(function(st) { if( !st.deleted ) steps.push(st); }) });
    steps.sort(function(a,b) { return a.ix-b.ix });
    var text = [steps.map(function(st) { return st.gcode.join('\n') }).join('\n'), epilogue].join("\n").trim();
    var filename = $("#filename").val();
    var blob = new Blob([text], { type: "text/plain" });//{type: "text/plain;charset=utf-8"});
    saveAs(blob, filename);
    // increment the rev after saving
    $("#filename").val(revName(filename));
}


function onDeleteStep(slicenum, stepnum) {
    if( slicenum == undefined ) slicenum = sliceNum;
    if( stepnum == undefined ) stepnum = stepNum;
    if(!slices.length) return;
    var step = slices[sliceNum][stepNum];
    if( step.deleted ) {
        // undelete this step
        delete step.deleted;
    } else if(stepNum == 0) {
        // TODO solve by adding Z step to new first slice
        // but still cannot allow deleting ALL steps in a slice
        alert("You can't delete the first step in a slice.");
        return;
    } else {
        step.deleted = true;
    }
    setSliceNum(sliceNum, stepNum - 1);
}


function pill(x, type) {
    if(type == undefined) type = 'info';
    if(type) type = " label-" + type;
    return `<span class="label${type}">${x}</span>`;
}
function badge(x, type) {
    type = type || "";
    if(type) type = " badge-" + type;
    return `<span class="badge${type}">${x}</span>`;
}


function isFiltered(step, type) {
    type = type || stepFilter;
    switch(type) {
        case "All": return step.deleted;
        case "Warnings": return step.deleted || !step.warnings;
        case "Deleted": return !step.deleted;
    }
}

function setFilter(type) {
    // if type is not given then cycle to next valid filter
    function nextFilter(t) {
        const filters = ["All","Warnings","Deleted"];
        var f = filters.indexOf(t)+1; 
        if( f < 0 || f >= filters.length)
            f = 0;
        // return only if there are steps at this filter
        t = filters[f];
        return slices[sliceNum].some(function(st){ return !isFiltered(st, t)}) ? t : nextFilter(t);
    }
    type = type || nextFilter(stepFilter);
    $('#stepFilter').val(type);
    stepFilter = type;
    var steps = slices[sliceNum];
    for( var s = 0; s < steps.length; s++ )
        if( !isFiltered(steps[s]) )
            return setSliceNum(sliceNum, s);
    // fallback
    setSliceNum(sliceNum, 0);
}


function setSliceNum(slicenum, stepnum) {
    // negative slicenum means go to last matching 
    if(slicenum < 0 || slicenum > slices.length - 1) return;
    var steps = slices[slicenum];
    if(sliceNum !== slicenum) {
        sliceNum = slicenum;
        stepnum = 0;
    }
    // ensure stepnum is valid and unfiltered; if filtered, choose next unfiltered stepnum
    while( stepnum >= 0 && stepnum < steps.length && isFiltered(steps[stepnum]) )
        stepnum += Math.sign(stepnum-stepNum || 1);
    if( stepnum >= 0 && stepnum < steps.length )
        stepNum = stepnum;
    var step = steps[stepNum];
    // if the only valid step is filtered, change the filter to All
    if( isFiltered(step) )
        return setFilter('All');
    slider.show().slider('value', sliceNum);
    sliderHandle.text(steps[0].z + 'mm');
    //$('#deleteStep').attr("disabled", stepNum == 0); // will eventually allow deleting first step
    $('#deleteStep').text(step.deleted ? "Restore" : "Delete");
    if( zooming) {
        ctx.setTransform(centerXform(stepBounds(step), 0.5));
    }
    render();
    stepPills.html(steps.map(function(s, i) {
        if( isFiltered(s) ) return "";
        var cl = s.warnings ? " label-warning" : "";
        if(i == stepNum) cl += " active";
        return `<a sn=${i} href=# class="label${cl}">${s.filament.toFixed(2)}</a>`;
    }).join(' '));
    stepPills.find('a').not('.active').click(function() { setSliceNum(sliceNum, $(this).attr('sn')); });
    // show slice/step info
    if(step.moves.length > 0) {
        var si = stepBounds(step);
        info.html([
            pill(`Slice: ${sliceNum + 1} of ${slices.length}`),
            pill(`z: ${steps[0].z}mm`),
            pill(`step: ${stepNum + 1} of ${steps.length}`),
            pill(`moves: ${step.moves.length}`),
            pill(`distance: ${step.distance.toFixed(2)}mm`),
            pill(`filament: ${step.filament.toFixed(2)}mm`),
            pill(`ev: ${(100*si.vpm.min).toFixed(2)} < ${(100*si.vpm.avg).toFixed(2)} < ${(100*si.vpm.max).toFixed(2)}`)
        ].concat((step.warnings || []).map(function(w) { return pill("warning: "+w, "warning") })).join("\n"));
    }
    else
        info.html(`<span class="label label-info">Slice: ${sliceNum + 1} of ${slices.length}</span> (cleanup, no extrusion)`);
    gcode.setValue(step.gcode.join('\n'));
    gcode.scrollTo(0, 0);
}

function step() {
    return slices[sliceNum][stepNum];
}


// TODO calc in worker
function stepBounds(step) {
    step = step || slices[sliceNum][stepNum];
    var min = { x: step.x, y: step.y }, max = { x: step.x, y: step.y };
    // TODO get dia from nozzle width
    var dia = 0.8;
    // TEST get min/avg/max vpm (extruded vol/mm as a percent)
    // TODO cheating to get slice height (dz) this way; need to store in slice instead
    var dz = slices[1][0].z - slices[0][0].z;
    // vpm is extruded (ve) / vol traversed (vt)
    // ve is pi*(dia/2)^2*de
    // vt for a line segment with rounded ends is ((pi*dia)+(dia*dx))*dz
    // but ignore line ends and assume extrusion is primed, which simplifies to dia*dx*dz
    // so the ve/vt factor is
    var vol_factor = (Math.PI*dia)/(4*dz); 
    var vpm = { min:Infinity, max:0 };
    var ve = 0, vt = 0;
    step.moves.forEach(function(m) {
        min.x = Math.min(min.x, m.x);
        min.y = Math.min(min.y, m.y);
        max.x = Math.max(max.x, m.x);
        max.y = Math.max(max.y, m.y);
        if( m.e > 0 && m.d > 0 ) {
            ve += m.e;
            vt += m.d;
            // per-segment vpm
            var vps = vol_factor*m.e/m.d;
            vpm.min = Math.min(vpm.min, vps);
            vpm.max = Math.max(vpm.max, vps);
        }
    });
    vpm.avg = vol_factor*ve/vt;
    var size = { x: max.x - min.x, y: max.y - min.y }
    return { min: min, max: max, size: size, vpm:vpm };
}


function centerXform(obj, percent) {
    // returns a transform to scale and center an object with min and size, to fill a percentage of the canvas
    percent = percent || 0.9
    var scale = percent * Math.min(canvas.width/obj.size.x, canvas.height/obj.size.y);
    // cap max scale
    // TODO better to set minimum feature size
    if(scale > 100) scale = 100;
    var dx = -obj.min.x + (canvas.width / scale - obj.size.x) / 2;
    var dy = -obj.min.y + (canvas.height / scale - obj.size.y) / 2;
    return svg.createSVGMatrix().scale(scale).translate(dx, dy);
}

function autozoom() {
    // // zoom to show current step
    // if(!slices.length) return;
    // zoomXform = zoomXform ? null : centerXform(stepBounds(slices[sliceNum][stepNum]), 0.5);
    // cameraXform = null;
    if( zooming && modelXform )
        ctx.setTransform(modelXform);
    zooming = !zooming;
    //render();
    setSliceNum(sliceNum, stepNum);
}

function processMessage(e) {
    var data = e.data;
    switch(data.cmd) {
        case 'progress':
            setProgress(data.msg);
            break;
        case 'finished':
            progress.hide();
            $('#save').show();
            info.show();
            edit.show();
            $('#gcode').show();
            slices = data.msg.slices;
            state = data.msg.state;
            epilogue = data.msg.epilogue;
            slider.slider({ max: slices.length - 1 });
            //sliceNum = 0;
            setSliceNum(0,0);
            onResize();
            break;
    }
}

// rendering

var canvas, ctx;
var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
var lastX = 0, lastY = 0, dragStart, dragged;
var zooming = false;

var modelXform;//, zoomXform, cameraXform;
// got this from gcv0, which should be nozzle dia or actual extrusion width?
// gcv0 uses lineWidth = (filamentDia * (nozzleDia / layerHeight) / (2 * zoomFactor)
// but layerHeight is really AVERAGE layerheight, so it's nonsense
var lineWidth = 0.854 / 3; // should be actual line width * 0.75 (for visualization)
// line width can be nozzledia for now; 


function startCanvas() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    // faster without alpha?
    //ctx = canvas.getContext('2d', {alpha:false});
    // override transform and setTransform functions to take a matrix
    (function() {
        var xf = ctx.transform;
        ctx.transform = function(a, b, c, d, e, f) {
            if(a instanceof SVGMatrix)
                return xf.call(ctx, a.a, a.b, a.c, a.d, a.e, a.f);
            return xf.call(ctx, a, b, c, d, e, f);
        }
        var xf2 = ctx.setTransform;
        ctx.setTransform = function(a, b, c, d, e, f) {
            if(a instanceof SVGMatrix)
                return xf2.call(ctx, a.a, a.b, a.c, a.d, a.e, a.f);
            return xf2.call(ctx, a, b, c, d, e, f);
        }
    })();
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'black';
    // resize the canvas to fill parent dynamically
    window.addEventListener('resize', onResize, false);
    // listen for mouse events
    canvas.addEventListener('mousedown', function(evt) {
        document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        dragStart = transformedPoint(lastX, lastY);
        //console.log("mousedown at ", dragStart);
        dragged = false;
    }, false);
    canvas.addEventListener('mousemove', function(evt) {
        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        dragged = true;
        if(dragStart) {
            var pt = transformedPoint(lastX, lastY);
            //console.log("dragging from ", dragStart, " to ", pt);
            //if(!cameraXform) cameraXform = svg.createSVGMatrix();
            //cameraXform = cameraXform.translate(pt.x - dragStart.x, pt.y - dragStart.y);
            ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
            render();
        }
    }, false);
    canvas.addEventListener('mouseup', function(evt) {
        dragStart = null;
        if(!dragged) zoom(evt.shiftKey ? -1 : 1);
    }, false);
    // var zoom = function(clicks) {
    //     //var pt = ctx.transformedPoint(lastX, lastY);
    //     //ctx.translate(pt.x, pt.y);
    //     // scale by 10% per delta
    //     if( !cameraXform ) cameraXform = svg.createSVGMatrix();
    //     var factor = Math.pow(1.1, clicks);
    //     cameraXform = cameraXform.scale(factor);
    //     //ctx.translate(-pt.x, -pt.y);
    //     render();
    // };
    var handleScroll = function(evt) {
        var clicks = evt.detail < 0 || evt.wheelDelta > 0 ? 0.4 : -0.4;
        if(clicks) zoom(clicks, evt.offsetX, evt.offsetY);
        return evt.preventDefault() && false;
    };
    canvas.addEventListener('DOMMouseScroll', handleScroll, false);
    canvas.addEventListener('mousewheel', handleScroll, false);
};


function transformedPoint(x, y) {
    var pt = svg.createSVGPoint();
    pt.x = x; pt.y = y;
    var xf = svg.createSVGMatrix();
    var m = ctx.getTransform();
    "abcdef".split("").forEach(function(v) { xf[v] = m[v] });
    return pt.matrixTransform(xf.inverse());
}


function zoom(clicks, x, y) {
    x = x || canvas.width / 2;
    y = y || canvas.height / 2;
    var pt = transformedPoint(x, y);
    // scale by 10% per delta
    //if(!cameraXform) cameraXform = svg.createSVGMatrix();
    var factor = Math.pow(1.1, clicks);
    //cameraXform = cameraXform.translate(-pt.x, -pt.y).scale(factor).translate(pt.x, pt.y);
    // console.log('zooming at',x,y,'(',pt.x,pt.y,') factor',factor);
    ctx.translate(pt.x, pt.y);
    ctx.scale(factor, factor);
    ctx.translate(-pt.x, -pt.y);
    render();
}



function drawCircle(x, y, radius) {
    radius = radius || 3;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}
function drawArrow(x1, y1, x2, y2, size) {
    size = size || 1;
    var angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.save();
    ctx.lineWidth = 0.2;
    ctx.lineCap = 'miter';
    ctx.lineJoin = 'miter';
    ctx.fillStyle = 'orange';
    ctx.globalAlpha = 0.75;
    ctx.translate(x1, y1);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, size);
    ctx.lineTo(size * 2, 0);
    ctx.lineTo(0, -size)
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}


// function trackTransforms(ctx) {
//     var xform = svg.createSVGMatrix();
//     ctx.getTransform = function() { return xform; };

//     var savedTransforms = [];
//     var save = ctx.save;
//     ctx.save = function() {
//         savedTransforms.push(xform.translate(0, 0));
//         return save.call(ctx);
//     };
//     var restore = ctx.restore;
//     ctx.restore = function() {
//         xform = savedTransforms.pop();
//         return restore.call(ctx);
//     };

//     var scale = ctx.scale;
//     ctx.scale = function(sx, sy) {
//         xform = xform.scaleNonUniform(sx, sy);
//         return scale.call(ctx, sx, sy);
//     };
//     var rotate = ctx.rotate;
//     ctx.rotate = function(radians) {
//         xform = xform.rotate(radians * 180 / Math.PI);
//         return rotate.call(ctx, radians);
//     };
//     var translate = ctx.translate;
//     ctx.translate = function(dx, dy) {
//         xform = xform.translate(dx, dy);
//         return translate.call(ctx, dx, dy);
//     };
//     var transform = ctx.transform;
//     ctx.transform = function(a, b, c, d, e, f) {
//         var m2 = svg.createSVGMatrix();
//         m2.a = a; m2.b = b; m2.c = c; m2.d = d; m2.e = e; m2.f = f;
//         xform = xform.multiply(m2);
//         return transform.call(ctx, a, b, c, d, e, f);
//     };
//     var setTransform = ctx.setTransform;
//     ctx.setTransform = function(a, b, c, d, e, f) {
//         xform.a = a;
//         xform.b = b;
//         xform.c = c;
//         xform.d = d;
//         xform.e = e;
//         xform.f = f;
//         return setTransform.call(ctx, a, b, c, d, e, f);
//     };
//     var pt = svg.createSVGPoint();
//     ctx.transformedPoint = function(x, y) {
//         pt.x = x; pt.y = y;
//         return pt.matrixTransform(xform.inverse());
//     }
// }


function onResize() {
    canvas.width = $(canvas).parent().width() - 20;
    canvas.height = window.innerHeight - 20;//$(canvas).parent().height();
    $('#slider').height(canvas.height - 50);
    // scale model to fill canvas and center it
    if(slices.length) {
        zooming = false;
        modelXform = centerXform(state, 0.9);
        ctx.setTransform(modelXform);
    }
    render();
}


function drawGrid(cellsize) {
    cellsize = cellsize || 10;
    var bounds = slices.length ? { l: state.min.x, r: state.max.x, t: state.min.y, b: state.max.y } : { l: 0, r: canvas.width, t: 0, b: canvas.height }
    ctx.strokeStyle = '#bbbbbb';
    ctx.lineWidth = 0.2;
    ctx.beginPath();
    //for(var i = 0; i <= canvas.width; i += 10) {
    for(var x = bounds.l - cellsize; x <= bounds.r + cellsize; x += cellsize) {
        ctx.moveTo(x, bounds.t - cellsize);
        ctx.lineTo(x, bounds.b + cellsize);
    }
    //for(var i = 0; i <= canvas.height; i += 10) {
    for(var y = bounds.t - cellsize; y <= bounds.b + cellsize; y += cellsize) {
        ctx.moveTo(bounds.l - cellsize, y);
        ctx.lineTo(bounds.r + cellsize, y);
    }
    ctx.stroke();
}


function drawSlice(slicenum, stepnum) {
    if(slices.length == 0) return;
    var steps = slices[slicenum];
    stepnum = stepnum || 0;
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for(var i = 0; i < steps.length; i++) {
        var step = steps[i];
        if( step.deleted ) continue;
        ctx.strokeStyle = i < stepnum ? "#888" : i == stepnum ? "#00f" : "#ccc";
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.moveTo(step.x, step.y);
        var x = step.x, y = step.y;
        var linetype = 0;
        // changes linetype (normal, travel, etc.) efficiently: only strokes when necessary
        function setType(t) {
            if( t === linetype ) return;
            linetype = t;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
            switch( t ) {
                case 0: ctx.strokeStyle = i < stepnum ? "#888" : i == stepnum ? "#00f" : "#ccc"; ctx.globalAlpha = 1; break;
                case 1: ctx.strokeStyle = 'yellow'; ctx.globalAlpha = 0.5; break;
            }
        }
        step.moves.forEach(function(m) {
            // TODO set line width, color, etc. based on extrusion, speed, etc.
            if( m.e == 0) {
                // highlight for the current step; omit for other steps
                if( i == stepnum ) {
                    setType(1);
                    ctx.lineTo(m.x, m.y);
                }
                else
                    ctx.moveTo(m.x, m.y);
            } else {
                setType(0);
                ctx.lineTo(m.x, m.y);
            }
            x = m.x;
            y = m.y;
            });
        ctx.stroke();
        // highlight start for current step
        if(i == stepnum) {
            step.moves.some(function(m, i) {
                if(m.e) {
                    var m2 = step.moves[i + 1];
                    drawArrow(m.x, m.y, m2.x, m2.y);
                    return true;
                }
            });
        }
    }
    // show focus box for small steps
    var si = stepBounds(steps[stepNum]);
    if(si.size.x < state.size.x / 8 || si.size.y < state.size.y / 8) {
        ctx.setLineDash([1, 1]);
        ctx.strokeStyle = "#f00";
        ctx.lineWidth = 0.2;
        ctx.strokeRect(si.min.x - 10, si.min.y - 10, si.size.x + 20, si.size.y + 20);
        ctx.setLineDash([]);
    }
    ctx.restore();
}


function render() {
    //ctx.resetTransform();
    ctx.save();
    ctx.resetTransform();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    // if(zoomXform)
    //     ctx.transform(zoomXform);//.a, zoomXform.b, zoomXform.c, zoomXform.d, zoomXform.e, zoomXform.f);
    // else if(modelXform)
    //     ctx.transform(modelXform);//.a, modelXform.b, modelXform.c, modelXform.d, modelXform.e, modelXform.f);
    // if(cameraXform)
    //     ctx.transform(cameraXform);//.a, modelXform.b, modelXform.c, modelXform.d, modelXform.e, modelXform.f);
    drawGrid();
    if(slices.length) {
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = "#f00";
        ctx.lineWidth = 0.2;
        ctx.strokeRect(state.min.x, state.min.y, state.size.x, state.size.y);
        ctx.setLineDash([]);
        drawSlice(sliceNum, stepNum);
        // show current gcode cmd if focused
        if( gcode.state.focused ) {
            var cmd = step().gcode[gcode.getCursor().line];
            var vals = {}
            cmd.toLowerCase().split(/\s+/).slice(1).forEach(function(val) {
                vals[val[0]] = Number(val.slice(1));
            });
            if( 'x' in vals && 'y' in vals ) {
                ctx.lineWidth = 0.2;
                ctx.strokeStyle = 'red';
                drawCircle(vals.x, -vals.y, 2);
            }
        }
    }
}

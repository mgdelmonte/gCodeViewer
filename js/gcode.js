var progress, info, edit, gcode, stepPills, slider, sliderHandle, worker;
var sliceNum = null, stepNum = 0;
var slices = [];
var state = {};
var inOrder = [];

function checkCapabilities() {
    var warnings = [];
    var fatal = [];
    Modernizr.addTest('filereader', function() {
        return !!(window.File && window.FileList && window.FileReader);
    });
    if(!Modernizr.canvas) fatal.push("Your browser must support HTML5 Canvas.");
    if(!Modernizr.filereader) fatal.push("Your browser must support HTML5 File API.");
    if(!Modernizr.webworkers) fatal.push("Your browser must support HTML5 Web Workers.");
    if(!Modernizr.svg) fatal.push("Your browser must support HTML5 SVG.");
    if(fatal.length > 0) {
        $('body').innerHTML = '<ul>' + fatal.join('<li>') + '</ul>';
        return false;
    }
    if(!Modernizr.webgl) {
        warnings.push("Your browser should support HTML5 Web GL; 3D rendering may be slow.");
        //GCODE.renderer3d.setOption({ rendererType: "canvas" });
    }
    // if(!Modernizr.draganddrop) warnings.push("Your browser doesn't seem to support HTML5 Drag'n'Drop, Drop area will not work.");
    if(warnings.length > 0) {
        info.html = '<ul>' + warnings.join('<li>') + '</ul>';
        console.log("Initialization succeeded with warnings.")
    }
    return true;
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
    $("#dropZone").on('dragover', onDragover).on('drop', onChangeFile);
    $('#file').on('change', onChangeFile);
    $("#saveas").click(save);
    $('#deleteStep').click(onDeleteStep);
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
    window.onkeydown = function(event) {
        console.log(event.keyCode);
        switch(event.keyCode) {
            case 38: setSliceNum(sliceNum + 1); break; // up
            case 40: setSliceNum(sliceNum - 1); break; // down
            case 37: setSliceNum(sliceNum, stepNum - 1); break; // left
            case 39: setSliceNum(sliceNum, stepNum + 1); break; // right
            case 36: setSliceNum(0, 0); break; // home
            case 35: setSliceNum(slices.length - 1); break; // end
            case 90: case 101: case 12: autozoom(); break // z, 5, numpad 5, numpad 5 in numlock
            case 46: onDeleteStep(); break; // del
        }
        event.stopPropagation()
    }
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    worker = new Worker('js/Worker.js');
    worker.addEventListener('message', processMessage, false);
    console.log("Application initialized");
    startCanvas();
    onResize();
}

function setProgress(pct) {
    var v = parseInt(pct) + '%';
    progress.show().find('.bar').width(v).text(v);
}

function onChangeFile(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer ? evt.dataTransfer.files : evt.target.files;
    var reader = new FileReader();
    $("#filename").val(evt.target.files[0].name);
    reader.onload = function(file) {
        //$('#gcode').hide();
        //edit.hide();

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
    if( !slices.length ) return;
    // not properly ordered
    var text = slices.map(function(s){ return s.map(function(v){ return v.gcode.join('\n') }).join('\n')}).join('\n');
    var filename = $("#filename").val();
    var blob = new Blob([text], {type: "text/plain"});//{type: "text/plain;charset=utf-8"});
    saveAs(blob, filename);
}


function onDeleteStep(evt) {
    if( !slices.length ) return;
    if( stepNum == 0 ) { 
        alert("You can't delete the first step in a slice.");
        return;
    }
    // TODO naive; better is edit slice to be a move
    slices[sliceNum].splice(stepNum, 1);
    setSliceNum(sliceNum, stepNum-1);
}


function pill(x, type) {
    if( type == undefined ) type = 'info';
    if( type ) type = " label-"+type;
    return `<span class="label${type}">${x}</span>`;
}
function badge(x, type) {
    type = type || "";
    if( type ) type = " badge-"+type;
    return `<span class="badge${type}">${x}</span>`;
}


function setSliceNum(slicenum, stepnum) {
    if(slicenum < 0 || slicenum > slices.length - 1) return;
    var steps = slices[slicenum];
    if(sliceNum !== slicenum) {
        sliceNum = slicenum;
        stepnum = 0;
        // show step pills
        stepPills.html(steps.map(function(s) {
            var si = stepInfo(s);
            return pill(si.filament, si.filament < 1 ? "warning" : "");
        }).join(' '));
    }
    if(stepnum >= 0 && stepnum < steps.length) stepNum = stepnum;
    slider.show().slider('value', slicenum);
    sliderHandle.text(steps[0].z + 'mm');
    $('#deleteStep').attr("disabled", stepNum == 0);
    //var maxStep = steps.length - 1;
    //sliderHor.slider({ max: maxStep, values: [0, maxStep] });
    render();
    // show slice/step info
    var step = steps[stepNum];
    // TODO omit moveless steps?
    if(step.moves.length > 0) {
        var si = stepInfo(step);
        info.html([
            pill(`Slice: ${sliceNum + 1} of ${slices.length}`),
            pill(`z: ${steps[0].z}mm`),
            pill(`step: ${stepNum + 1} of ${steps.length}`),
            pill(`moves: ${step.moves.length}`),
            pill(`distance: ${si.distance}mm`),
            pill(`filament: ${si.filament}mm`)
        ].join('\n'));
        }
    else
        info.html(`<span class="label label-info">Slice: ${sliceNum + 1} of ${slices.length}</span> (cleanup, no extrusion)`);
    gcode.setValue(step.gcode.join('\n'));
    gcode.scrollTo(0,0);
}


function stepInfo(step) {
    step = step || slices[sliceNum][stepNum];
    var distance = 0, filament = 0, min = { x: step.x, y: step.y }, max = { x: step.x, y: step.y }, x = step.x, y = step.y;
    step.moves.forEach(function(m) {
        distance += Math.sqrt((x - m.x) * (x - m.x) + (y - m.y) * (y - m.y));
        filament += m.e;
        x = m.x;
        y = m.y;
        min.x = Math.min(min.x, x);
        min.y = Math.min(min.y, y);
        max.x = Math.max(max.x, x);
        max.y = Math.max(max.y, y);
    });
    var size = {x:max.x-min.x, y:max.y-min.y}
    return { distance: distance.toFixed(2), filament: filament.toFixed(2), min: min, max: max, size:size };
}


function centerXform(obj, percent) {
    // returns a transform to scale and center an object with min and size, to fill a percentage of the canvas
    percent = percent || 0.9
    // var scale = percent * (obj.size.x > obj.size.y ? canvas.width / obj.size.x : canvas.height / obj.size.y);
    // var dx = -obj.min.x;// - obj.size.x/2;
    // var dy = -obj.min.y;// - obj.size.y/2;
    // return svg.createSVGMatrix().scale(scale).translate(dx, dy);//.translate(canvas.width/2, canvas.height/2);
    var scale = percent * (obj.size.x > obj.size.y ? canvas.width / obj.size.x : canvas.height / obj.size.y);
    // cap max scale at 1000
    // TODO better to set minimum feature size
    if( scale > 1000) scale = 1000;
    var dx = -obj.min.x + (canvas.width / scale - obj.size.x) / 2;
    var dy = -obj.min.y + (canvas.height / scale - obj.size.y) / 2;
    return svg.createSVGMatrix().scale(scale).translate(dx, dy);
}

function autozoom() {
    // zoom to show current step
    if( !slices.length ) return;
    zoomXform = zoomXform ? null : centerXform(stepInfo(slices[sliceNum][stepNum]), 0.5);
    cameraXform = null;
    render();
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
            inOrder = data.msg.inOrder;
            slider.slider({ max: slices.length - 1 });
            //sliceNum = 0;
            setSliceNum(0);
            onResize();
            break;
    }
}

// rendering

var canvas, ctx;
var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
var modelXform, zoomXform, cameraXform;
// got this from gcv0, which should be nozzle dia or actual extrusion width?
// gcv0 uses lineWidth = (filamentDia * (nozzleDia / layerHeight) / (2 * zoomFactor)
// but layerHeight is really AVERAGE layerheight, so it's nonsense
var lineWidth = 0.854/3; // should be actual line width * 0.75 (for visualization)
// line width can be nozzledia for now; 

var lastX = 0, lastY = 0, dragStart, dragged;
var gridSizeX = 200, gridSizeY = 200, gridStep = 10;

function startCanvas() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    // faster without alpha?
    //ctx = canvas.getContext('2d', {alpha:false});
    // override transform function so it'll take a matrix
    (function(){
        var xf = ctx.transform;
        ctx.transform = function(a,b,c,d,e,f) {
            if( a instanceof SVGMatrix ) 
                return xf.call(ctx,a.a,a.b,a.c,a.d,a.e,a.f);
            return xf.call(ctx,a,b,c,d,e,f);
        }
    })();
    ctx.lineCap = 'round';
    // resize the canvas to fill parent dynamically
    window.addEventListener('resize', onResize, false);
    // listen for mouse events
    canvas.addEventListener('mousedown', function(evt) {
        document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        dragStart = ctx.transformedPoint(lastX, lastY);
        dragged = false;
    }, false);
    canvas.addEventListener('mousemove', function(evt) {
        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        dragged = true;
        if(dragStart) {
            var pt = ctx.transformedPoint(lastX, lastY);
            ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
            render();
        }
    }, false);
    canvas.addEventListener('mouseup', function(evt) {
        dragStart = null;
        if(!dragged) zoom(evt.shiftKey ? -1 : 1);
    }, false);
    var zoom = function(clicks) {
        //var pt = ctx.transformedPoint(lastX, lastY);
        //ctx.translate(pt.x, pt.y);
        // scale by 10% per delta
        if( !cameraXform ) cameraXform = svg.createSVGMatrix();
        var factor = Math.pow(1.1, clicks);
        cameraXform = cameraXform.scale(factor);
        //ctx.translate(-pt.x, -pt.y);
        render();
    };
    var handleScroll = function(evt) {
        var clicks = evt.detail < 0 || evt.wheelDelta > 0 ? 0.4 : -0.4;
        if(clicks) zoom(clicks);
        return evt.preventDefault() && false;
    };
    canvas.addEventListener('DOMMouseScroll', handleScroll, false);
    canvas.addEventListener('mousewheel', handleScroll, false);
};

function drawCircle(x, y, radius) {
    radius = radius || 3;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*Math.PI);
    ctx.stroke();
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
    $('#slider').height(canvas.height - 20);
    // scale model to fill canvas and center it
    if(slices.length) {
        modelXform = centerXform(state, 0.9);
    }
    render();
}


function drawGrid(cellsize) {
    cellsize = cellsize || 10;
    var bounds = slices.length ? {l:state.min.x, r:state.max.x, t:state.min.y, b:state.max.y} : {l:0, r:200, t:0, b:200}
    ctx.strokeStyle = '#bbbbbb';
    ctx.lineWidth = 0.2;
    ctx.beginPath();
    //for(var i = 0; i <= canvas.width; i += 10) {
    for(var x = bounds.l-cellsize; x <= bounds.r+cellsize; x += cellsize) {
        ctx.moveTo(x, bounds.t-cellsize);
        ctx.lineTo(x, bounds.b+cellsize);
    }
    //for(var i = 0; i <= canvas.height; i += 10) {
    for(var y = bounds.t-cellsize; y <= bounds.b+cellsize; y += cellsize) {
        ctx.moveTo(bounds.l-cellsize, y);
        ctx.lineTo(bounds.r+cellsize, y);
    }
    ctx.stroke();
}


function drawSlice(slicenum, stepnum) {
    if(slices.length == 0) return;
    var steps = slices[slicenum];
    stepnum = stepnum || 0;
    //ctx.strokeStyle = "#000000";
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for(var i = 0; i < steps.length; i++) {
        var step = steps[i];
        // highlight start for current step
        if( i == stepnum ) {
            ctx.strokeStyle = 'orange';
            ctx.beginPath()
            drawCircle(step.x, step.y, 1);
            ctx.stroke();
        }
        ctx.strokeStyle = i < stepnum ? "#888" : i == stepnum ? "#00f" : "#ccc";
        ctx.beginPath();
        ctx.moveTo(step.x, step.y);
        step.moves.forEach(function(m) {
            // TODO set line width, color, etc. based on extrusion, speed, etc.

            // OLD highlight e=0 moves in the current step
            // if( m.e == 0) {
            //     // highlight for the current step; omit for other steps
            //     if( i == stepnum ) {
            //         //ctx.stroke();
            //         //ctx.beginPath();
            //         ctx.strokeStyle = 'orange';
            //         ctx.lineTo(m.x, m.y);
            //         ctx.stroke();
            //         ctx.strokeStyle = '#00f';
            //         //ctx.beginPath();
            //     }
            //     else
            //         ctx.moveTo(m.x, m.y);
            // }

            // just skip e=0 moves
            if( m.e == 0)
                ctx.moveTo(m.x, m.y);
            else
                ctx.lineTo(m.x, m.y);
        });
        ctx.stroke();
    }
    // show focus box for small steps
    var si = stepInfo(steps[stepNum]);
    if( si.size.x < state.size.x/8 || si.size.y < state.size.y/8 ) {
        ctx.setLineDash([1, 1]);
        ctx.strokeStyle = "#f00";
        ctx.lineWidth = 0.2;
        ctx.strokeRect(si.min.x-10, si.min.y-10, si.size.x+20, si.size.y+20);
        ctx.setLineDash([]);
    }
}


function render() {
    //var p1 = ctx.transformedPoint(0, 0);
    //var p2 = ctx.transformedPoint(canvas.width, canvas.height);
    //console.log(p1, p2);
    //ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    ctx.resetTransform();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(zoomXform)
        ctx.transform(zoomXform);//.a, zoomXform.b, zoomXform.c, zoomXform.d, zoomXform.e, zoomXform.f);
    else if(modelXform)
        ctx.transform(modelXform);//.a, modelXform.b, modelXform.c, modelXform.d, modelXform.e, modelXform.f);
    if( cameraXform )
        ctx.transform(cameraXform);//.a, modelXform.b, modelXform.c, modelXform.d, modelXform.e, modelXform.f);
    drawGrid();
    if(slices.length) {
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = "#f00";
        ctx.lineWidth = 0.2;
        ctx.strokeRect(state.min.x, state.min.y, state.size.x, state.size.y);
        ctx.setLineDash([]);
    }
    drawSlice(sliceNum, stepNum);

    // if( slices.length == 0 ) return;
    // var dx = (gridSizeX / 2 - (state.min.x + state.size.x / 2));
    // var dy = ((state.min.y + state.size.y / 2) - gridSizeY / 2);
    // ctx.translate(dx, dy);
    // var scaleF = state.size.x  > state.size.y ? canvas.width / state.size.x : canvas.height / state.size.y;
    // var pt = ctx.transformedPoint(canvas.width / 2, canvas.height / 2);
    // var transform = ctx.getTransform();
    // var sX = scaleF / transform.a, sY = scaleF / transform.d;
    // ctx.translate(pt.x, pt.y);
    // ctx.scale(0.98 * sX, 0.98 * sY);
    // ctx.translate(-pt.x, -pt.y);
    // var p1 = ctx.transformedPoint(0, 0);
    // var p2 = ctx.transformedPoint(canvas.width, canvas.height);
    // ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    // //drawGrid();
    // //ctx.globalAlpha = renderOptions.alpha ? 0.6 : 1;
    // renderSteps(sliceNum);
}

var progress, info, gcode, slider, sliderHandle, worker;
var scaleFactor = 1.1;
var sliceNum = 0, stepNum = 0;
var slices = [];
var state = {};

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
    slider = $("#slider");
    sliderHandle = $("#sliderhandle");
    gcode = new CodeMirror($('#gcode')[0], {
        lineNumbers: true,
        gutters: ['CodeMirror-linenumbers']
    });
    $("#drop_zone").on('dragover', handleDragOver)
        .on('drop', handleFileSelect);
    $('#file').on('change', handleFileSelect);
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    initSliders();
    worker = new Worker('js/Worker.js');
    worker.addEventListener('message', processMessage, false);
    console.log("Application initialized");
    startCanvas();
    onResize();
}

function setProgress(pct) {
    var v = parseInt(pct) + '%';
    progress.show().width(v).text(v);
}

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer ? evt.dataTransfer.files : evt.target.files;
    var reader = new FileReader();
    reader.onload = function(file) {
        worker.postMessage({ cmd: "parse", msg: file.target.result });
    };
    reader.readAsText(files[0]);
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.target.dropEffect = 'copy';
}

function setSliceNum(slicenum, stepnum) {
    if(slicenum < 0 || slicenum > slices.length - 1) return;
    if(sliceNum != slicenum) {
        sliceNum = slicenum;
        stepnum = 0;
    }
    var steps = slices[slicenum];
    if(stepnum >= 0 && stepnum < steps.length) stepNum = stepnum;
    slider.show().slider('value', slicenum);
    sliderHandle.text(steps[0].z + 'mm');
    //var maxStep = steps.length - 1;
    //sliderHor.slider({ max: maxStep, values: [0, maxStep] });
    render();
    // show slice/step info
    var step = steps[stepNum];
    if(step.moves.length > 0)
        info.show().html(`<span class="label label-info">Slice: ${sliceNum + 1} of ${slices.length}</span> <span class="label label-info">z: ${steps[0].z}mm</span> <span class="label label-info">step: ${stepNum + 1} of ${steps.length}</span> <span class="label label-info">moves: ${step.moves.length}</span> <span class="label label-info">distance: ${stepInfo(step).distance}mm</span>`);
    else
        info.show().html(`<span class="label label-info">Slice: ${sliceNum + 1} of ${slices.length}</span> (cleanup, no extrusion)`);
    gcode.setValue(step.gcode.join('\n'));
}

// function stepDistance(step) {
//     var d = 0, x = step.x, y = step.y;
//     step.moves.forEach(function(m) {
//         d += Math.sqrt((x - m.x) * (x - m.x) + (y - m.y) * (y - m.y));
//         x = m.x;
//         y = m.y;
//     });
//     return d.toFixed(2);
// }

function stepInfo(step) {
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
    return { distance: distance.toFixed(2), filament: filament.toFixed(2), min: min, max: max };
}


function initSliders() {
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
    // sliderHor.slider({
    //     orientation: "horizontal",
    //     range: "min",
    //     min: 0,
    //     max: 1,
    //     values: [0, 1],
    //     slide: function(event, ui) {
    //         drawSlice(sliceNum, ui.values[0], ui.values[1]);
    //     }
    // });
    window.onkeydown = function(event) {
        switch(event.keyCode) {
            case 38: setSliceNum(sliceNum + 1); break; // up
            case 40: setSliceNum(sliceNum - 1); break; // down
            case 37: setSliceNum(sliceNum, stepNum - 1); break; // left
            case 39: setSliceNum(sliceNum, stepNum + 1); break; // right
            case 36: setSliceNum(0, 0); break; // home
            case 35: setSliceNum(slices.length - 1); break; // end
        }
        event.stopPropagation()
    }
}

function processMessage(e) {
    var data = e.data;
    switch(data.cmd) {
        case 'progress':
            setProgress(data.msg);
            break;
        case 'finished':
            progress.hide();
            slices = data.msg.slices;
            state = data.msg.state;
            slider.slider({ max: slices.length - 1 });
            sliceNum = 0;
            onResize();
            setSliceNum(0);
            break;
    }
}

// rendering

var canvas, ctx;
var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
var modelXform, cameraXform;
var lastX = 0, lastY = 0, dragStart, dragged;
var zoomFactorDelta = 0.4;
var gridSizeX = 200, gridSizeY = 200, gridStep = 10;

function startCanvas() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    // ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    //trackTransforms(ctx);
    //ctx.translate((canvas.width - gridSizeX * zoomFactor) / 2, gridSizeY * zoomFactor + (canvas.height - gridSizeY * zoomFactor) / 2);

    // resize the canvas to fill parent dynamically
    window.addEventListener('resize', onResize, false);

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
        var pt = ctx.transformedPoint(lastX, lastY);
        ctx.translate(pt.x, pt.y);
        var factor = Math.pow(scaleFactor, clicks);
        ctx.scale(factor, factor);
        ctx.translate(-pt.x, -pt.y);
        render();
    };
    var handleScroll = function(evt) {
        var delta = evt.detail < 0 || evt.wheelDelta > 0 ? zoomFactorDelta : -zoomFactorDelta;
        if(delta) zoom(delta);
        return evt.preventDefault() && false;
    };
    canvas.addEventListener('DOMMouseScroll', handleScroll, false);
    canvas.addEventListener('mousewheel', handleScroll, false);
};


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
        var scale = 0.9 * (state.size.x > state.size.y ? canvas.width / state.size.x : canvas.height / state.size.y);
        var dx = -state.min.x + (canvas.width / scale - state.size.x) / 2;
        var dy = -state.min.y + (canvas.height / scale - state.size.y) / 2;
        console.log("dx", dx, "dy", dy, "scale", scale);
        modelXform = svg.createSVGMatrix().scale(scale, scale).translate(dx, dy);
    }
    render();
}


function drawGrid() {
    ctx.strokeStyle = '#bbbbbb';
    ctx.lineWidth = 0.2;
    ctx.beginPath();
    for(var i = 0; i <= canvas.width; i += 10) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
    }
    for(var i = 0; i <= canvas.height; i += 10) {
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
    }
    ctx.stroke();
}


function drawSlice(slicenum, stepnum) {
    if(slices.length == 0) return;
    var steps = slices[slicenum];
    stepnum = stepnum || 0;
    //ctx.strokeStyle = "#000000";
    ctx.lineWidth = 0.2;
    for(var i = 0; i < steps.length; i++) {
        var step = steps[i];
        ctx.strokeStyle = i < stepnum ? "#888" : i == stepnum ? "#00f" : "#ccc";
        ctx.beginPath();
        ctx.moveTo(step.x, step.y);
        step.moves.forEach(function(m) {
            // TODO set line width, color, etc. based on extrusion, speed, etc.
            ctx.lineTo(m.x, m.y);
        });
        ctx.stroke();
    }
    // show focus box for small steps
    var step = steps[stepNum];
    var si = stepInfo(step);
    var size = {x:si.max.x-si.min.x, y:si.max.y-si.min.y}
    if( size.x < state.size.x/8 || size.y < state.size.y/8 ) {
        ctx.setLineDash([1, 1]);
        ctx.strokeStyle = "#f00";
        ctx.lineWidth = 0.2;
        ctx.strokeRect(si.min.x-10, si.min.y-10, size.x+20, size.y+20);
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
    if(modelXform)
        ctx.transform(modelXform.a, modelXform.b, modelXform.c, modelXform.d, modelXform.e, modelXform.f);
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

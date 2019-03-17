GCODE.xrenderer = (function() {
    // ***** PRIVATE ******
    var canvas;
    var ctx;
    var zoomFactor = 3, zoomFactorDelta = 0.4;
    var gridSizeX = 200, gridSizeY = 200, gridStep = 10;
    var ctxHeight, ctxWidth;
    var lastX, lastY;
    var dragStart, dragged;
    var scaleFactor = 1.1;
    var model;
    var initialized = false;
    var displayType = { speed: 1, expermm: 2, volpersec: 3 };
    var renderOptions = {
        showMoves: true,
        showRetracts: true,
        colorGrid: "#bbbbbb",
        extrusionWidth: 1,
        //        colorLine: ["#000000", "#aabb88",  "#ffe7a0", "#6e7700", "#331a00", "#44ba97", "#08262f", "#db0e00", "#ff9977"],
        colorLine: ["#000000", "#45c7ba", "#a9533a", "#ff44cc", "#dd1177", "#eeee22", "#ffbb55", "#ff5511", "#777788", "#ff0000", "#ffff00"],
        colorLineLen: 9,
        colorMove: "#00ff00",
        colorRetract: "#ff0000",
        colorRestart: "#0000ff",
        sizeRetractSpot: 2,
        modelCenter: { x: 0, y: 0 },
        moveModel: true,
        differentiateColors: true,
        showNextLayer: false,
        alpha: false,
        actualWidth: false,
        renderErrors: false,
        renderAnalysis: false,
        speedDisplayType: displayType.speed
    };

    var offsetModelX = 0, offsetModelY = 0;

    function trackTransforms(ctx) {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        var xform = svg.createSVGMatrix();
        ctx.getTransform = function() { return xform; };

        var savedTransforms = [];
        var save = ctx.save;
        ctx.save = function() {
            savedTransforms.push(xform.translate(0, 0));
            return save.call(ctx);
        };
        var restore = ctx.restore;
        ctx.restore = function() {
            xform = savedTransforms.pop();
            return restore.call(ctx);
        };

        var scale = ctx.scale;
        ctx.scale = function(sx, sy) {
            xform = xform.scaleNonUniform(sx, sy);
            return scale.call(ctx, sx, sy);
        };
        var rotate = ctx.rotate;
        ctx.rotate = function(radians) {
            xform = xform.rotate(radians * 180 / Math.PI);
            return rotate.call(ctx, radians);
        };
        var translate = ctx.translate;
        ctx.translate = function(dx, dy) {
            xform = xform.translate(dx, dy);
            return translate.call(ctx, dx, dy);
        };
        var transform = ctx.transform;
        ctx.transform = function(a, b, c, d, e, f) {
            var m2 = svg.createSVGMatrix();
            m2.a = a; m2.b = b; m2.c = c; m2.d = d; m2.e = e; m2.f = f;
            xform = xform.multiply(m2);
            return transform.call(ctx, a, b, c, d, e, f);
        };
        var setTransform = ctx.setTransform;
        ctx.setTransform = function(a, b, c, d, e, f) {
            xform.a = a;
            xform.b = b;
            xform.c = c;
            xform.d = d;
            xform.e = e;
            xform.f = f;
            return setTransform.call(ctx, a, b, c, d, e, f);
        };
        var pt = svg.createSVGPoint();
        ctx.transformedPoint = function(x, y) {
            pt.x = x; pt.y = y;
            return pt.matrixTransform(xform.inverse());
        }
    }


    var startCanvas = function() {
        canvas = document.getElementById('canvas');
        if(!canvas.getContext) throw "exception";
        ctx = canvas.getContext('2d');
        ctxHeight = canvas.height;
        ctxWidth = canvas.width;
        lastX = ctxWidth / 2;
        lastY = ctxHeight / 2;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        trackTransforms(ctx);
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
                public.render();
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
            public.render();
        };
        var handleScroll = function(evt) {
            var delta;
            if(evt.detail < 0 || evt.wheelDelta > 0) delta = zoomFactorDelta;
            else delta = -1 * zoomFactorDelta;
            if(delta) zoom(delta);
            return evt.preventDefault() && false;
        };
        canvas.addEventListener('DOMMouseScroll', handleScroll, false);
        canvas.addEventListener('mousewheel', handleScroll, false);
    };


    var drawGrid = function() {
        ctx.strokeStyle = renderOptions.colorGrid;
        ctx.lineWidth = 1;
        var offsetX = 0, offsetY = 0;
        if(renderOptions.moveModel) {
            offsetX = offsetModelX;
            offsetY = offsetModelY;
        }
        ctx.beginPath();
        for(var i = 0; i <= gridSizeX; i += gridStep) {
            ctx.moveTo(i * zoomFactor - offsetX, 0 - offsetY);
            ctx.lineTo(i * zoomFactor - offsetX, -gridSizeY * zoomFactor - offsetY);
        }
        ctx.stroke();
        ctx.beginPath();
        for(var i = 0; i <= gridSizeY; i += gridStep) {
            ctx.moveTo(0 - offsetX, -i * zoomFactor - offsetY);
            ctx.lineTo(gridSizeX * zoomFactor - offsetX, -i * zoomFactor - offsetY);
        }
        ctx.stroke();
    };

    // ***** PUBLIC *******
    var public = {
        init: function() {
            if( initialized ) return;
            startCanvas();
            ctx.translate((canvas.width - gridSizeX * zoomFactor) / 2, gridSizeY * zoomFactor + (canvas.height - gridSizeY * zoomFactor) / 2);
            initialized = true;
        },
        render: function() {
            this.renderSlice(this.sliceNum);
        },
        setOption: function(options) {
            for(var opt in options) {
                if(options.hasOwnProperty(opt)) {
                    renderOptions[opt] = options[opt];
                }
            };
            if(initialized) this.render();
        },
        getOptions: function() {
            return renderOptions;
        },
        getLayerNumSegments: function(layer) {
            if(model) {
                return model[layer] ? model[layer].length : 1;
            } else {
                return 1;
            }
        },
        // MGD
        renderSlice: function(sliceNum) {
            this.init();
            if( !this.state ) return;
            var state = this.state;
            offsetModelX = (gridSizeX / 2 - (state.min.x + state.size.x / 2)) * zoomFactor;
            offsetModelY = ((state.min.y + state.size.y / 2) - gridSizeY / 2) * zoomFactor;
            ctx.translate(offsetModelX, offsetModelY);
            var scaleF = state.size.x  > state.size.y ? canvas.width / state.size.x / zoomFactor : canvas.height / state.size.y / zoomFactor;
            var pt = ctx.transformedPoint(canvas.width / 2, canvas.height / 2);
            var transform = ctx.getTransform();
            var sX = scaleF / transform.a, sY = scaleF / transform.d;
            ctx.translate(pt.x, pt.y);
            ctx.scale(0.98 * sX, 0.98 * sY);111
            ctx.translate(-pt.x, -pt.y);
            var p1 = ctx.transformedPoint(0, 0);
            var p2 = ctx.transformedPoint(canvas.width, canvas.height);
            ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
            drawGrid();
            ctx.globalAlpha = renderOptions.alpha ? 0.6 : 1;
            this.renderSteps(sliceNum, 0, this.slices[sliceNum].length);
        },
        renderSteps: function(sliceNum, start, end) {
            ctx.lineWidth = 1;
            ctx.strokeStyle = renderOptions.colorLine[0];
            var slice = this.slices[sliceNum];
            for(i = start; i < end; i++) {
                var step = slice[i];
                ctx.beginPath();
                ctx.moveTo(step.x * zoomFactor, step.y * zoomFactor);
                step.moves.forEach(function(m){
                    // TODO set line width, color, etc. based on extrusion, speed, etc.
                    ctx.lineTo(m.x * zoomFactor, m.y * zoomFactor);
                });
                ctx.stroke();
            }
        },
        doRender: function(mdl, layerNum) {
            var mdlInfo;
            model = mdl;
            prevX = 0;
            prevY = 0;
            if(!initialized) this.init();

            mdlInfo = GCODE.gCodeReader.getModelInfo();
            speeds = mdlInfo.speeds;
            speedsByLayer = mdlInfo.speedsByLayer;
            volSpeeds = mdlInfo.volSpeeds;
            volSpeedsByLayer = mdlInfo.volSpeedsByLayer;
            extrusionSpeeds = mdlInfo.extrusionSpeeds;
            extrusionSpeedsByLayer = mdlInfo.extrusionSpeedsByLayer;
            //            console.log(speeds);
            //            console.log(mdlInfo.min.x + ' ' + mdlInfo.modelSize.x);
            offsetModelX = (gridSizeX / 2 - (mdlInfo.min.x + mdlInfo.modelSize.x / 2)) * zoomFactor;
            offsetModelY = (mdlInfo.min.y + mdlInfo.modelSize.y / 2) * zoomFactor - gridSizeY / 2 * zoomFactor;
            if(ctx) ctx.translate(offsetModelX, offsetModelY);
            var scaleF = mdlInfo.modelSize.x > mdlInfo.modelSize.y ? (canvas.width) / mdlInfo.modelSize.x / zoomFactor : (canvas.height) / mdlInfo.modelSize.y / zoomFactor;
            var pt = ctx.transformedPoint(canvas.width / 2, canvas.height / 2);
            var transform = ctx.getTransform();
            var sX = scaleF / transform.a, sY = scaleF / transform.d;
            ctx.translate(pt.x, pt.y);
            ctx.scale(0.98 * sX, 0.98 * sY);
            ctx.translate(-pt.x, -pt.y);
            //            ctx.scale(scaleF,scaleF);
            this.render(layerNum, 0, model[layerNum].length);
        },
        getZ: function(sliceNum) {
            return this.slices[sliceNum][0].z;
            // if(!model && !model[sliceNum]) {
            //     return '-1';
            // }
            // var cmds = model[sliceNum];
            // for(var i = 0; i < cmds.length; i++) {
            //     if(cmds[i].prevZ !== undefined) return cmds[i].prevZ;
            // }
            // return '-1';
        }
   };
   return public;
}());

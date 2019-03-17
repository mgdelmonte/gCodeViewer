var GCODE = {};

GCODE.ui = (function() {
    var myCodeMirror;
    var sliderVer;
    var sliderHor;
    var gCodeLines = { first: 0, last: 0 };
    var displayType = { speed: 1, expermm: 2, volpersec: 3 };

    var setProgress = function(id, progress) {
        $('#' + id).width(parseInt(progress) + '%').text(parseInt(progress) + '%');
    };

    var chooseAccordion = function(id) {
        $('#' + id).collapse("show");
    };

    var handleFileSelect = function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var files = evt.dataTransfer ? evt.dataTransfer.files : evt.target.files;
        var reader = new FileReader();
        reader.onload = function(theFile) {
            chooseAccordion('progressAccordionTab');
            setProgress('loadProgress', 0);
            GCODE.gCodeReader.loadFile(theFile);
        };
        reader.readAsText(files[0]);
    };

    var handleDragOver = function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.target.dropEffect = 'copy';
    };

    var initSliders = function() {
        sliderVer = $("#slider-vertical");
        sliderHor = $("#slider-horizontal");
        var onLayerChange = function(sliceNum) {
            GCODE.renderer.sliceNum = sliceNum;
            GCODE.renderer.render();
            var maxStep = GCODE.renderer.slices[sliceNum].length - 1;
            sliderHor.slider({ max: maxStep, values: [0, maxStep] });
        };
        sliderVer.slider({
            orientation: "vertical",
            range: "min",
            min: 0,
            max: GCODE.renderer.slices.length - 1,
            value: 0,
            slide: function(event, ui) {
                onLayerChange(ui.value);
            }
        });
        //this stops slider reacting to arrow keys, since we do it below manually
        $("#slider-vertical").find(".ui-slider-handle").unbind('keydown');
        sliderHor.slider({
            orientation: "horizontal",
            range: "min",
            min: 0,
            max: 1,
            values: [0, 1],
            slide: function(event, ui) {
                GCODE.renderer.renderSteps(GCODE.renderer.sliceNum, ui.values[0], ui.values[1]);
            }
        });
        window.onkeydown = function(event) {
            if(event.keyCode === 38 || event.keyCode === 33) {
                if(sliderVer.slider('value') < sliderVer.slider('option', 'max')) {
                    sliderVer.slider('value', sliderVer.slider('value') + 1);
                    onLayerChange(sliderVer.slider('value'));
                }
            } else if(event.keyCode === 40 || event.keyCode === 34) {
                if(sliderVer.slider('value') > 0) {
                    sliderVer.slider('value', sliderVer.slider('value') - 1);
                    onLayerChange(sliderVer.slider('value'));
                }
            }
            event.stopPropagation()
        }
    };

    var processMessage = function(e) {
        var data = e.data;
        switch(data.cmd) {
            case 'progress':
                setProgress('loadProgress', data.msg);
                break;
            case 'finished':
                setProgress('loadProgress', 100);
                GCODE.renderer.slices = data.msg.slices;
                GCODE.renderer.state = data.msg.state;
                GCODE.renderer.layerNumStore = 0;
                GCODE.renderer.render();
                // TODO GCODE.renderer3d.setModel(model);
                // to adapt
                initSliders();
                // printModelInfo();
                // printLayerInfo(0);
                // chooseAccordion('infoAccordionTab');
                // GCODE.ui.updateOptions();
                // $('#myTab').find('a[href="#tab2d"]').tab('show');
                // $('#runAnalysisButton').removeClass('disabled');
                break;
        }
    };

    var checkCapabilities = function() {
        var warnings = [];
        var fatal = [];
        Modernizr.addTest('filereader', function() {
            return !!(window.File && window.FileList && window.FileReader);
        });
        if(!Modernizr.canvas) fatal.push("<li>Your browser doesn't seem to support HTML5 Canvas, this application won't work without it.</li>");
        if(!Modernizr.filereader) fatal.push("<li>Your browser doesn't seem to support HTML5 File API, this application won't work without it.</li>");
        if(!Modernizr.webworkers) fatal.push("<li>Your browser doesn't seem to support HTML5 Web Workers, this application won't work without it.</li>");
        if(!Modernizr.svg) fatal.push("<li>Your browser doesn't seem to support HTML5 SVG, this application won't work without it.</li>");
        if(fatal.length > 0) {
            document.getElementById('errorList').innerHTML = '<ul>' + fatal.join('') + '</ul>';
            console.log("Initialization failed: unsupported browser.");
            return false;
        }
        if(!Modernizr.webgl) {
            warnings.push("<li>Your browser doesn't seem to support HTML5 Web GL, 3d mode is not recommended, going to be SLOW!</li>");
            GCODE.renderer3d.setOption({ rendererType: "canvas" });
        }
        if(!Modernizr.draganddrop) warnings.push("<li>Your browser doesn't seem to support HTML5 Drag'n'Drop, Drop area will not work.</li>");
        if(warnings.length > 0) {
            document.getElementById('errorList').innerHTML = '<ul>' + warnings.join('') + '</ul>';
            console.log("Initialization succeeded with warnings.")
        }
        return true;
    };

    return {
        initHandlers: function() {
            if(!checkCapabilities()) return;
            var dropZone = document.getElementById('drop_zone');
            dropZone.addEventListener('dragover', handleDragOver, false);
            dropZone.addEventListener('drop', handleFileSelect, false);
            document.getElementById('file').addEventListener('change', handleFileSelect, false);
            setProgress('loadProgress', 0);
            $(".collapse").collapse({ parent: '#accordion2' });
            $('#myTab').find('a[href="#tab3d"]').click(function(e) {
                e.preventDefault();
                console.log("Switching to 3d mode");
                $(this).tab('show');
                GCODE.renderer3d.doRender();
            });
            $('#myTab').find('a[href="#tabGCode"]').click(function(e) {
                e.preventDefault();
                console.log("Switching to GCode preview mode");
                $(this).tab('show');
                myCodeMirror.refresh();
                console.log(gCodeLines);
                myCodeMirror.setCursor(Number(gCodeLines.first), 0);
                myCodeMirror.focus();
            });
            this.worker = new Worker('js/Worker.js');
            this.worker.addEventListener('message', processMessage, false);
            GCODE.ui.processOptions();
            GCODE.renderer.render();
            console.log("Application initialized");
            myCodeMirror = new CodeMirror(document.getElementById('gcode'), {
                lineNumbers: true,
                gutters: ['CodeMirror-linenumbers']
            });
            myCodeMirror.setSize("680", "640");
            chooseAccordion('fileAccordionTab');
            (function() {
                var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
                window.requestAnimationFrame = requestAnimationFrame;
            })();
            if(window.location.search.match(/new/)) {
                $('#errAnalyseTab').removeClass('hide');
            }
        },
        processOptions: function() {
            if(document.getElementById('sortLayersCheckbox').checked) GCODE.gCodeReader.setOption({ sortLayers: true });
            else GCODE.gCodeReader.setOption({ sortLayers: false });
            if(document.getElementById('purgeEmptyLayersCheckbox').checked) GCODE.gCodeReader.setOption({ purgeEmptyLayers: true });
            else GCODE.gCodeReader.setOption({ purgeEmptyLayers: false });
            showGCode = document.getElementById('showGCodeCheckbox').checked;
            if(document.getElementById('moveModelCheckbox').checked) GCODE.renderer.setOption({ moveModel: true });
            else GCODE.renderer.setOption({ moveModel: false });
            if(document.getElementById('showMovesCheckbox').checked) GCODE.renderer.setOption({ showMoves: true });
            else GCODE.renderer.setOption({ showMoves: false });
            if(document.getElementById('showRetractsCheckbox').checked) GCODE.renderer.setOption({ showRetracts: true });
            else GCODE.renderer.setOption({ showRetracts: false });
            if(document.getElementById('differentiateColorsCheckbox').checked) GCODE.renderer.setOption({ differentiateColors: true });
            else GCODE.renderer.setOption({ differentiateColors: false });
            if(document.getElementById('thickExtrusionCheckbox').checked) GCODE.renderer.setOption({ actualWidth: true });
            else GCODE.renderer.setOption({ actualWidth: false });
            if(document.getElementById('alphaCheckbox').checked) GCODE.renderer.setOption({ alpha: true });
            else GCODE.renderer.setOption({ alpha: false });
            if(document.getElementById('showNextLayer').checked) GCODE.renderer.setOption({ showNextLayer: true });
            else GCODE.renderer.setOption({ showNextLayer: false });
            if(document.getElementById('renderErrors').checked) {
                GCODE.renderer.setOption({ showMoves: false });
                GCODE.renderer.setOption({ showRetracts: false });
                GCODE.renderer.setOption({ renderAnalysis: true });
                GCODE.renderer.setOption({ actualWidth: true });
            }
            else GCODE.renderer.setOption({ renderAnalysis: false });
            var filamentDia = 1.75;
            if(Number($('#filamentDia').attr('value'))) { filamentDia = Number($('#filamentDia').attr('value')); }
            GCODE.gCodeReader.setOption({ filamentDia: filamentDia });
            var nozzleDia = 0.4;
            if(Number($('#nozzleDia').attr('value'))) { nozzleDia = Number($('#nozzleDia').attr('value')); }
            GCODE.gCodeReader.setOption({ nozzleDia: nozzleDia });
            var hourlyCost = 1.0;
            if(Number($('#hourlyCost').attr('value'))) { hourlyCost = Number($('#hourlyCost').attr('value')); }
            GCODE.gCodeReader.setOption({ hourlyCost: hourlyCost });
            var filamentPrice = 0.05;
            if(Number($('#filamentPrice').attr('value'))) { filamentPrice = Number($('#filamentPrice').attr('value')); }
            GCODE.gCodeReader.setOption({ filamentPrice: filamentPrice });
            if(document.getElementById('plasticABS').checked) GCODE.gCodeReader.setOption({ filamentType: "ABS" });
            if(document.getElementById('plasticPLA').checked) GCODE.gCodeReader.setOption({ filamentType: "PLA" });
            if(document.getElementById('speedDisplayRadio').checked) GCODE.renderer.setOption({ speedDisplayType: displayType.speed });
            if(document.getElementById('exPerMMRadio').checked) GCODE.renderer.setOption({ speedDisplayType: displayType.expermm });
            if(document.getElementById('volPerSecRadio').checked) GCODE.renderer.setOption({ speedDisplayType: displayType.volpersec });
        },

        updateOptions: function() {
            var gcodeOptions = GCODE.gCodeReader.getOptions();
            document.getElementById('nozzleDia').value = gcodeOptions['nozzleDia'];
            document.getElementById('filamentDia').value = gcodeOptions['filamentDia'];
        },

        resetSliders: function() {
            initSliders();
        },

        setOption: function(options) {
            for(var opt in options) {
                uiOptions[opt] = options[opt];
            }
        }
    }
}());

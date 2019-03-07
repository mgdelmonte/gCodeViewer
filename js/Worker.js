/**
 * User: hudbrog (hudbrog@gmail.com)
 * Date: 10/24/12
 * Time: 12:18 PM
 */

console.log('mgd v7');

var gcode;
var z_heights = {};
var model = [];
var gCodeOptions = {
    sortLayers: false,
    purgeEmptyLayers: true,
    analyzeModel: false
};
var max = { x: undefined, y: undefined, z: undefined };
var min = { x: undefined, y: undefined, z: undefined };
var modelSize = { x: undefined, y: undefined, z: undefined };
var filamentByLayer = {};
var filamentByExtruder = {};
var totalFilament = 0;
var printTime = 0;
var printTimeByLayer = {};
var layerHeight = 0;
var layerCnt = 0;
var speeds = { extrude: [], retract: [], move: [] };
var speedsByLayer = { extrude: {}, retract: {}, move: {} };
var volSpeeds = [];
var volSpeedsByLayer = {};
var extrusionSpeeds = [];
var extrusionSpeedsByLayer = {};


// var sendLayerToParent = function(layerNum, z, progress) {
//     self.postMessage({
//         "cmd": "returnLayer",
//         "msg": {
//             cmds: model[layerNum],
//             layerNum: layerNum,
//             zHeightObject: { zValue: z, layer: z_heights[z] },
//             isEmpty: false,
//             progress: progress
//         }
//     });
// };


var sendMultiLayerToParent = function(layerNum, z, progress) {
    var tmpModel = [];
    var tmpZHeight = {};

    for(var i = 0; i < layerNum.length; i++) {
        tmpModel[layerNum[i]] = model[layerNum[i]];
        tmpZHeight[layerNum[i]] = z_heights[z[i]];
    }

    self.postMessage({
        cmd: "returnMultiLayer", msg: {
            model: tmpModel,
            layerNum: layerNum,
            zHeightObject: { zValue: z, layer: tmpZHeight },
            isEmpty: false,
            progress: progress
        }
    });
};


var sendSizeProgress = function(progress) {
    self.postMessage({
        cmd: "analyzeProgress", msg: {
            progress: progress,
            printTime: printTime
        }
    });
};


var sendAnalyzeDone = function() {
    self.postMessage({
        cmd: "analyzeDone", msg: {
            max: max,
            min: min,
            modelSize: modelSize,
            totalFilament: totalFilament,
            filamentByLayer: filamentByLayer,
            filamentByExtruder: filamentByExtruder,
            printTime: printTime,
            layerHeight: layerHeight,
            layerCnt: layerCnt,
            layerTotal: model.length,
            speeds: speeds,
            speedsByLayer: speedsByLayer,
            volSpeeds: volSpeeds,
            volSpeedsByLayer: volSpeedsByLayer,
            printTimeByLayer: printTimeByLayer,
            extrusionSpeeds: extrusionSpeeds,
            extrusionSpeedsByLayer: extrusionSpeedsByLayer
        }
    });
};


// really just counts printed layers
var purgeLayers = function() {
    var c = 0;
    model.forEach(function(v) { for(var j in v) if(v[j].extrude) { c++; break; } });
    layerCnt = c;
};


var analyzeModel = function() {
    var i, j;
    var x_ok = false, y_ok = false;
    var cmds;
    var tmp1 = 0, tmp2 = 0;
    var speedIndex = 0;
    var type;
    var printTimeAdd = 0;
    for(i = 0; i < model.length; i++) {
        cmds = model[i];
        if(!cmds) continue;
        for(j = 0; j < cmds.length; j++) {
            x_ok = false;
            y_ok = false;
            if(typeof (cmds[j].x) !== 'undefined' && typeof (cmds[j].prevX) !== 'undefined' && typeof (cmds[j].extrude) !== 'undefined' && cmds[j].extrude && !isNaN(cmds[j].x)) {
                max.x = Number(max.x) > Number(cmds[j].x) ? Number(max.x) : Number(cmds[j].x);
                max.x = Number(max.x) > Number(cmds[j].prevX) ? Number(max.x) : Number(cmds[j].prevX);
                min.x = Number(min.x) < Number(cmds[j].x) ? Number(min.x) : Number(cmds[j].x);
                min.x = Number(min.x) < Number(cmds[j].prevX) ? Number(min.x) : Number(cmds[j].prevX);
                x_ok = true;
            }
            if(typeof (cmds[j].y) !== 'undefined' && typeof (cmds[j].prevY) !== 'undefined' && typeof (cmds[j].extrude) !== 'undefined' && cmds[j].extrude && !isNaN(cmds[j].y)) {
                max.y = Number(max.y) > Number(cmds[j].y) ? Number(max.y) : Number(cmds[j].y);
                max.y = Number(max.y) > Number(cmds[j].prevY) ? Number(max.y) : Number(cmds[j].prevY);
                min.y = Number(min.y) < Number(cmds[j].y) ? Number(min.y) : Number(cmds[j].y);
                min.y = Number(min.y) < Number(cmds[j].prevY) ? Number(min.y) : Number(cmds[j].prevY);
                y_ok = true;
            }
            if(typeof (cmds[j].prevZ) !== 'undefined' && typeof (cmds[j].extrude) !== 'undefined' && cmds[j].extrude && !isNaN(cmds[j].prevZ)) {
                max.z = Number(max.z) > Number(cmds[j].prevZ) ? Number(max.z) : Number(cmds[j].prevZ);
                min.z = Number(min.z) < Number(cmds[j].prevZ) ? Number(min.z) : Number(cmds[j].prevZ);
            }
            if((typeof (cmds[j].extrude) !== 'undefined' && cmds[j].extrude == true) || cmds[j].retract != 0) {
                totalFilament += cmds[j].extrusion;
                if(!filamentByLayer[cmds[j].prevZ]) filamentByLayer[cmds[j].prevZ] = 0;
                filamentByLayer[cmds[j].prevZ] += cmds[j].extrusion;
                if(cmds[j].extruder != null) {
                    if(!filamentByExtruder[cmds[j].extruder]) filamentByExtruder[cmds[j].extruder] = 0;
                    filamentByExtruder[cmds[j].extruder] += cmds[j].extrusion;
                }
            }
            if(x_ok && y_ok) {
                printTimeAdd = Math.sqrt(Math.pow(Number(cmds[j].x) - Number(cmds[j].prevX), 2) + Math.pow(Number(cmds[j].y) - Number(cmds[j].prevY), 2)) / (cmds[j].speed / 60);
            } else if(cmds[j].retract === 0 && cmds[j].extrusion !== 0) {
                tmp1 = Math.sqrt(Math.pow(Number(cmds[j].x) - Number(cmds[j].prevX), 2) + Math.pow(Number(cmds[j].y) - Number(cmds[j].prevY), 2)) / (cmds[j].speed / 60);
                tmp2 = Math.abs(Number(cmds[j].extrusion) / (cmds[j].speed / 60));
                printTimeAdd = tmp1 >= tmp2 ? tmp1 : tmp2;
            } else if(cmds[j].retract !== 0) {
                printTimeAdd = Math.abs(Number(cmds[j].extrusion) / (cmds[j].speed / 60));
            }

            printTime += printTimeAdd;
            if(typeof (printTimeByLayer[cmds[j].prevZ]) === 'undefined') { printTimeByLayer[cmds[j].prevZ] = 0; }
            printTimeByLayer[cmds[j].prevZ] += printTimeAdd;

            if(cmds[j].extrude && cmds[j].retract === 0) {
                type = 'extrude';
            } else if(cmds[j].retract !== 0) {
                type = 'retract';
            } else if(!cmds[j].extrude && cmds[j].retract === 0) {
                type = 'move';
            } else {
                self.postMessage({ cmd: 'unknown type of move' });
                type = 'unknown';
            }
            speedIndex = speeds[type].indexOf(cmds[j].speed);
            if(speedIndex === -1) {
                speeds[type].push(cmds[j].speed);
                speedIndex = speeds[type].indexOf(cmds[j].speed);
            }
            if(typeof (speedsByLayer[type][cmds[j].prevZ]) === 'undefined') {
                speedsByLayer[type][cmds[j].prevZ] = [];
            }
            if(speedsByLayer[type][cmds[j].prevZ].indexOf(cmds[j].speed) === -1) {
                speedsByLayer[type][cmds[j].prevZ][speedIndex] = cmds[j].speed;
            }

            if(cmds[j].extrude && cmds[j].retract === 0 && x_ok && y_ok) {
                // we are extruding
                var volPerMM = cmds[j].volPerMM;
                volPerMM = Number(volPerMM).toFixed(3);
                var volIndex = volSpeeds.indexOf(volPerMM);
                if(volIndex === -1) {
                    volSpeeds.push(volPerMM);
                    volIndex = volSpeeds.indexOf(volPerMM);
                }
                if(typeof (volSpeedsByLayer[cmds[j].prevZ]) === 'undefined') {
                    volSpeedsByLayer[cmds[j].prevZ] = [];
                }
                if(volSpeedsByLayer[cmds[j].prevZ].indexOf(volPerMM) === -1) {
                    volSpeedsByLayer[cmds[j].prevZ][volIndex] = volPerMM;
                }

                var extrusionSpeed = cmds[j].volPerMM * (cmds[j].speed / 60);
                extrusionSpeed = Number(extrusionSpeed).toFixed(3);
                var volIndex = extrusionSpeeds.indexOf(extrusionSpeed);
                if(volIndex === -1) {
                    extrusionSpeeds.push(extrusionSpeed);
                    volIndex = extrusionSpeeds.indexOf(extrusionSpeed);
                }
                if(typeof (extrusionSpeedsByLayer[cmds[j].prevZ]) === 'undefined') {
                    extrusionSpeedsByLayer[cmds[j].prevZ] = [];
                }
                if(extrusionSpeedsByLayer[cmds[j].prevZ].indexOf(extrusionSpeed) === -1) {
                    extrusionSpeedsByLayer[cmds[j].prevZ][volIndex] = extrusionSpeed;
                }
            }
        }
        sendSizeProgress(i / model.length * 100);
    }
    purgeLayers();
    modelSize.x = Math.abs(max.x - min.x);
    modelSize.y = Math.abs(max.y - min.y);
    modelSize.z = Math.abs(max.z - min.z);
    layerHeight = (max.z - min.z) / (layerCnt - 1);
    sendAnalyzeDone();
};


var parse = function(text) {
    var slices = {}
    var extrudeRelative = false;
    var totalExtruded = 0
    // do text by lines
    text.split('\n').forEach(function(line) {
        cmd = line.split(/[\(;]/, 1)[0].toUpperCase();
        // move commands
        if( /^(?:G0|G1|G28|G92)\b/.test(cmd) ) {
            // get all values
            var vals = {}
            cmd.split(/\s+/).slice(1).forEach(function(val) {
                vals[val[0]] = Number(val.slice(1));
            })
            // check extrusion/retraction
            var extruded = vals.E > 0 ? (extrudedRelative ? vals[e] : vals[e] - totalExtruded) : 0;
            if( vals.E < 0 ) {

            }

            "abce".forEach(function(e) {
                if( vals[e] ) {
                    extruded = extrudedRelative ? extruded + vals[e] : vals[e];
                    

                    prev_extrude.abs = numSlice - (extrudeRelative ? 0 : prev_extrude[extruder]);
                    prev_extrude[extruder] = numSlice;
                    
                    extrude = prev_extrude.abs > 0;
                    if(prev_extrude.abs < 0) {
                        prevRetract[extruder] = -1;
                        retract = -1;
                    }
                    else if(prev_extrude.abs == 0) {
                        retract = 0;
                    } else if(prev_extrude.abs > 0 && prevRetract[extruder] < 0) {
                        prevRetract[extruder] = 0;
                        retract = 1;
                    } else {
                        retract = 0;
                    }
                

                }
            })
            
        }
    })
    //self.postMessage({ cmd: "returnModel", msg: {} });
}

var doParse = function() {
    var argChar;
    model = [];
    var sendLayer = undefined;
    var sendLayerZ = 0;
    var sendMultiLayer = [];
    var sendMultiLayerZ = [];
    var lastSend = 0;
    var isMove = new RegExp(/^(?:G0|G1)\s/i);
    var layer = 0;
    var prevRetract = { e: 0, a: 0, b: 0, c: 0 };
    var prevZ = 0, prevX, prevY, lastF = 4000;
    var prev_extrude = { a: undefined, b: undefined, c: undefined, e: undefined, abs: undefined }
    var extrudeRelative = false;
    var dcExtrude = false;
    var assumeNonDC = false;

    for(var i = 0; i < gcode.length; i++) {
        var x, y, z, volPerMM;
        var retract = 0;
        var extrude = false;
        var extruder = null;
        prev_extrude.abs = 0;
        gcode[i] = gcode[i].split(/[\(;]/, 1)[0];

        // G0 rapid
        // G1 linear
        if(isMove.test(gcode[i])) {
            var args = gcode[i].split(/\s/);
            for(var j = 0; j < args.length; j++) {
                switch(argChar = args[j].charAt(0).toLowerCase()) {
                    case 'x':
                        x = Number(args[j].slice(1));
                        break;
                    case 'y':
                        y = Number(args[j].slice(1));
                        break;
                    case 'z':
                        z = Number(args[j].slice(1));
                        if(z == prevZ)
                            continue;
                        if(z_heights.hasOwnProperty(z)) {
                            layer = z_heights[z];
                        } else {
                            layer = model.length;
                            z_heights[z] = layer;
                        }
                        sendLayer = layer;
                        sendLayerZ = z;
                        prevZ = z;
                        break;
                    case 'e':
                    case 'a':
                    case 'b':
                    case 'c':
                        assumeNonDC = true;
                        extruder = argChar;
                        var numSlice = Number(args[j].slice(1)).toFixed(6);
                        prev_extrude.abs = numSlice - (extrudeRelative ? 0 : prev_extrude[extruder]);
                        prev_extrude[extruder] = numSlice;
                        
                        extrude = prev_extrude.abs > 0;
                        if(prev_extrude.abs < 0) {
                            prevRetract[extruder] = -1;
                            retract = -1;
                        }
                        else if(prev_extrude.abs == 0) {
                            retract = 0;
                        } else if(prev_extrude.abs > 0 && prevRetract[extruder] < 0) {
                            prevRetract[extruder] = 0;
                            retract = 1;
                        } else {
                            retract = 0;
                        }
                        break;
                    case 'f':
                        lastF = Number(args[j].slice(1));
                        break;
                }
            }
            if(dcExtrude && !assumeNonDC) {
                extrude = true;
                prev_extrude.abs = Math.sqrt((prevX - x) * (prevX - x) + (prevY - y) * (prevY - y));
            }
            if(extrude && retract == 0) {
                volPerMM = Number(prev_extrude['abs'] / Math.sqrt((prevX - x) * (prevX - x) + (prevY - y) * (prevY - y)));
            }
            if(!model[layer]) model[layer] = [];
            model[layer][model[layer].length] = { x: x, y: y, z: z, extrude: extrude, retract: retract, noMove: false, extrusion: (extrude || retract) ? prev_extrude.abs : 0, extruder: extruder, prevX: Number(prevX), prevY: Number(prevY), prevZ: Number(prevZ), speed: lastF, gcodeLine: i, volPerMM: typeof (volPerMM) === 'undefined' ? -1 : volPerMM };
            if(typeof (x) !== 'undefined') prevX = x;
            if(typeof (y) !== 'undefined') prevY = y;
        } else if(/^M82|G90/i.test(gcode[i])) {
            extrudeRelative = false;
        } else if(/^M83|G81/i.test(gcode[i])) {
            extrudeRelative = true;
        } else if(/^M101/i.test(gcode[i])) {
            dcExtrude = true;
        } else if(/^M103/i.test(gcode[i])) {
            dcExtrude = false;
        // G92 set position
        } else if(/^G92/i.test(gcode[i])) {
            var args = gcode[i].split(/\s/);
            for(var j = 0; j < args.length; j++) {
                switch(argChar = args[j].charAt(0).toLowerCase()) {
                    case 'x':
                        x = Number(args[j].slice(1));
                        break;
                    case 'y':
                        y = Number(args[j].slice(1));
                        break;
                    case 'z':
                        z = Number(args[j].slice(1));
                        prevZ = z;
                        break;
                    case 'e':
                    case 'a':
                    case 'b':
                    case 'c':
                        extruder = argChar;
                        prev_extrude[extruder] = extrudeRelative ? Number(args[j].slice(1)).toFixed(3) : 0
                        break;
                }
            }
            if(!model[layer]) model[layer] = [];
            if(typeof (x) !== 'undefined' || typeof (y) !== 'undefined' || typeof (z) !== 'undefined')
                model[layer][model[layer].length] = { x: Number(x), y: Number(y), z: Number(z), extrude: extrude, retract: Number(retract), noMove: true, extrusion: 0, extruder: extruder, prevX: Number(prevX), prevY: Number(prevY), prevZ: Number(prevZ), speed: lastF, gcodeLine: Number(i) };
            // G28 move to origin (home)                
        } else if(/^G28/i.test(gcode[i])) {
            var args = gcode[i].split(/\s/);
            for(var j = 0; j < args.length; j++) {
                switch(argChar = args[j].charAt(0).toLowerCase()) {
                    case 'x':
                        x = Number(args[j].slice(1));
                        break;
                    case 'y':
                        y = Number(args[j].slice(1));
                        break;
                    case 'z':
                        z = Number(args[j].slice(1));
                        if(z === prevZ)
                            continue;
                        sendLayer = layer;
                        sendLayerZ = z;
                        if(z_heights.hasOwnProperty(z)) {
                            layer = z_heights[z];
                        } else {
                            layer = model.length;
                            z_heights[z] = layer;
                        }
                        prevZ = z;
                        break;
                }
            }
            // G28 with no arguments
            if(args.length == 1) {
                // TODO need to init values to default here
            }
            // if it's the first layer and G28 was without
            if(layer == 0 && typeof (z) === 'undefined') {
                z = 0;
                if(z_heights.hasOwnProperty(z)) {
                    layer = z_heights[z];
                } else {
                    layer = model.length;
                    z_heights[z] = layer;
                }
                prevZ = z;
            }
            if(!model[layer]) model[layer] = [];
            model[layer][model[layer].length] = { x: Number(x), y: Number(y), z: Number(z), extrude: extrude, retract: Number(retract), noMove: false, extrusion: (extrude || retract) ? Number(prev_extrude.abs) : 0, extruder: extruder, prevX: Number(prevX), prevY: Number(prevY), prevZ: Number(prevZ), speed: lastF, gcodeLine: Number(i) };
        }
        if( typeof (sendLayer) !== "undefined") {
            if(false && i - lastSend > gcode.length * 0.02 && sendMultiLayer.length != 0) {
                lastSend = i;
                sendMultiLayerToParent(sendMultiLayer, sendMultiLayerZ, i / gcode.length * 100);
                sendMultiLayer = [];
                sendMultiLayerZ = [];
            }
            sendMultiLayer[sendMultiLayer.length] = sendLayer;
            sendMultiLayerZ[sendMultiLayerZ.length] = sendLayerZ;
            sendLayer = undefined;
            sendLayerZ = undefined;
        }
    }
    sendMultiLayerToParent(sendMultiLayer, sendMultiLayerZ, i / gcode.length * 100);
};


var parseGCode = function(message) {
    gcode = message.gcode;
    doParse();
    gcode = [];
    self.postMessage({ cmd: "returnModel", msg: {} });
};


var runAnalyze = function(message) {
    analyzeModel();
    model = [];
    z_heights = [];
    gcode = undefined;
    z_heights = {};
    model = [];
    max = { x: undefined, y: undefined, z: undefined };
    min = { x: undefined, y: undefined, z: undefined };
    modelSize = { x: undefined, y: undefined, z: undefined };
    filamentByLayer = {};
    filamentByExtruder = {};
    totalFilament = 0;
    printTime = 0;
    printTimeByLayer = {};
    layerHeight = 0;
    layerCnt = 0;
    speeds = { extrude: [], retract: [], move: [] };
    speedsByLayer = { extrude: {}, retract: {}, move: {} };
};


var setOption = function(options) {
    for(var opt in options) {
        gCodeOptions[opt] = options[opt];
    }
};


onmessage = function(e) {
    var data = e.data;
    // for some reason firefox doesn't garbage collect when something inside closures is deleted, so we delete and recreate whole object each time
    switch(data.cmd) {
        case 'parse':
            parse(data.msg)
            break;
        case 'parseGCode':
            parseGCode(data.msg);
            break;
        case 'setOption':
            setOption(data.msg);
            break;
        case 'analyzeModel':
            runAnalyze(data.msg);
            break;
        default:
            self.postMessage('Unknown command: ' + data.msg);
    }
};

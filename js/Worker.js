self.addEventListener('message', function(e) {
    switch(e.data.cmd) {
        case 'parse':
            parse(e.data.msg);
            break;
    }
}, false);


function parse(text) {
    // machine state
    var state = {
        x: 0, y: 0, z: 0, e: 0,
        extrudeRelative: false,
        dcExtrude: false,
        speed: 0,
        totalExtruded: 0,
        seconds: 0,
        min: {},
        max: {},
    };
    // record steps
    var steps = [];
    var step;
    function addStep() {
        // if(step) console.log(`step ${steps.length} z=${step.z} gcode=${step.gcode.length} moves=${step.moves.length}`);
        step = steps[steps.push({ gcode: [], moves: [], filament:0, distance:0 }) - 1];
    }
    addStep();
    // do text by lines
    var lines = text.split('\n');
    var time = new Date().getTime();
    lines.forEach(function(line, i) {
        //if(i && !(i % parseInt(lines.length / 100)))
        var t2 = new Date().getTime();
        if( t2-time > 100 ) {
            self.postMessage({ cmd: "progress", msg: 100 * i / lines.length });
            time = t2;
        }
        line = line.trim();
        step.gcode.push(line);
        var cmd = line.split(/[\(;]/, 1)[0].trim().toLowerCase();
        // move/set commands
        if(/^(?:G0|G1|G92)\b/i.test(cmd)) {
            // get all values
            var vals = {}
            cmd.split(/\s+/).slice(1).forEach(function(val) {
                vals[val[0]] = Number(val.slice(1));
            });
            // invert y axis
            if( 'y' in vals ) vals.y = -vals.y;
            // G92 just sets positions; does not move
            if(/^G92/i.test(cmd)) {
                // warn if setting any value other than e
                if(Object.keys(vals).some(function(k) { return k != "e" }))
                    console.warn("sets val other than e: " + cmd);
                if("e" in vals) {
                    // warn if setting e to any nonzero value when not extrudeRelative
                    if(!state.extrudeRelative && vals.e != 0)
                        console.warn("setting e with non-relative extrusion: " + cmd);
                    state.e = vals.e;
                }
                return;
            }
            // check movement and extrusion
            var moved = { x: "x" in vals ? vals.x - state.x : 0, y: "y" in vals ? vals.y - state.y : 0, z: "z" in vals ? vals.z - state.z : 0 }
            var xyDistance = Math.sqrt(moved.x * moved.x + moved.y * moved.y);
            var extruded = vals.e ? (state.extrudeRelative ? vals.e : vals.e - state.e) : 0;
            if(!extruded && state.dcExtrude)
                extruded = xyDistance;
            // cannot extrude at z=0
            if( state.z == 0 )
                extruded = 0;
            // set step starting point if we're about to start a line
            if(extruded > 0 && step.moves.length == 0) {
                step.x = state.x;
                step.y = state.y;
                step.z = state.z;
            }
            // update state
            if("x" in vals) state.x = vals.x;
            if("y" in vals) state.y = vals.y;
            if("z" in vals) state.z = vals.z;
            if("f" in vals) state.speed = vals.f;
            if(!state.extrudeRelative && "e" in vals) state.e = vals.e;
            // negative extrusion, or zero extrusion plus a z-move, after a line ends a step
            if((extruded < 0 || (extruded==0 && moved.z)) && step.moves.length) {
                addStep();
            }
            // start a line by extruding and continue it even if e=0
            else if(extruded > 0 || (step.moves.length && xyDistance)) {
                // note that only non-negative extrusion counts towards total
                state.totalExtruded += extruded;
                step.filament += extruded;
                step.distance += xyDistance;
                // only positive extrusion affects extents
                if( extruded > 0 ) {
                    state.min.x = 'x' in state.min ? Math.min(state.min.x, state.x) : state.x;
                    state.min.y = 'y' in state.min ? Math.min(state.min.y, state.y) : state.y;
                    state.min.z = 'z' in state.min ? Math.min(state.min.z, state.z) : state.z;
                    state.max.x = 'x' in state.max ? Math.max(state.max.x, state.x) : state.x;
                    state.max.y = 'y' in state.max ? Math.max(state.max.y, state.y) : state.y;
                    state.max.z = 'z' in state.max ? Math.max(state.max.z, state.z) : state.z;
                }
                // warn about z-moves during a line
                if("z" in vals && vals.z != step.z)
                    console.warn(`doing z move at point ${step.moves.length}: ${cmd}`);
                step.moves.push({ x: state.x, y: state.y, e: extruded, d:xyDistance });
            }
        }
        // misc commands
        else if(/^M82|G90/i.test(cmd)) {
            state.extrudeRelative = false;
        } else if(/^M83|G81/i.test(cmd)) {
            state.extrudeRelative = true;
        } else if(/^M101/i.test(cmd)) {
            state.dcExtrude = true;
        } else if(/^M103/i.test(cmd)) {
            state.dcExtrude = false;
            // things to worry about
        } else if(/^G91/i.test(cmd)) {
            console.log("worry: " + line);
        }
    });
    // index steps by slice; retain ordering and do some analysis
    var zs = {}
    var epilogue = "";
    steps.forEach(function(s, ix) { 
        // the final no-move step is not a step; add as epilogue
        if( !s.moves.length ) {
            if( ix != steps.length-1 ) {
                // no moves on anything but the last step is a warning
                console.warn(`step ${ix+1} of ${steps.length} has no moves`);
                s.warnings = (s.warnings || []).concat(['step has no moves']);
            } else {
                epilogue = s.gcode.join('\n');
                return;
            }
        }
        if( s.filament < 1 )
            s.warnings = ['<1mm extruded'];
        s.ix = ix;
        if(!(s.z in zs)) zs[s.z] = [];
        zs[s.z].push(s);
    });
    var slices = [];
    Object.keys(zs).sort(function(a,b){ return a-b }).forEach(function(k) { slices.push(zs[k])});
    // update state
    state.size = { x: state.max.x-state.min.x, y: state.max.y-state.min.y, z: state.max.z-state.min.z };
    console.log("end state: " + JSON.stringify(state));
    self.postMessage({ cmd: "finished", msg: { slices: slices, state: state, epilogue: epilogue } });
}

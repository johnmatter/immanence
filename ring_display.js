sketch.default2d();

inlets = 1;

var backgroundColor = [ 25 / 255, 31 / 255,  36 / 255, 0.0];
var ringColor = [248 / 255, 202 / 255, 58 / 255, 0.9];
var ringColor2 = [226 / 255, 226 / 255, 226 / 255, 8.0];

var ringRadius = 0.75;
var bitRadius = 0.10;

var bits = Array(16);
for (i=0; i<bits.length; i++) {
    bits[i] = 0;
}

var vtask = new Task(taskfun);
vtask.interval = 10;
vtask.repeat();
draw();

function draw() {
	with (sketch) {
        // erase background
        glclearcolor(backgroundColor);
        glclear();
        glenable("line_smooth");
    }

    //drawRing();
    drawBits();
}

function drawRing() {
	with (sketch) {
        gllinewidth(2);

        // draw ring
        moveto(0,0);
        glcolor(ringColor2);
        framecircle(ringRadius);
    }
}

function drawBits() {
    if(checkBitValidity(bits)) {
        var deltaAngle = 2 * Math.PI / bits.length;
        with (sketch) {
            gllinewidth(1);
            for (i=0; i<bits.length; i++) {
                moveto(ringRadius * Math.cos(i*deltaAngle), ringRadius * Math.sin(i*deltaAngle));
                glcolor(backgroundColor);
                circle(bitRadius);
                glcolor(ringColor2);
                framecircle(bitRadius);

                if (bits[i] == 1) {
                    glcolor(ringColor);
                    circle(0.5 * bitRadius);
                }
            }
        }
    }
}

function list() {
    if(checkBitValidity(arguments)) {
        bits = arguments;
    }
}

function checkBitValidity(bits) {
    for (i=0; i<bits.length; i++) {
        if ((bits[i] != 0) && (bits[i] != 1)) {
            return false;
        };
    }
    return true;
}

function taskfun() {
	draw();
	refresh();
}
taskfun.local = 1; //private

function forcesize(w,h) {
	if (w!=h) {
		h = w;
		box.size(w,h);
	}
}
forcesize.local = 1; //private

function onresize(w,h) {
	forcesize(w,h);
	draw();
	refresh();
}
onresize.local = 1;

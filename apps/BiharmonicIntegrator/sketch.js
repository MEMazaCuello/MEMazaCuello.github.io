const TOTAL_WIDTH = 1050;
const TOTAL_HEIGHT = 500;
const EXT_X = 250;
const EXT_Y = 250;

const GRAVITY = 9810;

let integrator;

function setup() {
    var canvas = createCanvas(TOTAL_WIDTH, TOTAL_HEIGHT);
    canvas.parent('sketch-holder');
    let p = new Point(0,0,20);

    let sineSignal = new SineSignal(1.0,20.0);
    let biharmonic = new BiharmonicSignal(1.0,20.0,0.0*PI,0.5);

    let coulomb = new CoulombFriction(0.2, 1.0);
    let stribeck = new CoulombStribeck(0.15,0.9,0.001/GRAVITY,0.005/GRAVITY);

    integrator = new Integrator(p, biharmonic, stribeck, 2*EXT_X, 2*EXT_Y);
}

function draw() {
    // Compute step -----------
    for (let i = 0; i < 5; i++)
    {
        integrator.step();
    }

    // Draw -------------------
    background(255);
    translate(0, height/2);

    drawAxes();

    integrator.display();
}

function drawAxes(){
    push()
    strokeWeight(2);
    line(0,0,2*EXT_X,0);
    line(1,-EXT_Y,1,EXT_Y);

    line(TOTAL_WIDTH/2,0,TOTAL_WIDTH/2 + 2*EXT_X,0);
    line(TOTAL_WIDTH/2 + EXT_X,-EXT_Y,TOTAL_WIDTH/2 + EXT_X,EXT_Y);
    pop()
}
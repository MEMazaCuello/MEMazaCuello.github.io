/* Introducion: function and its graph */
var S1 = function( S ) {
  // Constants
  const WIDTH  = 400;
  const HEIGHT = 80;
  const BORDER = 80;
  const r = 15;
  const x0 = 2;

  // Functions
  let f = ( x ) =>  (- 4 * x * (x - x0) * (x + x0));
  let F = (x,y) => (y + f(x));

  // p5.js
  S.setup = function() {
    S.createCanvas(WIDTH + 2*BORDER, HEIGHT + 2*BORDER);
    S.textSize(25)
  };

  S.draw = function() {
    S.background(255);

    // Fixed
    S.push()
    S.translate(S.width/2,S.height/2)
    S.stroke(0)
    S.line(-S.width/2,0,S.width/2,0)
    S.line(0,-S.height/2,0,S.height/2)
    S.noStroke()
    S.fill('purple')
    for(let x = -4; x < 4; x = x+0.01) {
      let i = S.map(x,-4,4,-S.width/2,S.width/2)
      S.circle(i,f(x),5)
    }
    S.pop()

    // Dynamic
    let xm = S.constrain(S.mouseX,0,S.width)
    let ym = S.constrain(S.mouseY,0,S.height)
    xm = S.map(xm,0,S.width,-4,4)
    ym = S.height/2 - ym
    let Fxy = S.floor(F(xm,ym))

    S.ellipseMode(S.CENTER);
    (Fxy === 0)? S.fill(10,250,10) : S.fill(250,10,10);
    S.circle(S.mouseX,S.mouseY,r);

    S.fill(0)
    S.text(`F(x,y) = y - f(x) = ${Fxy}`, 10, 30);
    S.text(`f(x)`, S.width - 1.2 * BORDER, 30);
  }
};
var sketch1 = new p5(S1, 'S1_function_graph');


/*****************************************************************************/
/*****************************************************************************/


/* Curves: getting a vertical line */
var S2a = function( S ) { 
  // Constants
  const WIDTH  = 400;
  const HEIGHT = 80;
  const BORDER = 80;

  let mS, nS;

  S.setup = function() {
    S.createCanvas(WIDTH + 2*BORDER, HEIGHT + 2*BORDER);
    S.textSize(25);
    mS = S.createSlider(-100, 100, 1, 0.5);
    mS.position(-2*BORDER, 0);
    mS.size(2*BORDER);
    nS = S.createSlider(-100, 100, 0, 1);
    nS.position(-2*BORDER, 30);
    nS.size(2*BORDER);
  };

  S.draw = function() {
    S.background(255);

    // Fixed
    S.push()
    S.stroke(0)
    S.translate(S.width/2,S.height/2)
    S.line(-S.width/2,0,S.width/2,0)
    S.line(0,-S.height/2,0,S.height/2)
    S.pop()

    S.fill(0)
    S.text(`y = mx + n`, S.width - 2*BORDER, S.height-BORDER);

    // Dynamic
    let m = mS.value();
    let n = nS.value();

    S.strokeWeight(1)
    S.text(`m`, mS.x + mS.width + 5, mS.y + 20);
    S.text(`n`, nS.x + nS.width + 5, nS.y + 20);

    let w2 = S.width/2;
    let h2 = S.height/2;
    S.push()
    S.translate(w2,h2)
    S.strokeWeight(5)
    S.stroke('purple')
    S.line(20,-h2,20,h2)
    S.stroke('red')
    S.line(-w2, m*w2 - n, w2, -m*w2 - n)
    S.pop()
  };
};
var sketch2a = new p5(S2a, 'S2_line_a');

var S2b = function( S ) { 
  // Constants
  const WIDTH  = 400;
  const HEIGHT = 80;
  const BORDER = 80;

  let aS, bS, cS;

  S.setup = function() {
    S.createCanvas(WIDTH + 2*BORDER, HEIGHT + 2*BORDER);
    S.textSize(25);
    aS = S.createSlider(-20, 20, 10, 0.5);
    aS.position(-2*BORDER, 0);
    aS.size(2*BORDER);
    bS = S.createSlider(-20, 20, -10, 1);
    bS.position(-2*BORDER, 30);
    bS.size(2*BORDER);
    cS = S.createSlider(-100, 100, 0, 1);
    cS.position(-2*BORDER, 60);
    cS.size(2*BORDER);
  };

  S.draw = function() {
    S.background(255);

    // Fixed
    S.push()
    S.stroke(0)
    S.translate(S.width/2,S.height/2)
    S.line(-S.width/2,0,S.width/2,0)
    S.line(0,-S.height/2,0,S.height/2)
    S.pop()

    S.fill(0)
    S.text(`ax + by + c = 0`, S.width - 2*BORDER, S.height-BORDER);
    // Dynamic
    let a = aS.value();
    let b = bS.value();
    let c = cS.value();

    S.strokeWeight(1)
    S.text(`a`, aS.x + aS.width + 5, aS.y + 20);
    S.text(`b`, bS.x + bS.width + 5, bS.y + 20);
    S.text(`c`, cS.x + cS.width + 5, cS.y + 20);

    let w2 = S.width/2;
    let h2 = S.height/2;
    S.push()
    S.translate(w2,h2)
    S.strokeWeight(5)
    S.stroke('purple')
    S.line(20,-h2,20,h2)
    S.stroke('red')
    if (b === 0) {
      if (c/a === 20) {
        S.stroke('green')
        S.strokeWeight(7)
      } 
      S.line((c/a), -h2, (c/a), h2)
    } else {
      S.line(-w2, -(a/b)*w2 - (c/b), w2, +(a/b)*w2 - (c/b));
    }
    S.pop()
  };
};
var sketch2b = new p5(S2b, 'S2_line_b');


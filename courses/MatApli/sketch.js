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
  let w2, h2;

  S.setup = function() {
    S.createCanvas(WIDTH + 2*BORDER, HEIGHT + 2*BORDER);
    S.textSize(25);
    mS = S.createSlider(-100, 100, 1, 0.5);
    mS.position(-2*BORDER, 0);
    mS.size(2*BORDER);
    nS = S.createSlider(-100, 100, 0, 1);
    nS.position(-2*BORDER, 30);
    nS.size(2*BORDER);
    w2 = S.width/2;
    h2 = S.height/2;
  };

  S.draw = function() {
    S.background(255);

    // Fixed
    drawAxes(S,w2,h2)

    S.fill(0)
    S.text(`y = mx + n`, S.width - 2*BORDER, S.height-BORDER);

    // Dynamic
    let m = mS.value();
    let n = nS.value();

    S.strokeWeight(1)
    S.text(`m`, mS.x + mS.width + 5, mS.y + 20);
    S.text(`n`, nS.x + nS.width + 5, nS.y + 20);

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
  let w2, h2;

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
    w2 = S.width/2;
    h2 = S.height/2;
  };

  S.draw = function() {
    S.background(255);

    // Fixed
    drawAxes(S,w2,h2)

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

/*****************************************************************************/
/*****************************************************************************/

/* Conics: Ellipse */
var S3a = function( S ) { 
  // Constants
  const WIDTH  = 400;
  const HEIGHT = 400;
  const BORDER = 80;
  const n = 1000;
  const ti = 0;
  const tf = 360;
  let dt;
  let w2, h2;

  let aS, bS;
  let a, b;

  S.setup = function() {
    S.createCanvas(WIDTH + 2*BORDER, HEIGHT + 2*BORDER);
    S.textSize(25);

    aS = S.createSlider(0, 250, 250, 1);
    aS.position(-2*BORDER, 0);
    aS.size(2*BORDER);
    bS = S.createSlider(0, 250, 100, 1);
    bS.position(-2*BORDER, 30);
    bS.size(2*BORDER);

    dt = S.abs(tf - ti) / n 
    w2 = S.width/2;
    h2 = S.height/2;

    S.angleMode(S.DEGREES);
  };

  S.draw = function() {
    S.background(255);

    // Fixed
    drawAxes(S,w2,h2);

    S.noStroke()
    S.text(`a`, aS.x + aS.width + 5, aS.y + 20);
    S.text(`b`, bS.x + bS.width + 5, bS.y + 20);

    // Dynamic
    S.translate(w2,h2);
    S.strokeWeight(5);
    S.stroke('purple');
    a = aS.value();
    b = bS.value();
    for (let t = ti; t < tf + dt; t += dt) {
      S.point(a * S.cos(t), b * S.sin(360  - t))
    }
  };
};
var sketch3a = new p5(S3a, 'S3a_elipse');

/* Conics: Hiperbola */
var S3b = function( S ) { 
  // Constants
  const WIDTH  = 400;
  const HEIGHT = 400;
  const BORDER = 80;
  const n = 2000;
  const ti = -10;
  const tf =  10;
  let dt;
  let w2, h2;

  let aS, bS;
  let a, b;

  S.setup = function() {
    S.createCanvas(WIDTH + 2*BORDER, HEIGHT + 2*BORDER);
    S.textSize(25);

    aS = S.createSlider(0, 250,  75, 1);
    aS.position(-2*BORDER, 0);
    aS.size(2*BORDER);
    bS = S.createSlider(0, 250, 100, 1);
    bS.position(-2*BORDER, 30);
    bS.size(2*BORDER);

    dt = S.abs(tf - ti) / n 
    w2 = S.width/2;
    h2 = S.height/2;

    S.angleMode(S.DEGREES);
  };

  S.draw = function() {
    S.background(255);

    // Fixed
    drawAxes(S,w2,h2);

    S.noStroke()
    S.text(`a`, aS.x + aS.width + 5, aS.y + 20);
    S.text(`b`, bS.x + bS.width + 5, bS.y + 20);

    // Dynamic
    S.translate(w2,h2);
    S.strokeWeight(5);
    S.stroke('purple');
    a = aS.value();
    b = bS.value();
    for (let t = ti; t < tf + dt; t += dt) {
      let cosh = 0.5 * ( S.exp(t) + S.exp(-t) );
      let sinh = 0.5 * ( S.exp(t) - S.exp(-t) );
      S.point(  a * cosh, b * sinh)
      S.point(- a * cosh, b * sinh)
    }
  };
};
var sketch3b = new p5(S3b, 'S3b_hiperbola');


/*****************************************************************************/
/*****************************************************************************/


/* Coordinates: Cartesian */
var S4a = function( S ) { 
  // Constants
  const WIDTH  = 200;
  const HEIGHT = 200;
  const BORDER = 80;
  let w2, h2;
  let x0, y0;

  S.setup = function() {
    S.createCanvas(WIDTH + 2*BORDER, HEIGHT + 2*BORDER);
    S.textSize(25);
    S.angleMode(S.DEGREES);
    w2 = S.width/2;
    h2 = S.height/2;
  };

  S.draw = function() {
    S.background(255);

    // Fixed
    S.push()
    S.translate(w2,h2)
    S.strokeWeight(2)
    S.stroke(240)
    S.line(-w2,h2/4,w2,h2/4)
    S.line(-w2,2*h2/4,w2,2*h2/4)
    S.line(-w2,3*h2/4,w2,3*h2/4)
    S.line(-w2,-h2/4,w2,-h2/4)
    S.line(-w2,-2*h2/4,w2,-2*h2/4)
    S.line(-w2,-3*h2/4,w2,-3*h2/4)
    S.line(  w2/4,-h2,  w2/4,h2)
    S.line(2*w2/4,-h2,2*w2/4,h2)
    S.line(3*w2/4,-h2,3*w2/4,h2)
    S.line(-  w2/4,-h2,-  w2/4,h2)
    S.line(-2*w2/4,-h2,-2*w2/4,h2)
    S.strokeWeight(3)
    S.line(-3*w2/4,-h2,-3*w2/4,h2)
    S.stroke(200)
    S.line(-w2,0,w2,0)
    S.line(0,-h2,0,h2)
    S.pop()

    // Dynamic
    x0 = S.mouseX;
    y0 = S.mouseY;

    S.strokeWeight(2)
    S.stroke('purple')
    S.line(0,y0,S.width,y0)
    S.line(x0,0,x0,S.height)

    S.strokeWeight(5);
    S.noStroke();
    S.fill('red');
    S.ellipseMode(S.RADIUS);
    S.circle(x0, y0, 10);
  };
};
var sketch4a = new p5(S4a, 'S4a_cartesianas');

/* Coordinates: Polar */
var S4b = function( S ) { 
  // Constants
  const WIDTH  = 200;
  const HEIGHT = 200;
  const BORDER = 80;
  let w2, h2;
  let x0, y0;
  let r0, a0;

  S.setup = function() {
    S.createCanvas(WIDTH + 2*BORDER, HEIGHT + 2*BORDER);
    S.textSize(25);
    S.angleMode(S.DEGREES);
    w2 = S.width/2;
    h2 = S.height/2;
  };

  S.draw = function() {
    S.background(255);

    let a = 360/5

    // Fixed
    S.push()
    S.translate(w2,h2)
    S.strokeWeight(2)
    S.stroke(240)
    S.angleMode(S.DEGREES);
    S.line(0,0, w2, w2*S.tan(a))
    S.line(0,0, w2,-w2*S.tan(a))
    S.line(0,0,-w2, w2*S.tan(2*a))
    S.line(0,0,-w2,-w2*S.tan(2*a))
    S.noFill()
    S.circle(0,0,  w2/4)
    S.circle(0,0,2*w2/4)
    S.circle(0,0,3*w2/4)
    S.circle(0,0,4*w2/4)
    S.strokeWeight(3)
    S.stroke(200)
    S.line(0,0,w2,0)
    S.pop()

    // Dynamic
    x0 = S.mouseX;
    y0 = S.mouseY;

    S.translate(w2,h2);
    S.strokeWeight(2);
    S.stroke('purple');
    S.line(0, 0, 1.5 * (x0 - w2), 1.5 * (y0 - h2));

    r0 = S.dist(w2, h2, x0, y0)
    a0 = S.atan2((y0-h2),(x0-w2))
    S.ellipseMode(S.RADIUS);

    S.noFill();
    S.circle(0,0,r0);
    S.stroke('red');
    S.arc(0,0,0.5 * r0,0.5 * r0,a0,0)
    S.translate(-w2,-h2);

    S.strokeWeight(5);
    S.noStroke();
    S.fill('red');
    S.circle(x0, y0, 10);
  };
};
var sketch4b = new p5(S4b, 'S4b_polares');


/*****************************************************************************/
/*****************************************************************************/

// /* Parametrizing: Ellipse */
// var S3a = function( S ) { 
//   // Constants
//   const WIDTH  = 400;
//   const HEIGHT = 400;
//   const BORDER = 80;
//   const a = 250;
//   const b = 100;

//   let tS;
//   let w2, h2;

//   let p = new Point(0,0);

//   S.setup = function() {
//     S.createCanvas(WIDTH + 2*BORDER, HEIGHT + 2*BORDER);
//     S.textSize(25);

//     tS = S.createSlider(0, 360, 30, 1);
//     tS.position(-2*BORDER, 0);
//     tS.size(2*BORDER);

//     w2 = S.width/2;
//     h2 = S.height/2;

//     S.angleMode(S.DEGREES);
//   };

//   S.draw = function() {
//     S.background(255);

//     // Fixed
//     drawAxes(S,w2,h2)

//     // Dynamic
//     let t = tS.value();

//     p.x = a * S.cos(t)
//     p.y = b * S.sin(360 - t)

//     S.translate(w2,h2);
//     S.ellipseMode(S.RADIUS);
//     S.noFill();
//     S.strokeWeight(3);
//     S.stroke('purple');
//     S.circle(0,0,a);
//     S.circle(0,0,b);
//     S.noStroke();
//     S.fill('red');
//     S.circle(p.x,p.y,5);
//   };
// };
// var sketch3a = new p5(S3a, 'S3a_elipse');


/*****************************************************************************/
/*****************************************************************************/

/* HELPER FUNCTIONS */

function drawAxes(S,w,h) {
  S.push()
  S.strokeWeight(3)
  S.stroke(100)
  S.translate(w,h)
  S.line(-w,0,w,0)
  S.line(0,-h,0,h)
  S.pop()
}

// function curve2D(S, fx, fy, ti, tf, n) {
//   S.stroke('purple')
//   let dt = S.abs(tf - ti) / n 
//   for (let t = ti; t < tf + dt; t += dt) {
//     S.circle(fx(t), fy(t), 5)
//   }
// }


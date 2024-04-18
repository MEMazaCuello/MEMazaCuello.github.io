const R = 18; 

const xmin = -390;
const xmax =  -10;
const ymin = -150;
const ymax =  150;

const fmin = -390;
const fmax =  390;

let f; 
let Obj;
let Img;

let isDragging = false;

function setup() {
  createCanvas(800, 500);
  f   = createVector(100,0);
  Obj = createVector(-300,-100);
  Img = computeImage(f,Obj);
}

function draw() {
  background(255);
  translate(width/2, height/2);  
  
  if (isDragging) {
    cursor('grab')
  } else if (mouseIn(Obj) || mouseIn(f)) {
    cursor(HAND)
  } else {
    cursor(ARROW)
  }

  Img = computeImage(f,Obj);
 
  strokeWeight(3);
  line(-width/2,0,width/2,0);
  if (f.x < 0) {
    drawDivergingLens()
  } else {
    drawConvergingLens();    
  }
  
  
  push();
  stroke(255,98,0);
  line(Obj.x,Obj.y,0,Obj.y);
  line(Obj.x,Obj.y,0,0);
  line(0,Obj.y,f.x,f.y);
  if(Img.x < Obj.x){
    stroke(255,98,0, 50);
  }
  line(0,Obj.y,Img.x,Img.y);
  line(Obj.x,Obj.y,Img.x,Img.y);
  pop();
  
  strokeWeight(2);
  fill('red');
  ellipse(f.x,f.y,R);
  if (f.x >= 0) {
    drawX(-f.x,f.y,'red'); 
  }
  
  fill('blue');
  line(Obj.x,0,Obj.x,Obj.y);
  ellipse(Obj.x,Obj.y,R);
  
  fill(100,0,255,50);
  line(Img.x,0,Img.x,Img.y);
  ellipse(Img.x,Img.y,R);
  
}

function getObject() {
  let x = constrain(mouseX -  width/2, xmin, xmax);
  let y = constrain(mouseY - height/2, ymin, ymax);
  return createVector(x,y);
}

function getFocalPoint() {
  let x = constrain(mouseX -  width/2, fmin, fmax);
  return createVector(x,0);
}

function computeImage(f,Obj) {
  let M = NaN;
  if (abs(f.x) != abs(Obj.x)) {
    M = f.x / (f.x + Obj.x);
  } else {
    M = width * 100;
  }
  return createVector(M * Obj.x, M * Obj.y);
}

function drawX(x,y,c) {
  let d = 7;
  push();
  stroke(c);
  line(x-d,y+d,x+d,y-d);
  line(x-d,y-d,x+d,y+d);
  pop();
}

function drawConvergingLens() {
  line(0,-0.4*height,0,0.4*height);
  line(0,-0.4*height,-5,-0.4*height+10);
  line(0,-0.4*height,+5,-0.4*height+10);
  line(0,+0.4*height,-5,+0.4*height-10);
  line(0,+0.4*height,+5,+0.4*height-10);
}

function drawDivergingLens() {
  line(0,-0.4*height,0,0.4*height);
  line(0,-0.4*height,-5,-0.4*height-10);
  line(0,-0.4*height,+5,-0.4*height-10);
  line(0,+0.4*height,-5,+0.4*height+10);
  line(0,+0.4*height,+5,+0.4*height+10);
}

//////////

function dragAlong() {
  if (mouseIn(Obj)) {
    Obj = getObject();
  } else if (mouseIn(f)) {
    f = getFocalPoint();  
  }
}

function mousePressed(){
  if (!isDragging) {
    isDragging = true;
    dragAlong();
  }
}

function mouseDragged(){
  if (isDragging) {
    cursor('grab');
    dragAlong();
  }
}

function mouseReleased(){
  isDragging = false;
}

function mouseIn(P) {
  return dist(mouseX - width/2, mouseY - height/2, P.x, P.y) < R
}
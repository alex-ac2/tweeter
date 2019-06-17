let myCanvas;

function setup() {
  myCanvas = createCanvas(350, 250);
  myCanvas.parent('doodle-canvas');
  background(255);
}

function draw() {
  if (mouseIsPressed) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}


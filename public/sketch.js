let myCanvas;

function setup() {
  myCanvas = createCanvas(350, 250);
  myCanvas.parent('doodle-canvas');
  background(255);
}

function draw() {
  if (mouseIsPressed) {
    ellipse(mouseX, mouseY, 2, 2);
    // prevent default
    return false;
  }
}


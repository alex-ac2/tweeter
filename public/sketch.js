function setup() {
  let myCanvas = createCanvas(350, 250);
  myCanvas.parent('doodle-canvas');
  background(255);
}

function draw() {
  if (mouseIsPressed) {
    ellipse(mouseX, mouseY, 5, 5);
    // prevent default
    return false;
  }
}


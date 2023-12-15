var points = [];
var speed = 0.3; // Adjust speed as needed

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  angleMode(DEGREES);
  noiseDetail(2);

  var density = 100;

  for (var x = 0; x <= width; x += width / density) {
    for (var y = 0; y <= height; y += width / density) {
      var p = createVector(x + random(-10, 10), y + random(-10, 10));
      points.push(p);
    }
  }

  background(10, 20, 30);
}

function draw() {
  noStroke();

  var mult = 0.02;

  for (var i = 0; i < points.length; i++) {
    var r = map(points[i].x + noise(frameCount * 0.01), 0, width, 50, 255);
    var g = map(points[i].y + noise(frameCount * 0.01), 0, height, 50, 255);
    var b = map(points[i].x + points[i].y + noise(frameCount * 0.01), 0, width + height, 50, 255);

    fill(r, g, b, 5);

    var angle = map(noise(points[i].x * mult, points[i].y * mult, frameCount * 0.01), 0, 1, 0, 720);

    // Adjust speed
    var velocity = createVector(cos(angle), sin(angle));
    velocity.mult(speed);
    points[i].add(velocity);

    points[i].x = (points[i].x + width) % width;
    points[i].y = (points[i].y + height) % height;

    ellipse(points[i].x, points[i].y, 2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  points = [];
  var density = 100;

  for (var x = 0; x <= width; x += width / density) {
    for (var y = 0; y <= height; y += width / density) {
      var p = createVector(x + random(-10, 10), y + random(-10, 10));
      points.push(p);
    }
  }

  background(10, 20, 30);
}

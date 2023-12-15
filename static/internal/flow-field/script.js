var points = [];
var numSets = 5; // Adjust the number of sets of lines
var density = 100; // Adjust the density for each set

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  angleMode(DEGREES);
  noiseDetail(1);

  generatePoints();

  background(0, 0, 0);
}

function draw() {
  if (frameCount < 400) {
    noStroke();

    var mult = 0.01;

    for (var set = 0; set < numSets; set++) {
      for (var i = 0; i < points[set].length; i++) {
        var r = map(points[set][i].x, 0, width, 50, 255);
        var g = map(points[set][i].y, 0, height, 255, 50);
        var b = map(points[set][i].x, 0, width, 255, 50);

        fill(r, g, b, 10);

        var angle = map(noise(points[set][i].x * mult, points[set][i].y * mult), 0, 1, 0, 720);

        points[set][i].add(createVector(cos(angle), sin(angle)));
        ellipse(points[set][i].x, points[set][i].y, 1);
      }
    }
  } else {
    noLoop();
  }
}

function mouseClicked() {
  // Refresh the screen and generate new points on mouse click
  background(0, 0, 0);
  generatePoints();
  loop(); // Resume looping for continuous animation
}

function generatePoints() {
  points = [];

  for (var set = 0; set < numSets; set++) {
    var setPoints = [];

    for (var x = 0; x <= width; x += width / density) {
      for (var y = 0; y <= height; y += width / density) {
        var p = createVector(x + random(-10, 10), y + random(-10, 10));
        setPoints.push(p);
      }
    }

    points.push(setPoints);
  }
}

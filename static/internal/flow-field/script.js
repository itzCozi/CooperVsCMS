var points = [];
var maxPoints = 110; // Adjust the maximum number of points
var speed = 1; // Adjust speed as needed
var damping = 0.95; // Adjust damping for smoother flow
var phaseSpeed = 0.05; // Adjust phase speed as needed
var fade = 1.98; // Adjust fade rate as needed
var repulsionRadius = 30; // Adjust the repulsion radius
var attractionRadius = 120; // Adjust the attraction radius
var attractionStrength = 0.04; // Adjust the attraction strength

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  angleMode(DEGREES);
  noiseDetail(2);

  var density = 130;

  for (var i = 0; i < maxPoints; i++) {
    var p = createVector(random(width), random(height));
    points.push(p);
  }

  background(0, 0, 0);
}

function draw() {
  noStroke();

  var mult = 0.02;

  var qt = new QuadTree(0, new Rectangle(0, 0, width, height));

  for (var i = 0; i < points.length; i++) {
    qt.insert(points[i]);
  }

  for (var i = 0; i < points.length; i++) {
    // Continuous mapping of colors across the canvas
    var r = map(points[i].x, 0, width, 0, 200); // Reduced maximum brightness to 200
    var g = map(points[i].y, 0, height, 0, 200); // Reduced maximum brightness to 200
    var b = map(sqrt(pow(points[i].x - width / 2, 2) + pow(points[i].y - height / 2, 2)), 0, sqrt(pow(width / 2, 2) + pow(height / 2, 2)), 200, 0); // Reduced maximum brightness to 200

    // Adjust alpha (transparency) over time with fade
    var alpha = map(sin(frameCount * phaseSpeed), -1, 1, 50, 255) * fade;

    fill(r, g, b, alpha);

    var angle = map(noise(points[i].x * mult, points[i].y * mult, frameCount * 0.01), 0, 1, 0, 720);

    // Adjust speed
    var velocity = createVector(cos(angle), sin(angle));
    velocity.mult(speed);

    // Damping for smoother flow
    velocity.mult(damping);

    // Attraction force to make lines find each other occasionally
    var closePoints = qt.query(new Rectangle(points[i].x - attractionRadius, points[i].y - attractionRadius, 2 * attractionRadius, 2 * attractionRadius));
    for (var j = 0; j < closePoints.length; j++) {
      var distance = dist(points[i].x, points[i].y, closePoints[j].x, closePoints[j].y);
      if (distance > 0 && distance < attractionRadius) {
        var attractionForce = createVector(closePoints[j].x - points[i].x, closePoints[j].y - points[i].y);
        attractionForce.setMag(attractionStrength);
        velocity.add(attractionForce);
      }
    }

    // Repulsion force to avoid blob formation
    closePoints = qt.query(new Rectangle(points[i].x - repulsionRadius, points[i].y - repulsionRadius, 2 * repulsionRadius, 2 * repulsionRadius));
    for (var j = 0; j < closePoints.length; j++) {
      var distance = dist(points[i].x, points[i].y, closePoints[j].x, closePoints[j].y);
      if (distance > 0 && distance < repulsionRadius) {
        var repulsionForce = createVector(points[i].x - closePoints[j].x, points[i].y - closePoints[j].y);
        repulsionForce.setMag(1 / distance);
        velocity.add(repulsionForce);
      }
    }

    points[i].add(velocity);

    // Ensure points stay within canvas bounds
    points[i].x = (points[i].x + width) % width;
    points[i].y = (points[i].y + height) % height;

    ellipse(points[i].x, points[i].y, 2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Reset points on window resize
  points = [];
  var density = 100;

  for (var i = 0; i < maxPoints; i++) {
    var p = createVector(random(width), random(height));
    points.push(p);
  }

  background(0, 0, 0);
}

class QuadTree {
  constructor(level, bounds) {
    this.level = level;
    this.bounds = bounds;
    this.points = [];
    this.nodes = [];
  }

  insert(point) {
    if (this.nodes.length > 0) {
      var index = this.getIndex(point);
      if (index !== -1) {
        this.nodes[index].insert(point);
        return;
      }
    }

    this.points.push(point);

    if (this.points.length > maxPoints && this.level < 8) {
      if (this.nodes.length === 0) {
        this.subdivide();
      }

      var i = 0;
      while (i < this.points.length) {
        var index = this.getIndex(this.points[i]);
        if (index !== -1) {
          this.nodes[index].insert(this.points.splice(i, 1)[0]);
        } else {
          i++;
        }
      }
    }
  }

  getIndex(point) {
    var index = -1;
    var verticalMidpoint = this.bounds.x + this.bounds.width / 2;
    var horizontalMidpoint = this.bounds.y + this.bounds.height / 2;

    var topQuadrant = point.y < horizontalMidpoint && point.y >= this.bounds.y;
    var bottomQuadrant = point.y >= horizontalMidpoint && point.y <= this.bounds.y + this.bounds.height;
    var leftQuadrant = point.x >= this.bounds.x && point.x < verticalMidpoint;
    var rightQuadrant = point.x >= verticalMidpoint && point.x <= this.bounds.x + this.bounds.width;

    if (leftQuadrant) {
      if (topQuadrant) {
        index = 1;
      } else if (bottomQuadrant) {
        index = 2;
      }
    } else if (rightQuadrant) {
      if (topQuadrant) {
        index = 0;
      } else if (bottomQuadrant) {
        index = 3;
      }
    }

    return index;
  }

  subdivide() {
    var nextLevel = this.level + 1;
    var subWidth = this.bounds.width / 2;
    var subHeight = this.bounds.height / 2;
    var x = this.bounds.x;
    var y = this.bounds.y;

    this.nodes[0] = new QuadTree(nextLevel, new Rectangle(x + subWidth, y, subWidth, subHeight));
    this.nodes[1] = new QuadTree(nextLevel, new Rectangle(x, y, subWidth, subHeight));
    this.nodes[2] = new QuadTree(nextLevel, new Rectangle(x, y + subHeight, subWidth, subHeight));
    this.nodes[3] = new QuadTree(nextLevel, new Rectangle(x + subWidth, y + subHeight, subWidth, subHeight));
  }

  query(range, found) {
    if (!found) {
      found = [];
    }

    if (!this.bounds.intersects(range)) {
      return found;
    }

    for (var i = 0; i < this.points.length; i++) {
      if (range.contains(this.points[i])) {
        found.push(this.points[i]);
      }
    }

    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].query(range, found);
    }

    return found;
  }
}

class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  contains(point) {
    return (
      point.x >= this.x &&
      point.x <= this.x + this.width &&
      point.y >= this.y &&
      point.y <= this.y + this.height
    );
  }

  intersects(range) {
    return !(
      range.x > this.x + this.width ||
      range.x + range.width < this.x ||
      range.y > this.y + this.height ||
      range.y + range.height < this.y
    );
  }
}

// Rectangle class for QuadTree boundaries
function Rectangle(x, y, w, h) {
  this.x = x; // center x
  this.y = y; // center y
  this.w = w; // half width
  this.h = h; // half height

  this.contains = function(point) {
    return (point.pos.x >= this.x - this.w &&
            point.pos.x <= this.x + this.w &&
            point.pos.y >= this.y - this.h &&
            point.pos.y <= this.y + this.h);
  }

  this.intersects = function(range) {
    return !(range.x - range.w > this.x + this.w ||
             range.x + range.w < this.x - this.w ||
             range.y - range.h > this.y + this.h ||
             range.y + range.h < this.y - this.h);
  }
}

// Circle class for range queries
function Circle(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.rSquared = r * r;

  this.contains = function(point) {
    let d = Math.pow(point.pos.x - this.x, 2) + Math.pow(point.pos.y - this.y, 2);
    return d <= this.rSquared;
  }

  this.intersects = function(range) {
    let xDist = Math.abs(range.x - this.x);
    let yDist = Math.abs(range.y - this.y);

    // Circle too far from rectangle
    let w = range.w;
    let h = range.h;

    let edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);

    // No intersection
    if (xDist > (this.r + w) || yDist > (this.r + h)) {
      return false;
    }

    // Intersection within rectangle
    if (xDist <= w || yDist <= h) {
      return true;
    }

    // Check corners
    return edges <= this.rSquared;
  }
}

// QuadTree class for spatial partitioning
function QuadTree(boundary, capacity) {
  this.boundary = boundary; // Rectangle
  this.capacity = capacity; // Max objects before subdividing
  this.attractors = [];
  this.divided = false;

  // Subdivide into 4 quadrants
  this.subdivide = function() {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w / 2;
    let h = this.boundary.h / 2;

    let ne = new Rectangle(x + w, y - h, w, h);
    let nw = new Rectangle(x - w, y - h, w, h);
    let se = new Rectangle(x + w, y + h, w, h);
    let sw = new Rectangle(x - w, y + h, w, h);

    this.northeast = new QuadTree(ne, this.capacity);
    this.northwest = new QuadTree(nw, this.capacity);
    this.southeast = new QuadTree(se, this.capacity);
    this.southwest = new QuadTree(sw, this.capacity);

    this.divided = true;
  }

  // Insert an attractor into the quadtree
  this.insert = function(attractor) {
    if (!this.boundary.contains(attractor)) {
      return false;
    }

    if (this.attractors.length < this.capacity) {
      this.attractors.push(attractor);
      return true;
    }

    if (!this.divided) {
      this.subdivide();
    }

    return (this.northeast.insert(attractor) ||
            this.northwest.insert(attractor) ||
            this.southeast.insert(attractor) ||
            this.southwest.insert(attractor));
  }

  // Query attractors within a range
  this.query = function(range, found) {
    if (!found) {
      found = [];
    }

    if (!this.boundary.intersects(range)) {
      return found;
    }

    for (let attractor of this.attractors) {
      if (range.contains(attractor)) {
        found.push(attractor);
      }
    }

    if (this.divided) {
      this.northwest.query(range, found);
      this.northeast.query(range, found);
      this.southwest.query(range, found);
      this.southeast.query(range, found);
    }

    return found;
  }

  // Visualize the quadtree (for debugging)
  this.show = function() {
    stroke(255, 50);
    noFill();
    strokeWeight(1);
    rectMode(CENTER);
    rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);

    if (this.divided) {
      this.northeast.show();
      this.northwest.show();
      this.southeast.show();
      this.southwest.show();
    }
  }
}

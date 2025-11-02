function Particle(x,y,r,g,b) {
  this.pos = createVector(x,y);
  this.vel = createVector(random(-1,1),random(-1,1)).setMag(5);
  this.acc = createVector(0,0);
  this.oldpos = createVector(x,y);
  this.maxSpeed = 10; // Maximum velocity
  this.minSpeed = 0.3; // Minimum velocity
  this.damping = 0.98; // Energy dampening factor
  this.r = r;
  this.g = g;
  this.b = b;

  this.update = function() {
    // Store old position for trail effect
    this.oldpos = createVector(this.pos.x, this.pos.y);

    // Update velocity and position
    this.vel.add(this.acc);

    // Apply dampening to control energy
    this.vel.mult(this.damping);

    // Constrain velocity to prevent extreme speeds
    let speed = this.vel.mag();
    if (speed > this.maxSpeed) {
      this.vel.setMag(this.maxSpeed);
    } else if (speed < this.minSpeed) {
      this.vel.setMag(this.minSpeed);
    }

    this.pos.add(this.vel);

    // Reset acceleration
    this.acc.mult(0);

    // Wrap around edges
    this.checkEdges();
  }

  this.checkEdges = function() {
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;
  }

  this.show = function() {
    stroke(this.r, this.g, this.b);
    strokeWeight(2);
    line(this.pos.x, this.pos.y, this.oldpos.x, this.oldpos.y);
  }

  this.forceSum = function(target) {
    var force = p5.Vector.sub(target.pos, this.pos);
    var distance = force.mag();

    // Don't apply force if attractor has 0 gravity or is too far
    if (target.grav === 0 || distance === 0) {
      return;
    }

    // Use distance squared for inverse square law
    var dsquared = distance * distance;

    // Constrain distance to prevent extreme forces
    dsquared = constrain(dsquared, 100, 50000);

    // Calculate force strength with dampening
    var strength = target.grav / dsquared;

    // Additional dampening based on distance
    strength *= map(distance, 0, 300, 1, 0.1);

    force.setMag(strength);
    this.acc.add(force);
  }

}

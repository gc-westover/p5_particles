function Particle(x,y,r,g,b) {
  this.pos = createVector(x,y);
  this.vel = createVector(random(-1,1),random(-1,1)).setMag(5);
  this.acc = createVector(0,0);
  this.oldpos = createVector(x,y);
 

  this.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.mult(0.995)
    if (this.vel.mag() < 0.5){
      this.vel.setMag(0.5);
    }
    this.acc.mult(0);
    this.oldpos = this.pos;
  }

  this.show = function() {
    stroke(255);
    strokeWeight(3);
    line(this.pos.x,this.pos.y,this.oldpos.x,this.oldpos.y);
  }

  this.forceSum = function(target) {
    var force = p5.Vector.sub(target.pos,this.pos);
    var dsquared = force.magSq();
    dsquared = constrain(dsquared,50,500);
    var strength = target.grav / dsquared;
    force.setMag(strength);
    this.acc.add(force);
  }

}

function Attractor(x,y,grav) {
  this.pos = createVector(x,y);
  this.grav = grav;

  this.show = function() {
    stroke(255,0,0);
    strokeWeight(4);
    point(this.pos.x,this.pos.y);
  }

  this.update = function() {
    if (keyIsPressed == false) {
      this.grav = grav;
    } else {
      this.grav = 0;
    }
  }

}

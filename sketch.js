var attractors = [];
var particles = [];
var mouse = [mouseX,mouseY]
var margin = 50;

function setup() {
 createCanvas(windowWidth,windowHeight);
 frameRate(500);

 for (let i = 0; i < 50; i++) {
   particles.push(new Particle(width/2,height/2,150,0,150));
  }
     for (var i = 0; i < 3; i++) {
       attractors.push(new Attractor(random(width),random(height),50));
      }

 // background(255);

 attractors.push(new Attractor(width/2,height/2,50));

}

function draw() {



  background(51);

  if (mouseIsPressed){
    // attractors.push(new Attractor(mouseX,mouseY,10))
    particles.push(new Particle(mouseX,mouseY,255,0,156));
  }

  mouse = (new Attractor(mouseX,mouseY,0));
  mouse.show();

  for (let particle of particles) {
    mouse.update();
    particle.forceSum(mouse);
    for (let attractor of attractors) {
      attractor.update();
      particle.forceSum(attractor);
      attractor.show();
    }

    particle.update();
    particle.show();
  }
}

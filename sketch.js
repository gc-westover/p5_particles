var attractors = [];
var particles = [];
var mouse = [mouseX,mouseY]
var margin = 50;
var qtree;
var maxParticles = 500; // Limit to prevent too many particles
var forceRadius = 300; // Max distance for force calculations
var showQuadtree = false; // Toggle with 'Q' key

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

  // Build quadtree for this frame
  let boundary = new Rectangle(width/2, height/2, width/2, height/2);
  qtree = new QuadTree(boundary, 4);

  // Insert all attractors into quadtree
  for (let attractor of attractors) {
    qtree.insert(attractor);
  }

  // Add mouse attractor to quadtree
  mouse = new Attractor(mouseX, mouseY, 0);
  qtree.insert(mouse);

  // Add particles on mouse press (with limit)
  if (mouseIsPressed && particles.length < maxParticles) {
    particles.push(new Particle(mouseX, mouseY, 255, 0, 156));
  }

  // Update and show attractors
  for (let attractor of attractors) {
    attractor.update();
    attractor.show();
  }
  mouse.show();

  // Process particles with quadtree optimization
  for (let particle of particles) {
    // Query nearby attractors within forceRadius
    let range = new Circle(particle.pos.x, particle.pos.y, forceRadius);
    let nearbyAttractors = qtree.query(range);

    // Apply forces only from nearby attractors
    for (let attractor of nearbyAttractors) {
      particle.forceSum(attractor);
    }

    particle.update();
    particle.show();
  }

  // Show quadtree visualization if enabled
  if (showQuadtree) {
    qtree.show();
  }

  // Display stats
  displayStats();
}

function displayStats() {
  fill(255);
  noStroke();
  textSize(14);
  text('Particles: ' + particles.length, 10, 20);
  text('Attractors: ' + attractors.length, 10, 40);
  text('FPS: ' + floor(frameRate()), 10, 60);
  text('Press Q to toggle quadtree', 10, 80);
  text('Press R to reset', 10, 100);
}

function keyPressed() {
  if (key === 'q' || key === 'Q') {
    showQuadtree = !showQuadtree;
  }
  if (key === 'r' || key === 'R') {
    particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle(width/2, height/2, 150, 0, 150));
    }
  }
}

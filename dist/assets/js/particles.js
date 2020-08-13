const particles = [];

let img;
const canvasDiv = document.getElementById("particles-holder");
let canvasWidth = canvasDiv.offsetWidth;
let canvasHeight = canvasDiv.offsetHeight;

function preload() {
  img = loadImage("assets/images/banner.jpg");
}

function setup() {
  var canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("particles-holder");
  const particlesLenght = Math.floor(canvasWidth / 10);

  for (let i = 0; i < particlesLenght; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(255);
  image(img, 0, 0, canvasWidth, canvasHeight);
  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();
    particle.checkParticles(particles.slice(index));
  });
}

function windowResized() {
  canvasWidth = canvasDiv.offsetWidth;
  canvasHeight = canvasDiv.offsetHeight;
  resizeCanvas(canvasWidth, canvasHeight);
  image(img, 0, 0, canvasWidth, canvasHeight);
}

class Particle {
  constructor() {
    //Position
    this.pos = createVector(random(width), random(height));
    //Velocity
    this.vel = createVector(random(-1, 1), random(-1, 1));
    //Size
    this.size = 6;
  }

  // Update movement by adding velovity
  update() {
    this.pos.add(this.vel);
    this.edges();
  }

  // Draw single particle
  draw() {
    noStroke();
    fill("rgba(255,255,255,0.5)");
    circle(this.pos.x, this.pos.y, this.size);
  }

  // Detect edges
  edges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }

    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  // Connect particles
  checkParticles(particles) {
    particles.forEach((particle) => {
      const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

      if (d < 120) {
        stroke("rgba(255,255,255,0.3)");
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }
}

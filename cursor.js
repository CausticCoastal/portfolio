// ----- CUSTOM CURSOR WITH SOFT TRAILS -----

const cursor = document.getElementById('cursor');
const trailContainer = document.getElementById('cursor-trail');

// Number of trail dots
const TRAIL_LENGTH = 15;
const trailDots = [];

// Configurable color
let cursorColor = 'rgba(220, 255, 0, 0.7)';

// Create trail dots
for (let i = 0; i < TRAIL_LENGTH; i++) {
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.style.background = cursorColor;
  dot.style.boxShadow = `0 0 ${8 + i*2}px ${cursorColor}, 0 0 ${12 + i*2}px ${cursorColor}`;
  trailContainer.appendChild(dot);
  trailDots.push(dot);
}

// Cursor positions
let mouseX = 0, mouseY = 0;
let positions = Array(TRAIL_LENGTH).fill({x: 0, y: 0});

// Track mouse
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animation loop
function animate() {
  // First dot eases toward the mouse
  const first = positions[0];
  first.x += (mouseX - first.x) * 0.25;
  first.y += (mouseY - first.y) * 0.25;

  // Each trail dot eases toward the previous one
  for (let i = 1; i < TRAIL_LENGTH; i++) {
    const prev = positions[i - 1];
    const current = positions[i];
    current.x += (prev.x - current.x) * 0.3;
    current.y += (prev.y - current.y) * 0.3;
  }

  // Apply positions to DOM
  for (let i = 0; i < TRAIL_LENGTH; i++) {
    const dot = trailDots[i];
    const {x, y} = positions[i];
    dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    dot.style.filter = `blur(${i * 1.5}px)`; // increasing blur along trail
    dot.style.opacity = `${1 - i / TRAIL_LENGTH}`; // fade tail
  }

  // Main cursor
  cursor.style.transform = `translate(${positions[0].x}px, ${positions[0].y}px) translate(-50%, -50%)`;

  requestAnimationFrame(animate);
}

// Initialize positions array
for (let i = 0; i < TRAIL_LENGTH; i++) positions[i] = {x: mouseX, y: mouseY};

// Start animation
animate();

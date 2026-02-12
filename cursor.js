// Only run on non-touch / fine pointer devices
if (window.matchMedia("(pointer: fine)").matches) {

  // Create cursor elements dynamically
  const cursor = document.createElement('div');
  cursor.id = 'cursor';
  document.body.appendChild(cursor);

  const trailContainer = document.createElement('div');
  trailContainer.id = 'cursor-trail';
  document.body.appendChild(trailContainer);

  // ----- CUSTOM CURSOR WITH SOFT TRAILS -----

  const TRAIL_LENGTH = 15;
  const trailDots = [];
  let cursorColor = 'rgba(220, 255, 0, 0.7)';

  for (let i = 0; i < TRAIL_LENGTH; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.style.background = cursorColor;
    dot.style.boxShadow = `0 0 ${8 + i*2}px ${cursorColor}, 0 0 ${12 + i*2}px ${cursorColor}`;
    trailContainer.appendChild(dot);
    trailDots.push(dot);
  }

  let mouseX = 0, mouseY = 0;
  let positions = Array(TRAIL_LENGTH).fill({x: 0, y: 0});

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    const first = positions[0];
    first.x += (mouseX - first.x) * 0.25;
    first.y += (mouseY - first.y) * 0.25;

    for (let i = 1; i < TRAIL_LENGTH; i++) {
      const prev = positions[i - 1];
      const current = positions[i];
      current.x += (prev.x - current.x) * 0.3;
      current.y += (prev.y - current.y) * 0.3;
    }

    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const dot = trailDots[i];
      const {x, y} = positions[i];
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      dot.style.filter = `blur(${i * 1.5}px)`;
      dot.style.opacity = `${1 - i / TRAIL_LENGTH}`;
    }

    cursor.style.transform = `translate(${positions[0].x}px, ${positions[0].y}px) translate(-50%, -50%)`;

    requestAnimationFrame(animate);
  }

  for (let i = 0; i < TRAIL_LENGTH; i++) positions[i] = {x: mouseX, y: mouseY};

  animate();
}

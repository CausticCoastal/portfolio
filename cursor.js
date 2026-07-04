if (window.matchMedia("(pointer: fine)").matches) {

  let mouseX, mouseY;
  let positions = [];
  let trailDots = [];
  let cursor, trailContainer;

  let preview, previewImg;
  let previewMouseX = 0;
  let previewMouseY = 0;
  let previewX = 0;
  let previewY = 0;

  const TRAIL_LENGTH = 15;
  const cursorColor = 'rgba(220, 255, 0, 0.7)';

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    previewMouseX = e.clientX;
    previewMouseY = e.clientY;

    // INIT ON FIRST MOVE
    if (!cursor) {

      // cursor
      cursor = document.createElement('div');
      cursor.id = 'cursor';
      document.body.appendChild(cursor);

      // trail
      trailContainer = document.createElement('div');
      trailContainer.id = 'cursor-trail';
      document.body.appendChild(trailContainer);

      positions = [];
      trailDots = [];

      for (let i = 0; i < TRAIL_LENGTH; i++) {
        positions.push({ x: mouseX, y: mouseY });

        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        dot.style.background = cursorColor;
        dot.style.boxShadow =
          `0 0 ${8 + i * 2}px ${cursorColor}, 0 0 ${12 + i * 2}px ${cursorColor}`;

        trailContainer.appendChild(dot);
        trailDots.push(dot);
      }
      preview = document.querySelector('.work-preview');
      previewImg = preview ? preview.querySelector('img') : null;

      // start loop
      requestAnimationFrame(animate);
    }
  });

  function animate() {
    if (mouseX === undefined || mouseY === undefined) {
      requestAnimationFrame(animate);
      return;
    }

    // cursor physics
    positions[0].x += (mouseX - positions[0].x) * 0.25;
    positions[0].y += (mouseY - positions[0].y) * 0.25;

    for (let i = 1; i < TRAIL_LENGTH; i++) {
      positions[i].x += (positions[i - 1].x - positions[i].x) * 0.3;
      positions[i].y += (positions[i - 1].y - positions[i].y) * 0.3;
    }

    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const dot = trailDots[i];
      const { x, y } = positions[i];

      dot.style.transform =
        `translate(${x}px, ${y}px) translate(-50%, -50%)`;

      dot.style.filter = `blur(${i * 1.5}px)`;
      dot.style.opacity = `${1 - i / TRAIL_LENGTH}`;
    }

    cursor.style.transform =
      `translate(${positions[0].x}px, ${positions[0].y}px) translate(-50%, -50%)`;

    // preview follow (smooth lag)
    previewX += (previewMouseX - previewX) * 0.12;
    previewY += (previewMouseY - previewY) * 0.12;

    if (preview) {
      preview.style.transform =
        `translate(${previewX + 16}px, ${previewY + 16}px)`;
    }

    requestAnimationFrame(animate);
  }

  // hover bindings
  document.querySelectorAll('.work-item').forEach(item => {

    item.addEventListener('mouseenter', () => {
      if (!preview || !previewImg) return;

      // No image data? Don't show a broken/empty card at all.
      if (!item.dataset.img) {
        preview.style.opacity = 0;
        return;
      }

      previewImg.src = item.dataset.img;
      preview.style.opacity = 1;

      const title = preview.querySelector('.preview-title');
      const context = preview.querySelector('.preview-context');
      const withEl = preview.querySelector('.preview-with');
      const venue = preview.querySelector('.preview-venue');
      const location = preview.querySelector('.preview-location');
      const year = preview.querySelector('.preview-year');
      const description = preview.querySelector('.preview-description');

      if (title) title.textContent = item.dataset.title || '';
      if (context) context.textContent = item.dataset.context || '';
      if (withEl) withEl.textContent = item.dataset.with || '';
      if (venue) venue.textContent = item.dataset.venue || '';
      if (location) location.textContent = item.dataset.location || '';
      if (year) year.textContent = item.dataset.year || '';
      if (description) description.textContent = item.dataset.description || '';

      // If none of the metadata fields actually have content,
      // collapse the whole info block (image-only card).
      const hasMeta = [
        item.dataset.title,
        item.dataset.context,
        item.dataset.with,
        item.dataset.venue,
        item.dataset.location,
        item.dataset.year,
        item.dataset.description
      ].some(val => !!val);

      const infoEl = preview.querySelector('.preview-info');
      if (infoEl) infoEl.classList.toggle('has-meta', hasMeta);
    });

    item.addEventListener('mouseleave', () => {
      if (preview) preview.style.opacity = 0;
    });

  });

  function hidePreview() {
    if (preview) preview.style.opacity = 0;
  }

  document.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget && !e.toElement) hidePreview();
  });

  window.addEventListener('blur', hidePreview);
}
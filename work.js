if (window.matchMedia('(max-width: 800px)').matches) {
  const preview = document.querySelector('.mobile-preview');
  const items = document.querySelectorAll('.work-item');
  let activeItem = null;

  items.forEach(item => {
    item.addEventListener('click', () => {
      if (activeItem === item) {
        preview.classList.remove('is-active');
        activeItem = null;
        return;
      }

      activeItem = item;
      const cols = item.querySelectorAll(':scope > div');

      preview.querySelector('img').src = item.dataset.img || '';
      preview.querySelector('.mobile-preview-title').textContent = cols[2]?.textContent.trim() || '';
      preview.querySelector('.mobile-preview-context').textContent = cols[1]?.textContent.trim() || '';
      preview.querySelector('.mobile-preview-year').textContent = cols[0]?.textContent.trim() || '';
      preview.querySelector('.mobile-preview-format').textContent = cols[3]?.textContent.trim() || '';
      preview.querySelector('.mobile-preview-with').textContent = item.dataset.with || '';
      preview.querySelector('.mobile-preview-location').textContent = item.dataset.location || '';
      preview.querySelector('.mobile-preview-description').textContent = item.dataset.description || '';

      preview.classList.add('is-active');
    });
  });

  preview?.querySelector('.mobile-preview-close').addEventListener('click', () => {
    preview.classList.remove('is-active');
    activeItem = null;
  });
}
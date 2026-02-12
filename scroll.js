document.addEventListener('DOMContentLoaded', () => {
  const lowerTitle = document.querySelector('.lower-title');
  const scrollTitle = document.querySelector('.scroll-title');
  const hero = document.querySelector('.hero');
  const sections = document.querySelectorAll('.two-column');
  const logo = document.querySelector('.scroll-logo');

  if (!hero) return;

  let lastRotation = 0; // for cinematic inertia

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const screenHeight = window.innerHeight;

    /* ----------------------
       Logo rotation (cinematic inertia)
    ---------------------- */
    if (logo) {
      const maxRotation = 12;          // degrees, subtle
      const targetRotation = Math.min(scrollY * 0.03, maxRotation);
      lastRotation += (targetRotation - lastRotation) * 0.08;
      logo.style.transform = `rotate(${lastRotation}deg)`;
    }

    /* ----------------------
       Lower title fade
    ---------------------- */
    if (lowerTitle) {
      const heroHeight = hero.offsetHeight || screenHeight;
      const fadeDistance =
        window.innerWidth <= 600
          ? heroHeight * 0.6
          : heroHeight * 0.3;

      let opacity = 1 - scrollY / fadeDistance;
      opacity = Math.max(0, Math.min(1, opacity));
      lowerTitle.style.opacity = opacity;
    }

    /* ----------------------
       Video Click
    ---------------------- */
document.querySelectorAll('.video-wrapper').forEach(wrapper => {
  wrapper.addEventListener('click', function() {
    const videoId = this.dataset.videoId;

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0`;
    iframe.allow = "autoplay; fullscreen";
    iframe.allowFullscreen = true;

    this.innerHTML = '';
    this.appendChild(iframe);
  });
});


    /* ----------------------
       Scroll-title brackets
    ---------------------- */
    if (scrollTitle) {
      const triggerPoint = scrollTitle.getBoundingClientRect().top;
      scrollTitle.classList.toggle(
        'active',
        triggerPoint < screenHeight * 0.85
      );
    }

    /* ----------------------
       Two-column sections
    ---------------------- */
    sections.forEach(section => {
      const triggerPoint = section.getBoundingClientRect().top;
      section.classList.toggle(
        'scroll-active',
        triggerPoint < screenHeight * 0.8
      );
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});
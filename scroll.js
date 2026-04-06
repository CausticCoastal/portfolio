document.addEventListener('DOMContentLoaded', () => {
  const lowerTitle = document.querySelector('.lower-title');
  const scrollTitle = document.querySelector('.scroll-title');
  const hero = document.querySelector('.hero');
  const sections = document.querySelectorAll('.two-column');
  const logo = document.querySelector('.scroll-logo');

  if (!hero) return;
  
 /* ----------------------
     Logo rotation — rAF loop for silky smoothness
  ---------------------- */
  let currentRotation = 0;
  let scrollRotationTarget = 0;  // driven by scroll
  let hoverOffset = 0;           // driven by hover
  let currentHoverOffset = 0;   // interpolated separately
 
  if (logo) {
    // Scroll updates only the scroll target
    window.addEventListener('scroll', () => {
      const maxRotation = 14;
      scrollRotationTarget = Math.min(window.scrollY * 0.03, maxRotation);
    }, { passive: true });
 
    // Hover adds/removes offset on top of scroll rotation — desktop only
    if (window.matchMedia('(pointer: fine)').matches) {
      logo.addEventListener('mouseenter', () => { hoverOffset = 30; });
      logo.addEventListener('mouseleave', () => { hoverOffset = 0; });
    }
 
    // rAF interpolates both independently and combines them
    const animateLogo = () => {
      currentRotation  += (scrollRotationTarget - currentRotation)  * 0.06;
      currentHoverOffset += (hoverOffset - currentHoverOffset) * 0.07;
      logo.style.transform = `rotate(${currentRotation + currentHoverOffset}deg)`;
      requestAnimationFrame(animateLogo);
    };
    requestAnimationFrame(animateLogo);
  }
 
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const screenHeight = window.innerHeight;
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
       Video Side Info Panels
    ---------------------- */
    document.querySelectorAll('.video-side-cell').forEach(cell => {
      const info = cell.querySelector('.video-side-info');
      if (!info) return;

      const isRight = info.classList.contains('video-side-info--right');
      const triggerPoint = cell.getBoundingClientRect().top;
      const inView = triggerPoint < screenHeight * 0.85;

      if (inView && !info.classList.contains('side-info-active')) {
        const delay = isRight ? 180 : 0; // right side delayed slightly
        setTimeout(() => {
          info.classList.add('side-info-active');
        }, delay);
      }
    });

    sections.forEach(section => {
      const triggerPoint = section.getBoundingClientRect().top;
      section.classList.toggle(
        'scroll-active',
        triggerPoint < screenHeight * 0.92
      );
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: ".video-intro-container",
  start: "top top",
  end: "bottom top",
  pin: ".video-intro",
  pinSpacing: false,
});

gsap.to(".lower-title", {
  xPercent: -15,
  letterSpacing: "0.05em",
  ease: "none",
  scrollTrigger: {
    trigger: ".video-intro-container",
    start: "top top",
    end: "bottom top",
    scrub: 1,
  }
});

window.addEventListener('load', () => {
  const split = new SplitText(".three-column .left h1", { type: "chars" });
  gsap.from(split.chars, {
    opacity: 0,
    duration: 0.05,
    stagger: {
      each: 0.04,
      from: "random",
    },
    ease: "none",
    scrollTrigger: {
      trigger: ".three-column",
      start: "top 95%",
      end: "top 50%",
      scrub: 1,
    }
  });

  const splitCraft = new SplitText(".two-column .left h1", { type: "chars" });
gsap.from(splitCraft.chars, {
  opacity: 0,
  duration: 0.05,
  stagger: {
    each: 0.04,
    from: "random",
  },
  ease: "none",
  scrollTrigger: {
    trigger: ".two-column",
    start: "top 90%",
    end: "top 50%",
    scrub: 1,
  }
});

const orb = document.querySelector(".contact-orb");
  const craftSection = document.querySelector(".two-column");
  const footer = document.querySelector(".site-footer");

  window.addEventListener('scroll', () => {
    const craftTop = craftSection.getBoundingClientRect().top;
    const footerTop = footer.getBoundingClientRect().top;
    const vh = window.innerHeight;

    if (craftTop < vh * 0.6 && footerTop > vh * 0.9) {
      orb.classList.add('is-visible');
    } else {
      orb.classList.remove('is-visible');
    }
  }, { passive: true });  
  
});
// Story page: scroll reveals + founder passage pin/scrub + headline animations

gsap.registerPlugin(ScrollTrigger);

// Headline animations: scale + clip-path reveal, scrubbed to scroll
document.querySelectorAll('h2, h3').forEach((headline) => {
  gsap.fromTo(headline,
    {
      opacity: 0,
      scale: 0.92,
      y: 40,
      clipPath: 'inset(100% 0 0 0)',
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      clipPath: 'inset(0% 0 0 0)',
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headline,
        start: 'top 85%',
        end: 'top 50%',
        scrub: 0.5,
      },
    }
  );
});

// Three-layer parallax on hero
const heroSection = document.querySelector('#hero');
if (heroSection) {
  // Background texture layer
  const heroBg = document.createElement('div');
  heroBg.className = 'hero-bg-layer';
  heroSection.insertBefore(heroBg, heroSection.firstChild);

  // Midground image layer
  const heroMid = document.createElement('div');
  heroMid.className = 'hero-mid-layer';
  heroSection.insertBefore(heroMid, heroSection.firstChild);

  gsap.to(heroBg, {
    yPercent: -8,
    ease: 'none',
    scrollTrigger: {
      trigger: heroSection,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });

  gsap.to(heroMid, {
    yPercent: -15,
    scale: 1.05,
    ease: 'none',
    scrollTrigger: {
      trigger: heroSection,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });

  gsap.to(heroSection.querySelector('.container'), {
    yPercent: -25,
    ease: 'none',
    scrollTrigger: {
      trigger: heroSection,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });
}

// Standard section three-layer parallax
const standardSection = document.querySelector('#standard');
if (standardSection) {
  const stdBg = document.createElement('div');
  stdBg.className = 'standard-bg-layer';
  standardSection.insertBefore(stdBg, standardSection.firstChild);

  const stdMid = document.createElement('div');
  stdMid.className = 'standard-mid-layer';
  standardSection.insertBefore(stdMid, standardSection.firstChild);

  gsap.to(stdBg, { yPercent: -5, ease: 'none', scrollTrigger: { trigger: standardSection, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.to(stdMid, { yPercent: -12, scale: 1.03, ease: 'none', scrollTrigger: { trigger: standardSection, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.to(standardSection.querySelector('.container'), { yPercent: -20, ease: 'none', scrollTrigger: { trigger: standardSection, start: 'top bottom', end: 'bottom top', scrub: 1 } });
}

// Founder passage: pin + scrub line-by-line + THREE-LAYER parallax
const founderSection = document.querySelector('#founder');
const founderAtmosphere = document.querySelector('.founder-atmosphere');
const founderLines = document.querySelectorAll('.founder-line');

if (founderSection && founderAtmosphere) {
  // Three layers for founder: background texture, midground atmosphere, foreground content
  const founderBg = document.createElement('div');
  founderBg.className = 'founder-bg-texture';
  founderSection.insertBefore(founderBg, founderSection.firstChild);

  gsap.to(founderBg, {
    yPercent: -6,
    ease: 'none',
    scrollTrigger: {
      trigger: founderSection,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });

  gsap.to(founderAtmosphere, {
    yPercent: -15,
    scale: 1.1,
    ease: 'none',
    scrollTrigger: {
      trigger: founderSection,
      start: 'top top',
      end: '+=200%',
      scrub: 1,
    },
  });

  gsap.to('.founder-content', {
    yPercent: -10,
    ease: 'none',
    scrollTrigger: {
      trigger: founderSection,
      start: 'top top',
      end: '+=200%',
      scrub: 1,
    },
  });

  // Pin the section and scrub each line
  const founderTl = gsap.timeline({
    scrollTrigger: {
      trigger: founderSection,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 0.8,
    },
  });

  founderTl.fromTo('.founder-title',
    { opacity: 0, y: 20, scale: 0.95 },
    { opacity: 0.4, y: 0, scale: 1, duration: 0.15, ease: 'power2.out' },
    0
  );

  founderLines.forEach((line, i) => {
    founderTl.fromTo(line,
      { opacity: 0.15, y: 20 },
      { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' },
      0.12 + i * 0.18
    );
  });

  founderLines.forEach((line) => {
    founderTl.to(line,
      { opacity: 0.2, duration: 0.1, ease: 'power2.in' },
      0.95
    );
  });
}

// Other Hands three-layer parallax
const otherHandsSection = document.querySelector('#other-hands');
if (otherHandsSection) {
  const ohBg = document.createElement('div');
  ohBg.className = 'other-hands-bg-layer';
  otherHandsSection.insertBefore(ohBg, otherHandsSection.firstChild);

  const ohMid = document.createElement('div');
  ohMid.className = 'other-hands-mid-layer';
  otherHandsSection.insertBefore(ohMid, otherHandsSection.firstChild);

  gsap.to(ohBg, { yPercent: -5, ease: 'none', scrollTrigger: { trigger: otherHandsSection, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.to(ohMid, { yPercent: -12, scale: 1.03, ease: 'none', scrollTrigger: { trigger: otherHandsSection, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.to(otherHandsSection.querySelector('.container'), { yPercent: -20, ease: 'none', scrollTrigger: { trigger: otherHandsSection, start: 'top bottom', end: 'bottom top', scrub: 1 } });
}

// Design section three-layer parallax
const designSection = document.querySelector('#design');
if (designSection) {
  const dBg = document.createElement('div');
  dBg.className = 'design-bg-layer';
  designSection.insertBefore(dBg, designSection.firstChild);

  const dMid = document.createElement('div');
  dMid.className = 'design-mid-layer';
  designSection.insertBefore(dMid, designSection.firstChild);

  gsap.to(dBg, { yPercent: -5, ease: 'none', scrollTrigger: { trigger: designSection, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.to(dMid, { yPercent: -12, scale: 1.03, ease: 'none', scrollTrigger: { trigger: designSection, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.to(designSection.querySelector('.container'), { yPercent: -20, ease: 'none', scrollTrigger: { trigger: designSection, start: 'top bottom', end: 'bottom top', scrub: 1 } });
}

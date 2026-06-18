// Trade page: count-up stats + headline animations + three-layer parallax

gsap.registerPlugin(ScrollTrigger);

// Headline animations: scale + clip-path, scrubbed
const tradeHero = document.querySelector('.trade-hero');
if (tradeHero) {
  // Three-layer parallax for hero
  const tradeBg = document.createElement('div');
  tradeBg.className = 'trade-bg-texture';
  tradeHero.insertBefore(tradeBg, tradeHero.firstChild);

  const tradeMid = document.createElement('div');
  tradeMid.className = 'trade-mid-layer';
  tradeHero.insertBefore(tradeMid, tradeHero.firstChild);

  gsap.to(tradeBg, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: tradeHero, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.to(tradeMid, { yPercent: -12, scale: 1.03, ease: 'none', scrollTrigger: { trigger: tradeHero, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.to(tradeHero.querySelector('.container'), { yPercent: -20, ease: 'none', scrollTrigger: { trigger: tradeHero, start: 'top bottom', end: 'bottom top', scrub: 1 } });

  // Headline clip-path reveal
  gsap.fromTo(tradeHero.querySelector('h1'),
    { opacity: 0, scale: 0.9, y: 50, clipPath: 'inset(100% 0 0 0)' },
    { opacity: 1, scale: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: tradeHero, start: 'top 80%', end: 'top 40%', scrub: 0.5 } }
  );

  gsap.fromTo(tradeHero.querySelector('.accent'),
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: tradeHero, start: 'top 70%', end: 'top 45%', scrub: 0.5 } }
  );
}

// Credentials headline
const credSection = document.querySelector('.credentials');
if (credSection) {
  gsap.fromTo(credSection.querySelector('h2') || credSection.querySelector('.credential-block'),
    { opacity: 0, scale: 0.95, y: 30, clipPath: 'inset(100% 0 0 0)' },
    { opacity: 1, scale: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: credSection, start: 'top 80%', end: 'top 50%', scrub: 0.5 } }
  );
}

// Context section headline + three-layer parallax
const contextSection = document.querySelector('.context');
if (contextSection) {
  const ctxBg = document.createElement('div');
  ctxBg.className = 'context-bg-texture';
  contextSection.insertBefore(ctxBg, contextSection.firstChild);

  const ctxMid = document.createElement('div');
  ctxMid.className = 'context-mid-layer';
  contextSection.insertBefore(ctxMid, contextSection.firstChild);

  gsap.to(ctxBg, { yPercent: -5, ease: 'none', scrollTrigger: { trigger: contextSection, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.to(ctxMid, { yPercent: -10, scale: 1.02, ease: 'none', scrollTrigger: { trigger: contextSection, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.to(contextSection.querySelector('.container'), { yPercent: -15, ease: 'none', scrollTrigger: { trigger: contextSection, start: 'top bottom', end: 'bottom top', scrub: 1 } });

  gsap.fromTo(contextSection.querySelector('h2'),
    { opacity: 0, scale: 0.92, y: 40, clipPath: 'inset(100% 0 0 0)' },
    { opacity: 1, scale: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: contextSection, start: 'top 80%', end: 'top 50%', scrub: 0.5 } }
  );
}

// Count-up stats
const stats = document.querySelectorAll('.stat-number');
stats.forEach((stat) => {
  const targetText = stat.textContent;
  const isYear = targetText.includes('2024');
  const targetNum = parseInt(targetText.replace(/[^0-9]/g, ''), 10);
  const suffix = targetText.replace(/[0-9]/g, '');

  const obj = { val: 0 };

  gsap.to(obj, {
    val: targetNum,
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: stat,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    onUpdate: () => {
      if (isYear) {
        stat.textContent = Math.round(obj.val);
      } else {
        stat.textContent = Math.round(obj.val).toLocaleString() + suffix;
      }
    },
  });
});

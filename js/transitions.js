// Sitewide page transitions
// View Transitions API with GSAP overlay wipe fallback

const transitionOverlay = document.createElement('div');
transitionOverlay.className = 'page-transition-overlay';
document.body.appendChild(transitionOverlay);

let isTransitioning = false;

function shouldHandleLink(href) {
  if (!href) return false;
  const url = new URL(href, location.href);
  return url.origin === location.origin && !href.startsWith('#') && !href.startsWith('mailto:');
}

function gsapWipeTransition(targetUrl) {
  if (isTransitioning) return;
  isTransitioning = true;

  const tl = gsap.timeline({
    onComplete: () => {
      window.location.href = targetUrl;
    },
  });

  // Panel sweeps across
  tl.set(transitionOverlay, {
    display: 'block',
    xPercent: -100,
    opacity: 1,
  });

  tl.to(transitionOverlay, {
    xPercent: 0,
    duration: 0.5,
    ease: 'power3.inOut',
  });

  // Outgoing page fades under
  tl.to('main, .section, .split-container', {
    opacity: 0,
    scale: 0.98,
    duration: 0.3,
    ease: 'power2.in',
  }, '-=0.3');
}

function navigateWithTransition(targetUrl) {
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      window.location.href = targetUrl;
    });
  } else {
    gsapWipeTransition(targetUrl);
  }
}

// Intercept all internal link clicks
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link) return;

  const href = link.getAttribute('href');
  if (!shouldHandleLink(href)) return;

  e.preventDefault();
  navigateWithTransition(href);
});

// Incoming page: resolve animation
window.addEventListener('pageshow', (e) => {
  if (e.persisted) {
    // Page was restored from bfcache
    gsap.set(transitionOverlay, { display: 'none', xPercent: -100 });
    gsap.fromTo('main, .section, .split-container',
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out', stagger: 0.05 }
    );
  }
});

// On DOMContentLoaded for fresh loads
document.addEventListener('DOMContentLoaded', () => {
  if (!document.startViewTransition) {
    gsap.set(transitionOverlay, { display: 'none', xPercent: -100 });
    gsap.fromTo('main, .section, .split-container',
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out', stagger: 0.05 }
    );
  }
});

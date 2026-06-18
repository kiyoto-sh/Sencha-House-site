// Homepage: GSAP hover expand + parallax
const container = document.querySelector('.split-container');
const panels = document.querySelectorAll('.panel');

panels.forEach((panel) => {
  panel.addEventListener('mouseenter', () => {
    panels.forEach((p) => {
      if (p === panel) {
        gsap.to(p, {
          flex: 1.35,
          duration: 0.8,
          ease: 'power3.out',
        });
        gsap.to(p.querySelector('.panel-bg'), {
          scale: 1.08,
          x: p.classList.contains('panel-left') ? '2%' : '-2%',
          duration: 1.2,
          ease: 'power2.out',
        });
      } else {
        gsap.to(p, {
          flex: 0.65,
          duration: 0.8,
          ease: 'power3.out',
        });
        gsap.to(p.querySelector('.panel-bg'), {
          scale: 1.04,
          x: p.classList.contains('panel-left') ? '-1%' : '1%',
          duration: 1.2,
          ease: 'power2.out',
        });
      }
    });
  });
});

container.addEventListener('mouseleave', () => {
  panels.forEach((p) => {
    gsap.to(p, {
      flex: 1,
      duration: 0.8,
      ease: 'power3.out',
    });
    gsap.to(p.querySelector('.panel-bg'), {
      scale: 1,
      x: '0%',
      duration: 1.2,
      ease: 'power2.out',
    });
  });
});

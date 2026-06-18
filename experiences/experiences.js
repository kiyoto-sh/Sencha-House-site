// Experiences index: shared-element expansion on click
const expCards = document.querySelectorAll('.exp-card');

expCards.forEach((card) => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    const href = card.getAttribute('href');
    const image = card.querySelector('.exp-image img');
    const rect = image.getBoundingClientRect();

    // Create a clone for the expansion animation
    const clone = image.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.left = rect.left + 'px';
    clone.style.top = rect.top + 'px';
    clone.style.width = rect.width + 'px';
    clone.style.height = rect.height + 'px';
    clone.style.objectFit = 'cover';
    clone.style.zIndex = '9999';
    clone.style.transition = 'none';
    document.body.appendChild(clone);

    // Fade out the page
    gsap.to(document.body, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    });

    // Expand the clone to full viewport
    gsap.to(clone, {
      left: 0,
      top: 0,
      width: '100vw',
      height: '100vh',
      duration: 0.7,
      ease: 'power3.inOut',
      onComplete: () => {
        sessionStorage.setItem('expTransition', 'true');
        window.location.href = href;
      },
    });
  });
});

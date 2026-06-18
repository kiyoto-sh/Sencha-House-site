document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.split-container');
  const panels = document.querySelectorAll('.panel');

  panels.forEach(panel => {
    panel.addEventListener('mouseenter', () => {
      panels.forEach(p => {
        if (p === panel) {
          p.style.flex = '1.25';
        } else {
          p.style.flex = '0.75';
        }
      });
    });
  });

  container.addEventListener('mouseleave', () => {
    panels.forEach(p => {
      p.style.flex = '1';
    });
  });
});

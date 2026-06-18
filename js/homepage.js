/**
 * Homepage split-entry behavior: hover-expand, background parallax,
 * and the initial content reveal.
 *
 * Deliberately self-contained and scoped only to .panel elements, so
 * it can't be broken by unrelated changes elsewhere in motion.js or
 * main.js. If those files already contain logic targeting .panel or
 * .panel-content, remove it there, this file is now the single
 * source of truth for this page's behavior.
 */
(function () {
  const leftPanel = document.querySelector('.panel-left');
  const rightPanel = document.querySelector('.panel-right');
  if (!leftPanel || !rightPanel || typeof gsap === 'undefined') return;

  const leftBg = leftPanel.querySelector('.panel-bg');
  const rightBg = rightPanel.querySelector('.panel-bg');
  const leftContent = leftPanel.querySelector('.panel-content');
  const rightContent = rightPanel.querySelector('.panel-content');

  const EASE = 'power3.out';
  const DURATION = 0.6;

  // ---- Initial reveal ----
  // Explicitly set the starting state in JS rather than trusting the
  // CSS keyframe animation to run uncontested, then animate in with a
  // guaranteed completion. This removes the "stuck at opacity 0"
  // failure mode entirely, since this is now the only thing touching
  // opacity on these elements.
  gsap.set([leftContent, rightContent], { opacity: 0, y: 20 });
  gsap.to(leftContent, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 });
  gsap.to(rightContent, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.4 });

  // ---- Hover-expand mechanic ----
  function expand(target, other, targetBg, otherBg) {
    gsap.to(target, { flexGrow: 1.25, duration: DURATION, ease: EASE });
    gsap.to(other, { flexGrow: 0.75, duration: DURATION, ease: EASE });
    gsap.to(targetBg, { scale: 1.08, duration: DURATION, ease: EASE });
    gsap.to(otherBg, { scale: 1, duration: DURATION, ease: EASE });
  }

  function reset() {
    gsap.to([leftPanel, rightPanel], { flexGrow: 1, duration: DURATION, ease: EASE });
    gsap.to([leftBg, rightBg], { scale: 1, duration: DURATION, ease: EASE });
  }

  leftPanel.addEventListener('mouseenter', () => expand(leftPanel, rightPanel, leftBg, rightBg));
  rightPanel.addEventListener('mouseenter', () => expand(rightPanel, leftPanel, rightBg, leftBg));
  leftPanel.addEventListener('mouseleave', reset);
  rightPanel.addEventListener('mouseleave', reset);
})();

// Trade page: count-up stats on scroll

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

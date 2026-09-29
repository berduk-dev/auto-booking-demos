if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });

  document.querySelectorAll('.reveal').forEach(element => {
    if (element.getBoundingClientRect().top < innerHeight - 24) {
      element.classList.add('is-visible');
    } else {
      element.classList.add('reveal-ready');
      observer.observe(element);
    }
  });
}

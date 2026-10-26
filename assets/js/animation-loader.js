/* Load interactive effects after the page has painted, without delaying page load. */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const scripts = [
    'assets/vendor/three.min.js',
    'assets/vendor/GLTFLoader.js',
    'assets/vendor/gsap.min.js',
    'assets/vendor/ScrollTrigger.min.js',
    'assets/vendor/lenis.min.js',
    'assets/js/hero1-3d.js',
    'assets/js/hero-3d.js',
    'assets/js/ae-3d.js',
    'assets/js/particles-effect.js'
  ];

  let started = false;
  const loadScript = (src) => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src + '?v=20261026-motion';
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Could not load animation: ${src}`));
    document.head.appendChild(script);
  });

  async function startAnimations() {
    if (started) return;
    if (document.hidden) {
      document.addEventListener('visibilitychange', startAnimations, { once: true });
      return;
    }
    started = true;
    for (const src of scripts) {
      try { await loadScript(src); }
      catch (error) { console.warn(error.message); }
    }

    if (window.Lenis && window.gsap && window.ScrollTrigger && matchMedia('(pointer: fine)').matches) {
      const lenis = new Lenis({ duration: 0.85, smoothTouch: false });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(time => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(500, 33);
    }
  }

  function schedule() {
    if ('requestIdleCallback' in window) requestIdleCallback(startAnimations, { timeout: 1800 });
    else setTimeout(startAnimations, 900);
  }

  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
})();

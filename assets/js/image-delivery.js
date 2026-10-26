(() => {
 const load = image => {
  if (!image.dataset.src) return;
  image.loading = 'eager';
  if (image.dataset.srcset) {
   image.srcset = image.dataset.srcset;
   delete image.dataset.srcset;
  }
  image.src = image.dataset.src;
  delete image.dataset.src;
 };
 const images = document.querySelectorAll('img[data-src]');
 if (!('IntersectionObserver' in window)) { images.forEach(load); return; }
 const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { load(entry.target); observer.unobserve(entry.target); }
 }), {rootMargin:'120px 0px', threshold:0});
 images.forEach(image => observer.observe(image));
})();

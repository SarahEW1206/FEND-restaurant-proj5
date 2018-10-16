// Make sure sw are supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('https://sarahew1206.github.io/FEND-restaurant-proj5/sw.js')
      .then( reg => console.log(`Service Worker: Registered. ${reg.scope}`))
      .catch(err => console.log(`Service Worker: Error: ${err}`));
  });
}

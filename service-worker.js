// ✅ Service Worker - Z-Fitness

const cacheName = 'zfitness-v1';
const appShellFiles = [
  './',
  './index.html',
  './1-Calorie.html',
  './2-BMI-Calculator.html',
  './3-BMR-Calculator.html',
  './4-Body-Fat-Percentage-Calculator.html',
  './5-Macro-Calculator.html',
  './6-Ideal-Body-Weight-Calculator.html',
  './7-Waist-to-Hip-Ratio.html',
  './8-Waist-to-Height-Ratio.html',
  './9-Lean-Body-Mass-Calculator.html',
  './10-Protein-Intake-Calculator.html',
  './11-Water-Intake-Calculator.html',
  './12-Target-Heart-Rate.html',
  './13-VO2-Max-Calculator.html',
  './14-FFMI-Calculator.html',
  './15-One-Rep-Max.html',
  './16-Body-Surface-Area.html',
  './17-Glycemic-Load.html',
  './18-Calories-Burned.html',
  './19-MET-Calculator.html',
  './20-Sleep-Calculator.html',
  './diet.html',
  './day.html',
  './full.html',
  './fit-tools.html',
  './habit.html',
  './habit-traker.html',
  './profile.html',
  './progress.html',
  './settings.html',
  './workouts.html',
  './ac.html',
  './bb.html',
  './ct.html',
  './l.html',
  './s.html',
  './icon-128x128.png',
  './icon-144x144.png',
  './icon-152x152.png',
  './icon-192x192.png',
  './icon-256x256.png',
  './icon-512x512.png',
  './manifest.json'
];

// ✅ Install Event
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Installing Z-Fitness v1...');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[Service Worker] Caching all app files...');
      return cache.addAll(appShellFiles);
    })
  );
});

// ✅ Fetch Event (Improved for Offline Navigation)
self.addEventListener('fetch', (e) => {
  // 👉 If it's a navigation request (page navigation)
  if (e.request.mode === 'navigate') {
    e.respondWith(
      caches.match(e.request).then((response) => {
        return (
          response ||
          caches.match('./index.html') || // fallback if page not cached
          fetch(e.request)
        );
      })
    );
    return;
  }

  // 👉 For all other requests (CSS, JS, images, etc.)
  e.respondWith(
    caches.match(e.request).then((r) => {
      return (
        r ||
        fetch(e.request).then((response) => {
          return caches.open(cacheName).then((cache) => {
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
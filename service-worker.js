const cacheName = 'v1';

const appShellFiles = [
  './',
  './index.html',
  './profile.html',
  './habit.html',
  './habit-traker.html',
  './progress.html',
  './settings.html',
  './fit-tools.html',
  './workouts.html',
  './diet.html',
  './day.html',
  './ac.html',
  './bb.html',
  './ct.html',
  './l.html',
  './s.html',
  './full.html',

  // Tools
  './1-Calorie.html',
  './2-BMI-Calculator.html',
  './3-BMR-Calculator.html',
  './4-Body-Fat-Percentage.html',
  './5-Macro-Calculator.html',
  './6-Ideal-Body-Weight.html',
  './7-Waist-to-Hip-Ratio.html',
  './8-Waist-to-Height-Ratio.html',
  './9-Lean-Body-Mass.html',
  './10-Protein-Intake.html',
  './11-Water-Intake.html',
  './12-Target-Heart-Rate.html',
  './13-VO2-Max.html',
  './14-FFMI.html',
  './15-One-Rep-Max.html',
  './16-Body-Surface-Area.html',
  './17-Glycemic-Load.html',
  './18-Calories-Burned.html',
  './19-MET.html',
  './20-Sleep.html',

  // Icons & manifest
  './icon-128x128.png',
  './icon-144x144.png',
  './icon-152x152.png',
  './icon-192x192.png',
  './icon-256x256.png',
  './icon-512x512.png',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[Service Worker] Caching all app files...');
      return cache.addAll(appShellFiles);
    })
  );
});

self.addEventListener('fetch', (e) => {
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
var cacheName = 'v1';
var appShellFiles = [
    './',
    './1-Calorie.html',
    './2-BMI-Calculator.html',
    './3-BMR-Calculator.html',
    './4-Body-Fat-Percentage.html',
    './5-Macro-Calculator.html',
    './6-Ideal-Body-Weight.html',
    './7-Waist-Hip-Ratio.html',
    './8-Waist-Height-Ratio.html',
    './9-Lean-Body-Mass.html',
    './10-Protein-Intake.html',
    './11-Water-Intake.html',
    './12-THR.html',
    './13-VO2-Max.html',
    './14-FFMI.html',
    './15-One-Rep-Max.html',
    './16-BSA.html',
    './17-Glycemic-Load.html',
    './18-Calories-Burned.html',
    './19-MET.html',
    './20-Sleep.html',
    './habit.html',
    './habit-tracker.html',
    './profile.html',
    './progress.html',
    './settings.html',
    './workouts.html',
    './diet.html',
    './manifest.json',
    './icon-192x192.png',
    './icon-512x512.png'
];

self.addEventListener('install', function(e) {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[Service Worker] Caching all app shell and content');
            return cache.addAll(appShellFiles);
        })
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(r) {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
                    console.log('[Service Worker] Caching new resource: ' + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});
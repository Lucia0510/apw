self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open("pwa-cache").then((cache) => {
        return cache.addAll([
          "/",
          "/index.html",
          "/styles.css",
          "/app.js",
          "/favicon.ico",
          "/logo.png",
          "/public/img/logo.png",
          "/public/img/logo.png",
          "/public/splash-screen.html",
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  
  self.addEventListener("push", (event) => {
    const options = {
      body: event.data ? event.data.text() : "Nueva notificación",
      icon: "/public/icons/icon-192x192.png",
      vibrate: [200, 100, 200],
    };
    event.waitUntil(self.registration.showNotification("PWA Lista de Tareas", options));
  });
  
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
          "logo.png",
          "logo.png",
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
      icon: "logo.png",
      vibrate: [200, 100, 200],
    };
    event.waitUntil(self.registration.showNotification("Lista de Tareas", options));
  });
  

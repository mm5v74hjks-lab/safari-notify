self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  let p = {};
  try { p = event.data ? event.data.json() : {}; } catch (e) {}
  const n = p.notification || {};
  const d = p.data || {};
  const title = n.title || d.title || 'Safari Notify';
  const body = n.body || d.body || '';
  event.waitUntil(self.registration.showNotification(title, { body, data: d }));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow('./'));
});

importScripts("/client/precache-manifest.59b4e54221d4d18366900cfcf2c747c4.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/* eslint-disable no-undef */

//This is how you can use the network first strategy for files ending with .js
workbox.routing.registerRoute(/.*\.js/, workbox.strategies.networkFirst());

// Use cache but update cache files in the background ASAP
workbox.routing.registerRoute(
  /.*\.css/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "css-cache",
  })
);

//Cache first, but defining duration and maximum files
workbox.routing.registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  workbox.strategies.cacheFirst({
    cacheName: "image-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);


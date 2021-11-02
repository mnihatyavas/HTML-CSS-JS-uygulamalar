// C1c46ex.js: Mp4 ve webm videoları fetch'le getirme dosya takip kodlaması alt-örneği.
self.addEventListener ("install", function (olay) {
    olay.waitUntil (
        caches.open ("video-market").then (function (cepbellek) {
            return cepbellek.addAll ([
                "",
                "C1c46e.html",
                "C1c46e.css",
                "C1c46e.js"
            ]); // ret..sonu...
        }) // cach..sonu...
    ); // olay..sonu...
}); // self sonu...

self.addEventListener ("fetch", function (o) {
    console.log (o.request.url);
    o.respondWith (caches.match (o.request).then (function (response) {return response || fetch (o.request);}) );
}); // self..sonu...
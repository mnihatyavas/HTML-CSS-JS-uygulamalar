// B3d3x2.js: JS dizi-harita kodlamasının Kodaynası penceresinde çalıştırılması-2 alt-örneği.

var kaİlkİçerik = 
`// Gelişigüzel bir sayı dizisi yaratalım...
var sayılar = [1, 4, 9, 16, -3.65, 7.5, 3.14];

// Hazır map() fonksiyona sayı dizisini bağlayıp, herbir elemanını işlemden geçirelim...
var haritalanmışSonuç = sayılar.map (function (x) { return x * 2 }); // (x * Math.sqrt(2) * Math.PI).toFixed (4)

// Sonuçları görelim...
console.log (haritalanmışSonuç);`;

var kaSeçilenSatır = 4;
var kaSeçilenKrkBaşı = 25;
// B3ax.js: Fibonaki serisini hesaplayıp döndüren alt-program örneği.
// .js dosyaları UTF-8 olarak saklanmalıdır, yoksa hata verir...

self.onmessage = function (olay) {
    let gönderilenSayı = Number (olay.data);
    fibonaki (gönderilenSayı);
} // self sonu...

function fibonaki (sayı) {
    let a = 1, b = 0, geçici, sonuç="SONUÇ: ";
    while (sayı > 0) {
        geçici = a;
        a = a + b;
        b = geçici;
        sonuç += b + ", "
        sayı--;
    } // while sonu...
    self.postMessage (sonuç);
} // func sonu...
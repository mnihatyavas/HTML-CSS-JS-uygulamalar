(()=> {
    const tuzlamaBaytları = [89,113,135,234,168,204,21,36,55,93,1,132,242,242,192,156];
    const sarılıAnahtarBaytları = [171,223,14,36,201,233,233,120,164,68,217,192,226,80,
      224,39,199,235,239,60,212,169,100,23,61,54,244,197,160,80,109,230,207,
      225,57,197,175,71,80,209];
    let sarılıGizliAnahtar;
    const şifreleDüğmesi = document.querySelector (".raw .şifrele-düğmesi");

    function baytdanDiziTamponunaÇevir (baytlar) {
        const diziTamponBaytları = new ArrayBuffer (baytlar.length);
        const uint8Baytları = new Uint8Array (diziTamponBaytları);
        uint8Baytları.set (baytlar);
        return diziTamponBaytları;
    } // func sonu...

    function anahtarMalzemesiniAl() {
        const şifrem = window.prompt ('Şifrenizi girin. Şifre "correct horse battery staple" olmalıdır.');
        const kodlayıcı = new TextEncoder();
        return window.crypto.subtle.importKey (
            "raw",
            kodlayıcı.encode (şifrem),
            {name: "PBKDF2"},
            false,
            ["deriveBits", "deriveKey"]
        ); // ret..sonu...
    } // func sonu...

    async function sarımsızlayanAnahtarıAl() {
        // 1. Anahtar malzemesi olan kullanıcı-tedarikli şifre girişi
        const anahtarMalzemesi = await anahtarMalzemesiniAl();
        // 2 Tuzlama byte'larını diziye çevir
        const tuzlamaTamponu = baytdanDiziTamponunaÇevir (tuzlamaBaytları);
        // 3 Anahtar malzemesi ve tuzlama baytlarından anahtarı türet
        return window.crypto.subtle.deriveKey (
            {"name": "PBKDF2",
             salt: tuzlamaTamponu,
             "iterations": 100000,
             "hash": "SHA-256"},
            anahtarMalzemesi,
            {"name": "AES-KW", "length": 256},
            true,
            ["wrapKey", "unwrapKey"]
        ); // ret..sonu...
    } // asy..sonu...

    async function gizliAnahtarıSarımsızla (sarılıAnahtar) {
        // 1. Sarımsızlayan anahtarı al
        const sarımsızlayanAnahtar = await sarımsızlayanAnahtarıAl();
        // 2. Sarılı anahtarı byte'dan diziye çevir
        const sarılıAnahtarDizisiTamponu = baytdanDiziTamponunaÇevir (sarılıAnahtar);
        // 3. Anahtarı sarımsızla
        return window.crypto.subtle.unwrapKey (
            "raw",                      // Formatı ithal et
            sarılıAnahtarDizisiTamponu, // Sarımsızlanacak anahtarı temsilen DiziTamponu/ArrayBuffer
            sarımsızlayanAnahtar,       // Anahtar şifreleme anahtarını temsilen ŞifrelemeAnahtarı
            "AES-KW",                   // Şifreleme anahtarı için algoritma kimliği
            "AES-GCM",                  // Sarımsızlama anahtarı için algoritma kimliği
            true,                       // Sarımsızlama anahtarının oluşturulabilirliği
            ["encrypt", "decrypt"]      // Sarımsızlama anahtarı için anahtar kullanımları
        ); // ret..sonu...
    } // asy..sonu...

    function kodlananMesajıAl() {
        const mesajKutusu = document.querySelector ("#raw-mesajı");
        const mesaj = mesajKutusu.value;
        const kodlayıcı = new TextEncoder();
        return kodlayıcı.encode (mesaj);
    } // func sonu...

    async function mesajıŞifrele() {
        const kodluMesaj = kodlananMesajıAl();
        // Deşifreleme için rasgele12 gerekmekte
        const rasgele12 = window.crypto.getRandomValues (new Uint8Array (12));
        const şifreliMetin = await window.crypto.subtle.encrypt (
            {name: "AES-GCM", iv: rasgele12},
            sarılıGizliAnahtar,
            kodluMesaj
        ); // con..sonu...
        const tampon = new Uint8Array (şifreliMetin, 0, 5);
        const şifrelimetinDeğeri = document.querySelector (".raw .şifrelimetin-değeri");
        şifrelimetinDeğeri.classList.add ("netleş");
        şifrelimetinDeğeri.addEventListener ("animationend", ()=> {şifrelimetinDeğeri.classList.remove ("netleş");});
        şifrelimetinDeğeri.textContent = `${tampon}...[Toplam ${şifreliMetin.byteLength} byte]`;
    } // asy..sonu...

    function şifrelemeDüğmesinSıfırla() {
        şifreleDüğmesi.setAttribute ("disabled", true);
        şifreleDüğmesi.classList.add ("gizli");
    } // func sonu...

    function şifrelemeDüğmesiniEtkinleştir() {
        şifreleDüğmesi.classList.add ("netleş");
        şifreleDüğmesi.addEventListener ("animationend", ()=> {şifreleDüğmesi.classList.remove ("netleş");});
        şifreleDüğmesi.removeAttribute ("disabled");
        şifreleDüğmesi.classList.remove ("gizli");
    } // func sonu...

    const anahtarıSarımsızlaDüğmesi = document.querySelector (".raw .anahtarı-sarımsızla-düğmesi");
    anahtarıSarımsızlaDüğmesi.addEventListener ("click", async ()=> {
        try {
            sarılıGizliAnahtar = await gizliAnahtarıSarımsızla (sarılıAnahtarBaytları);
            şifrelemeDüğmesiniEtkinleştir();
        }catch (olay) {
            şifrelemeDüğmesinSıfırla();
            alert ("Yanlış şifre girdiniz");
        } // catch sonu...
    }); // ana..sonu...
    şifreleDüğmesi.addEventListener ("click", mesajıŞifrele);
})();
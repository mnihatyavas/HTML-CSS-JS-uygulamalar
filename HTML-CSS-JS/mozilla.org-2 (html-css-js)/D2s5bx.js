(()=> {
    const tuzlamaBaytlarý = [89,113,135,234,168,204,21,36,55,93,1,132,242,242,192,156];
    const sarýlýAnahtarBaytlarý = [171,223,14,36,201,233,233,120,164,68,217,192,226,80,
      224,39,199,235,239,60,212,169,100,23,61,54,244,197,160,80,109,230,207,
      225,57,197,175,71,80,209];
    let sarýlýGizliAnahtar;
    const þifreleDüðmesi = document.querySelector (".raw .þifrele-düðmesi");

    function baytdanDiziTamponunaÇevir (baytlar) {
        const diziTamponBaytlarý = new ArrayBuffer (baytlar.length);
        const uint8Baytlarý = new Uint8Array (diziTamponBaytlarý);
        uint8Baytlarý.set (baytlar);
        return diziTamponBaytlarý;
    } // func sonu...

    function anahtarMalzemesiniAl() {
        const þifrem = window.prompt ('Þifrenizi girin. Þifre "correct horse battery staple" olmalýdýr.');
        const kodlayýcý = new TextEncoder();
        return window.crypto.subtle.importKey (
            "raw",
            kodlayýcý.encode (þifrem),
            {name: "PBKDF2"},
            false,
            ["deriveBits", "deriveKey"]
        ); // ret..sonu...
    } // func sonu...

    async function sarýmsýzlayanAnahtarýAl() {
        // 1. Anahtar malzemesi olan kullanýcý-tedarikli þifre giriþi
        const anahtarMalzemesi = await anahtarMalzemesiniAl();
        // 2 Tuzlama byte'larýný diziye çevir
        const tuzlamaTamponu = baytdanDiziTamponunaÇevir (tuzlamaBaytlarý);
        // 3 Anahtar malzemesi ve tuzlama baytlarýndan anahtarý türet
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

    async function gizliAnahtarýSarýmsýzla (sarýlýAnahtar) {
        // 1. Sarýmsýzlayan anahtarý al
        const sarýmsýzlayanAnahtar = await sarýmsýzlayanAnahtarýAl();
        // 2. Sarýlý anahtarý byte'dan diziye çevir
        const sarýlýAnahtarDizisiTamponu = baytdanDiziTamponunaÇevir (sarýlýAnahtar);
        // 3. Anahtarý sarýmsýzla
        return window.crypto.subtle.unwrapKey (
            "raw",                      // Formatý ithal et
            sarýlýAnahtarDizisiTamponu, // Sarýmsýzlanacak anahtarý temsilen DiziTamponu/ArrayBuffer
            sarýmsýzlayanAnahtar,       // Anahtar þifreleme anahtarýný temsilen ÞifrelemeAnahtarý
            "AES-KW",                   // Þifreleme anahtarý için algoritma kimliði
            "AES-GCM",                  // Sarýmsýzlama anahtarý için algoritma kimliði
            true,                       // Sarýmsýzlama anahtarýnýn oluþturulabilirliði
            ["encrypt", "decrypt"]      // Sarýmsýzlama anahtarý için anahtar kullanýmlarý
        ); // ret..sonu...
    } // asy..sonu...

    function kodlananMesajýAl() {
        const mesajKutusu = document.querySelector ("#raw-mesajý");
        const mesaj = mesajKutusu.value;
        const kodlayýcý = new TextEncoder();
        return kodlayýcý.encode (mesaj);
    } // func sonu...

    async function mesajýÞifrele() {
        const kodluMesaj = kodlananMesajýAl();
        // Deþifreleme için rasgele12 gerekmekte
        const rasgele12 = window.crypto.getRandomValues (new Uint8Array (12));
        const þifreliMetin = await window.crypto.subtle.encrypt (
            {name: "AES-GCM", iv: rasgele12},
            sarýlýGizliAnahtar,
            kodluMesaj
        ); // con..sonu...
        const tampon = new Uint8Array (þifreliMetin, 0, 5);
        const þifrelimetinDeðeri = document.querySelector (".raw .þifrelimetin-deðeri");
        þifrelimetinDeðeri.classList.add ("netleþ");
        þifrelimetinDeðeri.addEventListener ("animationend", ()=> {þifrelimetinDeðeri.classList.remove ("netleþ");});
        þifrelimetinDeðeri.textContent = `${tampon}...[Toplam ${þifreliMetin.byteLength} byte]`;
    } // asy..sonu...

    function þifrelemeDüðmesinSýfýrla() {
        þifreleDüðmesi.setAttribute ("disabled", true);
        þifreleDüðmesi.classList.add ("gizli");
    } // func sonu...

    function þifrelemeDüðmesiniEtkinleþtir() {
        þifreleDüðmesi.classList.add ("netleþ");
        þifreleDüðmesi.addEventListener ("animationend", ()=> {þifreleDüðmesi.classList.remove ("netleþ");});
        þifreleDüðmesi.removeAttribute ("disabled");
        þifreleDüðmesi.classList.remove ("gizli");
    } // func sonu...

    const anahtarýSarýmsýzlaDüðmesi = document.querySelector (".raw .anahtarý-sarýmsýzla-düðmesi");
    anahtarýSarýmsýzlaDüðmesi.addEventListener ("click", async ()=> {
        try {
            sarýlýGizliAnahtar = await gizliAnahtarýSarýmsýzla (sarýlýAnahtarBaytlarý);
            þifrelemeDüðmesiniEtkinleþtir();
        }catch (olay) {
            þifrelemeDüðmesinSýfýrla();
            alert ("Yanlýþ þifre girdiniz");
        } // catch sonu...
    }); // ana..sonu...
    þifreleDüðmesi.addEventListener ("click", mesajýÞifrele);
})();
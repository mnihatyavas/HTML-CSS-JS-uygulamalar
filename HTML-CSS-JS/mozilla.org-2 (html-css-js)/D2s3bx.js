(()=> {
    let rasgele16;
    let şifreliMetin;
    let rasgele12;

    function mesajKodlamasınıAl() {
        let mesaj = document.querySelector ("#pbkdf2-mesajı").value;
        let kodlayıcı = new TextEncoder();
         return kodlayıcı.encode (mesaj);
    } // func sonu...

    function anahtarMalzemesiniAl() {
        let şifre = window.prompt ("Lütfen şifrenizi girin");
        let kodlayıcı = new TextEncoder();
        return window.crypto.subtle.importKey (
            "raw",
            kodlayıcı.encode (şifre),
            {name: "PBKDF2"},
            false,
            ["deriveBits", "deriveKey"]
        ); // ret..sonu...
    } // func sonu...

    function anahtarıAl (anahtarMalzemesi, rasgele16) {
        return window.crypto.subtle.deriveKey (
            {"name": "PBKDF2",
             salt: rasgele16, 
             "iterations": 100000,
             "hash": "SHA-256"},
            anahtarMalzemesi,
            {"name": "AES-GCM", "length": 256},
            true,
            ["encrypt", "decrypt"]
        ); // ret..sonu...
    } // func sonu...

    async function şifrele() {
        const şifrelimetinDeğeri = document.querySelector (".pbkdf2 .şifrelimetin-değeri");
        şifrelimetinDeğeri.textContent = "";
        const deşifrelimetinDeğeri = document.querySelector (".pbkdf2 .deşifrelimetin-değeri");
        deşifrelimetinDeğeri.textContent = "";
        let anahtarMalzemesi = await anahtarMalzemesiniAl();
        rasgele16 = window.crypto.getRandomValues (new Uint8Array (16));
        let anahtar = await anahtarıAl (anahtarMalzemesi, rasgele16);
        rasgele12 = window.crypto.getRandomValues (new Uint8Array (12));
        let kodlananMesaj = mesajKodlamasınıAl();
        şifreliMetin = await window.crypto.subtle.encrypt (
            {name: "AES-GCM", iv: rasgele12},
            anahtar,
            kodlananMesaj
        ); // şif..sonu...
        let tampon = new Uint8Array (şifreliMetin, 0, 5);
        şifrelimetinDeğeri.classList.add ("tebarruz");
        şifrelimetinDeğeri.addEventListener ("animationend", ()=> {şifrelimetinDeğeri.classList.remove ("tebarruz");});
        şifrelimetinDeğeri.textContent = `${tampon}...[Toplam ${şifreliMetin.byteLength} byte]`;
    } // asy..sonu...

    async function deşifrele() {
        const deşifrelimetinDeğeri = document.querySelector (".pbkdf2 .deşifrelimetin-değeri");
        deşifrelimetinDeğeri.textContent = "";
        deşifrelimetinDeğeri.classList.remove ("hata");
        let anahtarMalzemesi = await anahtarMalzemesiniAl();
        let anahtar = await anahtarıAl (anahtarMalzemesi, rasgele16);
        try {
            let deşifreliMetin = await window.crypto.subtle.decrypt (
                {name: "AES-GCM", iv: rasgele12},
                anahtar,
                şifreliMetin
            ); // let sonu...
            let dekodlayıcı = new TextDecoder();
            deşifrelimetinDeğeri.classList.add ("tebarruz");
            deşifrelimetinDeğeri.addEventListener ("animationend", ()=> {deşifrelimetinDeğeri.classList.remove ("tebarruz");});
            deşifrelimetinDeğeri.textContent = dekodlayıcı.decode (deşifreliMetin);
        } catch (hata) {
            deşifrelimetinDeğeri.classList.add ("tebarruz");
            deşifrelimetinDeğeri.addEventListener ("animationend", ()=> {deşifrelimetinDeğeri.classList.remove ("tebarruz");});
            deşifrelimetinDeğeri.classList.add ("hata");
            deşifrelimetinDeğeri.textContent = "*** Deşifreleme hatası ***";
        } // try-catch sonu...
    } // asy..sonu...

    const şifreleDüğmesi = document.querySelector (".pbkdf2 .şifrele-düğmesi");
    şifreleDüğmesi.addEventListener ("click", şifrele);
    const deşifreleDüğmesi = document.querySelector (".pbkdf2 .deşifrele-düğmesi");
    deşifreleDüğmesi.addEventListener ("click", deşifrele);
})();
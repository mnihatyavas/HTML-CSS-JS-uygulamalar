(()=> {
    let rasgele16;
    let þifreliMetin;
    let rasgele12;

    function mesajKodlamasýnýAl() {
        let mesaj = document.querySelector ("#pbkdf2-mesajý").value;
        let kodlayýcý = new TextEncoder();
         return kodlayýcý.encode (mesaj);
    } // func sonu...

    function anahtarMalzemesiniAl() {
        let þifre = window.prompt ("Lütfen þifrenizi girin");
        let kodlayýcý = new TextEncoder();
        return window.crypto.subtle.importKey (
            "raw",
            kodlayýcý.encode (þifre),
            {name: "PBKDF2"},
            false,
            ["deriveBits", "deriveKey"]
        ); // ret..sonu...
    } // func sonu...

    function anahtarýAl (anahtarMalzemesi, rasgele16) {
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

    async function þifrele() {
        const þifrelimetinDeðeri = document.querySelector (".pbkdf2 .þifrelimetin-deðeri");
        þifrelimetinDeðeri.textContent = "";
        const deþifrelimetinDeðeri = document.querySelector (".pbkdf2 .deþifrelimetin-deðeri");
        deþifrelimetinDeðeri.textContent = "";
        let anahtarMalzemesi = await anahtarMalzemesiniAl();
        rasgele16 = window.crypto.getRandomValues (new Uint8Array (16));
        let anahtar = await anahtarýAl (anahtarMalzemesi, rasgele16);
        rasgele12 = window.crypto.getRandomValues (new Uint8Array (12));
        let kodlananMesaj = mesajKodlamasýnýAl();
        þifreliMetin = await window.crypto.subtle.encrypt (
            {name: "AES-GCM", iv: rasgele12},
            anahtar,
            kodlananMesaj
        ); // þif..sonu...
        let tampon = new Uint8Array (þifreliMetin, 0, 5);
        þifrelimetinDeðeri.classList.add ("tebarruz");
        þifrelimetinDeðeri.addEventListener ("animationend", ()=> {þifrelimetinDeðeri.classList.remove ("tebarruz");});
        þifrelimetinDeðeri.textContent = `${tampon}...[Toplam ${þifreliMetin.byteLength} byte]`;
    } // asy..sonu...

    async function deþifrele() {
        const deþifrelimetinDeðeri = document.querySelector (".pbkdf2 .deþifrelimetin-deðeri");
        deþifrelimetinDeðeri.textContent = "";
        deþifrelimetinDeðeri.classList.remove ("hata");
        let anahtarMalzemesi = await anahtarMalzemesiniAl();
        let anahtar = await anahtarýAl (anahtarMalzemesi, rasgele16);
        try {
            let deþifreliMetin = await window.crypto.subtle.decrypt (
                {name: "AES-GCM", iv: rasgele12},
                anahtar,
                þifreliMetin
            ); // let sonu...
            let dekodlayýcý = new TextDecoder();
            deþifrelimetinDeðeri.classList.add ("tebarruz");
            deþifrelimetinDeðeri.addEventListener ("animationend", ()=> {deþifrelimetinDeðeri.classList.remove ("tebarruz");});
            deþifrelimetinDeðeri.textContent = dekodlayýcý.decode (deþifreliMetin);
        } catch (hata) {
            deþifrelimetinDeðeri.classList.add ("tebarruz");
            deþifrelimetinDeðeri.addEventListener ("animationend", ()=> {deþifrelimetinDeðeri.classList.remove ("tebarruz");});
            deþifrelimetinDeðeri.classList.add ("hata");
            deþifrelimetinDeðeri.textContent = "*** Deþifreleme hatasý ***";
        } // try-catch sonu...
    } // asy..sonu...

    const þifreleDüðmesi = document.querySelector (".pbkdf2 .þifrele-düðmesi");
    þifreleDüðmesi.addEventListener ("click", þifrele);
    const deþifreleDüðmesi = document.querySelector (".pbkdf2 .deþifrele-düðmesi");
    deþifreleDüðmesi.addEventListener ("click", deþifrele);
})();
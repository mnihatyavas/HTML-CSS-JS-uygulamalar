(()=> {
    let rasgele16;
    let �ifreliMetin;
    let rasgele12;

    function mesajKodlamas�n�Al() {
        let mesaj = document.querySelector ("#pbkdf2-mesaj�").value;
        let kodlay�c� = new TextEncoder();
         return kodlay�c�.encode (mesaj);
    } // func sonu...

    function anahtarMalzemesiniAl() {
        let �ifre = window.prompt ("L�tfen �ifrenizi girin");
        let kodlay�c� = new TextEncoder();
        return window.crypto.subtle.importKey (
            "raw",
            kodlay�c�.encode (�ifre),
            {name: "PBKDF2"},
            false,
            ["deriveBits", "deriveKey"]
        ); // ret..sonu...
    } // func sonu...

    function anahtar�Al (anahtarMalzemesi, rasgele16) {
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

    async function �ifrele() {
        const �ifrelimetinDe�eri = document.querySelector (".pbkdf2 .�ifrelimetin-de�eri");
        �ifrelimetinDe�eri.textContent = "";
        const de�ifrelimetinDe�eri = document.querySelector (".pbkdf2 .de�ifrelimetin-de�eri");
        de�ifrelimetinDe�eri.textContent = "";
        let anahtarMalzemesi = await anahtarMalzemesiniAl();
        rasgele16 = window.crypto.getRandomValues (new Uint8Array (16));
        let anahtar = await anahtar�Al (anahtarMalzemesi, rasgele16);
        rasgele12 = window.crypto.getRandomValues (new Uint8Array (12));
        let kodlananMesaj = mesajKodlamas�n�Al();
        �ifreliMetin = await window.crypto.subtle.encrypt (
            {name: "AES-GCM", iv: rasgele12},
            anahtar,
            kodlananMesaj
        ); // �if..sonu...
        let tampon = new Uint8Array (�ifreliMetin, 0, 5);
        �ifrelimetinDe�eri.classList.add ("tebarruz");
        �ifrelimetinDe�eri.addEventListener ("animationend", ()=> {�ifrelimetinDe�eri.classList.remove ("tebarruz");});
        �ifrelimetinDe�eri.textContent = `${tampon}...[Toplam ${�ifreliMetin.byteLength} byte]`;
    } // asy..sonu...

    async function de�ifrele() {
        const de�ifrelimetinDe�eri = document.querySelector (".pbkdf2 .de�ifrelimetin-de�eri");
        de�ifrelimetinDe�eri.textContent = "";
        de�ifrelimetinDe�eri.classList.remove ("hata");
        let anahtarMalzemesi = await anahtarMalzemesiniAl();
        let anahtar = await anahtar�Al (anahtarMalzemesi, rasgele16);
        try {
            let de�ifreliMetin = await window.crypto.subtle.decrypt (
                {name: "AES-GCM", iv: rasgele12},
                anahtar,
                �ifreliMetin
            ); // let sonu...
            let dekodlay�c� = new TextDecoder();
            de�ifrelimetinDe�eri.classList.add ("tebarruz");
            de�ifrelimetinDe�eri.addEventListener ("animationend", ()=> {de�ifrelimetinDe�eri.classList.remove ("tebarruz");});
            de�ifrelimetinDe�eri.textContent = dekodlay�c�.decode (de�ifreliMetin);
        } catch (hata) {
            de�ifrelimetinDe�eri.classList.add ("tebarruz");
            de�ifrelimetinDe�eri.addEventListener ("animationend", ()=> {de�ifrelimetinDe�eri.classList.remove ("tebarruz");});
            de�ifrelimetinDe�eri.classList.add ("hata");
            de�ifrelimetinDe�eri.textContent = "*** De�ifreleme hatas� ***";
        } // try-catch sonu...
    } // asy..sonu...

    const �ifreleD��mesi = document.querySelector (".pbkdf2 .�ifrele-d��mesi");
    �ifreleD��mesi.addEventListener ("click", �ifrele);
    const de�ifreleD��mesi = document.querySelector (".pbkdf2 .de�ifrele-d��mesi");
    de�ifreleD��mesi.addEventListener ("click", de�ifrele);
})();
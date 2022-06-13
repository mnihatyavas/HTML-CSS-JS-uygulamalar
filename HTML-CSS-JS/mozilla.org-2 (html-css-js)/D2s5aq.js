(()=> {let rasgele16;

    function anahtarMalzemesiniAl() {
        const şifrem = window.prompt ("Herhangibir şifre girin");
        const kodlayıcı = new TextEncoder();
        return window.crypto.subtle.importKey (
            "raw",
            kodlayıcı.encode (şifrem),
            {name: "PBKDF2"},
            false,
            ["deriveBits", "deriveKey"]
        ); // ret..sonu...
    } // func sonu...

    function anahtarıAl (malzeme, rasgele) {
        return window.crypto.subtle.deriveKey (
            {"name": "PBKDF2",
             salt: rasgele,
             "iterations": 100000,
             "hash": "SHA-256"},
            malzeme,
            {"name": "AES-KW", "length": 256},
            true,
            ["wrapKey", "unwrapKey"]
        ); // ret..sonu...
    } // func sonu...

    async function şifrelemeAnahtarınıSar (anahtar) {
        const anahtarMalzemesi = await anahtarMalzemesiniAl();
        rasgele16 = window.crypto.getRandomValues (new Uint8Array (16));
        const sarılanAnahtar = await anahtarıAl (anahtarMalzemesi, rasgele16);
        const sarılım = await window.crypto.subtle.wrapKey (
            "raw",
            anahtar,
            sarılanAnahtar,
            "AES-KW"
        ); // con..sonu...
        const sarılıTampon = new Uint8Array (sarılım);
        const sarılıVitrin = document.querySelector (".sarmalanan-anahtar");
        sarılıVitrin.classList.add ("barizlen");
        sarılıVitrin.addEventListener ("animationend", ()=> {sarılıVitrin.classList.remove ("barizlen");});
        sarılıVitrin.textContent = `[${sarılıTampon}]`;
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "AES-GCM", length: 256,},
        true,
        ["encrypt", "decrypt"])
    .then ((gizliAnahtar)=> {
        const sarmalatanDüğme = document.querySelector (".raw");
        sarmalatanDüğme.addEventListener ("click", ()=> {şifrelemeAnahtarınıSar (gizliAnahtar);});
    }); // then sonu...
})();
(()=> {let rasgele16;

    function anahtarMalzemesiniAl() {
        const þifrem = window.prompt ("Herhangibir þifre girin");
        const kodlayýcý = new TextEncoder();
        return window.crypto.subtle.importKey (
            "raw",
            kodlayýcý.encode (þifrem),
            {name: "PBKDF2"},
            false,
            ["deriveBits", "deriveKey"]
        ); // ret..sonu...
    } // func sonu...

    function anahtarýAl (malzeme, rasgele) {
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

    async function þifrelemeAnahtarýnýSar (anahtar) {
        const anahtarMalzemesi = await anahtarMalzemesiniAl();
        rasgele16 = window.crypto.getRandomValues (new Uint8Array (16));
        const sarýlanAnahtar = await anahtarýAl (anahtarMalzemesi, rasgele16);
        const sarýlým = await window.crypto.subtle.wrapKey (
            "raw",
            anahtar,
            sarýlanAnahtar,
            "AES-KW"
        ); // con..sonu...
        const sarýlýTampon = new Uint8Array (sarýlým);
        const sarýlýVitrin = document.querySelector (".sarmalanan-anahtar");
        sarýlýVitrin.classList.add ("barizlen");
        sarýlýVitrin.addEventListener ("animationend", ()=> {sarýlýVitrin.classList.remove ("barizlen");});
        sarýlýVitrin.textContent = `[${sarýlýTampon}]`;
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "AES-GCM", length: 256,},
        true,
        ["encrypt", "decrypt"])
    .then ((gizliAnahtar)=> {
        const sarmalatanDüðme = document.querySelector (".raw");
        sarmalatanDüðme.addEventListener ("click", ()=> {þifrelemeAnahtarýnýSar (gizliAnahtar);});
    }); // then sonu...
})();
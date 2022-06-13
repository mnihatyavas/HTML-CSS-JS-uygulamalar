(()=> {let rasgele16;

    function anahtarMalzemesiniAl() {
        const �ifrem = window.prompt ("Herhangibir �ifre girin");
        const kodlay�c� = new TextEncoder();
        return window.crypto.subtle.importKey (
            "raw",
            kodlay�c�.encode (�ifrem),
            {name: "PBKDF2"},
            false,
            ["deriveBits", "deriveKey"]
        ); // ret..sonu...
    } // func sonu...

    function anahtar�Al (malzeme, rasgele) {
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

    async function �ifrelemeAnahtar�n�Sar (anahtar) {
        const anahtarMalzemesi = await anahtarMalzemesiniAl();
        rasgele16 = window.crypto.getRandomValues (new Uint8Array (16));
        const sar�lanAnahtar = await anahtar�Al (anahtarMalzemesi, rasgele16);
        const sar�l�m = await window.crypto.subtle.wrapKey (
            "raw",
            anahtar,
            sar�lanAnahtar,
            "AES-KW"
        ); // con..sonu...
        const sar�l�Tampon = new Uint8Array (sar�l�m);
        const sar�l�Vitrin = document.querySelector (".sarmalanan-anahtar");
        sar�l�Vitrin.classList.add ("barizlen");
        sar�l�Vitrin.addEventListener ("animationend", ()=> {sar�l�Vitrin.classList.remove ("barizlen");});
        sar�l�Vitrin.textContent = `[${sar�l�Tampon}]`;
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "AES-GCM", length: 256,},
        true,
        ["encrypt", "decrypt"])
    .then ((gizliAnahtar)=> {
        const sarmalatanD��me = document.querySelector (".raw");
        sarmalatanD��me.addEventListener ("click", ()=> {�ifrelemeAnahtar�n�Sar (gizliAnahtar);});
    }); // then sonu...
})();
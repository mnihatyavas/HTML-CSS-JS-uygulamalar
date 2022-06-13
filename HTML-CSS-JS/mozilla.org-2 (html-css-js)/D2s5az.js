(()=> {
    let rasgele16;
    let rasgele12;

    function anahtarMalzemesiniAl() {
        const �ifrem = window.prompt ("L�tfen �ifrenizi girin: ");
        const kodlay�c� = new TextEncoder();
        return window.crypto.subtle.importKey (
            "raw",
            kodlay�c�.encode (�ifrem),
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
            ["wrapKey", "unwrapKey"]
        ); // ret..sonu...
    } // func sonu...

    async function �ifreAnahtar�n�Sar (sar�lacakAnahtar) {
        const anahtarMalzemesi = await anahtarMalzemesiniAl();
        rasgele16 = window.crypto.getRandomValues (new Uint8Array (16));
        const saranAnahtar = await anahtar�Al (anahtarMalzemesi, rasgele16);
        rasgele12 = window.crypto.getRandomValues (new Uint8Array (12));
        const sar�l� = await window.crypto.subtle.wrapKey (
            "jwk",
            sar�lacakAnahtar,
            saranAnahtar,
            {name: "AES-GCM", iv: rasgele12}
        ); // con..sonu...
        const sar�l�AnahtarTamponu = new Uint8Array (sar�l�);
        const sar�l�AnahtarVitrini = document.querySelector (".sarmalanan-anahtar");
        sar�l�AnahtarVitrini.classList.add ("barizlen");
        sar�l�AnahtarVitrini.addEventListener ("animationend", ()=> {sar�l�AnahtarVitrini.classList.remove ("barizlen");});
        sar�l�AnahtarVitrini.textContent = `[${sar�l�AnahtarTamponu}]`;
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "ECDSA", namedCurve: "P-384"},
        true,
        ["sign", "verify"])
    .then ((anahtar�ifti) => {
        const sarmalatanD��me = document.querySelector (".jwk");
        sarmalatanD��me.addEventListener ("click", ()=> {�ifreAnahtar�n�Sar (anahtar�ifti.privateKey);});
    }); // then sonu...
})();
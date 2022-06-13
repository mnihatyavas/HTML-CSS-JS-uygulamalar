(()=> {
    let rasgele16;
    let tesad�fi16;

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
            {"name": "AES-CBC", "length": 256},
            true,
            ["wrapKey", "unwrapKey"]
        ); // ret..sonu...
    } // func sonu...

    async function �ifreAnahtar�n�Sar (sar�lacakAnahtar) {
        const anahtarMalzemesi = await anahtarMalzemesiniAl();
        rasgele16 = window.crypto.getRandomValues (new Uint8Array (16));
        const sar�lanAnahtar = await anahtar�Al (anahtarMalzemesi, rasgele16);
        tesad�fi16 = window.crypto.getRandomValues (new Uint8Array (16));
        const sar�m = await window.crypto.subtle.wrapKey (
            "spki",
            sar�lacakAnahtar,
            sar�lanAnahtar,
            {name: "AES-CBC", iv: tesad�fi16}
        ); // con..sonu...
        const sar�l�AnahtarTamponu = new Uint8Array (sar�m);
        const sar�l�AnahtarVitrini = document.querySelector (".sarmalanan-anahtar");
        sar�l�AnahtarVitrini.classList.add ("barizlen");
        sar�l�AnahtarVitrini.addEventListener ("animationend", ()=> {sar�l�AnahtarVitrini.classList.remove ("barizlen");});
        sar�l�AnahtarVitrini.textContent = `[${sar�l�AnahtarTamponu}]`;
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "RSA-OAEP",
         modulusLength: 2048,
         publicExponent: new Uint8Array ([1, 0, 1]),
         hash: "SHA-256",},
        true,
        ["encrypt", "decrypt"])
    .then ((anahtar�ifti)=> {
        const sarmalatanD��me = document.querySelector (".spki");
        sarmalatanD��me.addEventListener ("click", ()=> {�ifreAnahtar�n�Sar (anahtar�ifti.publicKey);});
    }); // then sonu...
})();
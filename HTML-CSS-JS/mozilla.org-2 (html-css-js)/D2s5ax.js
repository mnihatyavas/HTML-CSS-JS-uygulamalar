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
        const sar�lanAnahtar = await anahtar�Al (anahtarMalzemesi, rasgele16);
        rasgele12 = window.crypto.getRandomValues(new Uint8Array (12));
        const sar�l�m = await window.crypto.subtle.wrapKey (
            "pkcs8",
            sar�lacakAnahtar,
            sar�lanAnahtar,
            {name: "AES-GCM", iv: rasgele12}
        ); // con..sonu...
        const sar�lanAnahtarTamponu = new Uint8Array (sar�l�m);
        const sar�lanAnahtarVitrini = document.querySelector (".sarmalanan-anahtar");
        sar�lanAnahtarVitrini.classList.add ("barizlen");
        sar�lanAnahtarVitrini.addEventListener ("animationend", ()=> {sar�lanAnahtarVitrini.classList.remove ("barizlen");});
        sar�lanAnahtarVitrini.textContent = `[${sar�lanAnahtarTamponu}]`;
    } // asy..sonu...

    window.crypto.subtle.generateKey (// Y�klenimde otomatik �al��an...
        {name: "RSA-PSS",
         modulusLength: 2048,
         publicExponent: new Uint8Array ([1, 0, 1]),
         hash: "SHA-256",},
        true,
        ["sign", "verify"])
    .then ((anahtar�ifti)=> {
        const sarmalatanD��me = document.querySelector (".pkcs8");
        sarmalatanD��me.addEventListener ("click", ()=> {�ifreAnahtar�n�Sar (anahtar�ifti.privateKey);});
    }); // then sonu...
})();
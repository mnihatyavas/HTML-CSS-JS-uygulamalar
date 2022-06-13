(()=> {
    let rasgele16;
    let rasgele12;

    function anahtarMalzemesiniAl() {
        const şifrem = window.prompt ("Lütfen şifrenizi girin: ");
        const kodlayıcı = new TextEncoder();
        return window.crypto.subtle.importKey (
            "raw",
            kodlayıcı.encode (şifrem),
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
            ["wrapKey", "unwrapKey"]
        ); // ret..sonu...
    } // func sonu...

    async function şifreAnahtarınıSar (sarılacakAnahtar) {
        const anahtarMalzemesi = await anahtarMalzemesiniAl();
        rasgele16 = window.crypto.getRandomValues (new Uint8Array (16));
        const saranAnahtar = await anahtarıAl (anahtarMalzemesi, rasgele16);
        rasgele12 = window.crypto.getRandomValues (new Uint8Array (12));
        const sarılı = await window.crypto.subtle.wrapKey (
            "jwk",
            sarılacakAnahtar,
            saranAnahtar,
            {name: "AES-GCM", iv: rasgele12}
        ); // con..sonu...
        const sarılıAnahtarTamponu = new Uint8Array (sarılı);
        const sarılıAnahtarVitrini = document.querySelector (".sarmalanan-anahtar");
        sarılıAnahtarVitrini.classList.add ("barizlen");
        sarılıAnahtarVitrini.addEventListener ("animationend", ()=> {sarılıAnahtarVitrini.classList.remove ("barizlen");});
        sarılıAnahtarVitrini.textContent = `[${sarılıAnahtarTamponu}]`;
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "ECDSA", namedCurve: "P-384"},
        true,
        ["sign", "verify"])
    .then ((anahtarÇifti) => {
        const sarmalatanDüğme = document.querySelector (".jwk");
        sarmalatanDüğme.addEventListener ("click", ()=> {şifreAnahtarınıSar (anahtarÇifti.privateKey);});
    }); // then sonu...
})();
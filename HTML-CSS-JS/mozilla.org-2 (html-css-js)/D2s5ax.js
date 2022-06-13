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
        const sarılanAnahtar = await anahtarıAl (anahtarMalzemesi, rasgele16);
        rasgele12 = window.crypto.getRandomValues(new Uint8Array (12));
        const sarılım = await window.crypto.subtle.wrapKey (
            "pkcs8",
            sarılacakAnahtar,
            sarılanAnahtar,
            {name: "AES-GCM", iv: rasgele12}
        ); // con..sonu...
        const sarılanAnahtarTamponu = new Uint8Array (sarılım);
        const sarılanAnahtarVitrini = document.querySelector (".sarmalanan-anahtar");
        sarılanAnahtarVitrini.classList.add ("barizlen");
        sarılanAnahtarVitrini.addEventListener ("animationend", ()=> {sarılanAnahtarVitrini.classList.remove ("barizlen");});
        sarılanAnahtarVitrini.textContent = `[${sarılanAnahtarTamponu}]`;
    } // asy..sonu...

    window.crypto.subtle.generateKey (// Yüklenimde otomatik çalışan...
        {name: "RSA-PSS",
         modulusLength: 2048,
         publicExponent: new Uint8Array ([1, 0, 1]),
         hash: "SHA-256",},
        true,
        ["sign", "verify"])
    .then ((anahtarÇifti)=> {
        const sarmalatanDüğme = document.querySelector (".pkcs8");
        sarmalatanDüğme.addEventListener ("click", ()=> {şifreAnahtarınıSar (anahtarÇifti.privateKey);});
    }); // then sonu...
})();
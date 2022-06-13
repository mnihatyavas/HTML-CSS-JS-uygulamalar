(()=> {
    let rasgele16;
    let tesadüfi16;

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
            {"name": "AES-CBC", "length": 256},
            true,
            ["wrapKey", "unwrapKey"]
        ); // ret..sonu...
    } // func sonu...

    async function şifreAnahtarınıSar (sarılacakAnahtar) {
        const anahtarMalzemesi = await anahtarMalzemesiniAl();
        rasgele16 = window.crypto.getRandomValues (new Uint8Array (16));
        const sarılanAnahtar = await anahtarıAl (anahtarMalzemesi, rasgele16);
        tesadüfi16 = window.crypto.getRandomValues (new Uint8Array (16));
        const sarım = await window.crypto.subtle.wrapKey (
            "spki",
            sarılacakAnahtar,
            sarılanAnahtar,
            {name: "AES-CBC", iv: tesadüfi16}
        ); // con..sonu...
        const sarılıAnahtarTamponu = new Uint8Array (sarım);
        const sarılıAnahtarVitrini = document.querySelector (".sarmalanan-anahtar");
        sarılıAnahtarVitrini.classList.add ("barizlen");
        sarılıAnahtarVitrini.addEventListener ("animationend", ()=> {sarılıAnahtarVitrini.classList.remove ("barizlen");});
        sarılıAnahtarVitrini.textContent = `[${sarılıAnahtarTamponu}]`;
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "RSA-OAEP",
         modulusLength: 2048,
         publicExponent: new Uint8Array ([1, 0, 1]),
         hash: "SHA-256",},
        true,
        ["encrypt", "decrypt"])
    .then ((anahtarÇifti)=> {
        const sarmalatanDüğme = document.querySelector (".spki");
        sarmalatanDüğme.addEventListener ("click", ()=> {şifreAnahtarınıSar (anahtarÇifti.publicKey);});
    }); // then sonu...
})();
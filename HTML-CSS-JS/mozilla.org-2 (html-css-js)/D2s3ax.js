(()=> {
    function anahtarMalzemesiniAl() {
        const şifre = window.prompt ("Lütfen şifrenizi girin");
        const kodlayıcı = new TextEncoder();
        return window.crypto.subtle.importKey (
            "raw",
            kodlayıcı.encode (şifre),
            {name: "PBKDF2"}, 
            false, 
            ["deriveBits", "deriveKey"]
        ); // ret..sonu...
    } // func sonu...

    async function türetilenBitleriAl() {
        const anahtarMalzemesi = await anahtarMalzemesiniAl();
        let rasgele = window.crypto.getRandomValues (new Uint8Array (16));
        const türetilenBitler = await window.crypto.subtle.deriveBits (
            {"name": "PBKDF2",
             salt: rasgele,
             "iterations": 100000,
             "hash": "SHA-256"},
            anahtarMalzemesi,
            256
        ); // con..sonu...
        const tampon = new Uint8Array (türetilenBitler, 0, 5);
        const türetilenBitlerDeğeri = document.querySelector (".pbkdf2 .türetilen-bitler-değeri");
        türetilenBitlerDeğeri.classList.add ("tebarruz");
        türetilenBitlerDeğeri.addEventListener ("animationend", ()=> {türetilenBitlerDeğeri.classList.remove ("tebarruz");});
        türetilenBitlerDeğeri.textContent = `${tampon}...[Toplam ${türetilenBitler.byteLength} byte]`;
    } // asy..sonu...

    const türetilenBitlerDüğmesi = document.querySelector (".pbkdf2 .bitleri-türet-düğmesi");
    türetilenBitlerDüğmesi.addEventListener ("click", ()=> {türetilenBitleriAl();});
})();
(()=> {
    function anahtarMalzemesiniAl() {
        const þifre = window.prompt ("Lütfen þifrenizi girin");
        const kodlayýcý = new TextEncoder();
        return window.crypto.subtle.importKey (
            "raw",
            kodlayýcý.encode (þifre),
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
        const türetilenBitlerDeðeri = document.querySelector (".pbkdf2 .türetilen-bitler-deðeri");
        türetilenBitlerDeðeri.classList.add ("tebarruz");
        türetilenBitlerDeðeri.addEventListener ("animationend", ()=> {türetilenBitlerDeðeri.classList.remove ("tebarruz");});
        türetilenBitlerDeðeri.textContent = `${tampon}...[Toplam ${türetilenBitler.byteLength} byte]`;
    } // asy..sonu...

    const türetilenBitlerDüðmesi = document.querySelector (".pbkdf2 .bitleri-türet-düðmesi");
    türetilenBitlerDüðmesi.addEventListener ("click", ()=> {türetilenBitleriAl();});
})();
(()=> {
    function anahtarMalzemesiniAl() {
        const �ifre = window.prompt ("L�tfen �ifrenizi girin");
        const kodlay�c� = new TextEncoder();
        return window.crypto.subtle.importKey (
            "raw",
            kodlay�c�.encode (�ifre),
            {name: "PBKDF2"}, 
            false, 
            ["deriveBits", "deriveKey"]
        ); // ret..sonu...
    } // func sonu...

    async function t�retilenBitleriAl() {
        const anahtarMalzemesi = await anahtarMalzemesiniAl();
        let rasgele = window.crypto.getRandomValues (new Uint8Array (16));
        const t�retilenBitler = await window.crypto.subtle.deriveBits (
            {"name": "PBKDF2",
             salt: rasgele,
             "iterations": 100000,
             "hash": "SHA-256"},
            anahtarMalzemesi,
            256
        ); // con..sonu...
        const tampon = new Uint8Array (t�retilenBitler, 0, 5);
        const t�retilenBitlerDe�eri = document.querySelector (".pbkdf2 .t�retilen-bitler-de�eri");
        t�retilenBitlerDe�eri.classList.add ("tebarruz");
        t�retilenBitlerDe�eri.addEventListener ("animationend", ()=> {t�retilenBitlerDe�eri.classList.remove ("tebarruz");});
        t�retilenBitlerDe�eri.textContent = `${tampon}...[Toplam ${t�retilenBitler.byteLength} byte]`;
    } // asy..sonu...

    const t�retilenBitlerD��mesi = document.querySelector (".pbkdf2 .bitleri-t�ret-d��mesi");
    t�retilenBitlerD��mesi.addEventListener ("click", ()=> {t�retilenBitleriAl();});
})();
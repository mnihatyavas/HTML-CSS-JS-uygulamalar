(() => {// Her týklamada farklý sýr üretilmek isteniyorsa: "window.location.reload()" yapýlmalýdýr...
    async function paylaþýlanSýrrýTüret (özelAnahtar, genelAnahtar) {
        const paylaþýlanSýr = await window.crypto.subtle.deriveBits (
            {name: "ECDH",
             namedCurve: "P-384",
             public: genelAnahtar},
            özelAnahtar,
            256
        ); // con..sonu...
        const tampon = new Uint8Array (paylaþýlanSýr, 0, 5);
        const paylaþýlanSýrDeðeri = document.querySelector (".ecdh .türetilen-bitler-deðeri");
        paylaþýlanSýrDeðeri.classList.add ("tebarruz");
        paylaþýlanSýrDeðeri.addEventListener ("animationend", ()=> {paylaþýlanSýrDeðeri.classList.remove ("tebarruz");});
        paylaþýlanSýrDeðeri.textContent = `${tampon}...[Toplam ${paylaþýlanSýr.byteLength} byte]`;
    } // asy..sonu...

    const üretilenAliceAnahtarÇifti = window.crypto.subtle.generateKey (
        {name: "ECDH", namedCurve: "P-384"},
        false,
        ["deriveBits"]
    ); // con..sonu...
    const üretilenBobAnahtarÇifti = window.crypto.subtle.generateKey (
        {name: "ECDH", namedCurve: "P-384"},
        false,
        ["deriveBits"]
    ); // con..sonu...

    const türetilenBitlerDüðmesi = document.querySelector (".ecdh .bitleri-türet-düðmesi");
    türetilenBitlerDüðmesi.addEventListener ("click", ()=> {Promise.all ([üretilenAliceAnahtarÇifti, üretilenBobAnahtarÇifti]).then (deðerler => {
        paylaþýlanSýrrýTüret (deðerler [0].privateKey, deðerler [1].publicKey);
    }); }); // tür..sonu...
})();
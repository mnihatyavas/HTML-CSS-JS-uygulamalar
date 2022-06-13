(() => {// Her tıklamada farklı sır üretilmek isteniyorsa: "window.location.reload()" yapılmalıdır...
    async function paylaşılanSırrıTüret (özelAnahtar, genelAnahtar) {
        const paylaşılanSır = await window.crypto.subtle.deriveBits (
            {name: "ECDH",
             namedCurve: "P-384",
             public: genelAnahtar},
            özelAnahtar,
            256
        ); // con..sonu...
        const tampon = new Uint8Array (paylaşılanSır, 0, 5);
        const paylaşılanSırDeğeri = document.querySelector (".ecdh .türetilen-bitler-değeri");
        paylaşılanSırDeğeri.classList.add ("tebarruz");
        paylaşılanSırDeğeri.addEventListener ("animationend", ()=> {paylaşılanSırDeğeri.classList.remove ("tebarruz");});
        paylaşılanSırDeğeri.textContent = `${tampon}...[Toplam ${paylaşılanSır.byteLength} byte]`;
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

    const türetilenBitlerDüğmesi = document.querySelector (".ecdh .bitleri-türet-düğmesi");
    türetilenBitlerDüğmesi.addEventListener ("click", ()=> {Promise.all ([üretilenAliceAnahtarÇifti, üretilenBobAnahtarÇifti]).then (değerler => {
        paylaşılanSırrıTüret (değerler [0].privateKey, değerler [1].publicKey);
    }); }); // tür..sonu...
})();
(() => {// Her t�klamada farkl� s�r �retilmek isteniyorsa: "window.location.reload()" yap�lmal�d�r...
    async function payla��lanS�rr�T�ret (�zelAnahtar, genelAnahtar) {
        const payla��lanS�r = await window.crypto.subtle.deriveBits (
            {name: "ECDH",
             namedCurve: "P-384",
             public: genelAnahtar},
            �zelAnahtar,
            256
        ); // con..sonu...
        const tampon = new Uint8Array (payla��lanS�r, 0, 5);
        const payla��lanS�rDe�eri = document.querySelector (".ecdh .t�retilen-bitler-de�eri");
        payla��lanS�rDe�eri.classList.add ("tebarruz");
        payla��lanS�rDe�eri.addEventListener ("animationend", ()=> {payla��lanS�rDe�eri.classList.remove ("tebarruz");});
        payla��lanS�rDe�eri.textContent = `${tampon}...[Toplam ${payla��lanS�r.byteLength} byte]`;
    } // asy..sonu...

    const �retilenAliceAnahtar�ifti = window.crypto.subtle.generateKey (
        {name: "ECDH", namedCurve: "P-384"},
        false,
        ["deriveBits"]
    ); // con..sonu...
    const �retilenBobAnahtar�ifti = window.crypto.subtle.generateKey (
        {name: "ECDH", namedCurve: "P-384"},
        false,
        ["deriveBits"]
    ); // con..sonu...

    const t�retilenBitlerD��mesi = document.querySelector (".ecdh .bitleri-t�ret-d��mesi");
    t�retilenBitlerD��mesi.addEventListener ("click", ()=> {Promise.all ([�retilenAliceAnahtar�ifti, �retilenBobAnahtar�ifti]).then (de�erler => {
        payla��lanS�rr�T�ret (de�erler [0].privateKey, de�erler [1].publicKey);
    }); }); // t�r..sonu...
})();
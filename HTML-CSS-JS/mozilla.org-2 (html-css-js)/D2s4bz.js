(()=> {
    const jwkAnahtar� = {
      "crv": "P-384",
      "d": "wouCtU7Nw4E8_7n5C1-xBjB4xqSb_liZhYMsy8MGgxUny6Q8NCoH9xSiviwLFfK_",
      "ext": true,
      "key_ops": ["sign"],
      "kty": "EC",
      "x": "SzrRXmyI8VWFJg1dPUNbFcc9jZvjZEfH7ulKI1UkXAltd7RGWrcfFxqyGPcwu6AQ",
      "y": "hHUag3OvDzEr0uUQND4PXHQTXP5IDGdYhJhL-WLKjnGjQAw0rNGy5V29-aV-yseW"
    }; // con..sonu...
    let dijitalimzaAnahtar�;
    const imzalamaD��mesi = document.querySelector (".jwk .imzalama-d��mesi");

    function �zelAnahtar�Dahilet (jwk) {
        return window.crypto.subtle.importKey (
            "jwk",
            jwk,
            {name: "ECDSA", namedCurve: "P-384" },
            true,
            ["sign"]
        ); // ret..sonu...
    } // func sonu...

    function kodlananMesaj�Al() {
        const mesajKutusu = document.querySelector ("#jwk-mesaj�");
        const mesaj = mesajKutusu.value;
        const kodlay�c� = new TextEncoder();
        return kodlay�c�.encode (mesaj);
    } // func sonu...

    async function mesaj��mzala() {
        const kodlananMesaj = kodlananMesaj�Al();
        const dijital�mza = await window.crypto.subtle.sign (
            {name: "ECDSA", hash: "SHA-512"},
            dijitalimzaAnahtar�,
            kodlananMesaj
        ); // con..sonu...
        const imzaDe�eri = document.querySelector (".jwk .dijitalimza-de�eri");
        imzaDe�eri.classList.add ("tebarruz");
        imzaDe�eri.addEventListener ("animationend", ()=> {imzaDe�eri.classList.remove ("tebarruz");});
        const tampon = new Uint8Array (dijital�mza, 0, 5);
        imzaDe�eri.textContent = `Toplam ${tampon}...[${dijital�mza.byteLength} byte]`;
    } // func sonu...

    function imzaD��mesiniEtkinle�tir() {
        imzalamaD��mesi.classList.add ("tebarruz");
        imzalamaD��mesi.addEventListener ("animationend", ()=> {imzalamaD��mesi.classList.remove ("tebarruz");});
        imzalamaD��mesi.removeAttribute ("disabled");
        imzalamaD��mesi.classList.remove("gizli");
    } // func sonu...

    const ithalAnahtarD��mesi = document.querySelector (".jwk .ithal-anahtar-d��mesi");
    ithalAnahtarD��mesi.addEventListener ("click", async ()=> {
        dijitalimzaAnahtar� = await �zelAnahtar�Dahilet (jwkAnahtar�);
        imzaD��mesiniEtkinle�tir();
    }); // ith..sonu...
    imzalamaD��mesi.addEventListener ("click", mesaj��mzala);
})();
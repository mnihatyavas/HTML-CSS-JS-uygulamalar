(()=> {
    const jwkAnahtarý = {
      "crv": "P-384",
      "d": "wouCtU7Nw4E8_7n5C1-xBjB4xqSb_liZhYMsy8MGgxUny6Q8NCoH9xSiviwLFfK_",
      "ext": true,
      "key_ops": ["sign"],
      "kty": "EC",
      "x": "SzrRXmyI8VWFJg1dPUNbFcc9jZvjZEfH7ulKI1UkXAltd7RGWrcfFxqyGPcwu6AQ",
      "y": "hHUag3OvDzEr0uUQND4PXHQTXP5IDGdYhJhL-WLKjnGjQAw0rNGy5V29-aV-yseW"
    }; // con..sonu...
    let dijitalimzaAnahtarý;
    const imzalamaDüðmesi = document.querySelector (".jwk .imzalama-düðmesi");

    function özelAnahtarýDahilet (jwk) {
        return window.crypto.subtle.importKey (
            "jwk",
            jwk,
            {name: "ECDSA", namedCurve: "P-384" },
            true,
            ["sign"]
        ); // ret..sonu...
    } // func sonu...

    function kodlananMesajýAl() {
        const mesajKutusu = document.querySelector ("#jwk-mesajý");
        const mesaj = mesajKutusu.value;
        const kodlayýcý = new TextEncoder();
        return kodlayýcý.encode (mesaj);
    } // func sonu...

    async function mesajýÝmzala() {
        const kodlananMesaj = kodlananMesajýAl();
        const dijitalÝmza = await window.crypto.subtle.sign (
            {name: "ECDSA", hash: "SHA-512"},
            dijitalimzaAnahtarý,
            kodlananMesaj
        ); // con..sonu...
        const imzaDeðeri = document.querySelector (".jwk .dijitalimza-deðeri");
        imzaDeðeri.classList.add ("tebarruz");
        imzaDeðeri.addEventListener ("animationend", ()=> {imzaDeðeri.classList.remove ("tebarruz");});
        const tampon = new Uint8Array (dijitalÝmza, 0, 5);
        imzaDeðeri.textContent = `Toplam ${tampon}...[${dijitalÝmza.byteLength} byte]`;
    } // func sonu...

    function imzaDüðmesiniEtkinleþtir() {
        imzalamaDüðmesi.classList.add ("tebarruz");
        imzalamaDüðmesi.addEventListener ("animationend", ()=> {imzalamaDüðmesi.classList.remove ("tebarruz");});
        imzalamaDüðmesi.removeAttribute ("disabled");
        imzalamaDüðmesi.classList.remove("gizli");
    } // func sonu...

    const ithalAnahtarDüðmesi = document.querySelector (".jwk .ithal-anahtar-düðmesi");
    ithalAnahtarDüðmesi.addEventListener ("click", async ()=> {
        dijitalimzaAnahtarý = await özelAnahtarýDahilet (jwkAnahtarý);
        imzaDüðmesiniEtkinleþtir();
    }); // ith..sonu...
    imzalamaDüðmesi.addEventListener ("click", mesajýÝmzala);
})();
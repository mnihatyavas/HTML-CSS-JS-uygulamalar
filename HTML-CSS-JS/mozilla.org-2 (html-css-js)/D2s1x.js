(() => {let dijitalİmza;
    function kodlananMesajıAl() {
        const mesajKutusu = document.querySelector ("#rsa-pss-mesajı");
        let mesaj = mesajKutusu.value;
        let kodlayıcı = new TextEncoder();
        return kodlayıcı.encode (mesaj);
    } // func sonu...

    async function mesajıİmzala (imzaAnahtarı) {
        const imzaDeğeri = document.querySelector (".rsa-pss .imza-değeri");
        imzaDeğeri.classList.remove ("geçerli", "geçersiz");
        let kodlananMesajı = kodlananMesajıAl();
        dijitalİmza = await window.crypto.subtle.sign (
            {name: "RSA-PSS",
             saltLength: 32,
            },
            imzaAnahtarı,
            kodlananMesajı
        ); // imz..sonu...
        imzaDeğeri.classList.add ("tebarruz");
        imzaDeğeri.addEventListener ("animationend", ()=> {imzaDeğeri.classList.remove ("tebarruz");});
        let tampon = new Uint8Array (dijitalİmza, 0, 5);
        imzaDeğeri.textContent = `${tampon}...[Toplam ${dijitalİmza.byteLength} byte]`;
    } // asy..sonu...

    async function mesajıOnayla (onayAnahtarı) {
        const imzaDeğeri = document.querySelector (".rsa-pss .imza-değeri");
        imzaDeğeri.classList.remove ("geçerli", "geçersiz");
        let kodlananMesajı = kodlananMesajıAl();
        let sonuç = await window.crypto.subtle.verify (
            {name: "RSA-PSS", saltLength: 32,},
            onayAnahtarı,
            dijitalİmza,
            kodlananMesajı
        ); // let sonu...
        imzaDeğeri.classList.add (sonuç ? "geçerli" : "geçersiz");
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "RSA-PSS",
         modulusLength: 2048,
         publicExponent: new Uint8Array([1, 0, 1]),
         hash: "SHA-256",
        },
        true,
        ["sign", "verify"])
    .then ((anahtarÇifti) => {
        const imzaDüğmesi = document.querySelector (".rsa-pss .imza-düğmesi");
        imzaDüğmesi.addEventListener ("click", () => {mesajıİmzala (anahtarÇifti.privateKey);});
        const onayDüğmesi = document.querySelector (".rsa-pss .onay-düğmesi");
        onayDüğmesi.addEventListener ("click", () => {mesajıOnayla (anahtarÇifti.publicKey);});
    }); // win..sonu...

})();
(() => {let dijitalİmza;
    function kodlananMesajıAl() {
        const mesajKutusu = document.querySelector ("#hmac-mesajı");
        let mesaj = mesajKutusu.value;
        let kodlayıcı = new TextEncoder();
        return kodlayıcı.encode (mesaj);
    } // func sonu...

    async function mesajıİmzala (anahtar) {
        const imzaDeğeri = document.querySelector (".hmac .imza-değeri");
        imzaDeğeri.classList.remove ("geçerli", "geçersiz");
        let kodlananMesaj = kodlananMesajıAl();
        dijitalİmza = await window.crypto.subtle.sign (
            "HMAC",
            anahtar,
            kodlananMesaj
        ); // dij..sonu...
       imzaDeğeri.classList.add ("tebarruz");
       imzaDeğeri.addEventListener ("animationend", ()=> {imzaDeğeri.classList.remove ("tebarruz");});
       let bellek = new Uint8Array (dijitalİmza, 0, 5);
       imzaDeğeri.textContent = `${bellek}...[Toplam ${dijitalİmza.byteLength} byte]`;
    } // asy..sonu...

    async function mesajıOnayla (anahtar) {
        const imzaDeğeri = document.querySelector (".hmac .imza-değeri");
        imzaDeğeri.classList.remove ("geçerli", "geçersiz");
        let kodlananMesaj = kodlananMesajıAl();
        let sonuç = await window.crypto.subtle.verify (
            "HMAC",
            anahtar,
            dijitalİmza,
            kodlananMesaj
        ); // let sonu...
        imzaDeğeri.classList.add (sonuç ? "geçerli" : "geçersiz");
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "HMAC", hash: {name: "SHA-512"}},
        true,
        ["sign", "verify"])
    .then ((anahtar) => {
        const imzaDüğmesi = document.querySelector (".hmac .imza-düğmesi");
        imzaDüğmesi.addEventListener ("click", () => {mesajıİmzala (anahtar);});
        const onayDüğmesi = document.querySelector (".hmac .onay-düğmesi");
        onayDüğmesi.addEventListener ("click", () => {mesajıOnayla (anahtar);});
    }); // win..sonu...
})();
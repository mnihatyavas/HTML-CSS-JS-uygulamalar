(() => {let dijitalİmza;
    function kodlananMesajıAl() {
    const messageBox = document.querySelector("#ecdsa-mesajı");
    let message = messageBox.value;
    let enc = new TextEncoder();
    return enc.encode(message);
    } // func sonu...

    async function mesajıİmzala (imzaAnahtarı) {
        const imzaDeğeri = document.querySelector (".ecdsa .imza-değeri");
        imzaDeğeri.classList.remove ("geçerli", "geçersiz");
        let kodlananMesaj = kodlananMesajıAl();
        dijitalİmza = await window.crypto.subtle.sign (
            {name: "ECDSA", hash: {name: "SHA-384"},},
            imzaAnahtarı,
            kodlananMesaj
        ); // imza sonu...
        imzaDeğeri.classList.add ("tebarruz");
        imzaDeğeri.addEventListener ("animationend", ()=> {imzaDeğeri.classList.remove ("tebarruz");});
        let tampon = new Uint8Array (dijitalİmza, 0, 5);
        imzaDeğeri.textContent = `${tampon}...[Toplam ${dijitalİmza.byteLength} byte]`;
    } // asy..sonu...

    async function mesajıOnayla (onayAnahtarı) {
        const imzaDeğeri = document.querySelector (".ecdsa .imza-değeri");
        imzaDeğeri.classList.remove ("geçerli", "geçersiz");
        let kodlananMesaj = kodlananMesajıAl();
        let sonuç = await window.crypto.subtle.verify (
            {name: "ECDSA", hash: {name: "SHA-384"},},
            onayAnahtarı,
            dijitalİmza,
            kodlananMesaj
        ); // let sonu...
        imzaDeğeri.classList.add (sonuç ? "geçerli" : "geçersiz");
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "ECDSA", namedCurve: "P-384"},
        true,
        ["sign", "verify"])
    .then ((anahtarÇifti)=> {
        const imzaDüğmesi = document.querySelector (".ecdsa .imza-düğmesi");
        imzaDüğmesi.addEventListener ("click", ()=> {mesajıİmzala (anahtarÇifti.privateKey);});
        const onayDüğmesi = document.querySelector (".ecdsa .onay-düğmesi");
        onayDüğmesi.addEventListener ("click", ()=> {mesajıOnayla (anahtarÇifti.publicKey);});
    }); // win..sonu...
})();
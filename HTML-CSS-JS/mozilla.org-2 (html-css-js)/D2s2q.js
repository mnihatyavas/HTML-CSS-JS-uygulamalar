(() => {let şifreliMetin;
    function kodlananMesajıAl() {
        const mesajKutusu = document.querySelector("#rsa-oaep-mesajı");
        let mesaj = mesajKutusu.value;
        let kodlayıcı = new TextEncoder();
        return kodlayıcı.encode (mesaj);
    } // func sonu...

    async function mesajıŞifrele (anahtar) {
        let kodluMesaj = kodlananMesajıAl();
        şifreliMetin = await window.crypto.subtle.encrypt (
            {name: "RSA-OAEP"},
            anahtar,
            kodluMesaj
        ); // şif..sonu...
        let tampon = new Uint8Array (şifreliMetin, 0, 5);
        const şifrelimetinDeğeri = document.querySelector (".rsa-oaep .şifrelimetin-değeri");
        şifrelimetinDeğeri.classList.add ("tebarruz");
        şifrelimetinDeğeri.addEventListener ("animationend", ()=> {şifrelimetinDeğeri.classList.remove ("tebarruz");});
        şifrelimetinDeğeri.textContent = `${tampon}...[Toplam ${şifreliMetin.byteLength} byte]`;
    } // asy..sonu...

    async function mesajıDeşifrele (anahtar) {
        let deşifreliMetin = await window.crypto.subtle.decrypt (
            {name: "RSA-OAEP"},
            anahtar,
            şifreliMetin
        ); // let sonu...
        let deşifreleyici = new TextDecoder();
        const deşifrelimetinDeğeri = document.querySelector (".rsa-oaep .deşifrelimetin-değeri");
        deşifrelimetinDeğeri.classList.add ("tebarruz");
        deşifrelimetinDeğeri.addEventListener ("animationend", ()=> {deşifrelimetinDeğeri.classList.remove ("tebarruz");});
        deşifrelimetinDeğeri.textContent = deşifreleyici.decode (deşifreliMetin);
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {
         name: "RSA-OAEP",
         modulusLength: 2048,
         publicExponent: new Uint8Array ([1, 0, 1]),
         hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"])
    .then ((anahtarÇifti)=> {
        const şifreDüğmesi = document.querySelector (".rsa-oaep .şifre-düğmesi");
        şifreDüğmesi.addEventListener ("click", ()=> {mesajıŞifrele (anahtarÇifti.publicKey);});
        const deşifreDüğmesi = document.querySelector (".rsa-oaep .deşifre-düğmesi");
        deşifreDüğmesi.addEventListener ("click", ()=> {mesajıDeşifrele (anahtarÇifti.privateKey);});
    }); // win..sonu...
})();
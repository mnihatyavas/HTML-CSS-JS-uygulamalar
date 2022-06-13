(() => {let şifreliMetin, iv;

     function kodlananMesajıAl() {
        const mesajKutusu = document.querySelector ("#aes-gcm-mesajı");
        let mesaj = mesajKutusu.value;
        let kodlayıcı = new TextEncoder();
        return kodlayıcı.encode (mesaj);
    } // func sonu...

    async function mesajıŞifrele (anahtar) {
        let kodlananMesaj = kodlananMesajıAl();
        iv = window.crypto.getRandomValues (new Uint8Array (12));
        şifreliMetin = await window.crypto.subtle.encrypt (
            {name: "AES-GCM", iv: iv},
            anahtar,
            kodlananMesaj
        ); // şif..sonu...
        let tampon = new Uint8Array (şifreliMetin, 0, 5);
        const şifrelimetinDeğeri = document.querySelector (".aes-gcm .şifrelimetin-değeri");
        şifrelimetinDeğeri.classList.add ("tebarruz");
        şifrelimetinDeğeri.addEventListener ("animationend", ()=> {şifrelimetinDeğeri.classList.remove ("tebarruz");});
        şifrelimetinDeğeri.textContent = `${tampon}...[Toplam ${şifreliMetin.byteLength} byte]`;
    } // asy..sonu...

    async function mesajıDeşifrele (anahtar) {
        let deşifreliMetin = await window.crypto.subtle.decrypt (
            {name: "AES-GCM", iv: iv},
            anahtar,
            şifreliMetin
        ); // let sonu...
        let dekodlayıcı = new TextDecoder();
        const deşifrelimetinDeğeri = document.querySelector (".aes-gcm .deşifrelimetin-değeri");
        deşifrelimetinDeğeri.classList.add ("tebarruz");
        deşifrelimetinDeğeri.addEventListener ("animationend", ()=> {deşifrelimetinDeğeri.classList.remove ("tebarruz");});
        deşifrelimetinDeğeri.textContent = dekodlayıcı.decode (deşifreliMetin);
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "AES-GCM", length: 256,},
        true,
        ["encrypt", "decrypt"])
    .then ((anahtar)=> {
        const şifreDüğmesi = document.querySelector (".aes-gcm .şifre-düğmesi");
        şifreDüğmesi.addEventListener ("click", ()=> {mesajıŞifrele (anahtar);});
        const deşifreDüğmesi = document.querySelector (".aes-gcm .deşifre-düğmesi");
        deşifreDüğmesi.addEventListener ("click", ()=> {mesajıDeşifrele (anahtar);});
    }); // win..sonu...
})();
(() => {let şifreliMetin;
    let counter;

    function kodlananMetniAl() {
        const mesajKutusu = document.querySelector ("#aes-ctr-mesajı");
        let mesaj = mesajKutusu.value;
        let kodlayıcı = new TextEncoder();
        return kodlayıcı.encode (mesaj);
    } // func sonu...

    async function mesajıŞifrele (anahtar) {
        let kodlananMetin = kodlananMetniAl();
        counter = window.crypto.getRandomValues (new Uint8Array (16)),
        şifreliMetin = await window.crypto.subtle.encrypt (
            {name: "AES-CTR", counter, length: 64},
            anahtar,
            kodlananMetin
        ); // şif..sonu...
        let tampon = new Uint8Array (şifreliMetin, 0, 5);
        const şifrelimetinDeğeri = document.querySelector (".aes-ctr .şifrelimetin-değeri");
        şifrelimetinDeğeri.classList.add ("tebarruz");
        şifrelimetinDeğeri.addEventListener ("animationend", ()=> {şifrelimetinDeğeri.classList.remove ("tebarruz");});
        şifrelimetinDeğeri.textContent = `${tampon}...[Toplam ${şifreliMetin.byteLength} byte]`;
    } // asy..sonu...

    async function mesajıDeşifrele (anahtar) {
        let deşifreliMetin = await window.crypto.subtle.decrypt (
            {name: "AES-CTR", counter, length: 64},
            anahtar,
            şifreliMetin
        ); // let sonu...
        let dekodlayıcı = new TextDecoder();
        const deşifreliMetinValue = document.querySelector (".aes-ctr .deşifrelimetin-değeri");
        deşifreliMetinValue.classList.add ("tebarruz");
        deşifreliMetinValue.addEventListener ("animationend", ()=> {deşifreliMetinValue.classList.remove ("tebarruz");});
        deşifreliMetinValue.textContent = dekodlayıcı.decode (deşifreliMetin);
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "AES-CTR", length: 256},
        true,
        ["encrypt", "decrypt"])
    .then ((anahtar)=> {
        const şifreDüğmesi = document.querySelector (".aes-ctr .şifre-düğmesi");
        şifreDüğmesi.addEventListener ("click", ()=> {mesajıŞifrele (anahtar);});
        const deşifreDüğmesi = document.querySelector (".aes-ctr .deşifre-düğmesi");
        deşifreDüğmesi.addEventListener ("click", ()=> {mesajıDeşifrele (anahtar);});
    }); // win..sonu...
})();
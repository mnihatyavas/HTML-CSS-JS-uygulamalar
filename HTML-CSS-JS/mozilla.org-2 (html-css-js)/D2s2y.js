(() => {let şifreliMetin;
    let iv; // Her tıklamada farklı gelişigüzel şifreleme

    function kodlananMetniAl() {
        const mesajKutusu = document.querySelector ("#aes-cbc-mesajı");
        let mesaj = mesajKutusu.value;
        let kodlayıcı = new TextEncoder();
        return kodlayıcı.encode (mesaj);
    } // func sonu...

    async function mesajıŞifrele (anahtar) {
        let kodlananMetin = kodlananMetniAl();
        iv = window.crypto.getRandomValues (new Uint8Array (16));
        şifreliMetin = await window.crypto.subtle.encrypt (
            {name: "AES-CBC", iv},
            anahtar,
            kodlananMetin
        ); // şif..sonu...
        let tampon = new Uint8Array (şifreliMetin, 0, 5);
        const şifrelimetinDeğeri = document.querySelector (".aes-cbc .şifrelimetin-değeri");
        şifrelimetinDeğeri.classList.add ("tebarruz");
        şifrelimetinDeğeri.addEventListener ("animationend", ()=> {şifrelimetinDeğeri.classList.remove ("tebarruz");});
        şifrelimetinDeğeri.textContent = `${tampon}...[Toplam ${şifreliMetin.byteLength} byte]`;
    } // asy..sonu...

    async function mesajıDeşifrele (anahtar) {
        let deşifreliMetin = await window.crypto.subtle.decrypt (
            {name: "AES-CBC", iv},
            anahtar,
            şifreliMetin
        ); // let sonu...
        let dekodlayıcı = new TextDecoder();
        const deşifrelimetinDeğeri = document.querySelector (".aes-cbc .deşifrelimetin-değeri");
        deşifrelimetinDeğeri.classList.add ("tebarruz");
        deşifrelimetinDeğeri.addEventListener ("animationend", ()=> {deşifrelimetinDeğeri.classList.remove ("tebarruz");});
        deşifrelimetinDeğeri.textContent = dekodlayıcı.decode (deşifreliMetin);
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "AES-CBC",
         length: 256},
        true,
        ["encrypt", "decrypt"])
    .then ((anahtar)=> {
        const şifreDüğmesi = document.querySelector (".aes-cbc .şifre-düğmesi");
        şifreDüğmesi.addEventListener ("click", () => {mesajıŞifrele (anahtar);});
        const deşifreDüğmesi = document.querySelector (".aes-cbc .deşifre-düğmesi");
        deşifreDüğmesi.addEventListener ("click", ()=> {mesajıDeşifrele (anahtar);});
    }); // win..sonu...
})();
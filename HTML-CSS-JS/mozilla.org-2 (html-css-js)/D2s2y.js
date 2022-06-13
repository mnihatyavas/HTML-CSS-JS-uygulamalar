(() => {let �ifreliMetin;
    let iv; // Her t�klamada farkl� geli�ig�zel �ifreleme

    function kodlananMetniAl() {
        const mesajKutusu = document.querySelector ("#aes-cbc-mesaj�");
        let mesaj = mesajKutusu.value;
        let kodlay�c� = new TextEncoder();
        return kodlay�c�.encode (mesaj);
    } // func sonu...

    async function mesaj��ifrele (anahtar) {
        let kodlananMetin = kodlananMetniAl();
        iv = window.crypto.getRandomValues (new Uint8Array (16));
        �ifreliMetin = await window.crypto.subtle.encrypt (
            {name: "AES-CBC", iv},
            anahtar,
            kodlananMetin
        ); // �if..sonu...
        let tampon = new Uint8Array (�ifreliMetin, 0, 5);
        const �ifrelimetinDe�eri = document.querySelector (".aes-cbc .�ifrelimetin-de�eri");
        �ifrelimetinDe�eri.classList.add ("tebarruz");
        �ifrelimetinDe�eri.addEventListener ("animationend", ()=> {�ifrelimetinDe�eri.classList.remove ("tebarruz");});
        �ifrelimetinDe�eri.textContent = `${tampon}...[Toplam ${�ifreliMetin.byteLength} byte]`;
    } // asy..sonu...

    async function mesaj�De�ifrele (anahtar) {
        let de�ifreliMetin = await window.crypto.subtle.decrypt (
            {name: "AES-CBC", iv},
            anahtar,
            �ifreliMetin
        ); // let sonu...
        let dekodlay�c� = new TextDecoder();
        const de�ifrelimetinDe�eri = document.querySelector (".aes-cbc .de�ifrelimetin-de�eri");
        de�ifrelimetinDe�eri.classList.add ("tebarruz");
        de�ifrelimetinDe�eri.addEventListener ("animationend", ()=> {de�ifrelimetinDe�eri.classList.remove ("tebarruz");});
        de�ifrelimetinDe�eri.textContent = dekodlay�c�.decode (de�ifreliMetin);
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "AES-CBC",
         length: 256},
        true,
        ["encrypt", "decrypt"])
    .then ((anahtar)=> {
        const �ifreD��mesi = document.querySelector (".aes-cbc .�ifre-d��mesi");
        �ifreD��mesi.addEventListener ("click", () => {mesaj��ifrele (anahtar);});
        const de�ifreD��mesi = document.querySelector (".aes-cbc .de�ifre-d��mesi");
        de�ifreD��mesi.addEventListener ("click", ()=> {mesaj�De�ifrele (anahtar);});
    }); // win..sonu...
})();
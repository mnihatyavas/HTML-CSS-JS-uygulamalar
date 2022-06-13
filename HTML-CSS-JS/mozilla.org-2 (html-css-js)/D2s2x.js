(() => {let �ifreliMetin;
    let counter;

    function kodlananMetniAl() {
        const mesajKutusu = document.querySelector ("#aes-ctr-mesaj�");
        let mesaj = mesajKutusu.value;
        let kodlay�c� = new TextEncoder();
        return kodlay�c�.encode (mesaj);
    } // func sonu...

    async function mesaj��ifrele (anahtar) {
        let kodlananMetin = kodlananMetniAl();
        counter = window.crypto.getRandomValues (new Uint8Array (16)),
        �ifreliMetin = await window.crypto.subtle.encrypt (
            {name: "AES-CTR", counter, length: 64},
            anahtar,
            kodlananMetin
        ); // �if..sonu...
        let tampon = new Uint8Array (�ifreliMetin, 0, 5);
        const �ifrelimetinDe�eri = document.querySelector (".aes-ctr .�ifrelimetin-de�eri");
        �ifrelimetinDe�eri.classList.add ("tebarruz");
        �ifrelimetinDe�eri.addEventListener ("animationend", ()=> {�ifrelimetinDe�eri.classList.remove ("tebarruz");});
        �ifrelimetinDe�eri.textContent = `${tampon}...[Toplam ${�ifreliMetin.byteLength} byte]`;
    } // asy..sonu...

    async function mesaj�De�ifrele (anahtar) {
        let de�ifreliMetin = await window.crypto.subtle.decrypt (
            {name: "AES-CTR", counter, length: 64},
            anahtar,
            �ifreliMetin
        ); // let sonu...
        let dekodlay�c� = new TextDecoder();
        const de�ifreliMetinValue = document.querySelector (".aes-ctr .de�ifrelimetin-de�eri");
        de�ifreliMetinValue.classList.add ("tebarruz");
        de�ifreliMetinValue.addEventListener ("animationend", ()=> {de�ifreliMetinValue.classList.remove ("tebarruz");});
        de�ifreliMetinValue.textContent = dekodlay�c�.decode (de�ifreliMetin);
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "AES-CTR", length: 256},
        true,
        ["encrypt", "decrypt"])
    .then ((anahtar)=> {
        const �ifreD��mesi = document.querySelector (".aes-ctr .�ifre-d��mesi");
        �ifreD��mesi.addEventListener ("click", ()=> {mesaj��ifrele (anahtar);});
        const de�ifreD��mesi = document.querySelector (".aes-ctr .de�ifre-d��mesi");
        de�ifreD��mesi.addEventListener ("click", ()=> {mesaj�De�ifrele (anahtar);});
    }); // win..sonu...
})();
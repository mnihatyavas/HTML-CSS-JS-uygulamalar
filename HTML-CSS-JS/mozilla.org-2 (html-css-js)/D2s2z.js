(() => {let �ifreliMetin, iv;

     function kodlananMesaj�Al() {
        const mesajKutusu = document.querySelector ("#aes-gcm-mesaj�");
        let mesaj = mesajKutusu.value;
        let kodlay�c� = new TextEncoder();
        return kodlay�c�.encode (mesaj);
    } // func sonu...

    async function mesaj��ifrele (anahtar) {
        let kodlananMesaj = kodlananMesaj�Al();
        iv = window.crypto.getRandomValues (new Uint8Array (12));
        �ifreliMetin = await window.crypto.subtle.encrypt (
            {name: "AES-GCM", iv: iv},
            anahtar,
            kodlananMesaj
        ); // �if..sonu...
        let tampon = new Uint8Array (�ifreliMetin, 0, 5);
        const �ifrelimetinDe�eri = document.querySelector (".aes-gcm .�ifrelimetin-de�eri");
        �ifrelimetinDe�eri.classList.add ("tebarruz");
        �ifrelimetinDe�eri.addEventListener ("animationend", ()=> {�ifrelimetinDe�eri.classList.remove ("tebarruz");});
        �ifrelimetinDe�eri.textContent = `${tampon}...[Toplam ${�ifreliMetin.byteLength} byte]`;
    } // asy..sonu...

    async function mesaj�De�ifrele (anahtar) {
        let de�ifreliMetin = await window.crypto.subtle.decrypt (
            {name: "AES-GCM", iv: iv},
            anahtar,
            �ifreliMetin
        ); // let sonu...
        let dekodlay�c� = new TextDecoder();
        const de�ifrelimetinDe�eri = document.querySelector (".aes-gcm .de�ifrelimetin-de�eri");
        de�ifrelimetinDe�eri.classList.add ("tebarruz");
        de�ifrelimetinDe�eri.addEventListener ("animationend", ()=> {de�ifrelimetinDe�eri.classList.remove ("tebarruz");});
        de�ifrelimetinDe�eri.textContent = dekodlay�c�.decode (de�ifreliMetin);
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "AES-GCM", length: 256,},
        true,
        ["encrypt", "decrypt"])
    .then ((anahtar)=> {
        const �ifreD��mesi = document.querySelector (".aes-gcm .�ifre-d��mesi");
        �ifreD��mesi.addEventListener ("click", ()=> {mesaj��ifrele (anahtar);});
        const de�ifreD��mesi = document.querySelector (".aes-gcm .de�ifre-d��mesi");
        de�ifreD��mesi.addEventListener ("click", ()=> {mesaj�De�ifrele (anahtar);});
    }); // win..sonu...
})();
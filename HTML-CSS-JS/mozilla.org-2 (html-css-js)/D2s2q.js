(() => {let �ifreliMetin;
    function kodlananMesaj�Al() {
        const mesajKutusu = document.querySelector("#rsa-oaep-mesaj�");
        let mesaj = mesajKutusu.value;
        let kodlay�c� = new TextEncoder();
        return kodlay�c�.encode (mesaj);
    } // func sonu...

    async function mesaj��ifrele (anahtar) {
        let kodluMesaj = kodlananMesaj�Al();
        �ifreliMetin = await window.crypto.subtle.encrypt (
            {name: "RSA-OAEP"},
            anahtar,
            kodluMesaj
        ); // �if..sonu...
        let tampon = new Uint8Array (�ifreliMetin, 0, 5);
        const �ifrelimetinDe�eri = document.querySelector (".rsa-oaep .�ifrelimetin-de�eri");
        �ifrelimetinDe�eri.classList.add ("tebarruz");
        �ifrelimetinDe�eri.addEventListener ("animationend", ()=> {�ifrelimetinDe�eri.classList.remove ("tebarruz");});
        �ifrelimetinDe�eri.textContent = `${tampon}...[Toplam ${�ifreliMetin.byteLength} byte]`;
    } // asy..sonu...

    async function mesaj�De�ifrele (anahtar) {
        let de�ifreliMetin = await window.crypto.subtle.decrypt (
            {name: "RSA-OAEP"},
            anahtar,
            �ifreliMetin
        ); // let sonu...
        let de�ifreleyici = new TextDecoder();
        const de�ifrelimetinDe�eri = document.querySelector (".rsa-oaep .de�ifrelimetin-de�eri");
        de�ifrelimetinDe�eri.classList.add ("tebarruz");
        de�ifrelimetinDe�eri.addEventListener ("animationend", ()=> {de�ifrelimetinDe�eri.classList.remove ("tebarruz");});
        de�ifrelimetinDe�eri.textContent = de�ifreleyici.decode (de�ifreliMetin);
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
    .then ((anahtar�ifti)=> {
        const �ifreD��mesi = document.querySelector (".rsa-oaep .�ifre-d��mesi");
        �ifreD��mesi.addEventListener ("click", ()=> {mesaj��ifrele (anahtar�ifti.publicKey);});
        const de�ifreD��mesi = document.querySelector (".rsa-oaep .de�ifre-d��mesi");
        de�ifreD��mesi.addEventListener ("click", ()=> {mesaj�De�ifrele (anahtar�ifti.privateKey);});
    }); // win..sonu...
})();
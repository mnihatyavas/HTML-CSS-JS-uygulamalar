(() => {
    let rasgele12;
    let �ifreliMetin;

    function mesajKodlamas�n�Al() {
        let mesaj = document.querySelector ("#ecdh-mesaj�").value;
        let kodlay�c� = new TextEncoder();
         return kodlay�c�.encode (mesaj);
    } // func sonu...

    async function �ifrele (gizliAnahtar) {
        const �ifrelimetinDe�eri = document.querySelector (".ecdh .�ifrelimetin-de�eri");
        �ifrelimetinDe�eri.textContent = "";
        const de�ifrelimetinDe�eri = document.querySelector (".ecdh .de�ifrelimetin-de�eri");
        de�ifrelimetinDe�eri.textContent = "";
        rasgele12 = window.crypto.getRandomValues (new Uint8Array (12));
        let kodlananMesaj = mesajKodlamas�n�Al();
        �ifreliMetin = await window.crypto.subtle.encrypt (
            {name: "AES-GCM", iv: rasgele12},
            gizliAnahtar,
            kodlananMesaj
        ); // �if..sonu...
        let tampon = new Uint8Array (�ifreliMetin, 0, 5);
        �ifrelimetinDe�eri.classList.add ("tebarruz");
        �ifrelimetinDe�eri.addEventListener ("animationend", ()=> {�ifrelimetinDe�eri.classList.remove ("tebarruz");});
        �ifrelimetinDe�eri.textContent = `Toplam ${tampon}...[${�ifreliMetin.byteLength} byte]`;
    } // asy..sonu...

    async function de�ifrele (gizliAnahtar) {
        const de�ifrelimetinDe�eri = document.querySelector (".ecdh .de�ifrelimetin-de�eri");
        de�ifrelimetinDe�eri.textContent = "";
        de�ifrelimetinDe�eri.classList.remove ("hata");
        try {
            let de�ifreliMetin = await window.crypto.subtle.decrypt (
                {name: "AES-GCM", iv: rasgele12},
                gizliAnahtar,
                �ifreliMetin
            ); // let sonu...
            let dekodlay�c� = new TextDecoder();
            de�ifrelimetinDe�eri.classList.add ("tebarruz");
            de�ifrelimetinDe�eri.addEventListener ("animationend", ()=> {de�ifrelimetinDe�eri.classList.remove ("tebarruz");});
            de�ifrelimetinDe�eri.textContent = dekodlay�c�.decode (de�ifreliMetin);
        } catch (hata) {
            de�ifrelimetinDe�eri.classList.add ("tebarruz");
            de�ifrelimetinDe�eri.addEventListener ("animationend", () => {de�ifrelimetinDe�eri.classList.remove ("tebarruz");});
            de�ifrelimetinDe�eri.classList.add ("hata");
            de�ifrelimetinDe�eri.textContent = "*** De�ifreleme hatas� ***";
        } // try-catch sonu...
    } // asy..sonu...

    function gizliAnahtar�T�ret (�zelAnahtar, genelAnahtar) {// Bu taraf�n �zel, di�er taraf�n genel anahtar�yla...
        return window.crypto.subtle.deriveKey (
            {name: "ECDH", public: genelAnahtar},
            �zelAnahtar,
            {name: "AES-GCM", length: 256},
            false,
            ["encrypt", "decrypt"]
        ); // ret..sonu...
    } // func sonu...

    async function ortakS�rAnahtar�Yarat() {
        let aliceAnahtar�ifti = await window.crypto.subtle.generateKey (
            {name: "ECDH", namedCurve: "P-384"},
            false,
            ["deriveKey"]
        ); // let sonu...
        let bobAnahtar�ifti = await window.crypto.subtle.generateKey (
            {name: "ECDH", namedCurve: "P-384"},
            false,
            ["deriveKey"]
        ); // let sonu...
        let aliceGizliAnahtar� = await gizliAnahtar�T�ret (aliceAnahtar�ifti.privateKey, bobAnahtar�ifti.publicKey);
        let bobGizliAnahtar� = await gizliAnahtar�T�ret (bobAnahtar�ifti.privateKey, aliceAnahtar�ifti.publicKey);
        let �ifreleD��mesi = document.querySelector (".ecdh .�ifrele-d��mesi");
        �ifreleD��mesi.addEventListener ("click", ()=> {�ifrele (aliceGizliAnahtar�);});
        let de�ifreleD��mesi = document.querySelector (".ecdh .de�ifrele-d��mesi");
        de�ifreleD��mesi.addEventListener ("click", ()=> {de�ifrele (bobGizliAnahtar�);});
    } // asy..sonu...

    ortakS�rAnahtar�Yarat();
})();
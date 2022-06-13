(() => {
    let rasgele12;
    let þifreliMetin;

    function mesajKodlamasýnýAl() {
        let mesaj = document.querySelector ("#ecdh-mesajý").value;
        let kodlayýcý = new TextEncoder();
         return kodlayýcý.encode (mesaj);
    } // func sonu...

    async function þifrele (gizliAnahtar) {
        const þifrelimetinDeðeri = document.querySelector (".ecdh .þifrelimetin-deðeri");
        þifrelimetinDeðeri.textContent = "";
        const deþifrelimetinDeðeri = document.querySelector (".ecdh .deþifrelimetin-deðeri");
        deþifrelimetinDeðeri.textContent = "";
        rasgele12 = window.crypto.getRandomValues (new Uint8Array (12));
        let kodlananMesaj = mesajKodlamasýnýAl();
        þifreliMetin = await window.crypto.subtle.encrypt (
            {name: "AES-GCM", iv: rasgele12},
            gizliAnahtar,
            kodlananMesaj
        ); // þif..sonu...
        let tampon = new Uint8Array (þifreliMetin, 0, 5);
        þifrelimetinDeðeri.classList.add ("tebarruz");
        þifrelimetinDeðeri.addEventListener ("animationend", ()=> {þifrelimetinDeðeri.classList.remove ("tebarruz");});
        þifrelimetinDeðeri.textContent = `Toplam ${tampon}...[${þifreliMetin.byteLength} byte]`;
    } // asy..sonu...

    async function deþifrele (gizliAnahtar) {
        const deþifrelimetinDeðeri = document.querySelector (".ecdh .deþifrelimetin-deðeri");
        deþifrelimetinDeðeri.textContent = "";
        deþifrelimetinDeðeri.classList.remove ("hata");
        try {
            let deþifreliMetin = await window.crypto.subtle.decrypt (
                {name: "AES-GCM", iv: rasgele12},
                gizliAnahtar,
                þifreliMetin
            ); // let sonu...
            let dekodlayýcý = new TextDecoder();
            deþifrelimetinDeðeri.classList.add ("tebarruz");
            deþifrelimetinDeðeri.addEventListener ("animationend", ()=> {deþifrelimetinDeðeri.classList.remove ("tebarruz");});
            deþifrelimetinDeðeri.textContent = dekodlayýcý.decode (deþifreliMetin);
        } catch (hata) {
            deþifrelimetinDeðeri.classList.add ("tebarruz");
            deþifrelimetinDeðeri.addEventListener ("animationend", () => {deþifrelimetinDeðeri.classList.remove ("tebarruz");});
            deþifrelimetinDeðeri.classList.add ("hata");
            deþifrelimetinDeðeri.textContent = "*** Deþifreleme hatasý ***";
        } // try-catch sonu...
    } // asy..sonu...

    function gizliAnahtarýTüret (özelAnahtar, genelAnahtar) {// Bu tarafýn özel, diðer tarafýn genel anahtarýyla...
        return window.crypto.subtle.deriveKey (
            {name: "ECDH", public: genelAnahtar},
            özelAnahtar,
            {name: "AES-GCM", length: 256},
            false,
            ["encrypt", "decrypt"]
        ); // ret..sonu...
    } // func sonu...

    async function ortakSýrAnahtarýYarat() {
        let aliceAnahtarÇifti = await window.crypto.subtle.generateKey (
            {name: "ECDH", namedCurve: "P-384"},
            false,
            ["deriveKey"]
        ); // let sonu...
        let bobAnahtarÇifti = await window.crypto.subtle.generateKey (
            {name: "ECDH", namedCurve: "P-384"},
            false,
            ["deriveKey"]
        ); // let sonu...
        let aliceGizliAnahtarý = await gizliAnahtarýTüret (aliceAnahtarÇifti.privateKey, bobAnahtarÇifti.publicKey);
        let bobGizliAnahtarý = await gizliAnahtarýTüret (bobAnahtarÇifti.privateKey, aliceAnahtarÇifti.publicKey);
        let þifreleDüðmesi = document.querySelector (".ecdh .þifrele-düðmesi");
        þifreleDüðmesi.addEventListener ("click", ()=> {þifrele (aliceGizliAnahtarý);});
        let deþifreleDüðmesi = document.querySelector (".ecdh .deþifrele-düðmesi");
        deþifreleDüðmesi.addEventListener ("click", ()=> {deþifrele (bobGizliAnahtarý);});
    } // asy..sonu...

    ortakSýrAnahtarýYarat();
})();
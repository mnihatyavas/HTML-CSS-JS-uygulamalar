(() => {
    let rasgele12;
    let şifreliMetin;

    function mesajKodlamasınıAl() {
        let mesaj = document.querySelector ("#ecdh-mesajı").value;
        let kodlayıcı = new TextEncoder();
         return kodlayıcı.encode (mesaj);
    } // func sonu...

    async function şifrele (gizliAnahtar) {
        const şifrelimetinDeğeri = document.querySelector (".ecdh .şifrelimetin-değeri");
        şifrelimetinDeğeri.textContent = "";
        const deşifrelimetinDeğeri = document.querySelector (".ecdh .deşifrelimetin-değeri");
        deşifrelimetinDeğeri.textContent = "";
        rasgele12 = window.crypto.getRandomValues (new Uint8Array (12));
        let kodlananMesaj = mesajKodlamasınıAl();
        şifreliMetin = await window.crypto.subtle.encrypt (
            {name: "AES-GCM", iv: rasgele12},
            gizliAnahtar,
            kodlananMesaj
        ); // şif..sonu...
        let tampon = new Uint8Array (şifreliMetin, 0, 5);
        şifrelimetinDeğeri.classList.add ("tebarruz");
        şifrelimetinDeğeri.addEventListener ("animationend", ()=> {şifrelimetinDeğeri.classList.remove ("tebarruz");});
        şifrelimetinDeğeri.textContent = `Toplam ${tampon}...[${şifreliMetin.byteLength} byte]`;
    } // asy..sonu...

    async function deşifrele (gizliAnahtar) {
        const deşifrelimetinDeğeri = document.querySelector (".ecdh .deşifrelimetin-değeri");
        deşifrelimetinDeğeri.textContent = "";
        deşifrelimetinDeğeri.classList.remove ("hata");
        try {
            let deşifreliMetin = await window.crypto.subtle.decrypt (
                {name: "AES-GCM", iv: rasgele12},
                gizliAnahtar,
                şifreliMetin
            ); // let sonu...
            let dekodlayıcı = new TextDecoder();
            deşifrelimetinDeğeri.classList.add ("tebarruz");
            deşifrelimetinDeğeri.addEventListener ("animationend", ()=> {deşifrelimetinDeğeri.classList.remove ("tebarruz");});
            deşifrelimetinDeğeri.textContent = dekodlayıcı.decode (deşifreliMetin);
        } catch (hata) {
            deşifrelimetinDeğeri.classList.add ("tebarruz");
            deşifrelimetinDeğeri.addEventListener ("animationend", () => {deşifrelimetinDeğeri.classList.remove ("tebarruz");});
            deşifrelimetinDeğeri.classList.add ("hata");
            deşifrelimetinDeğeri.textContent = "*** Deşifreleme hatası ***";
        } // try-catch sonu...
    } // asy..sonu...

    function gizliAnahtarıTüret (özelAnahtar, genelAnahtar) {// Bu tarafın özel, diğer tarafın genel anahtarıyla...
        return window.crypto.subtle.deriveKey (
            {name: "ECDH", public: genelAnahtar},
            özelAnahtar,
            {name: "AES-GCM", length: 256},
            false,
            ["encrypt", "decrypt"]
        ); // ret..sonu...
    } // func sonu...

    async function ortakSırAnahtarıYarat() {
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
        let aliceGizliAnahtarı = await gizliAnahtarıTüret (aliceAnahtarÇifti.privateKey, bobAnahtarÇifti.publicKey);
        let bobGizliAnahtarı = await gizliAnahtarıTüret (bobAnahtarÇifti.privateKey, aliceAnahtarÇifti.publicKey);
        let şifreleDüğmesi = document.querySelector (".ecdh .şifrele-düğmesi");
        şifreleDüğmesi.addEventListener ("click", ()=> {şifrele (aliceGizliAnahtarı);});
        let deşifreleDüğmesi = document.querySelector (".ecdh .deşifrele-düğmesi");
        deşifreleDüğmesi.addEventListener ("click", ()=> {deşifrele (bobGizliAnahtarı);});
    } // asy..sonu...

    ortakSırAnahtarıYarat();
})();
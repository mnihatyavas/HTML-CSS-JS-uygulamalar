(() => {let dijital�mza;
    function kodlananMesaj�Al() {
        const mesajKutusu = document.querySelector ("#hmac-mesaj�");
        let mesaj = mesajKutusu.value;
        let kodlay�c� = new TextEncoder();
        return kodlay�c�.encode (mesaj);
    } // func sonu...

    async function mesaj��mzala (anahtar) {
        const imzaDe�eri = document.querySelector (".hmac .imza-de�eri");
        imzaDe�eri.classList.remove ("ge�erli", "ge�ersiz");
        let kodlananMesaj = kodlananMesaj�Al();
        dijital�mza = await window.crypto.subtle.sign (
            "HMAC",
            anahtar,
            kodlananMesaj
        ); // dij..sonu...
       imzaDe�eri.classList.add ("tebarruz");
       imzaDe�eri.addEventListener ("animationend", ()=> {imzaDe�eri.classList.remove ("tebarruz");});
       let bellek = new Uint8Array (dijital�mza, 0, 5);
       imzaDe�eri.textContent = `${bellek}...[Toplam ${dijital�mza.byteLength} byte]`;
    } // asy..sonu...

    async function mesaj�Onayla (anahtar) {
        const imzaDe�eri = document.querySelector (".hmac .imza-de�eri");
        imzaDe�eri.classList.remove ("ge�erli", "ge�ersiz");
        let kodlananMesaj = kodlananMesaj�Al();
        let sonu� = await window.crypto.subtle.verify (
            "HMAC",
            anahtar,
            dijital�mza,
            kodlananMesaj
        ); // let sonu...
        imzaDe�eri.classList.add (sonu� ? "ge�erli" : "ge�ersiz");
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "HMAC", hash: {name: "SHA-512"}},
        true,
        ["sign", "verify"])
    .then ((anahtar) => {
        const imzaD��mesi = document.querySelector (".hmac .imza-d��mesi");
        imzaD��mesi.addEventListener ("click", () => {mesaj��mzala (anahtar);});
        const onayD��mesi = document.querySelector (".hmac .onay-d��mesi");
        onayD��mesi.addEventListener ("click", () => {mesaj�Onayla (anahtar);});
    }); // win..sonu...
})();
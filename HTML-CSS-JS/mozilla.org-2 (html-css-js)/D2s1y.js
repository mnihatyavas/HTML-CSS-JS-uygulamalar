(() => {let dijital�mza;
    function kodlananMesaj�Al() {
    const messageBox = document.querySelector("#ecdsa-mesaj�");
    let message = messageBox.value;
    let enc = new TextEncoder();
    return enc.encode(message);
    } // func sonu...

    async function mesaj��mzala (imzaAnahtar�) {
        const imzaDe�eri = document.querySelector (".ecdsa .imza-de�eri");
        imzaDe�eri.classList.remove ("ge�erli", "ge�ersiz");
        let kodlananMesaj = kodlananMesaj�Al();
        dijital�mza = await window.crypto.subtle.sign (
            {name: "ECDSA", hash: {name: "SHA-384"},},
            imzaAnahtar�,
            kodlananMesaj
        ); // imza sonu...
        imzaDe�eri.classList.add ("tebarruz");
        imzaDe�eri.addEventListener ("animationend", ()=> {imzaDe�eri.classList.remove ("tebarruz");});
        let tampon = new Uint8Array (dijital�mza, 0, 5);
        imzaDe�eri.textContent = `${tampon}...[Toplam ${dijital�mza.byteLength} byte]`;
    } // asy..sonu...

    async function mesaj�Onayla (onayAnahtar�) {
        const imzaDe�eri = document.querySelector (".ecdsa .imza-de�eri");
        imzaDe�eri.classList.remove ("ge�erli", "ge�ersiz");
        let kodlananMesaj = kodlananMesaj�Al();
        let sonu� = await window.crypto.subtle.verify (
            {name: "ECDSA", hash: {name: "SHA-384"},},
            onayAnahtar�,
            dijital�mza,
            kodlananMesaj
        ); // let sonu...
        imzaDe�eri.classList.add (sonu� ? "ge�erli" : "ge�ersiz");
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "ECDSA", namedCurve: "P-384"},
        true,
        ["sign", "verify"])
    .then ((anahtar�ifti)=> {
        const imzaD��mesi = document.querySelector (".ecdsa .imza-d��mesi");
        imzaD��mesi.addEventListener ("click", ()=> {mesaj��mzala (anahtar�ifti.privateKey);});
        const onayD��mesi = document.querySelector (".ecdsa .onay-d��mesi");
        onayD��mesi.addEventListener ("click", ()=> {mesaj�Onayla (anahtar�ifti.publicKey);});
    }); // win..sonu...
})();
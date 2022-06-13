(() => {let dijital�mza;
    function kodlananMesaj�Al() {
        const mesajKutusu = document.querySelector ("#rsa-pss-mesaj�");
        let mesaj = mesajKutusu.value;
        let kodlay�c� = new TextEncoder();
        return kodlay�c�.encode (mesaj);
    } // func sonu...

    async function mesaj��mzala (imzaAnahtar�) {
        const imzaDe�eri = document.querySelector (".rsa-pss .imza-de�eri");
        imzaDe�eri.classList.remove ("ge�erli", "ge�ersiz");
        let kodlananMesaj� = kodlananMesaj�Al();
        dijital�mza = await window.crypto.subtle.sign (
            {name: "RSA-PSS",
             saltLength: 32,
            },
            imzaAnahtar�,
            kodlananMesaj�
        ); // imz..sonu...
        imzaDe�eri.classList.add ("tebarruz");
        imzaDe�eri.addEventListener ("animationend", ()=> {imzaDe�eri.classList.remove ("tebarruz");});
        let tampon = new Uint8Array (dijital�mza, 0, 5);
        imzaDe�eri.textContent = `${tampon}...[Toplam ${dijital�mza.byteLength} byte]`;
    } // asy..sonu...

    async function mesaj�Onayla (onayAnahtar�) {
        const imzaDe�eri = document.querySelector (".rsa-pss .imza-de�eri");
        imzaDe�eri.classList.remove ("ge�erli", "ge�ersiz");
        let kodlananMesaj� = kodlananMesaj�Al();
        let sonu� = await window.crypto.subtle.verify (
            {name: "RSA-PSS", saltLength: 32,},
            onayAnahtar�,
            dijital�mza,
            kodlananMesaj�
        ); // let sonu...
        imzaDe�eri.classList.add (sonu� ? "ge�erli" : "ge�ersiz");
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "RSA-PSS",
         modulusLength: 2048,
         publicExponent: new Uint8Array([1, 0, 1]),
         hash: "SHA-256",
        },
        true,
        ["sign", "verify"])
    .then ((anahtar�ifti) => {
        const imzaD��mesi = document.querySelector (".rsa-pss .imza-d��mesi");
        imzaD��mesi.addEventListener ("click", () => {mesaj��mzala (anahtar�ifti.privateKey);});
        const onayD��mesi = document.querySelector (".rsa-pss .onay-d��mesi");
        onayD��mesi.addEventListener ("click", () => {mesaj�Onayla (anahtar�ifti.publicKey);});
    }); // win..sonu...

})();
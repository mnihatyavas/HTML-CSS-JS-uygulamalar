(() => {let dijital�mza;
    function kodlananMesaj�Al() {//Girilen metni kodla ve d�nd�r...
        const mesajKutusu = document.querySelector ("#rsassa-pkcs1-mesaj�");
        let mesaj = mesajKutusu.value;
        let kodlay�c� = new TextEncoder();
        return kodlay�c�.encode (mesaj);
    } // func sonu...

    async function mesaj��mzala (imzaAnahtar�) {// Kodlanan mesaj�n ilk 5 kodunu ve toplam ebat�n� g�sterir...
        const imzade�eri = document.querySelector (".rsassa-pkcs1 .imza-de�eri");
        imzade�eri.classList.remove ("ge�erli", "ge�ersiz");
        let kodlananMesaj = kodlananMesaj�Al(); //console.log (kodlananMesaj);
        dijital�mza = await window.crypto.subtle.sign (
            "RSASSA-PKCS1-v1_5",
            imzaAnahtar�,
            kodlananMesaj
        ); // dij..sonu...
        imzade�eri.classList.add ("tebarruz");
        imzade�eri.addEventListener ("animationend", ()=> {imzade�eri.classList.remove ("tebarruz");});
        let tampon = new Uint8Array (dijital�mza, 0, 5);
        imzade�eri.textContent = `${tampon}...[Toplam ${dijital�mza.byteLength} byte]`;
    } // asy..sonu...

    async function mesaj�Onayla (onayAnahtar�) {// �lk mesajla sonrakini kar��la�t�r�p ye�il �entikle onaylar yada k�rm�z� �arp�yla reddeder...
        const imzade�eri = document.querySelector (".rsassa-pkcs1 .imza-de�eri");
        imzade�eri.classList.remove ("ge�erli", "ge�ersiz");
        let kodlananMesaj = kodlananMesaj�Al();
        let sonu� = await window.crypto.subtle.verify (
            "RSASSA-PKCS1-v1_5",
            onayAnahtar�,
            dijital�mza,
            kodlananMesaj
        ); // let sonu...
        imzade�eri.classList.add (sonu� ? "ge�erli" : "ge�ersiz");
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "RSASSA-PKCS1-v1_5",
         modulusLength: 2048,
         publicExponent: new Uint8Array ([1, 0, 1]),
         hash: "SHA-256",
        },
        true,
        ["sign", "verify"])
    .then ((yan�t)=> {
        const imzaD��mesi = document.querySelector (".rsassa-pkcs1 .imza-d��mesi");
        imzaD��mesi.addEventListener ("click", ()=> {mesaj��mzala (yan�t.privateKey);});
        const onayD��mesi = document.querySelector (".rsassa-pkcs1 .onay-d��mesi");
        onayD��mesi.addEventListener ("click", ()=> {mesaj�Onayla (yan�t.publicKey);});
    }); // win..sonu..
})();
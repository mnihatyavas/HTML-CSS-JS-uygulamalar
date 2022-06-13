(() => {let dijitalİmza;
    function kodlananMesajıAl() {//Girilen metni kodla ve döndür...
        const mesajKutusu = document.querySelector ("#rsassa-pkcs1-mesajı");
        let mesaj = mesajKutusu.value;
        let kodlayıcı = new TextEncoder();
        return kodlayıcı.encode (mesaj);
    } // func sonu...

    async function mesajıİmzala (imzaAnahtarı) {// Kodlanan mesajın ilk 5 kodunu ve toplam ebatını gösterir...
        const imzadeğeri = document.querySelector (".rsassa-pkcs1 .imza-değeri");
        imzadeğeri.classList.remove ("geçerli", "geçersiz");
        let kodlananMesaj = kodlananMesajıAl(); //console.log (kodlananMesaj);
        dijitalİmza = await window.crypto.subtle.sign (
            "RSASSA-PKCS1-v1_5",
            imzaAnahtarı,
            kodlananMesaj
        ); // dij..sonu...
        imzadeğeri.classList.add ("tebarruz");
        imzadeğeri.addEventListener ("animationend", ()=> {imzadeğeri.classList.remove ("tebarruz");});
        let tampon = new Uint8Array (dijitalİmza, 0, 5);
        imzadeğeri.textContent = `${tampon}...[Toplam ${dijitalİmza.byteLength} byte]`;
    } // asy..sonu...

    async function mesajıOnayla (onayAnahtarı) {// İlk mesajla sonrakini karşılaştırıp yeşil çentikle onaylar yada kırmızı çarpıyla reddeder...
        const imzadeğeri = document.querySelector (".rsassa-pkcs1 .imza-değeri");
        imzadeğeri.classList.remove ("geçerli", "geçersiz");
        let kodlananMesaj = kodlananMesajıAl();
        let sonuç = await window.crypto.subtle.verify (
            "RSASSA-PKCS1-v1_5",
            onayAnahtarı,
            dijitalİmza,
            kodlananMesaj
        ); // let sonu...
        imzadeğeri.classList.add (sonuç ? "geçerli" : "geçersiz");
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "RSASSA-PKCS1-v1_5",
         modulusLength: 2048,
         publicExponent: new Uint8Array ([1, 0, 1]),
         hash: "SHA-256",
        },
        true,
        ["sign", "verify"])
    .then ((yanıt)=> {
        const imzaDüğmesi = document.querySelector (".rsassa-pkcs1 .imza-düğmesi");
        imzaDüğmesi.addEventListener ("click", ()=> {mesajıİmzala (yanıt.privateKey);});
        const onayDüğmesi = document.querySelector (".rsassa-pkcs1 .onay-düğmesi");
        onayDüğmesi.addEventListener ("click", ()=> {mesajıOnayla (yanıt.publicKey);});
    }); // win..sonu..
})();
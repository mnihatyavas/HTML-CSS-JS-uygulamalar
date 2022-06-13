(()=> {
    const hamAnahtar = window.crypto.getRandomValues (new Uint8Array (16));
    let gizliAnahtar;
    const şifrelemeDüğmesi = document.querySelector(".raw .şifreleme-düğmesi");

    function gizlianahtarıİthalet (hamAnahtar) {
        return window.crypto.subtle.importKey (
            "raw",
            hamAnahtar,
            "AES-GCM",
            true,
            ["encrypt", "decrypt"]
        ); // ret..sonu...
    } // func sonu...

    function şifrelemeDüğmesiniEtkinleştir() {
        şifrelemeDüğmesi.classList.add ("tebarruz");
        şifrelemeDüğmesi.addEventListener ("animationend", ()=> {şifrelemeDüğmesi.classList.remove ("tebarruz");});
        şifrelemeDüğmesi.removeAttribute ("disabled");
        şifrelemeDüğmesi.classList.remove ("gizli");
    } // func sonu...

    function şifrelenenMesajıAl() {
        const mesajKutusu = document.querySelector ("#raw-mesajı");
        const mesaj = mesajKutusu.value;
        const kodlayıcı = new TextEncoder();
        return kodlayıcı.encode (mesaj);
    } // func sonu...

    async function mesajıŞifrele() {
        const şifrelenenMesaj = şifrelenenMesajıAl();
        const rasgele12 = window.crypto.getRandomValues (new Uint8Array (12));
        const şifreliMetin = await window.crypto.subtle.encrypt (
            {name: "AES-GCM", iv: rasgele12},
            gizliAnahtar,
            şifrelenenMesaj
        ); // con..sonu...
        const tampon = new Uint8Array (şifreliMetin, 0, 5);
        const şifrelimetinDeğeri = document.querySelector (".raw .şifrelimetin-değeri");
        şifrelimetinDeğeri.classList.add ("tebarruz");
        şifrelimetinDeğeri.addEventListener ("animationend", ()=> {şifrelimetinDeğeri.classList.remove ("tebarruz");});
        şifrelimetinDeğeri.textContent = `${tampon}...[Toplam ${şifreliMetin.byteLength} byte]`;
    } // asy..sonu...

    const ithalAnahtarDüğmesi = document.querySelector(".raw .ithal-anahtar-düğmesi");
    ithalAnahtarDüğmesi.addEventListener ("click", async ()=> {
        gizliAnahtar = await gizlianahtarıİthalet (hamAnahtar);
        şifrelemeDüğmesiniEtkinleştir();
    }); // ith..sonu...
    şifrelemeDüğmesi.addEventListener ("click", mesajıŞifrele);
})();
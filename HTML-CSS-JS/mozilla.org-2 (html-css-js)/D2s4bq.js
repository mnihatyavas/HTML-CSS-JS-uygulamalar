(()=> {
    const hamAnahtar = window.crypto.getRandomValues (new Uint8Array (16));
    let gizliAnahtar;
    const þifrelemeDüðmesi = document.querySelector(".raw .þifreleme-düðmesi");

    function gizlianahtarýÝthalet (hamAnahtar) {
        return window.crypto.subtle.importKey (
            "raw",
            hamAnahtar,
            "AES-GCM",
            true,
            ["encrypt", "decrypt"]
        ); // ret..sonu...
    } // func sonu...

    function þifrelemeDüðmesiniEtkinleþtir() {
        þifrelemeDüðmesi.classList.add ("tebarruz");
        þifrelemeDüðmesi.addEventListener ("animationend", ()=> {þifrelemeDüðmesi.classList.remove ("tebarruz");});
        þifrelemeDüðmesi.removeAttribute ("disabled");
        þifrelemeDüðmesi.classList.remove ("gizli");
    } // func sonu...

    function þifrelenenMesajýAl() {
        const mesajKutusu = document.querySelector ("#raw-mesajý");
        const mesaj = mesajKutusu.value;
        const kodlayýcý = new TextEncoder();
        return kodlayýcý.encode (mesaj);
    } // func sonu...

    async function mesajýÞifrele() {
        const þifrelenenMesaj = þifrelenenMesajýAl();
        const rasgele12 = window.crypto.getRandomValues (new Uint8Array (12));
        const þifreliMetin = await window.crypto.subtle.encrypt (
            {name: "AES-GCM", iv: rasgele12},
            gizliAnahtar,
            þifrelenenMesaj
        ); // con..sonu...
        const tampon = new Uint8Array (þifreliMetin, 0, 5);
        const þifrelimetinDeðeri = document.querySelector (".raw .þifrelimetin-deðeri");
        þifrelimetinDeðeri.classList.add ("tebarruz");
        þifrelimetinDeðeri.addEventListener ("animationend", ()=> {þifrelimetinDeðeri.classList.remove ("tebarruz");});
        þifrelimetinDeðeri.textContent = `${tampon}...[Toplam ${þifreliMetin.byteLength} byte]`;
    } // asy..sonu...

    const ithalAnahtarDüðmesi = document.querySelector(".raw .ithal-anahtar-düðmesi");
    ithalAnahtarDüðmesi.addEventListener ("click", async ()=> {
        gizliAnahtar = await gizlianahtarýÝthalet (hamAnahtar);
        þifrelemeDüðmesiniEtkinleþtir();
    }); // ith..sonu...
    þifrelemeDüðmesi.addEventListener ("click", mesajýÞifrele);
})();
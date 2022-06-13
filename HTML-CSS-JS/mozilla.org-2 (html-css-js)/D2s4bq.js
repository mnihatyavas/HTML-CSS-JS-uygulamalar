(()=> {
    const hamAnahtar = window.crypto.getRandomValues (new Uint8Array (16));
    let gizliAnahtar;
    const �ifrelemeD��mesi = document.querySelector(".raw .�ifreleme-d��mesi");

    function gizlianahtar��thalet (hamAnahtar) {
        return window.crypto.subtle.importKey (
            "raw",
            hamAnahtar,
            "AES-GCM",
            true,
            ["encrypt", "decrypt"]
        ); // ret..sonu...
    } // func sonu...

    function �ifrelemeD��mesiniEtkinle�tir() {
        �ifrelemeD��mesi.classList.add ("tebarruz");
        �ifrelemeD��mesi.addEventListener ("animationend", ()=> {�ifrelemeD��mesi.classList.remove ("tebarruz");});
        �ifrelemeD��mesi.removeAttribute ("disabled");
        �ifrelemeD��mesi.classList.remove ("gizli");
    } // func sonu...

    function �ifrelenenMesaj�Al() {
        const mesajKutusu = document.querySelector ("#raw-mesaj�");
        const mesaj = mesajKutusu.value;
        const kodlay�c� = new TextEncoder();
        return kodlay�c�.encode (mesaj);
    } // func sonu...

    async function mesaj��ifrele() {
        const �ifrelenenMesaj = �ifrelenenMesaj�Al();
        const rasgele12 = window.crypto.getRandomValues (new Uint8Array (12));
        const �ifreliMetin = await window.crypto.subtle.encrypt (
            {name: "AES-GCM", iv: rasgele12},
            gizliAnahtar,
            �ifrelenenMesaj
        ); // con..sonu...
        const tampon = new Uint8Array (�ifreliMetin, 0, 5);
        const �ifrelimetinDe�eri = document.querySelector (".raw .�ifrelimetin-de�eri");
        �ifrelimetinDe�eri.classList.add ("tebarruz");
        �ifrelimetinDe�eri.addEventListener ("animationend", ()=> {�ifrelimetinDe�eri.classList.remove ("tebarruz");});
        �ifrelimetinDe�eri.textContent = `${tampon}...[Toplam ${�ifreliMetin.byteLength} byte]`;
    } // asy..sonu...

    const ithalAnahtarD��mesi = document.querySelector(".raw .ithal-anahtar-d��mesi");
    ithalAnahtarD��mesi.addEventListener ("click", async ()=> {
        gizliAnahtar = await gizlianahtar��thalet (hamAnahtar);
        �ifrelemeD��mesiniEtkinle�tir();
    }); // ith..sonu...
    �ifrelemeD��mesi.addEventListener ("click", mesaj��ifrele);
})();
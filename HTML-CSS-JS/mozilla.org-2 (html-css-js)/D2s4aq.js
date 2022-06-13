(()=> {
    async function �ifreliAnahtar��f�ala (anahtar) {
        const if�aat = await window.crypto.subtle.exportKey ("raw", anahtar);
        const if�aatAnahtarTamponu = new Uint8Array (if�aat);
        const anahtar�n�f�aas� = document.querySelector (".if�alanan-anahtar");
        anahtar�n�f�aas�.classList.add ("tebarruz");
        anahtar�n�f�aas�.addEventListener ("animationend", ()=> {anahtar�n�f�aas�.classList.remove ("tebarruz");});
        anahtar�n�f�aas�.textContent = `[${if�aatAnahtarTamponu}]`;
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "AES-GCM", length: 256,},
        true,
        ["encrypt", "decrypt"])
    .then ((anahtar)=> {
        const if�aatD��mesi = document.querySelector (".ham");
        if�aatD��mesi.addEventListener ("click", ()=> {�ifreliAnahtar��f�ala (anahtar);}); });
})();
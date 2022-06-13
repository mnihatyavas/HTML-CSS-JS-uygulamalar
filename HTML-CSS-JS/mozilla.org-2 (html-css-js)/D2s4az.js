(()=> {
    async function �ifreliAnahtar��f�ala (a�ift) {
        const if�aat = await window.crypto.subtle.exportKey ("jwk",a�ift);
        const anahtar�n�f�aas� = document.querySelector (".if�alanan-anahtar");
        anahtar�n�f�aas�.classList.add ("tebarruz");
        anahtar�n�f�aas�.addEventListener ("animationend", ()=> {anahtar�n�f�aas�.classList.remove ("tebarruz");});
        anahtar�n�f�aas�.textContent = JSON.stringify (if�aat, null, " ");
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "ECDSA", namedCurve: "P-384"},
        true,
        ["sign", "verify"])
    .then ((anahtar�ifti) => {
        const if�aatD��mesi = document.querySelector (".jwk");
        if�aatD��mesi.addEventListener ("click", ()=> {�ifreliAnahtar��f�ala (anahtar�ifti.privateKey);}); });
})();
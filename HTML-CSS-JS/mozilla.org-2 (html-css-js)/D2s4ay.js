(() => {
    function dizgele�tir (if�a) {return String.fromCharCode.apply (null, new Uint8Array (if�a));}

    async function �ifreliAnahtar��f�ala (a�ift) {
        const if�aat = await window.crypto.subtle.exportKey ("spki", a�ift);
        const if�aatDizgesi = dizgele�tir (if�aat);
        const temel64�f�aas� = window.btoa (if�aatDizgesi);
        const pemNesnesi = `-----GENEL ANAHTAR BA�I-----\n${temel64�f�aas�}\n-----GENEL ANAHTAR SONU-----`;
        const anahtar�n�f�aas� = document.querySelector (".if�alanan-anahtar");
        anahtar�n�f�aas�.classList.add ("tebarruz");
        anahtar�n�f�aas�.addEventListener ("animationend", ()=> {anahtar�n�f�aas�.classList.remove ("tebarruz");});
        anahtar�n�f�aas�.textContent = pemNesnesi;
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "RSA-OAEP",
         modulusLength: 2048,
         publicExponent: new Uint8Array ([1, 0, 1]),
         hash: "SHA-256",},
        true,
        ["encrypt", "decrypt"])
    .then ((anahtar�ifti)=> {
        const if�aatD��mesi = document.querySelector (".spki");
        if�aatD��mesi.addEventListener ("click", ()=> {�ifreliAnahtar��f�ala (anahtar�ifti.publicKey);}); });
})();
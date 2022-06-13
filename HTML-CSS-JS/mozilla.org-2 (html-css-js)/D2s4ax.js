(() => {
    function dizgele�tir (if�a) {return String.fromCharCode.apply (null, new Uint8Array (if�a));}

    async function �ifreliAnahtar��f�ala (a�ift) {
        const if�aat = await window.crypto.subtle.exportKey ("pkcs8", a�ift);
        const if�aatDizgesi = dizgele�tir (if�aat);
        const temel64�f�aas� = window.btoa (if�aatDizgesi);
        const pemNesnesi = `-----�ZEL ANAHTAR BA�I-----\n${temel64�f�aas�}\n-----�ZEL ANAHTAR SONU-----`;

        const anahtar�n�f�aas� = document.querySelector (".if�alanan-anahtar");
        anahtar�n�f�aas�.classList.add ("tebarruz");
        anahtar�n�f�aas�.addEventListener ("animationend", ()=> {anahtar�n�f�aas�.classList.remove ("tebarruz");});
        anahtar�n�f�aas�.textContent = pemNesnesi;
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "RSA-PSS",
         modulusLength: 2048,
         publicExponent: new Uint8Array ([1, 0, 1]),
         hash: "SHA-256",},
        true,
        ["sign", "verify"])
    .then ((anahtar�ifti)=> {
        const if�aatD��mesi = document.querySelector (".pkcs8");
        if�aatD��mesi.addEventListener ("click", ()=> {�ifreliAnahtar��f�ala (anahtar�ifti.privateKey);}); });
})();
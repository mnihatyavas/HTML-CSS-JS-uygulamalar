(() => {
    function dizgeleştir (ifşa) {return String.fromCharCode.apply (null, new Uint8Array (ifşa));}

    async function şifreliAnahtarıİfşala (aÇift) {
        const ifşaat = await window.crypto.subtle.exportKey ("spki", aÇift);
        const ifşaatDizgesi = dizgeleştir (ifşaat);
        const temel64İfşaası = window.btoa (ifşaatDizgesi);
        const pemNesnesi = `-----GENEL ANAHTAR BAŞI-----\n${temel64İfşaası}\n-----GENEL ANAHTAR SONU-----`;
        const anahtarınİfşaası = document.querySelector (".ifşalanan-anahtar");
        anahtarınİfşaası.classList.add ("tebarruz");
        anahtarınİfşaası.addEventListener ("animationend", ()=> {anahtarınİfşaası.classList.remove ("tebarruz");});
        anahtarınİfşaası.textContent = pemNesnesi;
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "RSA-OAEP",
         modulusLength: 2048,
         publicExponent: new Uint8Array ([1, 0, 1]),
         hash: "SHA-256",},
        true,
        ["encrypt", "decrypt"])
    .then ((anahtarÇifti)=> {
        const ifşaatDüğmesi = document.querySelector (".spki");
        ifşaatDüğmesi.addEventListener ("click", ()=> {şifreliAnahtarıİfşala (anahtarÇifti.publicKey);}); });
})();
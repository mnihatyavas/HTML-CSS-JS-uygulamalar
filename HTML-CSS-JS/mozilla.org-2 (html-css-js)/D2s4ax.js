(() => {
    function dizgeleştir (ifşa) {return String.fromCharCode.apply (null, new Uint8Array (ifşa));}

    async function şifreliAnahtarıİfşala (açift) {
        const ifşaat = await window.crypto.subtle.exportKey ("pkcs8", açift);
        const ifşaatDizgesi = dizgeleştir (ifşaat);
        const temel64İfşaası = window.btoa (ifşaatDizgesi);
        const pemNesnesi = `-----ÖZEL ANAHTAR BAŞI-----\n${temel64İfşaası}\n-----ÖZEL ANAHTAR SONU-----`;

        const anahtarınİfşaası = document.querySelector (".ifşalanan-anahtar");
        anahtarınİfşaası.classList.add ("tebarruz");
        anahtarınİfşaası.addEventListener ("animationend", ()=> {anahtarınİfşaası.classList.remove ("tebarruz");});
        anahtarınİfşaası.textContent = pemNesnesi;
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "RSA-PSS",
         modulusLength: 2048,
         publicExponent: new Uint8Array ([1, 0, 1]),
         hash: "SHA-256",},
        true,
        ["sign", "verify"])
    .then ((anahtarÇifti)=> {
        const ifşaatDüğmesi = document.querySelector (".pkcs8");
        ifşaatDüğmesi.addEventListener ("click", ()=> {şifreliAnahtarıİfşala (anahtarÇifti.privateKey);}); });
})();
(()=> {
    async function şifreliAnahtarıİfşala (aÇift) {
        const ifşaat = await window.crypto.subtle.exportKey ("jwk",aÇift);
        const anahtarınİfşaası = document.querySelector (".ifşalanan-anahtar");
        anahtarınİfşaası.classList.add ("tebarruz");
        anahtarınİfşaası.addEventListener ("animationend", ()=> {anahtarınİfşaası.classList.remove ("tebarruz");});
        anahtarınİfşaası.textContent = JSON.stringify (ifşaat, null, " ");
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "ECDSA", namedCurve: "P-384"},
        true,
        ["sign", "verify"])
    .then ((anahtarÇifti) => {
        const ifşaatDüğmesi = document.querySelector (".jwk");
        ifşaatDüğmesi.addEventListener ("click", ()=> {şifreliAnahtarıİfşala (anahtarÇifti.privateKey);}); });
})();
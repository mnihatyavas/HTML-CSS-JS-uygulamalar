(()=> {
    async function şifreliAnahtarıİfşala (anahtar) {
        const ifşaat = await window.crypto.subtle.exportKey ("raw", anahtar);
        const ifşaatAnahtarTamponu = new Uint8Array (ifşaat);
        const anahtarınİfşaası = document.querySelector (".ifşalanan-anahtar");
        anahtarınİfşaası.classList.add ("tebarruz");
        anahtarınİfşaası.addEventListener ("animationend", ()=> {anahtarınİfşaası.classList.remove ("tebarruz");});
        anahtarınİfşaası.textContent = `[${ifşaatAnahtarTamponu}]`;
    } // asy..sonu...

    window.crypto.subtle.generateKey (
        {name: "AES-GCM", length: 256,},
        true,
        ["encrypt", "decrypt"])
    .then ((anahtar)=> {
        const ifşaatDüğmesi = document.querySelector (".ham");
        ifşaatDüğmesi.addEventListener ("click", ()=> {şifreliAnahtarıİfşala (anahtar);}); });
})();
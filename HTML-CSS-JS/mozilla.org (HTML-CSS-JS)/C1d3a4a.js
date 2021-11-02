// C1d3a4a.js: Bo� alan ikaz ba�lant� odakl� form ge�erlileme js kodu alt-�rne�i.

const verigiri�leri = document.querySelectorAll ("input");
const etiketler = document.querySelectorAll ("label");
const form = document.querySelector ("form");
let formBirimleri = [];
const hatalarKutusu = document.querySelector (".hatalar");
const hatalarListesi = document.querySelector (".hatalar ul");

for (let i = 0; i < verigiri�leri.length-1; i++) {
    let nesne = {};
    nesne.etiket = etiketler [i];
    nesne.verigiri� = verigiri�leri [i];
    formBirimleri.push (nesne);
} // for sonu...
hatalarKutusu.style.left = "-100%";
form.onsubmit = ge�erlile;

function ge�erlile (o) {
    o.preventDefault();
    hatalarListesi.innerHTML = "";
    for (let i = 0; i < formBirimleri.length; i++) {
        let kontrolBirimi = formBirimleri [i];
        if (kontrolBirimi.verigiri�.value === "") {
            hatalarKutusu.style.left = "25%";
            ba�lant�Yarat (kontrolBirimi);
        } // if sonu...
    } // for sonu...
    if (hatalarListesi.innerHTML == "") {window.location.reload();} // Do�ru g�ndermede, yeniden bo� form giri�i haz�r olsun...
} // func sonu...

function ba�lant�Yarat (testBirimi) {
    const liEleman� = document.createElement ("li");
    const �apa = document.createElement ("a");
    �apa.textContent = "Bo� olan " + testBirimi.verigiri�.name + " alan� doldurulmal�d�r.";
    �apa.href = "#" + testBirimi.verigiri�.name;
    �apa.onclick = function() {testBirimi.verigiri�.focus();};
    liEleman�.appendChild (�apa);
    hatalarListesi.appendChild (liEleman�);
} // func sonu...
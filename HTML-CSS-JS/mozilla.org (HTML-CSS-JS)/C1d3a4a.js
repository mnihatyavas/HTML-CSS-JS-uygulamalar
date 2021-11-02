// C1d3a4a.js: Boþ alan ikaz baðlantý odaklý form geçerlileme js kodu alt-örneði.

const verigiriþleri = document.querySelectorAll ("input");
const etiketler = document.querySelectorAll ("label");
const form = document.querySelector ("form");
let formBirimleri = [];
const hatalarKutusu = document.querySelector (".hatalar");
const hatalarListesi = document.querySelector (".hatalar ul");

for (let i = 0; i < verigiriþleri.length-1; i++) {
    let nesne = {};
    nesne.etiket = etiketler [i];
    nesne.verigiriþ = verigiriþleri [i];
    formBirimleri.push (nesne);
} // for sonu...
hatalarKutusu.style.left = "-100%";
form.onsubmit = geçerlile;

function geçerlile (o) {
    o.preventDefault();
    hatalarListesi.innerHTML = "";
    for (let i = 0; i < formBirimleri.length; i++) {
        let kontrolBirimi = formBirimleri [i];
        if (kontrolBirimi.verigiriþ.value === "") {
            hatalarKutusu.style.left = "25%";
            baðlantýYarat (kontrolBirimi);
        } // if sonu...
    } // for sonu...
    if (hatalarListesi.innerHTML == "") {window.location.reload();} // Doðru göndermede, yeniden boþ form giriþi hazýr olsun...
} // func sonu...

function baðlantýYarat (testBirimi) {
    const liElemaný = document.createElement ("li");
    const çapa = document.createElement ("a");
    çapa.textContent = "Boþ olan " + testBirimi.verigiriþ.name + " alaný doldurulmalýdýr.";
    çapa.href = "#" + testBirimi.verigiriþ.name;
    çapa.onclick = function() {testBirimi.verigiriþ.focus();};
    liElemaný.appendChild (çapa);
    hatalarListesi.appendChild (liElemaný);
} // func sonu...
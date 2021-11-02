// C1d3a4b.js: Müzisyen ve enstrümanlý form geçerlileme js kodlamasý alt-örneði.

const verigiriþleri = document.querySelectorAll ("input");
const etiketler = document.querySelectorAll ("label");
const form = document.querySelector ("form");
let formBirimleri = [];
const hatalarKutusu = document.querySelector (".hatalar");
const hatalarListesi = document.querySelector (".hatalar ul");
let çentikkutusu;
let çentikkutusuEtiketi;
const gizliÝkaz = document.querySelector (".gizli-ikaz");

for (let i = 0; i < verigiriþleri.length-1; i++) { // input-submit hariç...
    if (verigiriþleri [i].type !== "checkbox") {
        let nesne = {};
        nesne.etiket = etiketler [i];
        nesne.verigiriþ = verigiriþleri [i];
        formBirimleri.push (nesne);
    }else {
        çentikkutusu = verigiriþleri [i]; // true/checked, false/unchecked
        çentikkutusuEtiketi = etiketler [i];
    } // else sonu...
} // for sonu...

hatalarKutusu.style.left = "-100%";
müzisyenMi (false); // Ýlk açýlýþta...
çentikkutusu.onchange = function() {// Sonraki çentiklendiðinde/çentiksizlendiðinde...
    if (çentikkutusu.checked) {müzisyenMi (true);
    }else {müzisyenMi (false);}
}; // çen..sonu..
form.onsubmit = geçerlile;

function geçerlile (o) {
    o.preventDefault();
    hatalarListesi.innerHTML = "";
    for (let i = 0; i < formBirimleri.length; i++) {
        let kontrolBirimi = formBirimleri [i];
        if (kontrolBirimi.verigiriþ.value === "") {
            hatalarKutusu.style.left = "75%";
            baðlantýYarat (kontrolBirimi);
        } // if sonu...
    } // for sonu...
    if (hatalarListesi.innerHTML == "") {window.location.reload();} // Doðru göndermede, yeniden boþ form giriþi hazýr olsun...
} // func sonu...

function baðlantýYarat (testBirimi) {
    const liElemaný = document.createElement ("li");
    const çapa = document.createElement ("a");
    çapa.textContent = "Boþ " + testBirimi.verigiriþ.name + " alaný doldurulmalýdýr.";
    çapa.href = "#" + testBirimi.verigiriþ.name;
    çapa.onclick = function() {testBirimi.verigiriþ.focus();};
    liElemaný.appendChild (çapa);
    hatalarListesi.appendChild (liElemaný);
} // func sonu...

function müzisyenMi (ikili) {
    let enstrümanNesnesi = formBirimleri [formBirimleri.length-1];
    if (ikili) {// true ise...
        enstrümanNesnesi.verigiriþ.disabled = false; // abled...
        enstrümanNesnesi.etiket.style.color = "yellow";
        enstrümanNesnesi.verigiriþ.setAttribute ("arya-etkisiz", "false");
        gizliÝkaz.textContent = "MüzisyenMi çentiklidir, çaldýðý enstrümanlarýn adlarýný girebilir.";
        gizliÝkaz.style.left = "1%";
    }else {// false ise...
        enstrümanNesnesi.verigiriþ.disabled = true;
        enstrümanNesnesi.etiket.style.color = "#999";
        enstrümanNesnesi.verigiriþ.setAttribute ("arya-etkisiz", "true");
        gizliÝkaz.textContent = "MüzisyenMi çentiksizdir, enstrüman giriþi yapamaz.";
    } // else sonu...
} // func sonu...
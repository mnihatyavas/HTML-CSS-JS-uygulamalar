// C1d3a4b.js: Müzisyen ve enstrümanlı form geçerlileme js kodlaması alt-örneği.

const verigirişleri = document.querySelectorAll ("input");
const etiketler = document.querySelectorAll ("label");
const form = document.querySelector ("form");
let formBirimleri = [];
const hatalarKutusu = document.querySelector (".hatalar");
const hatalarListesi = document.querySelector (".hatalar ul");
let çentikkutusu;
let çentikkutusuEtiketi;
const gizliİkaz = document.querySelector (".gizli-ikaz");

for (let i = 0; i < verigirişleri.length-1; i++) { // input-submit hariç...
    if (verigirişleri [i].type !== "checkbox") {
        let nesne = {};
        nesne.etiket = etiketler [i];
        nesne.verigiriş = verigirişleri [i];
        formBirimleri.push (nesne);
    }else {
        çentikkutusu = verigirişleri [i]; // true/checked, false/unchecked
        çentikkutusuEtiketi = etiketler [i];
    } // else sonu...
} // for sonu...

hatalarKutusu.style.left = "-100%";
müzisyenMi (false); // İlk açılışta...
çentikkutusu.onchange = function() {// Sonraki çentiklendiğinde/çentiksizlendiğinde...
    if (çentikkutusu.checked) {müzisyenMi (true);
    }else {müzisyenMi (false);}
}; // çen..sonu..
form.onsubmit = geçerlile;

function geçerlile (o) {
    o.preventDefault();
    hatalarListesi.innerHTML = "";
    for (let i = 0; i < formBirimleri.length; i++) {
        let kontrolBirimi = formBirimleri [i];
        if (kontrolBirimi.verigiriş.value === "") {
            hatalarKutusu.style.left = "75%";
            bağlantıYarat (kontrolBirimi);
        } // if sonu...
    } // for sonu...
    if (hatalarListesi.innerHTML == "") {window.location.reload();} // Doğru göndermede, yeniden boş form girişi hazır olsun...
} // func sonu...

function bağlantıYarat (testBirimi) {
    const liElemanı = document.createElement ("li");
    const çapa = document.createElement ("a");
    çapa.textContent = "Boş " + testBirimi.verigiriş.name + " alanı doldurulmalıdır.";
    çapa.href = "#" + testBirimi.verigiriş.name;
    çapa.onclick = function() {testBirimi.verigiriş.focus();};
    liElemanı.appendChild (çapa);
    hatalarListesi.appendChild (liElemanı);
} // func sonu...

function müzisyenMi (ikili) {
    let enstrümanNesnesi = formBirimleri [formBirimleri.length-1];
    if (ikili) {// true ise...
        enstrümanNesnesi.verigiriş.disabled = false; // abled...
        enstrümanNesnesi.etiket.style.color = "yellow";
        enstrümanNesnesi.verigiriş.setAttribute ("arya-etkisiz", "false");
        gizliİkaz.textContent = "MüzisyenMi çentiklidir, çaldığı enstrümanların adlarını girebilir.";
        gizliİkaz.style.left = "1%";
    }else {// false ise...
        enstrümanNesnesi.verigiriş.disabled = true;
        enstrümanNesnesi.etiket.style.color = "#999";
        enstrümanNesnesi.verigiriş.setAttribute ("arya-etkisiz", "true");
        gizliİkaz.textContent = "MüzisyenMi çentiksizdir, enstrüman girişi yapamaz.";
    } // else sonu...
} // func sonu...
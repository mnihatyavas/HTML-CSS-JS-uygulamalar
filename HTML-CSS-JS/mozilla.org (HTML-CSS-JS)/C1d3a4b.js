// C1d3a4b.js: M�zisyen ve enstr�manl� form ge�erlileme js kodlamas� alt-�rne�i.

const verigiri�leri = document.querySelectorAll ("input");
const etiketler = document.querySelectorAll ("label");
const form = document.querySelector ("form");
let formBirimleri = [];
const hatalarKutusu = document.querySelector (".hatalar");
const hatalarListesi = document.querySelector (".hatalar ul");
let �entikkutusu;
let �entikkutusuEtiketi;
const gizli�kaz = document.querySelector (".gizli-ikaz");

for (let i = 0; i < verigiri�leri.length-1; i++) { // input-submit hari�...
    if (verigiri�leri [i].type !== "checkbox") {
        let nesne = {};
        nesne.etiket = etiketler [i];
        nesne.verigiri� = verigiri�leri [i];
        formBirimleri.push (nesne);
    }else {
        �entikkutusu = verigiri�leri [i]; // true/checked, false/unchecked
        �entikkutusuEtiketi = etiketler [i];
    } // else sonu...
} // for sonu...

hatalarKutusu.style.left = "-100%";
m�zisyenMi (false); // �lk a��l��ta...
�entikkutusu.onchange = function() {// Sonraki �entiklendi�inde/�entiksizlendi�inde...
    if (�entikkutusu.checked) {m�zisyenMi (true);
    }else {m�zisyenMi (false);}
}; // �en..sonu..
form.onsubmit = ge�erlile;

function ge�erlile (o) {
    o.preventDefault();
    hatalarListesi.innerHTML = "";
    for (let i = 0; i < formBirimleri.length; i++) {
        let kontrolBirimi = formBirimleri [i];
        if (kontrolBirimi.verigiri�.value === "") {
            hatalarKutusu.style.left = "75%";
            ba�lant�Yarat (kontrolBirimi);
        } // if sonu...
    } // for sonu...
    if (hatalarListesi.innerHTML == "") {window.location.reload();} // Do�ru g�ndermede, yeniden bo� form giri�i haz�r olsun...
} // func sonu...

function ba�lant�Yarat (testBirimi) {
    const liEleman� = document.createElement ("li");
    const �apa = document.createElement ("a");
    �apa.textContent = "Bo� " + testBirimi.verigiri�.name + " alan� doldurulmal�d�r.";
    �apa.href = "#" + testBirimi.verigiri�.name;
    �apa.onclick = function() {testBirimi.verigiri�.focus();};
    liEleman�.appendChild (�apa);
    hatalarListesi.appendChild (liEleman�);
} // func sonu...

function m�zisyenMi (ikili) {
    let enstr�manNesnesi = formBirimleri [formBirimleri.length-1];
    if (ikili) {// true ise...
        enstr�manNesnesi.verigiri�.disabled = false; // abled...
        enstr�manNesnesi.etiket.style.color = "yellow";
        enstr�manNesnesi.verigiri�.setAttribute ("arya-etkisiz", "false");
        gizli�kaz.textContent = "M�zisyenMi �entiklidir, �ald��� enstr�manlar�n adlar�n� girebilir.";
        gizli�kaz.style.left = "1%";
    }else {// false ise...
        enstr�manNesnesi.verigiri�.disabled = true;
        enstr�manNesnesi.etiket.style.color = "#999";
        enstr�manNesnesi.verigiri�.setAttribute ("arya-etkisiz", "true");
        gizli�kaz.textContent = "M�zisyenMi �entiksizdir, enstr�man giri�i yapamaz.";
    } // else sonu...
} // func sonu...
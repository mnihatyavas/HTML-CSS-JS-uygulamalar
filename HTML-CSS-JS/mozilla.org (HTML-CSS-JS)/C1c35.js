// C1c35.js: Değiştirilebilir metinalanı verilerinin js kodlaması alt-örneği.

var section = document.querySelector ("section");
var taslak = document.querySelector ("script");
var jsMetinalanı = document.querySelector (".değiştirilebilir-js");
var ybaşlat = document.getElementById ("yenibaşlat");
var ilkJSKod = jsMetinalanı.value;

window.addEventListener ("load", kodlamayıEtkinleştir);
jsMetinalanı.addEventListener ("input", kodlamayıEtkinleştir);

function kodlamayıEtkinleştir() {
    taslak.textContent = jsMetinalanı.value;
    try {eval (taslak.textContent);
    }catch (olay) {// Hatayı yansıt
        section.innerHTML = "";
        let paragraf = document.createElement ("p");
        paragraf.textContent = "HATA (try-catch): " + olay;
        section.appendChild (paragraf);
    } // catch sonu...
} // func sonu...

ybaşlat.addEventListener ("click", function () {
    jsMetinalanı.value = ilkJSKod;
    kodlamayıEtkinleştir();
}); // yb..sonu...


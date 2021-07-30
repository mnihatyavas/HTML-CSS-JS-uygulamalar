// C1c26.js: Metinalanýna girilen js kodlamalarýn iþletilme kodlamasý alt-örneði.

var section = document.querySelector ("section");
var taslak = document.querySelector ("script");
var jsMetinalaný = document.querySelector (".deðiþtirilebilir-js");
var ybaþlat = document.getElementById ("yenibaþlat");
var ilkJSKod = jsMetinalaný.value;

window.addEventListener ("load", kodlamayýEtkinleþtir);
jsMetinalaný.addEventListener ("input", kodlamayýEtkinleþtir);

function kodlamayýEtkinleþtir() {
    taslak.textContent = jsMetinalaný.value;
    try {eval (taslak.textContent);
    }catch (olay) {// Hatayý yansýt
        section.innerHTML = "";
        let paragraf = document.createElement ("p");
        paragraf.textContent = "HATA (try-catch): " + olay;
        section.appendChild (paragraf);
    } // catch sonu...
} // func sonu...

ybaþlat.addEventListener ("click", function () {
    jsMetinalaný.value = ilkJSKod;
    kodlamayýEtkinleþtir();
}); // yb..sonu...


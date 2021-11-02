// C1d4a.js: Deðiþtirilebilir html-css-js ödevleri ortak js kodlamasý alt-örneði.

var kýsým = document.querySelector ("section");
var deðiþtirCSS = document.querySelector (".deðiþtirilebilir-css");
var deðiþtirJS = document.querySelector (".deðiþtirilebilir-js");
var htmlMetinalaný = document.querySelector (".oynanabilir-html");
var cssMetinalaný = document.querySelector (".oynanabilir-css");
var jsMetinalaný = document.querySelector (".oynanabilir-js");
var yenile = document.getElementById ("yenidenbaþlat");
var ilkHTMLKodlama = htmlMetinalaný.value;
var ilkCSSKodlama = cssMetinalaný.value;
var ilkJSKodlama = jsMetinalaný.value;

function kodlamalarýEtkinleþtir() {
    kýsým.innerHTML = htmlMetinalaný.value;
    deðiþtirCSS.innerHTML = cssMetinalaný.value;
    deðiþtirJS.textContent = jsMetinalaný.value;
    try {eval (deðiþtirJS.textContent);
    }catch (o) {
        let paragraf = document.createElement ("p");
        paragraf.textContent = o;
        kýsým.appendChild (paragraf);
    } // catch sonu...
} // func sonu...

yenile.addEventListener ("click", function () {
    htmlMetinalaný.value = ilkHTMLKodlama;
    cssMetinalaný.value = ilkCSSKodlama;
    jsMetinalaný.value = ilkJSKodlama;
    kodlamalarýEtkinleþtir();
}); // yen..sonu...

htmlMetinalaný.addEventListener ("input", kodlamalarýEtkinleþtir);
cssMetinalaný.addEventListener ("input", kodlamalarýEtkinleþtir);
jsMetinalaný.addEventListener ("input", kodlamalarýEtkinleþtir);
window.addEventListener ("load", kodlamalarýEtkinleþtir);
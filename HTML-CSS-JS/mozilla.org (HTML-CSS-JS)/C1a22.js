// C1a22.js: Deðiþtirilebilir CSS ve HTML kodlamalarýný geçerlileme JS altprogramý örneði.

var kýsým = document.querySelector ("section");
var deðiþtir = document.querySelector (".deðiþtirilebilir");
var htmlMetinalaný = document.querySelector (".oynanabilir-html");
var cssMetinalaný = document.querySelector (".oynanabilir-css");
var yenile = document.getElementById ("yenidenbaþlat");
var ilkJSKodlama = htmlMetinalaný.value;
var ilkCSSKodlama = cssMetinalaný.value;

function kodlamalarýEtkinleþtir() {
    kýsým.innerHTML = htmlMetinalaný.value;
    deðiþtir.innerHTML = cssMetinalaný.value;
} // func sonu...

yenile.addEventListener ("click", function () {
    htmlMetinalaný.value = ilkJSKodlama;
    cssMetinalaný.value = ilkCSSKodlama;
    kodlamalarýEtkinleþtir();
}); // yen..sonu...

htmlMetinalaný.addEventListener ("input", kodlamalarýEtkinleþtir);
cssMetinalaný.addEventListener ("input", kodlamalarýEtkinleþtir);
window.addEventListener ("load", kodlamalarýEtkinleþtir);
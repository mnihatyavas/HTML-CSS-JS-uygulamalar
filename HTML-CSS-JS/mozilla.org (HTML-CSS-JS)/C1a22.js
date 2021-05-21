// C1a22.js: De�i�tirilebilir CSS ve HTML kodlamalar�n� ge�erlileme JS altprogram� �rne�i.

var k�s�m = document.querySelector ("section");
var de�i�tir = document.querySelector (".de�i�tirilebilir");
var htmlMetinalan� = document.querySelector (".oynanabilir-html");
var cssMetinalan� = document.querySelector (".oynanabilir-css");
var yenile = document.getElementById ("yenidenba�lat");
var ilkJSKodlama = htmlMetinalan�.value;
var ilkCSSKodlama = cssMetinalan�.value;

function kodlamalar�Etkinle�tir() {
    k�s�m.innerHTML = htmlMetinalan�.value;
    de�i�tir.innerHTML = cssMetinalan�.value;
} // func sonu...

yenile.addEventListener ("click", function () {
    htmlMetinalan�.value = ilkJSKodlama;
    cssMetinalan�.value = ilkCSSKodlama;
    kodlamalar�Etkinle�tir();
}); // yen..sonu...

htmlMetinalan�.addEventListener ("input", kodlamalar�Etkinle�tir);
cssMetinalan�.addEventListener ("input", kodlamalar�Etkinle�tir);
window.addEventListener ("load", kodlamalar�Etkinle�tir);
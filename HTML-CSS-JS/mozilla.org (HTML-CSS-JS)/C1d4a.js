// C1d4a.js: De�i�tirilebilir html-css-js �devleri ortak js kodlamas� alt-�rne�i.

var k�s�m = document.querySelector ("section");
var de�i�tirCSS = document.querySelector (".de�i�tirilebilir-css");
var de�i�tirJS = document.querySelector (".de�i�tirilebilir-js");
var htmlMetinalan� = document.querySelector (".oynanabilir-html");
var cssMetinalan� = document.querySelector (".oynanabilir-css");
var jsMetinalan� = document.querySelector (".oynanabilir-js");
var yenile = document.getElementById ("yenidenba�lat");
var ilkHTMLKodlama = htmlMetinalan�.value;
var ilkCSSKodlama = cssMetinalan�.value;
var ilkJSKodlama = jsMetinalan�.value;

function kodlamalar�Etkinle�tir() {
    k�s�m.innerHTML = htmlMetinalan�.value;
    de�i�tirCSS.innerHTML = cssMetinalan�.value;
    de�i�tirJS.textContent = jsMetinalan�.value;
    try {eval (de�i�tirJS.textContent);
    }catch (o) {
        let paragraf = document.createElement ("p");
        paragraf.textContent = o;
        k�s�m.appendChild (paragraf);
    } // catch sonu...
} // func sonu...

yenile.addEventListener ("click", function () {
    htmlMetinalan�.value = ilkHTMLKodlama;
    cssMetinalan�.value = ilkCSSKodlama;
    jsMetinalan�.value = ilkJSKodlama;
    kodlamalar�Etkinle�tir();
}); // yen..sonu...

htmlMetinalan�.addEventListener ("input", kodlamalar�Etkinle�tir);
cssMetinalan�.addEventListener ("input", kodlamalar�Etkinle�tir);
jsMetinalan�.addEventListener ("input", kodlamalar�Etkinle�tir);
window.addEventListener ("load", kodlamalar�Etkinle�tir);
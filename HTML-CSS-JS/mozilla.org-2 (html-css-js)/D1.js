// D1.js: Değiştirilebilir html-css-js ödevleri ortak js kodlaması alt-örneği.

var kısım = document.querySelector ("section");
var değiştirCSS = document.querySelector (".değiştirilebilir-css");
var değiştirJS = document.querySelector (".değiştirilebilir-js");
var htmlMetinalanı = document.querySelector (".oynanabilir-html");
var cssMetinalanı = document.querySelector (".oynanabilir-css");
var jsMetinalanı = document.querySelector (".oynanabilir-js");
var yenile = document.getElementById ("yenidenbaşlat");
var ilkHTMLKodlama = htmlMetinalanı.value;
var ilkCSSKodlama = cssMetinalanı.value;
var ilkJSKodlama = jsMetinalanı.value;

function kodlamalarıEtkinleştir() {
    kısım.innerHTML = htmlMetinalanı.value;
    değiştirCSS.innerHTML = cssMetinalanı.value;
    değiştirJS.textContent = jsMetinalanı.value;
    try {eval (değiştirJS.textContent);
    }catch (o) {
        let paragraf = document.createElement ("p");
        paragraf.textContent = o;
        kısım.appendChild (paragraf);
    } // catch sonu...
} // func sonu...

yenile.addEventListener ("click", function () {
    htmlMetinalanı.value = ilkHTMLKodlama;
    cssMetinalanı.value = ilkCSSKodlama;
    jsMetinalanı.value = ilkJSKodlama;
    kodlamalarıEtkinleştir();
}); // yen..sonu...

htmlMetinalanı.addEventListener ("input", kodlamalarıEtkinleştir);
cssMetinalanı.addEventListener ("input", kodlamalarıEtkinleştir);
jsMetinalanı.addEventListener ("input", kodlamalarıEtkinleştir);
window.addEventListener ("load", kodlamalarıEtkinleştir);
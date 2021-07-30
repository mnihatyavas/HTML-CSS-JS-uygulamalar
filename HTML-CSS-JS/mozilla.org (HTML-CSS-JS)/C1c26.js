// C1c26.js: Metinalan�na girilen js kodlamalar�n i�letilme kodlamas� alt-�rne�i.

var section = document.querySelector ("section");
var taslak = document.querySelector ("script");
var jsMetinalan� = document.querySelector (".de�i�tirilebilir-js");
var yba�lat = document.getElementById ("yeniba�lat");
var ilkJSKod = jsMetinalan�.value;

window.addEventListener ("load", kodlamay�Etkinle�tir);
jsMetinalan�.addEventListener ("input", kodlamay�Etkinle�tir);

function kodlamay�Etkinle�tir() {
    taslak.textContent = jsMetinalan�.value;
    try {eval (taslak.textContent);
    }catch (olay) {// Hatay� yans�t
        section.innerHTML = "";
        let paragraf = document.createElement ("p");
        paragraf.textContent = "HATA (try-catch): " + olay;
        section.appendChild (paragraf);
    } // catch sonu...
} // func sonu...

yba�lat.addEventListener ("click", function () {
    jsMetinalan�.value = ilkJSKod;
    kodlamay�Etkinle�tir();
}); // yb..sonu...


﻿// C1a10.js: HTML-etiket ve CSS-vasıf'ları değiştirilebilir temel metin biçimleme js-kodlaması alt-örneği.

let görselKısım = document.querySelector (".kısım");
let değiştirCSS = document.querySelector (".değiştir");
let metinalanıHTML = document.querySelector (".değiştirilebilir-html");
let metinalanıCSS = document.querySelector (".değiştirilebilir-css");

function kodlamayıEtkinleştir() {
    değiştirCSS.innerHTML = metinalanıCSS.value; // CSS değişikliğini HEAD-STYLE'da etkinleştir...
    görselKısım.innerHTML = metinalanıHTML.value; // HTML değişikliğini BODY-SECTION'da etkinleştir...
} // func sonu...

window.addEventListener ("load", kodlamayıEtkinleştir); // İlk yükleniş...
metinalanıHTML.addEventListener ("input", kodlamayıEtkinleştir); // Textarea-HTML değişiklikleri...
metinalanıCSS.addEventListener ("input", kodlamayıEtkinleştir); // Textarea-CSS değişiklikleri...

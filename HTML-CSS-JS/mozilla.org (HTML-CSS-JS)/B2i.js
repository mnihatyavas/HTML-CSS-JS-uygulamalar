let kısım1 = document.querySelector ('.kısım1');
let değiştirilebilir1 = document.querySelector ('.değiştirilebilir1');
let textareaHTML1 = document.querySelector ('.oynanabilir-html1');
let textareaCSS1 = document.querySelector ('.oynanabilir-css1');
let kısım2 = document.querySelector ('.kısım2');
let değiştirilebilir2 = document.querySelector ('.değiştirilebilir2');
let textareaHTML2 = document.querySelector ('.oynanabilir-html2');
let textareaCSS2 = document.querySelector ('.oynanabilir-css2');
let yenidenbaşlat = document.getElementById ('yenidenbaşlat');
let htmlKod1 = textareaHTML1.value;
let cssKod1 = textareaCSS1.value;
let htmlKod2 = textareaHTML2.value;
let cssKod2 = textareaCSS2.value;
let demo1_aktif = document.getElementById ('demo1_kontrol');
let demo2_aktif = document.getElementById ('demo2_kontrol');

function kodlamayıEtkinleştir() {
    değiştirilebilir1.innerHTML = textareaCSS1.value;
    kısım1.innerHTML = textareaHTML1.value;
    değiştirilebilir2.innerHTML = textareaCSS2.value;
    kısım2.innerHTML = textareaHTML2.value;
} // func sonu...

yenidenbaşlat.addEventListener ('click', function () {
    textareaHTML1.value = htmlKod1;
    textareaCSS1.value = cssKod1;
    textareaHTML2.value = htmlKod2;
    textareaCSS2.value = cssKod2;
    demo1_aktif.checked = true;
    demo1_aktif.parentNode.classList.remove ('pasif');
    demo2_aktif.checked = true;
    demo2_aktif.parentNode.classList.remove ('pasif');
    kodlamayıEtkinleştir();
}); // yen..sonu...

demo1_aktif.addEventListener ('change', function () {
    if (this.checked) {this.parentNode.classList.remove ('pasif');
    }else {this.parentNode.classList.add ('pasif');}
}); // femo1 sonu...

demo2_aktif.addEventListener ('change', function () {
    if (this.checked) {this.parentNode.classList.remove ('pasif');
    }else {this.parentNode.classList.add ('pasif');}
}); // demo2 sonu...

textareaHTML1.addEventListener ('input', kodlamayıEtkinleştir);
textareaCSS1.addEventListener ('input', kodlamayıEtkinleştir);
textareaHTML2.addEventListener ('input', kodlamayıEtkinleştir);
textareaCSS2.addEventListener ('input', kodlamayıEtkinleştir);
window.addEventListener ('load', kodlamayıEtkinleştir);
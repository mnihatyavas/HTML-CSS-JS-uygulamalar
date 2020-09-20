let kısım = document.querySelector ("section");
let değiştir = document.querySelector (".değiştir");
let metinalanıHTML = document.querySelector (".değiştirilebilir-html");
let metinalanıCSS = document.querySelector (".değiştirilebilir-css");
let yenidenbaşlat = document.getElementById ("yenidenbaşlat");
let htmlKodu = metinalanıHTML.value;
let cssKodu = metinalanıCSS.value;

function kodla() {
    değiştir.innerHTML = metinalanıCSS.value;
    kısım.innerHTML = metinalanıHTML.value;
} // func sonu...

yenidenbaşlat.addEventListener ("click", function () {
    metinalanıHTML.value = htmlKodu;
    metinalanıCSS.value = cssKodu;
    kodla();
}); // yen..sonu...

metinalanıHTML.addEventListener ("input", kodla);
metinalanıCSS.addEventListener ("input", kodla);
window.addEventListener ("load", kodla);
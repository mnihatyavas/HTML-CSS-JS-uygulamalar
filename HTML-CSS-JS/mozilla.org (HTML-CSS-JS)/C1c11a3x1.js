// C1c11a3x1.js: Paragraf yaratmanın harici js dosyası fonksiyonuyla gerçekleştirilmesi alt-örneği.

function paragrafYarat() {
    let paragraf = document.createElement ("p");
    paragraf.textContent = "Vayy, harici JS ile tıkladın beni!..";
    document.body.appendChild (paragraf);
} // func sonu...
//const düğmeler = document.querySelectorAll ("button");
//for (let i = 0; i < düğmeler.length ; i++) {düğmeler [i].addEventListener ("click", paragrafYarat); }
document.querySelector ("button").addEventListener ("click", paragrafYarat);
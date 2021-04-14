B3c1x2.js: Tuvali yaratan ve şeklin alanla çevresini raporlayan alt-program-2 örneği.

function tuvaliYarat (ad, ebeveyn, en, boy) { // Dinamik div-canvas-ctx yarat...
    let divElemanı = document.createElement ("div");
    let tuvalElemanı = document.createElement ("canvas");
    ebeveyn.appendChild (divElemanı);
    divElemanı.appendChild (tuvalElemanı);
    divElemanı.id = ad;
    tuvalElemanı.width = en;
    tuvalElemanı.height = boy;
    let içerik = tuvalElemanı.getContext ("2d");
    return {ctx:içerik, id: ad};
} // func sonu...

function raporListesiniYarat (tuvalAdı) { // Dinamik ul yarat...
    let ulListe = document.createElement ("ul");
    ulListe.id = tuvalAdı + "-raporcusu";
    let tuvalElemanı = document.getElementById (tuvalAdı);
    tuvalElemanı.appendChild (ulListe);
    return ulListe.id;
} // func sonu...

export {tuvaliYarat, raporListesiniYarat};
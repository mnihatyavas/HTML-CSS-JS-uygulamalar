// B3c2x2.js: Modüllerle tuval'de kare, üçgen ve daire çizimi-2 alt-örneği.

function tuvaliYarat (tuvalAdı, ebeveyn, en, boy) {
    let divElemanı = document.createElement ("div");
    let canvasElemanı = document.createElement ("canvas");
    ebeveyn.appendChild (divElemanı);
    divElemanı.appendChild (canvasElemanı);
    divElemanı.id = tuvalAdı;
    canvasElemanı.width = en;
    canvasElemanı.height = boy;
    let tuvalİçeriği = canvasElemanı.getContext ("2d");
    /* return {ctx: tuvalİçeriği, id: tuvalAdı}; */
} // func sonu...

function raporListesiniYarat (tuvalKimliği) {
    let ulElemanı = document.createElement ("ul");
    ulElemanı.id = tuvalAdı + "-raporcusu";
    let tuvalSarıcı = document.getElementById (tuvalKimliği);
    tuvalSarıcı.appendChild (ulElemanı);
    / * return ulElemanı.id; */
} // func sonu...

export {tuvaliYarat, raporListesiniYarat};
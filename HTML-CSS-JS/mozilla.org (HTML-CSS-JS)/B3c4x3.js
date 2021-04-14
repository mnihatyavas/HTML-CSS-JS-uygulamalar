// B3c4x3.js: Modüllerle tuval'de modül nesnesinden sabit kare, üçgen ve daire çizimi-3 alt-örneği.

function şekliÇiz (tuvalİçeriği, uzunluk, x, y, renk) { // Kare
    tuvalİçeriği.fillStyle = renk;
    tuvalİçeriği.fillRect (x, y, uzunluk, uzunluk);
    return {length: uzunluk}
} // func sonu...

function alanıÇevreyiRaporla (renk, şeklinAdı, uzunluk, tuvalRaporcusu) {
    let liElemanı = document.createElement ("li");
    liElemanı.textContent = `${renk} ${şeklinAdı}'nin alanı=${uzunluk * uzunluk}px kare, çevresi=${uzunluk * 4}px'dir.`;
    let listem = document.getElementById (tuvalRaporcusu);
    listem.appendChild (liElemanı);
} // func sonu...

export {şekliÇiz, alanıÇevreyiRaporla};
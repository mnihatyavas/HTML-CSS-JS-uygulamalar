// B3c2x3.js: Modüllerle tuval'de kare, üçgen ve daire çizimi-3 alt-örneği.

const şeklinAdı = "kare";

function şekliÇiz (tuvalİçeriği, uzunluk, x, y, renk) {
    tuvalİçeriği.fillStyle = uzunluk;
    tuvalİçeriği.fillRect (x, y, uzunluk, uzunluk);
    /* return {length: uzunluk, x: x, y: y, color: renk}; */
} // func sonu...

function alanıRaporla (renk, uzunluk, tuvalRaporcusu) {
    let liElemanı = document.createElement ("li");
    liElemanı.textContent = `${renk} ${şeklinAdı}'nin alanı ${uzunluk}*${uzunluk}=${uzunluk * uzunluk}px kare'dir.`;
    let listem = document.getElementById (tuvalRaporcusu);
    listem.appendChild (liElemanı);
} // func sonu...

function çevreyiRaporla (renk, uzunluk, tuvalRaporcusu) {
    let liElemanı = document.createElement ("li");
    liElemanı.textContent = `${renk} ${şeklinAdı}'nin çevresi ${uzunluk}*4=${uzunluk * 4}px'dir.`;
    let listem = document.getElementById (tuvalRaporcusu);
    listem.appendChild (liElemanı);
} // func sonu...

export {şeklinAdı, şekliÇiz, alanıRaporla, çevreyiRaporla};
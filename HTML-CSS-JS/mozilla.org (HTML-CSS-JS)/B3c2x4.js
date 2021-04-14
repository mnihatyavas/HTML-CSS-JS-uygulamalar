// B3c2x4.js: Modüllerle tuval'de kare, üçgen ve daire çizimi-4 alt-örneği.

const şeklinAdı = "üçgen";

function derecedenRadyana (derece) {return derece * Math.PI / 180;};

function şekliÇiz (tuvalİçeriği, uzunluk, x, y, renk) {
    tuvalİçeriği.fillStyle = renk;
    tuvalİçeriği.beginPath();
    tuvalİçeriği.moveTo (x, y);
    tuvalİçeriği.lineTo (x + uzunluk, y);
    let yükseklik = (uzunluk / 2) * Math.tan (derecedenRadyana (60));
    tuvalİçeriği.lineTo (x + (uzunluk/2), y - yükseklik); // y+ olunca üçgen başı aşağıyadır...
    tuvalİçeriği.lineTo (x, y);
    tuvalİçeriği.fill();
    /* return {length: uzunluk, x:x, y:y, color: renk}; */
} // func sonu...

function alanıRaporla (renk, uzunluk, tuvalRaporcusu) {
    let liElemanı = document.createElement ("li");
    liElemanı.textContent = `${renk} ${şeklinAdı}'in alanı karekök(3)/4*${uzunluk}*${uzunluk}=${Math.round ((Math.sqrt (3) / 4) * (uzunluk * uzunluk))}px kare'dir.`;
    let listem = document.getElementById (tuvalRaporcusu);
    listem.appendChild (liElemanı);
} // func sonu...

function çevreyiRaporla (renk, uzunluk, tuvalRaporcusu) {
    let liElemanı = document.createElement ("li");
    liElemanı.textContent = `${renk} ${şeklinAdı}'in çevresi ${uzunluk}*3=${uzunluk * 3}px'dir.`;
    let listem = document.getElementById (tuvalRaporcusu);
    listem.appendChild (liElemanı);
} // func sonu...

export {şeklinAdı, şekliÇiz, alanıRaporla, çevreyiRaporla};
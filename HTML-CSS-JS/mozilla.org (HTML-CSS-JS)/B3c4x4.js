// B3c4x4.js: Modüllerle tuval'de modül nesnesinden sabit kare, üçgen ve daire çizimi-4 alt-örneği.

function derecedenRadyana (derece) {return derece * Math.PI / 180;};

function şekliÇiz (tuvalİçeriği, uzunluk, x, y, renk) { // Üçgen...
    tuvalİçeriği.fillStyle = renk;
    tuvalİçeriği.beginPath();
    tuvalİçeriği.moveTo (x, y);
    tuvalİçeriği.lineTo (x + uzunluk, y);
    let yükseklik = (uzunluk / 2) * Math.tan (derecedenRadyana (60));
    tuvalİçeriği.lineTo (x + (uzunluk/2), y - yükseklik); // y+ olunca üçgen baş-aşağı olur...
    tuvalİçeriği.lineTo (x, y);
    tuvalİçeriği.fill();
    return {length: uzunluk}
} // func sonu...

function alanıÇevreyiRaporla (renk, şeklinAdı, uzunluk, tuvalRaporcusu) {
    let liElemanı = document.createElement ("li");
    liElemanı.textContent = `${renk} ${şeklinAdı}'in alanı=${Math.round ((Math.sqrt (3) / 4) * (uzunluk * uzunluk))}px kare, çevresi=${uzunluk * 3}px'dir.`;
    let listem = document.getElementById (tuvalRaporcusu);
    listem.appendChild (liElemanı);
} // func sonu...

export {şekliÇiz, alanıÇevreyiRaporla};
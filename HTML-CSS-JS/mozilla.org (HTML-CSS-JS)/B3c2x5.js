// B3c2x5.js: Modüllerle tuval'de kare, üçgen ve daire çizimi-5 alt-örneği.

const şeklinAdı = "daire";

function derecedenRadyana (derece) {return derece * Math.PI / 180;};

function şekliÇiz (tuvalİçeriği, yarıçap, x, y, renk) {
    tuvalİçeriği.fillStyle = renk;
    tuvalİçeriği.beginPath();
    tuvalİçeriği.arc (x, y, yarıçap, derecedenRadyana (0), derecedenRadyana (360), false);
    tuvalİçeriği.fill();
    /* return {radius: yarıçap, x:x, y:y, color:renk}; */
} // func sonu...

function alanıRaporla (renk, yarıçap, tuvalRaporu) {
    let liElemanı = document.createElement ("li");
    liElemanı.textContent = `${renk} ${şeklinAdı}'nin alanı pi*${yarıçap}*${yarıçap}=${Math.round (Math.PI * (yarıçap * yarıçap))}px kare'dir.`;
    let listem = document.getElementById (tuvalRaporu);
    listem.appendChild (liElemanı);
} // func sonu...

function çevreyiRaporla (renk, yarıçap, tuvalRaporcusu) {
    let liElemanı = document.createElement ("li");
    liElemanı.textContent = `${renk} ${şeklinAdı}'nin çevresi 2*pi*${yarıçap}=${Math.round (2 * Math.PI * yarıçap)}px'dir.`;
    let listem = document.getElementById (tuvalRaporcusu);
    listem.appendChild (liElemanı);
} // func sonu...

export {şeklinAdı, şekliÇiz, alanıRaporla, çevreyiRaporla};
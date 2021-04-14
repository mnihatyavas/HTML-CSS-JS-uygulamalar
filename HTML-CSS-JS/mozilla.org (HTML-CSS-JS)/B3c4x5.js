// B3c4x5.js: Modüllerle tuval'de modül nesnesinden sabit kare, üçgen ve daire çizimi-5 alt-örneği.

function derecedenRadyana (derece) {return derece * Math.PI / 180;};

function şekliÇiz (tuvalİçeriği, yarıçap, x, y, renk) { // Daire...
    tuvalİçeriği.fillStyle = renk;
    tuvalİçeriği.beginPath();
    tuvalİçeriği.arc (x, y, yarıçap, derecedenRadyana (0), derecedenRadyana (360), false);
    tuvalİçeriği.fill();
    return {radius: yarıçap}
} // func sonu...

function alanıÇevreyiRaporla (renk, şeklinAdı, yarıçap, tuvalRaporu) {
    let liElemanı = document.createElement ("li");
    liElemanı.textContent = `${renk} ${şeklinAdı}'nin alanı=${Math.round (Math.PI * (yarıçap * yarıçap))}px kare, çevresi=${Math.round (2 * Math.PI * yarıçap)}px'dir.`;
    let listem = document.getElementById (tuvalRaporu);
    listem.appendChild (liElemanı);
} // func sonu...

export {şekliÇiz, alanıÇevreyiRaporla};
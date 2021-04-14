// B3c6x5.js: Modüllerle tuval'de buton tıklamalı dinamik kare, üçgen ve daire çizimi-5 örneği.

function derecedenRadyana (derece) {return derece * Math.PI / 180;};

class Daire {
    constructor (içeriğim, ulAdım, yarıçapım, x, y, renk1, renk2) {
        this.içerik = içeriğim;
        this.ulAdı = ulAdım;
        this.yarıçap = yarıçapım;
        this.x = x;
        this.y = y;
        this.renk1 = renk1;
        this.renk2 = renk2;
        this.şekilAdı = "daire";
    } // con..sonu...

    şekliÇiz() {
        this.içerik.fillStyle = this.renk1;
        this.içerik.beginPath();
        this.içerik.arc (this.x, this.y, this.yarıçap, derecedenRadyana (0), derecedenRadyana (360), false);
        this.içerik.fill();
    } // şek..sonu...

    alanıÇevreyiRaporla() {
        let liElemanı = document.createElement ("li");
        liElemanı.textContent = `${this.renk2} ${this.şekilAdı}'nin alanı=${Math.round (Math.PI * (this.yarıçap * this.yarıçap))}px kare, çevresi=${Math.round(2 * Math.PI * this.yarıçap)}px'dir.`;
        let listem = document.getElementById (this.ulAdı);
        listem.appendChild (liElemanı);
    } // ala..sonu...
} // Daire sonu...

export { Daire };

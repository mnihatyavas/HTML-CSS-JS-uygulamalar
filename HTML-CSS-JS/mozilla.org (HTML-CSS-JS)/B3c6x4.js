// B3c6x4.js: Modüllerle tuval'de buton tıklamalı dinamik kare, üçgen ve daire çizimi-4 örneği.

function derecedenRadyana (derece) {return derece * Math.PI / 180;};

class Üçgen {
    constructor (içeriğim, ulAdım, uzunluğum, x, y, renk1, renk2) {
        this.içerik = içeriğim;
        this.ulAdı = ulAdım;
        this.uzunluk = uzunluğum;
        this.x = x;
        this.y = y;
        this.renk1 = renk1;
        this.renk2 = renk2;
        this.şekilAdı = "üçgen";
    } // con..sonu...

    şekliÇiz() {
        this.içerik.fillStyle = this.renk1;
        this.içerik.beginPath();
        this.içerik.moveTo (this.x, this.y);
        this.içerik.lineTo (this.x + this.uzunluk, this.y);
        let yükseklik = (this.uzunluk/2) * Math.tan (derecedenRadyana (60));
        this.içerik.lineTo (this.x + (this.uzunluk/2), this.y + yükseklik); // Başyukarı üçgen için "- yükseklik" yapın...
        this.içerik.lineTo (this.x, this.y);
        this.içerik.fill();
    } // şek..sonu...

    alanıÇevreyiRaporla() {
        let liElemanı = document.createElement ("li");
        liElemanı.textContent = `${this.renk2} ${this.şekilAdı}'in alanı=${Math.round ((Math.sqrt (3) / 4) * (this.uzunluk * this.uzunluk))}px kare, çevresi=${this.uzunluk * 3}px'dir.`;
        let listem = document.getElementById (this.ulAdı);
        listem.appendChild (liElemanı);
    } // ala..sonu...
} // Üçgen sonu...

export { Üçgen };

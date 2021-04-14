// B3c6x3.js: Modüllerle tuval'de buton tıklamalı dinamik kare, üçgen ve daire çizimi-3 örneği.

class Kare {
    constructor (içeriğim, ulAdım, uzunluğum, x, y, renk1, renk2) {
        this.içerik = içeriğim;
        this.ulAdı = ulAdım;
        this.uzunluk = uzunluğum;
        this.x = x;
        this.y = y;
        this.renk1 = renk1;
        this.renk2 = renk2;
        this.şekilAdı = "kare";
    } // con..sonu...

    şekliÇiz() {
        this.içerik.fillStyle = this.renk1;
        this.içerik.fillRect (this.x, this.y, this.uzunluk, this.uzunluk);
    } // şek..sonu...

    alanıÇevreyiRaporla() {
        let liElemanı = document.createElement ("li");
        liElemanı.textContent = `${this.renk2} ${this.şekilAdı}'nin alanı=${this.uzunluk * this.uzunluk}px kare, çevresi=${this.uzunluk * 4}px'dir.`;
        let listem = document.getElementById (this.ulAdı);
        listem.appendChild (liElemanı);
    } // ala..sonu...
} // Kare sonu...

export { Kare };

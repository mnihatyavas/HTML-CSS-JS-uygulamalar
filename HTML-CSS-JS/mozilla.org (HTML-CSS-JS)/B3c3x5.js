// B3c3x5.js: JS modüllerle tuval'de sınıflı sabit kare, üçgen ve daire çizimi-5 alt-örneği.

function derecedenRadyana (derece) {return derece * Math.PI / 180;};

class Daire {
    constructor (içerik, listeAdı, yarıçap, x, y, renk) {
        this.içerik = içerik;
        this.listeAdı = listeAdı;
        this.yarıçap = yarıçap;
        this.x = x;
        this.y = y;
        this.renk = renk;
        this.şeklinAdı = "daire";
    } // kurucu sonu...

    şekliÇiz() {
        this.içerik.fillStyle = this.renk;
        this.içerik.beginPath();
        this.içerik.arc (this.x, this.y, this.yarıçap, derecedenRadyana (0), derecedenRadyana (360), false);
        this.içerik.fill();
    } // çiz sonu...

    şeklinAlanınıRaporla() {
        let liElemanı = document.createElement ("li");
        liElemanı.textContent = `${this.renk} ${this.şeklinAdı}'nin alanı: 3.14*${this.yarıçap}*${this.yarıçap}=${Math.round (Math.PI * (this.yarıçap * this.yarıçap))}px kare'dir.`;
        let ulListe = document.getElementById (this.listeAdı);
        ulListe.appendChild (liElemanı);
    } // Alan sonu...

    şeklinÇevresiniRaporla() {
        let liElemanı = document.createElement ("li");
        liElemanı.textContent = `${this.renk} ${this.şeklinAdı}'nin çevresi: 2*3.14*${this.yarıçap}=${Math.round (2 * Math.PI * this.yarıçap)}px'dir.`;
        let ulListe = document.getElementById (this.listeAdı);
        ulListe.appendChild (liElemanı);
    } // Çevre sonu...
} // Sınıf sonu...

export { Daire };
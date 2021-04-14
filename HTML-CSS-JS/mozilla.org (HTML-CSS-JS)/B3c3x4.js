// B3c3x4.js: JS modüllerle tuval'de sınıflı sabit kare, üçgen ve daire çizimi-4 alt-örneği.

function derecedenRadyana (derece) {return derece * Math.PI / 180;};

class Üçgen {
    constructor (içerik, listeAdı, uzunluk, x, y, renk) {
        this.içerik = içerik;
        this.listeAdı = listeAdı;
        this.uzunluk = uzunluk;
        this.x = x;
        this.y = y;
        this.renk = renk;
        this.şeklinAdı = "üçgen";
    } // kurucu sonu...

    şekliÇiz () {
        this.içerik.fillStyle = this.renk;
        this.içerik.beginPath();
        this.içerik.moveTo (this.x, this.y);
        this.içerik.lineTo (this.x + this.uzunluk, this.y);
        let yükseklik = (this.uzunluk / 2) * Math.tan (derecedenRadyana (60));
        this.içerik.lineTo (this.x + (this.uzunluk / 2), this.y - yükseklik); // Üçgen başı yukarıya...
        this.içerik.lineTo (this.x, this.y);
        this.içerik.fill();
    } // çiz sonu...

    şeklinAlanınıRaporla() {
        let liElemanı = document.createElement ("li");
        liElemanı.textContent = `${this.renk} ${this.şeklinAdı}'in alanı: karekök(3)/4)*${this.uzunluk}*${this.uzunluk}=${Math.round ((Math.sqrt (3) / 4) * (this.uzunluk * this.uzunluk))}px kare'dir.`;
        let ulListe = document.getElementById (this.listeAdı);
        ulListe.appendChild (liElemanı);
    } // Alan sonu...

    şeklinÇevresiniRaporla() {
        let liElemanı = document.createElement ("li");
        liElemanı.textContent = `${this.renk} ${this.şeklinAdı}'in çevresi: 3*${this.uzunluk}=${this.uzunluk * 3}px'dir.`;
        let ulListe = document.getElementById (this.listeAdı);
        ulListe.appendChild (liElemanı);
    } // Çevre sonu...
} // Sınıf sonu...

export { Üçgen };
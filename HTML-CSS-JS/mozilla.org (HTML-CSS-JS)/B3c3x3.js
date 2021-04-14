// B3c3x3.js: JS modüllerle tuval'de sınıflı sabit kare, üçgen ve daire çizimi-3 alt-örneği.

class Kare {
    constructor (içerik, listeAdı, uzunluk, x, y, renk) {
        this.içerik = içerik;
        this.listeAdı = listeAdı;
        this.uzunluk = uzunluk;
        this.x = x;
        this.y = y;
        this.renk = renk;
        this.şeklinAdı = "kare";
    } // kurucu sonu...

    şekliÇiz() {
        this.içerik.fillStyle = this.renk;
        this.içerik.fillRect (this.x, this.y, this.uzunluk, this.uzunluk);
    } // Çiz sonu...

    şeklinAlanınıRaporla() {
        let liElemanı = document.createElement ("li");
        liElemanı.textContent = `${this.renk} ${this.şeklinAdı}'nin alanı: ${this.uzunluk}*${this.uzunluk}=${this.uzunluk * this.uzunluk}px kare'dir.`;
        let ulListe = document.getElementById (this.listeAdı);
        ulListe.appendChild (liElemanı);
    } // Alan sonu...

    şeklinÇevresiniRaporla() {
        let liElemanı = document.createElement ("li");
        liElemanı.textContent = `${this.renk} ${this.şeklinAdı}'nin çevresi: 4*${this.uzunluk}=${this.uzunluk * 4}px'dir.`;
        let ulListe = document.getElementById (this.listeAdı);
        ulListe.appendChild (liElemanı);
    } // Çevre sonu...
}

export { Kare };
// C1c33a2.js: Kurucu sýnýfla türetilen hareketli toplarýn js kodlamasý alt-örneði.

// Canvas tuvalin kurulmasý:
const tuval = document.querySelector ("canvas");
const içerik = tuval.getContext ("2d");
const en = tuval.width = window.innerWidth;
const boy = tuval.height = window.innerHeight;

// Rasgele sayý üreten fonksiyon:
function rasgele (enküçük, enbüyük) {return Math.floor (Math.random() * (enbüyük - enküçük + 1)) + enküçük; }

class Top {
    // Sýnýf kurucu deðiþkenleri:
    constructor (x,y, hýzX,hýzY, renk, yarýçap) {
        this.x = x;
        this.y = y;
        this.hýzX = hýzX;
        this.hýzY = hýzY;
        this.renk = renk;
        this.yarýçap = yarýçap;
    } // con..sonu...

    // Sýnýf metodlarý:
    çiz() {
        içerik.beginPath();
        içerik.fillStyle = this.renk;
        içerik.arc (this.x,this.y, this.yarýçap, 0, 2 * Math.PI); // çemberin tam çevresi = arc = 2pr
        içerik.fill();
    } // çiz sonu...
    güncelle() {
        if ((this.x + this.yarýçap) >= en) {this.hýzX = -(this.hýzX);}
        if ((this.x - this.yarýçap) <= 0) {this.hýzX = -(this.hýzX);}
        if ((this.y + this.yarýçap) >= boy) {this.hýzY = -(this.hýzY);}
        if ((this.y - this.yarýçap) <= 0) {this.hýzY = -(this.hýzY);}
        this.x += this.hýzX;
        this.y += this.hýzY;
    } // güncelle sonu...
    çarpýþanTespiti() {
        for (let j = 0; j < toplar.length; j++) {
            if (! (this === toplar [j])) {
                const dx = this.x - toplar [j].x;
                const dy = this.y - toplar [j].y;
                const fark = Math.sqrt (dx * dx + dy * dy);
                if (fark < this.yarýçap + toplar [j].yarýçap) {toplar [j].renk = this.renk = "rgb(" + rasgele(0, 255) + "," + rasgele(0, 255) + "," + rasgele(0, 255) +")";}
            } // if sonu...
        } // for sonu...
    } // çar..sonu...
} // sýnýf sonu...

var toplar = [];
while (toplar.length < 100) {// Ýlk ragele 100 top tiplemesi yaratýlýyor:
    const yarýçap = rasgele (5, 20);
    let top = new Top (
        rasgele (0 + yarýçap, en - yarýçap), // x
        rasgele (0 + yarýçap,boy - yarýçap), // y
        rasgele (-5, 5), // hýzX
        rasgele (-5, 5), // hýzY
        "rgb(" + rasgele (0, 255) + "," + rasgele (0, 255) + "," + rasgele (0, 255) +")", // renk
        yarýçap // r
    ); // let sonu...
    toplar.push (top);
} // while sonu..

function animasyonDöngüsü() {
    içerik.fillStyle = "rgba(0, 0, 0, 0.25)"; // %25 netlikte siyah zemin rengi
    içerik.fillRect (0, 0, en, boy); // Dikdörtgen zemini fillStyle rengiyle boya
    for (let i = 0; i < toplar.length; i++) {
        toplar [i].çiz(); // 100 rasgele top çiz
        toplar [i].güncelle(); // Toplarýn (-+) hýxX,hýzY artýþlarýný güncelle
        toplar [i].çarpýþanTespiti(); // Çarpýþanlarýn renklerini deðiþtir
    } // for sonu...
    requestAnimationFrame (animasyonDöngüsü); // fonksiyonu sürekli iþlet
} // func sonu...

animasyonDöngüsü(); // Animasyonu baþlat
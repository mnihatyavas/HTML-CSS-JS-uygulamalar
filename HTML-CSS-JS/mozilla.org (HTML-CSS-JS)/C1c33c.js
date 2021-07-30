// C1c33c.js: Þekil, Top ve Karadelik sýnýflý imhalý hareketli toplarýn js kodlamasý alt-örneði.

// Bu gösterinin yaratýcýsý Renan Martineli'ye teþekkürler...

// Tuval'in kurulmasý
const paragraf = document.querySelector ("p");
let sayaç = 0;
const tuval = document.querySelector ("canvas");
const içrk = tuval.getContext ("2d");
const en = tuval.width = window.innerWidth;
const boy = tuval.height = window.innerHeight;

// Rasgele sayý üreten fonksiyon:
function rasgele (alt, üst) {return  Math.floor (Math.random() * (üst - alt)) + alt;};

class Þekil {
    constructor (x, y, hýzX, hýzY, mevcutMu) {
        this.x = x;
        this.y = y;
        this.hýzX = hýzX;
        this.hýzY = hýzY;
        this.mevcutMu = mevcutMu;
    } // con..sonu...
} // class sonu...

class Top extends Þekil {
    constructor (x, y, hýzX, hýzY, renk, yarýçap, mevcutMu) {
        super (x, y, hýzX, hýzY, mevcutMu);
        this.renk = renk;
        this.yarýçap = yarýçap;
    } // con..sonu...
    çiz() {
        içrk.beginPath();
        içrk.fillStyle = this.renk;
        içrk.arc (this.x, this.y, this.yarýçap, 0, 2 * Math.PI);
        içrk.fill();
    } // çiz sonu...
    güncelle() {
        if ((this.x + this.yarýçap) >= en) {this.hýzX = -(this.hýzX);}
        if ((this.x - this.yarýçap) <= 0) {this.hýzX = -(this.hýzX);}
        if ((this.y + this.yarýçap) >= boy) {this.hýzY = -(this.hýzY);}
        if ((this.y - this.yarýçap) <= 0) {this.hýzY = -(this.hýzY);}
        this.x += this.hýzX;
        this.y += this.hýzY;
    } // gün..sonu...
    çarpýþmaKontrolu() {
        for (let j = 0; j < toplar.length; j++) {
            if (! (this === toplar [j])) {
                const dx = this.x - toplar [j].x;
                const dy = this.y - toplar [j].y;
                const fark = Math.sqrt(dx * dx + dy * dy);
                if (fark < this.yarýçap + toplar [j].yarýçap && toplar [j].mevcutMu) {toplar [j].renk = this.renk = "rgb(" + rasgele(0, 255) + "," + rasgele(0, 255) + "," + rasgele(0, 255) + ")";}
            } //if-dýþ sonu...
        } // for sonu...
    } // çar..sonu...
} // class sonu...

class Karadelik extends Þekil {
    constructor (x, y, mevcutMu) {
        super (x, y, mevcutMu);
        this.hýzX = 20;
        this.hýzY = 20;
        this.renk = "white";
        this.yarýçap = 20;
    } // con..sonu...
    çiz() {
        içrk.beginPath();
        içrk.strokeStyle = this.renk;
        içrk.lineWidth = 5;
        içrk.arc (this.x, this.y, this.yarýçap, 0, 2 * Math.PI);
        içrk.stroke();
    } // çiz sonu...
    sýnýrlarýnKontrolu() {
        if ((this.x + this.yarýçap) >= en) {this.x -= this.yarýçap;}
        if ((this.x - this.yarýçap) <= 0) {this.x += this.yarýçap;}
        if ((this.y + this.yarýçap) >= boy) {this.y -= this.yarýçap;}
        if ((this.y - this.yarýçap) <= 0) {this.y += this.yarýçap;}
    } // sýn..sonu...
    manüelHareketler() {
        const _this = this;
        window.onkeydown = function (o) {
            switch (o.key) {
                case "b": _this.x -= _this.hýzX; break;
                case "d": _this.x += _this.hýzX; break;
                case "k": _this.y -= _this.hýzY; break;
                case "g": _this.y += _this.hýzY; break;
            } // sw..sonu...
        } // win..sonu...
    } // man..sonu...
    çarpýþmaTespiti() {
        for (let j = 0; j < toplar.length; j++) {
            if (toplar [j].mevcutMu) {
                const dx = this.x - toplar [j].x;
                const dy = this.y - toplar [j].y;
                const fark = Math.sqrt (dx**2 + dy**2);
                if (fark < this.yarýçap + toplar [j].yarýçap) {
                    toplar [j].mevcutMu = false;
                    sayaç--;
                    paragraf.textContent = "Kalan top sayýsý: " + sayaç;
                } // if-iç sonu...
            } // if-dýþ sonu...
        } // for sonu...
    } // çar..sonu...
} // sýnýf sonu...

// new Top tiplemesiyle 100 adet top türetilmesi
let toplar = [];
while (toplar.length < 100) {
    const yarýçap = rasgele (10, 30);
        const top = new Top (
            rasgele (0 + yarýçap, en - yarýçap),
            rasgele (0 + yarýçap, boy - yarýçap),
            rasgele (-7, 7),
            rasgele(-7, 7),
            "rgb(" + rasgele (0, 255) + "," + rasgele (0, 255) + "," + rasgele (0, 255) + ")",
            yarýçap,
            true
        ); //new sonu...
        toplar.push (top);
        sayaç++;
        paragraf.textContent = "Kalan top sayýsý: " + sayaç;
} // while sonu...

let karadelik = new Karadelik (
    rasgele (0, en),
    rasgele (0, boy),
    true
); // let sonu...
karadelik.manüelHareketler();

function animasyonDöngüsü() {
    içrk.fillStyle = "rgba(0, 0, 0, 0.25)";
    içrk.fillRect (0, 0, en, boy);
    for (let i = 0; i < toplar.length; i++) {
        if (toplar [i].mevcutMu) {
            toplar [i].çiz();
            toplar [i].güncelle();
            toplar [i].çarpýþmaKontrolu();
        } // if sonu...
    } // for sonu...
    karadelik.çiz();
    karadelik.sýnýrlarýnKontrolu();
    karadelik.çarpýþmaTespiti();
    requestAnimationFrame (animasyonDöngüsü);
} // func sonu...
animasyonDöngüsü();
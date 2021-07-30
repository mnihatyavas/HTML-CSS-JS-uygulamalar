// C1c33c.js: �ekil, Top ve Karadelik s�n�fl� imhal� hareketli toplar�n js kodlamas� alt-�rne�i.

// Bu g�sterinin yarat�c�s� Renan Martineli'ye te�ekk�rler...

// Tuval'in kurulmas�
const paragraf = document.querySelector ("p");
let saya� = 0;
const tuval = document.querySelector ("canvas");
const i�rk = tuval.getContext ("2d");
const en = tuval.width = window.innerWidth;
const boy = tuval.height = window.innerHeight;

// Rasgele say� �reten fonksiyon:
function rasgele (alt, �st) {return  Math.floor (Math.random() * (�st - alt)) + alt;};

class �ekil {
    constructor (x, y, h�zX, h�zY, mevcutMu) {
        this.x = x;
        this.y = y;
        this.h�zX = h�zX;
        this.h�zY = h�zY;
        this.mevcutMu = mevcutMu;
    } // con..sonu...
} // class sonu...

class Top extends �ekil {
    constructor (x, y, h�zX, h�zY, renk, yar��ap, mevcutMu) {
        super (x, y, h�zX, h�zY, mevcutMu);
        this.renk = renk;
        this.yar��ap = yar��ap;
    } // con..sonu...
    �iz() {
        i�rk.beginPath();
        i�rk.fillStyle = this.renk;
        i�rk.arc (this.x, this.y, this.yar��ap, 0, 2 * Math.PI);
        i�rk.fill();
    } // �iz sonu...
    g�ncelle() {
        if ((this.x + this.yar��ap) >= en) {this.h�zX = -(this.h�zX);}
        if ((this.x - this.yar��ap) <= 0) {this.h�zX = -(this.h�zX);}
        if ((this.y + this.yar��ap) >= boy) {this.h�zY = -(this.h�zY);}
        if ((this.y - this.yar��ap) <= 0) {this.h�zY = -(this.h�zY);}
        this.x += this.h�zX;
        this.y += this.h�zY;
    } // g�n..sonu...
    �arp��maKontrolu() {
        for (let j = 0; j < toplar.length; j++) {
            if (! (this === toplar [j])) {
                const dx = this.x - toplar [j].x;
                const dy = this.y - toplar [j].y;
                const fark = Math.sqrt(dx * dx + dy * dy);
                if (fark < this.yar��ap + toplar [j].yar��ap && toplar [j].mevcutMu) {toplar [j].renk = this.renk = "rgb(" + rasgele(0, 255) + "," + rasgele(0, 255) + "," + rasgele(0, 255) + ")";}
            } //if-d�� sonu...
        } // for sonu...
    } // �ar..sonu...
} // class sonu...

class Karadelik extends �ekil {
    constructor (x, y, mevcutMu) {
        super (x, y, mevcutMu);
        this.h�zX = 20;
        this.h�zY = 20;
        this.renk = "white";
        this.yar��ap = 20;
    } // con..sonu...
    �iz() {
        i�rk.beginPath();
        i�rk.strokeStyle = this.renk;
        i�rk.lineWidth = 5;
        i�rk.arc (this.x, this.y, this.yar��ap, 0, 2 * Math.PI);
        i�rk.stroke();
    } // �iz sonu...
    s�n�rlar�nKontrolu() {
        if ((this.x + this.yar��ap) >= en) {this.x -= this.yar��ap;}
        if ((this.x - this.yar��ap) <= 0) {this.x += this.yar��ap;}
        if ((this.y + this.yar��ap) >= boy) {this.y -= this.yar��ap;}
        if ((this.y - this.yar��ap) <= 0) {this.y += this.yar��ap;}
    } // s�n..sonu...
    man�elHareketler() {
        const _this = this;
        window.onkeydown = function (o) {
            switch (o.key) {
                case "b": _this.x -= _this.h�zX; break;
                case "d": _this.x += _this.h�zX; break;
                case "k": _this.y -= _this.h�zY; break;
                case "g": _this.y += _this.h�zY; break;
            } // sw..sonu...
        } // win..sonu...
    } // man..sonu...
    �arp��maTespiti() {
        for (let j = 0; j < toplar.length; j++) {
            if (toplar [j].mevcutMu) {
                const dx = this.x - toplar [j].x;
                const dy = this.y - toplar [j].y;
                const fark = Math.sqrt (dx**2 + dy**2);
                if (fark < this.yar��ap + toplar [j].yar��ap) {
                    toplar [j].mevcutMu = false;
                    saya�--;
                    paragraf.textContent = "Kalan top say�s�: " + saya�;
                } // if-i� sonu...
            } // if-d�� sonu...
        } // for sonu...
    } // �ar..sonu...
} // s�n�f sonu...

// new Top tiplemesiyle 100 adet top t�retilmesi
let toplar = [];
while (toplar.length < 100) {
    const yar��ap = rasgele (10, 30);
        const top = new Top (
            rasgele (0 + yar��ap, en - yar��ap),
            rasgele (0 + yar��ap, boy - yar��ap),
            rasgele (-7, 7),
            rasgele(-7, 7),
            "rgb(" + rasgele (0, 255) + "," + rasgele (0, 255) + "," + rasgele (0, 255) + ")",
            yar��ap,
            true
        ); //new sonu...
        toplar.push (top);
        saya�++;
        paragraf.textContent = "Kalan top say�s�: " + saya�;
} // while sonu...

let karadelik = new Karadelik (
    rasgele (0, en),
    rasgele (0, boy),
    true
); // let sonu...
karadelik.man�elHareketler();

function animasyonD�ng�s�() {
    i�rk.fillStyle = "rgba(0, 0, 0, 0.25)";
    i�rk.fillRect (0, 0, en, boy);
    for (let i = 0; i < toplar.length; i++) {
        if (toplar [i].mevcutMu) {
            toplar [i].�iz();
            toplar [i].g�ncelle();
            toplar [i].�arp��maKontrolu();
        } // if sonu...
    } // for sonu...
    karadelik.�iz();
    karadelik.s�n�rlar�nKontrolu();
    karadelik.�arp��maTespiti();
    requestAnimationFrame (animasyonD�ng�s�);
} // func sonu...
animasyonD�ng�s�();
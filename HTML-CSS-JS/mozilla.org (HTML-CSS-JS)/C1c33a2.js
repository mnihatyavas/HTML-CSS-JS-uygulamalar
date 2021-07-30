// C1c33a2.js: Kurucu s�n�fla t�retilen hareketli toplar�n js kodlamas� alt-�rne�i.

// Canvas tuvalin kurulmas�:
const tuval = document.querySelector ("canvas");
const i�erik = tuval.getContext ("2d");
const en = tuval.width = window.innerWidth;
const boy = tuval.height = window.innerHeight;

// Rasgele say� �reten fonksiyon:
function rasgele (enk���k, enb�y�k) {return Math.floor (Math.random() * (enb�y�k - enk���k + 1)) + enk���k; }

class Top {
    // S�n�f kurucu de�i�kenleri:
    constructor (x,y, h�zX,h�zY, renk, yar��ap) {
        this.x = x;
        this.y = y;
        this.h�zX = h�zX;
        this.h�zY = h�zY;
        this.renk = renk;
        this.yar��ap = yar��ap;
    } // con..sonu...

    // S�n�f metodlar�:
    �iz() {
        i�erik.beginPath();
        i�erik.fillStyle = this.renk;
        i�erik.arc (this.x,this.y, this.yar��ap, 0, 2 * Math.PI); // �emberin tam �evresi = arc = 2pr
        i�erik.fill();
    } // �iz sonu...
    g�ncelle() {
        if ((this.x + this.yar��ap) >= en) {this.h�zX = -(this.h�zX);}
        if ((this.x - this.yar��ap) <= 0) {this.h�zX = -(this.h�zX);}
        if ((this.y + this.yar��ap) >= boy) {this.h�zY = -(this.h�zY);}
        if ((this.y - this.yar��ap) <= 0) {this.h�zY = -(this.h�zY);}
        this.x += this.h�zX;
        this.y += this.h�zY;
    } // g�ncelle sonu...
    �arp��anTespiti() {
        for (let j = 0; j < toplar.length; j++) {
            if (! (this === toplar [j])) {
                const dx = this.x - toplar [j].x;
                const dy = this.y - toplar [j].y;
                const fark = Math.sqrt (dx * dx + dy * dy);
                if (fark < this.yar��ap + toplar [j].yar��ap) {toplar [j].renk = this.renk = "rgb(" + rasgele(0, 255) + "," + rasgele(0, 255) + "," + rasgele(0, 255) +")";}
            } // if sonu...
        } // for sonu...
    } // �ar..sonu...
} // s�n�f sonu...

var toplar = [];
while (toplar.length < 100) {// �lk ragele 100 top tiplemesi yarat�l�yor:
    const yar��ap = rasgele (5, 20);
    let top = new Top (
        rasgele (0 + yar��ap, en - yar��ap), // x
        rasgele (0 + yar��ap,boy - yar��ap), // y
        rasgele (-5, 5), // h�zX
        rasgele (-5, 5), // h�zY
        "rgb(" + rasgele (0, 255) + "," + rasgele (0, 255) + "," + rasgele (0, 255) +")", // renk
        yar��ap // r
    ); // let sonu...
    toplar.push (top);
} // while sonu..

function animasyonD�ng�s�() {
    i�erik.fillStyle = "rgba(0, 0, 0, 0.25)"; // %25 netlikte siyah zemin rengi
    i�erik.fillRect (0, 0, en, boy); // Dikd�rtgen zemini fillStyle rengiyle boya
    for (let i = 0; i < toplar.length; i++) {
        toplar [i].�iz(); // 100 rasgele top �iz
        toplar [i].g�ncelle(); // Toplar�n (-+) h�xX,h�zY art��lar�n� g�ncelle
        toplar [i].�arp��anTespiti(); // �arp��anlar�n renklerini de�i�tir
    } // for sonu...
    requestAnimationFrame (animasyonD�ng�s�); // fonksiyonu s�rekli i�let
} // func sonu...

animasyonD�ng�s�(); // Animasyonu ba�lat
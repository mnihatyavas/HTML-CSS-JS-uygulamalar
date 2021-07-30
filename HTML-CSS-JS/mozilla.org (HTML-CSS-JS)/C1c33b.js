// C1c33b.js: �ekil, Top ve Karadelik imhal� hareketli toplar�n js kodlamas� alt- �rne�i.

// Paragraftaki kalan top say�s�:
const paragraf = document.querySelector ("p");
let saya� = 0;

// Canvas tuvalin kurulmas�:
const tuval = document.querySelector ("canvas");
const i�erik = tuval.getContext ("2d");
const en = tuval.width = window.innerWidth;
const boy = tuval.height = window.innerHeight;

// rasgele say� �reten fonksiyon:
function rasgele (enaz, en�ok) {return Math.floor (Math.random() * (en�ok - enaz)) + enaz;}

// �ekil kurucu fonksiyonu:
function �ekil (x, y, h�zX, h�zY, mevcutMu) {
    this.x = x;
    this.y = y;
    this.h�zX = h�zX;
    this.h�zY = h�zY;
    this.mevcutMu = mevcutMu;
} // func sonu...
�ekil.prototype.constructor = �ekil;

// �ekil'i miraslayan Top kurucu fonksiyonu:
function Top (x, y, h�zX, h�zY, mevcutMu, renk, yar��ap) {
    �ekil.call (this, x, y, h�zX, h�zY, mevcutMu);
    this.renk = renk;
    this.yar��ap = yar��ap;
} // func sonu...
Top.prototype = Object.create (�ekil.prototype);
Top.prototype.constructor = Top;

// Top'un �iz metodu:
Top.prototype.�iz = function() {
    i�erik.beginPath();
    i�erik.fillStyle = this.renk;
    i�erik.arc (this.x, this.y, this.yar��ap, 0, 2 * Math.PI); // arc=�evre=2pr
    i�erik.fill(); // ��i ayn� renkle dolu �ember
}; // �iz sonu...

// Top'un g�ncelle metodu:
Top.prototype.g�ncelle = function() {
    if ((this.x + this.yar��ap) >= en) {this.h�zX = -(this.h�zX);}
    if ((this.x - this.yar��ap) <= 0) {this.h�zX = -(this.h�zX);}
    if ((this.y + this.yar��ap) >= boy) {this.h�zY = -(this.h�zY);}
    if ((this.y - this.yar��ap) <= 0) {this.h�zY = -(this.h�zY);}
    this.x += this.h�zX;
    this.y += this.h�zY;
}; // g�ncelle sonu...

// Top'un �arp��maTespiti metodu:
Top.prototype.�arp��maTespiti = function() {
    for (var j = 0; j < toplar.length; j++) {
        if (! (this === toplar [j])) {// gereksiz, ama KaraDelik e�itli�i s�zkonusu olabilir
            var dx = this.x - toplar [j].x;
            var dy = this.y - toplar [j].y;
            var fark = Math.sqrt (dx * dx + dy * dy);
            if (fark < this.yar��ap + toplar [j].yar��ap && toplar [j].mevcutMu) {toplar [j].renk = this.renk = "rgb(" + rasgele(0,255) + "," + rasgele(0,255) + "," + rasgele(0,255) +")";}
        } // if sonu...
    } // (toplar [j].renk = this.renk =) �arp��an heriki top da ayn� tesad�fi renk al�r
}; // �arp��maTespiti sonu...

// �ekil'i miraslayan Karadelik kurucu fonksiyonu:
function KaraDelik (x, y, mevcutMu) {
    �ekil.call (this, x, y, 20, 20, mevcutMu);
    this.renk = "white"; // Sabit renk ve yar��apl�
    this.yar��ap = 20;
} // func sonu...
KaraDelik.prototype = Object.create (�ekil.prototype);
KaraDelik.prototype.constructor = KaraDelik;

// KaraDelik'in �iz metodu:
KaraDelik.prototype.�iz = function() {
    i�erik.beginPath();
    i�erik.strokeStyle = this.renk; // �izgi rengi
    i�erik.lineWidth = 5; // �izgi kal�nl���
    i�erik.arc (this.x, this.y, this.yar��ap, 0, 2 * Math.PI); // arc=tam �ember=2pr
    i�erik.stroke(); // (Kal�n) beyaz halkay� boya
}; // �iz sonu...

// KaraDelik'in s�n�rlar�nKontrolu metodu (man�el animasyonda halka s�n�rlar� ta�mamal�):
KaraDelik.prototype.s�n�rlar�nKontrolu = function() {
    if ((this.x + this.yar��ap) >= en) {this.x -= this.yar��ap;}
    if ((this.x - this.yar��ap) <= 0) {this.x += this.yar��ap;}
    if ((this.y + this.yar��ap) >= boy) {this.y -= this.yar��ap;}
    if ((this.y - this.yar��ap) <= 0) {this.y += this.yar��ap;}
}; // s�n�rlar�nKontrolu sonu...

// KaraDelik'in man�elHareket metodu:
KaraDelik.prototype.man�elHareket = function() {
    var _this = this; // De�i�tirilebilir halka
    window.onkeydown = function (o) {
        if (o.key === "b") {_this.x -= _this.h�zX; // b=bat�/sola
        }else if (o.key === "d") {_this.x += _this.h�zX; // d=do�u/sa�a
        }else if (o.key === "k") {_this.y -= _this.h�zY; // k=kuzey/yukar�
        }else if (o.key === "g") {_this.y += _this.h�zY;} // g=g�ney/a�a��
    }; // win..sonu...
}; // man�elHareket sonu...

// KaraDelik'in �arp��maTespiti metodu:
KaraDelik.prototype.�arp��maTespiti = function() {
    for (let j = 0; j < toplar.length; j++) {
        if (toplar [j].mevcutMu ) {
            const dx = this.x - toplar [j].x;
            const dy = this.y - toplar [j].y;
            const fark = Math.sqrt (dx **2 + dy * dy);
            if (fark < this.yar��ap + toplar [j].yar��ap) {
                toplar [j].mevcutMu = false; // animasyonD�ng�s�'nde art�k �izilmeyecek
                saya�--; // Kalan (mevcutMu=true) topsay�s� bir azalacak
                paragraf.textContent = "Kalan top say�s�: " + saya�;
            } // i�-if sonu...
        } // d��-if sonu...
    } // for sonu...
}; // �arp��maTespiti sonu...

// 100 adet toplar (dizi) yaratal�m:
const toplar = [];
while (toplar.length < 100) {
    const yar��ap = rasgele (10, 30);
    let top = new Top (// rasgele(enaz,en�ok) heriki y�nl� en ve boy s�n�rlar�ndan yar��ap i�erde olmal�
        rasgele (0 + yar��ap, en - yar��ap), // x
        rasgele (0 + yar��ap, boy - yar��ap), // y
        rasgele (-7, 7), // h�zX p
        rasgele (-7,7), // h�zY px
        true, // mevcutMu
        "rgb(" + rasgele (0, 255) + ", " + rasgele (0, 255) + ", " + rasgele (0, 255) +")", // renk
        yar��ap // r
    ); // let sonu...
    toplar.push (top); // Diziye ekle
    saya�++; // Mevcut (mevcutMu=true ) top say�s�n� birart�r
    paragraf.textContent = "Kalan top say�s�: " + saya�; // Mevcudu ekran�n sa��st �er�evesine yaz
} // while sonu...

// karadelik yeni tiplemesini ve man�el hareketlili�ini etkinle�tirelim:
let karadelik = new KaraDelik (rasgele (0, en), rasgele (0, boy), true);
karadelik.man�elHareket();

// Top'lu ve karadelik'li sahne s�rekli canland�r�lmal�:
function animasyonD�ng�s�() {
    i�erik.fillStyle = "rgba(0, 0, 0, 0.25)"; // %25 net siyah zeminli dikd�rtgen dolgu
    i�erik.fillRect (0,0, en,boy);
    for (let i = 0; i < toplar.length; i++) {
        if (toplar [i].mevcutMu) {
            toplar [i].�iz();
            toplar [i].g�ncelle();
            toplar [i].�arp��maTespiti();
        } // if sonu...
    } // for sonu...
    karadelik.�iz();
    karadelik.s�n�rlar�nKontrolu();
    karadelik.�arp��maTespiti();
    requestAnimationFrame (animasyonD�ng�s�);
} // fanimasyonD�ng�s� sonu...

animasyonD�ng�s�();
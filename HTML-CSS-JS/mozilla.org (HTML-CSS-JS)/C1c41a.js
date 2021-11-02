// C1c41a.js: Z�playan toplar kodlamas� alt-�rne�i.
// Canvas tuvalin kurulumu:
var tuval = document.querySelector ("canvas");
var i�rk = tuval.getContext ("2d");
var en = tuval.width = window.innerWidth;
var boy = tuval.height = window.innerHeight;
var toplar = [];

// Rasgele say� �reten fonksiyon:
function rasgele (alt, �st) {return Math.floor (Math.random() * (�st - alt)) + alt;}

// Kurucu Top fonksiyonu tan�m�:
function Top() {
    this.x = rasgele (0, en);
    this.y = rasgele (0, boy);
    this.h�zX = rasgele (-6, 6); // px
    this.h�zY = rasgele (-6, 6);
    this.renk = "rgb(" + rasgele (0, 255) + "," + rasgele (0, 255) + "," + rasgele (0, 255) +")";
    this.yar��ap = rasgele (10, 30); // px
} // func sonu...

// Top �izim metodu tan�m�:
Top.prototype.�iz = function() {
    i�rk.beginPath();
    i�rk.fillStyle = this.renk;
    i�rk.arc (this.x, this.y, this.yar��ap, 0, 2 * Math.PI); // ark 2pr tam �ember �izimi
    i�rk.fill(); // �ember yay� ve i�i dolgu boyas� ayn� renk
}; // �iz sonu...

// Top g�ncelle metodu tan�m�:
Top.prototype.g�ncelle = function() {
    if ((this.x + this.yar��ap) >= en) {this.h�zX = -(this.h�zX);} // Yatay sa� s�n�rdan geri d�n
    if ((this.x - this.yar��ap) <= 0) {this.h�zX = -(this.h�zX);} // Yatay sol s�n�rdan geri d�n
    if ((this.y + this.yar��ap) >= boy) {this.h�zY = -(this.h�zY);} // Dikey �st s�n�rdan geri d�n
    if ((this.y - this.yar��ap) <= 0) {this.h�zY = -(this.h�zY);} // Dikey alt s�n�rdan geri d�n
    this.x += this.h�zX; // h�zX=-+6px yatay ilerlet
    this.y += this.h�zY; // h�zY=-+6px dikey ilerlet
}; // g�ncelle sonu...

// Top �arp��anTespiti metodu tan�m�:
Top.prototype.�arp��anTespiti = function() {
    for (let i = 0; i < toplar.length; i++) {// let i olmazsa, animasyondaki i'yle �a��r�psadece 1 top g�steriyor..
        if (! (this === toplar [i])) {// detayda x, y, h�zX, h�zY; yani kendisi de�ilse, yoksa ikide bir kendi rengini de�i�tirir...
        //if( (!(this.x === toplar[i].x && this.y === toplar[i].y && this.h�zX === toplar[i].h�zX && this.h�zY === toplar[i].h�zY)) ) {
            var dx = this.x - toplar [i].x;
            var dy = this.y - toplar [i].y;
            var fark = Math.sqrt (dx * dx + dy**2);
            // Herhangi iki top birbirlerine herikisinin yar��ap toplam�ndan fazla yak�nla�m��sa, herikisinin de rengi rasgele ayn�yla de�i�sin...
            if (fark < (this.yar��ap + toplar [i].yar��ap)) {toplar [i].renk = this.renk = "rgb(" + rasgele (0, 255) + "," + rasgele (0, 255) + "," + rasgele (0, 255) +")";}
        } // if-d�� sonu...
    } // for sonu...
}; // �ar..sonu...

// �oklu top �retip diziye ekleme ve s�rekli animasyon:
function animasyonD�ng�s�() {
    i�rk.fillStyle = "rgba(0,0,0,0.25)";
    i�rk.fillRect (0, 0, en, boy); // Tuval zeminrengi %25 netlikte siyah...
    while (toplar.length < 100) {// 100 rasgele top tiplemesi �o�altal�m...
        var top = new Top();
        toplar.push (top);
    } // while sonu...
    for (let i = 0; i < toplar.length; i++) {// 100 topu �iz, g�ncelle, �arp��anlar� yeniden renkle
        toplar [i].�iz();
        toplar [i].g�ncelle();
        toplar [i].�arp��anTespiti();
    } // for sonu...
    requestAnimationFrame (animasyonD�ng�s�); // (Kendini biteviye �a��rarak) Canland�rma s�reklili�i...
} // func sonu...
animasyonD�ng�s�(); // Animasyonu ba�lat...
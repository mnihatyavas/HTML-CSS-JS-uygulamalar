// C1c41a.js: Zýplayan toplar kodlamasý alt-örneði.
// Canvas tuvalin kurulumu:
var tuval = document.querySelector ("canvas");
var içrk = tuval.getContext ("2d");
var en = tuval.width = window.innerWidth;
var boy = tuval.height = window.innerHeight;
var toplar = [];

// Rasgele sayý üreten fonksiyon:
function rasgele (alt, üst) {return Math.floor (Math.random() * (üst - alt)) + alt;}

// Kurucu Top fonksiyonu tanýmý:
function Top() {
    this.x = rasgele (0, en);
    this.y = rasgele (0, boy);
    this.hýzX = rasgele (-6, 6); // px
    this.hýzY = rasgele (-6, 6);
    this.renk = "rgb(" + rasgele (0, 255) + "," + rasgele (0, 255) + "," + rasgele (0, 255) +")";
    this.yarýçap = rasgele (10, 30); // px
} // func sonu...

// Top çizim metodu tanýmý:
Top.prototype.çiz = function() {
    içrk.beginPath();
    içrk.fillStyle = this.renk;
    içrk.arc (this.x, this.y, this.yarýçap, 0, 2 * Math.PI); // ark 2pr tam çember çizimi
    içrk.fill(); // Çember yayý ve içi dolgu boyasý ayný renk
}; // çiz sonu...

// Top güncelle metodu tanýmý:
Top.prototype.güncelle = function() {
    if ((this.x + this.yarýçap) >= en) {this.hýzX = -(this.hýzX);} // Yatay sað sýnýrdan geri dön
    if ((this.x - this.yarýçap) <= 0) {this.hýzX = -(this.hýzX);} // Yatay sol sýnýrdan geri dön
    if ((this.y + this.yarýçap) >= boy) {this.hýzY = -(this.hýzY);} // Dikey üst sýnýrdan geri dön
    if ((this.y - this.yarýçap) <= 0) {this.hýzY = -(this.hýzY);} // Dikey alt sýnýrdan geri dön
    this.x += this.hýzX; // hýzX=-+6px yatay ilerlet
    this.y += this.hýzY; // hýzY=-+6px dikey ilerlet
}; // güncelle sonu...

// Top çarpýþanTespiti metodu tanýmý:
Top.prototype.çarpýþanTespiti = function() {
    for (let i = 0; i < toplar.length; i++) {// let i olmazsa, animasyondaki i'yle þaþýrýpsadece 1 top gösteriyor..
        if (! (this === toplar [i])) {// detayda x, y, hýzX, hýzY; yani kendisi deðilse, yoksa ikide bir kendi rengini deðiþtirir...
        //if( (!(this.x === toplar[i].x && this.y === toplar[i].y && this.hýzX === toplar[i].hýzX && this.hýzY === toplar[i].hýzY)) ) {
            var dx = this.x - toplar [i].x;
            var dy = this.y - toplar [i].y;
            var fark = Math.sqrt (dx * dx + dy**2);
            // Herhangi iki top birbirlerine herikisinin yarýçap toplamýndan fazla yakýnlaþmýþsa, herikisinin de rengi rasgele aynýyla deðiþsin...
            if (fark < (this.yarýçap + toplar [i].yarýçap)) {toplar [i].renk = this.renk = "rgb(" + rasgele (0, 255) + "," + rasgele (0, 255) + "," + rasgele (0, 255) +")";}
        } // if-dýþ sonu...
    } // for sonu...
}; // çar..sonu...

// Çoklu top üretip diziye ekleme ve sürekli animasyon:
function animasyonDöngüsü() {
    içrk.fillStyle = "rgba(0,0,0,0.25)";
    içrk.fillRect (0, 0, en, boy); // Tuval zeminrengi %25 netlikte siyah...
    while (toplar.length < 100) {// 100 rasgele top tiplemesi çoðaltalým...
        var top = new Top();
        toplar.push (top);
    } // while sonu...
    for (let i = 0; i < toplar.length; i++) {// 100 topu çiz, güncelle, çarpýþanlarý yeniden renkle
        toplar [i].çiz();
        toplar [i].güncelle();
        toplar [i].çarpýþanTespiti();
    } // for sonu...
    requestAnimationFrame (animasyonDöngüsü); // (Kendini biteviye çaðýrarak) Canlandýrma sürekliliði...
} // func sonu...
animasyonDöngüsü(); // Animasyonu baþlat...
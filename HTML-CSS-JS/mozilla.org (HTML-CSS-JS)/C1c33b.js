// C1c33b.js: Þekil, Top ve Karadelik imhalý hareketli toplarýn js kodlamasý alt- örneði.

// Paragraftaki kalan top sayýsý:
const paragraf = document.querySelector ("p");
let sayaç = 0;

// Canvas tuvalin kurulmasý:
const tuval = document.querySelector ("canvas");
const içerik = tuval.getContext ("2d");
const en = tuval.width = window.innerWidth;
const boy = tuval.height = window.innerHeight;

// rasgele sayý üreten fonksiyon:
function rasgele (enaz, ençok) {return Math.floor (Math.random() * (ençok - enaz)) + enaz;}

// Þekil kurucu fonksiyonu:
function Þekil (x, y, hýzX, hýzY, mevcutMu) {
    this.x = x;
    this.y = y;
    this.hýzX = hýzX;
    this.hýzY = hýzY;
    this.mevcutMu = mevcutMu;
} // func sonu...
Þekil.prototype.constructor = Þekil;

// Þekil'i miraslayan Top kurucu fonksiyonu:
function Top (x, y, hýzX, hýzY, mevcutMu, renk, yarýçap) {
    Þekil.call (this, x, y, hýzX, hýzY, mevcutMu);
    this.renk = renk;
    this.yarýçap = yarýçap;
} // func sonu...
Top.prototype = Object.create (Þekil.prototype);
Top.prototype.constructor = Top;

// Top'un çiz metodu:
Top.prototype.çiz = function() {
    içerik.beginPath();
    içerik.fillStyle = this.renk;
    içerik.arc (this.x, this.y, this.yarýçap, 0, 2 * Math.PI); // arc=çevre=2pr
    içerik.fill(); // Ýçi ayný renkle dolu çember
}; // çiz sonu...

// Top'un güncelle metodu:
Top.prototype.güncelle = function() {
    if ((this.x + this.yarýçap) >= en) {this.hýzX = -(this.hýzX);}
    if ((this.x - this.yarýçap) <= 0) {this.hýzX = -(this.hýzX);}
    if ((this.y + this.yarýçap) >= boy) {this.hýzY = -(this.hýzY);}
    if ((this.y - this.yarýçap) <= 0) {this.hýzY = -(this.hýzY);}
    this.x += this.hýzX;
    this.y += this.hýzY;
}; // güncelle sonu...

// Top'un çarpýþmaTespiti metodu:
Top.prototype.çarpýþmaTespiti = function() {
    for (var j = 0; j < toplar.length; j++) {
        if (! (this === toplar [j])) {// gereksiz, ama KaraDelik eþitliði sözkonusu olabilir
            var dx = this.x - toplar [j].x;
            var dy = this.y - toplar [j].y;
            var fark = Math.sqrt (dx * dx + dy * dy);
            if (fark < this.yarýçap + toplar [j].yarýçap && toplar [j].mevcutMu) {toplar [j].renk = this.renk = "rgb(" + rasgele(0,255) + "," + rasgele(0,255) + "," + rasgele(0,255) +")";}
        } // if sonu...
    } // (toplar [j].renk = this.renk =) çarpýþan heriki top da ayný tesadüfi renk alýr
}; // çarpýþmaTespiti sonu...

// Þekil'i miraslayan Karadelik kurucu fonksiyonu:
function KaraDelik (x, y, mevcutMu) {
    Þekil.call (this, x, y, 20, 20, mevcutMu);
    this.renk = "white"; // Sabit renk ve yarýçaplý
    this.yarýçap = 20;
} // func sonu...
KaraDelik.prototype = Object.create (Þekil.prototype);
KaraDelik.prototype.constructor = KaraDelik;

// KaraDelik'in çiz metodu:
KaraDelik.prototype.çiz = function() {
    içerik.beginPath();
    içerik.strokeStyle = this.renk; // Çizgi rengi
    içerik.lineWidth = 5; // Çizgi kalýnlýðý
    içerik.arc (this.x, this.y, this.yarýçap, 0, 2 * Math.PI); // arc=tam çember=2pr
    içerik.stroke(); // (Kalýn) beyaz halkayý boya
}; // çiz sonu...

// KaraDelik'in sýnýrlarýnKontrolu metodu (manüel animasyonda halka sýnýrlarý taþmamalý):
KaraDelik.prototype.sýnýrlarýnKontrolu = function() {
    if ((this.x + this.yarýçap) >= en) {this.x -= this.yarýçap;}
    if ((this.x - this.yarýçap) <= 0) {this.x += this.yarýçap;}
    if ((this.y + this.yarýçap) >= boy) {this.y -= this.yarýçap;}
    if ((this.y - this.yarýçap) <= 0) {this.y += this.yarýçap;}
}; // sýnýrlarýnKontrolu sonu...

// KaraDelik'in manüelHareket metodu:
KaraDelik.prototype.manüelHareket = function() {
    var _this = this; // Deðiþtirilebilir halka
    window.onkeydown = function (o) {
        if (o.key === "b") {_this.x -= _this.hýzX; // b=batý/sola
        }else if (o.key === "d") {_this.x += _this.hýzX; // d=doðu/saða
        }else if (o.key === "k") {_this.y -= _this.hýzY; // k=kuzey/yukarý
        }else if (o.key === "g") {_this.y += _this.hýzY;} // g=güney/aþaðý
    }; // win..sonu...
}; // manüelHareket sonu...

// KaraDelik'in çarpýþmaTespiti metodu:
KaraDelik.prototype.çarpýþmaTespiti = function() {
    for (let j = 0; j < toplar.length; j++) {
        if (toplar [j].mevcutMu ) {
            const dx = this.x - toplar [j].x;
            const dy = this.y - toplar [j].y;
            const fark = Math.sqrt (dx **2 + dy * dy);
            if (fark < this.yarýçap + toplar [j].yarýçap) {
                toplar [j].mevcutMu = false; // animasyonDöngüsü'nde artýk çizilmeyecek
                sayaç--; // Kalan (mevcutMu=true) topsayýsý bir azalacak
                paragraf.textContent = "Kalan top sayýsý: " + sayaç;
            } // iç-if sonu...
        } // dýþ-if sonu...
    } // for sonu...
}; // çarpýþmaTespiti sonu...

// 100 adet toplar (dizi) yaratalým:
const toplar = [];
while (toplar.length < 100) {
    const yarýçap = rasgele (10, 30);
    let top = new Top (// rasgele(enaz,ençok) heriki yönlü en ve boy sýnýrlarýndan yarýçap içerde olmalý
        rasgele (0 + yarýçap, en - yarýçap), // x
        rasgele (0 + yarýçap, boy - yarýçap), // y
        rasgele (-7, 7), // hýzX p
        rasgele (-7,7), // hýzY px
        true, // mevcutMu
        "rgb(" + rasgele (0, 255) + ", " + rasgele (0, 255) + ", " + rasgele (0, 255) +")", // renk
        yarýçap // r
    ); // let sonu...
    toplar.push (top); // Diziye ekle
    sayaç++; // Mevcut (mevcutMu=true ) top sayýsýný birartýr
    paragraf.textContent = "Kalan top sayýsý: " + sayaç; // Mevcudu ekranýn saðüst çerçevesine yaz
} // while sonu...

// karadelik yeni tiplemesini ve manüel hareketliliðini etkinleþtirelim:
let karadelik = new KaraDelik (rasgele (0, en), rasgele (0, boy), true);
karadelik.manüelHareket();

// Top'lu ve karadelik'li sahne sürekli canlandýrýlmalý:
function animasyonDöngüsü() {
    içerik.fillStyle = "rgba(0, 0, 0, 0.25)"; // %25 net siyah zeminli dikdörtgen dolgu
    içerik.fillRect (0,0, en,boy);
    for (let i = 0; i < toplar.length; i++) {
        if (toplar [i].mevcutMu) {
            toplar [i].çiz();
            toplar [i].güncelle();
            toplar [i].çarpýþmaTespiti();
        } // if sonu...
    } // for sonu...
    karadelik.çiz();
    karadelik.sýnýrlarýnKontrolu();
    karadelik.çarpýþmaTespiti();
    requestAnimationFrame (animasyonDöngüsü);
} // fanimasyonDöngüsü sonu...

animasyonDöngüsü();
// C1c33a1.js: Çarpýþarak renk deðiþtiren hareketli toplarýn js kodlamasý alt-örneði.

// Canvas/Tuval'in kurulumu
const tuval = document.querySelector ("canvas");
const içerik = tuval.getContext ("2d");
const en = tuval.width = window.innerWidth;
const boy = tuval.height = window.innerHeight;

// Rasgele sayý üreten fonksiyon
function rasgele (küçük, büyük) {return Math.floor (Math.random() * (büyük - küçük + 1)) + küçük;}

// Top (nesne) fonksiyonu constructor/kurucusu
function Top (x, y, hýzX, hýzY, renk, yarýçap) {
    this.x = x;
    this.y = y;
    this.hýzX = hýzX;
    this.hýzY = hýzY;
    this.renk = renk;
    this.yarýçap = yarýçap;
} // func sonu...

// Topun çizilmesi metodunun tanýmý:
Top.prototype.çiz = function() {
    içerik.beginPath();
    içerik.fillStyle = this.renk;
    içerik.arc (this.x, this.y, this.yarýçap, 0, 2 * Math.PI); // 2pr tam yay çiz
    içerik.fill(); // Çember içini çizgi rengiyle boya
}; // metod sonu...

// Hareketli topun güncellenme metodu:
Top.prototype.güncelle = function() {
    if ((this.x + this.yarýçap) >= en) {this.hýzX = -(this.hýzX);} // Yatay sað/en'i taþmýþsa terse yönel
    if ((this.x - this.yarýçap) <= 0) {this.hýzX = -(this.hýzX);} // Yatay sol/0 altýna düþmüþse terse yönel
    if ((this.y + this.yarýçap) >= boy) {this.hýzY = -(this.hýzY);} // Dikey alt/boy'u taþmýþsa terse yönel
    if ((this.y - this.yarýçap) <= 0) {this.hýzY = -(this.hýzY);} // Dikey üst/0 altýna düþmüþse terse yönel
    this.x += this.hýzX; // Aktüel yatay konumu (+-)hýzX px artýr
    this.y += this.hýzY; // Aktüel dikeyy konumu (+-)hýzY px artýr
}; // metod sonu...

// Çarpýþan toplarýn renk deðiþtirme metodu
Top.prototype.çarpýþanTespiti = function() {
    for (let j = 0; j < toplar.length; j++) {
        if (! (this === toplar [j])) {
            const dx = this.x - toplar [j].x;
            const dy = this.y - toplar [j].y;
            const fark = Math.sqrt (dx * dx + dy**2);
            // 2 top arasý mesafe farký (yatay ve dikey mesafe kare toplamlarýnýn karekökü) her ikisinin yarýçaplarý toplamýndan azsa, heriki topun da renkleri deðiþsin
            if (fark < this.yarýçap + toplar [j].yarýçap) {toplar [j].renk = this.renk = "rgb(" + rasgele(0,255) + "," + rasgele(0,255) + "," + rasgele(0,255) +")";}
        } // if sonu...
    } // for sonu...
}; // metod sonu...

// 100 adet, hýzlarý 6px, yarýçaplarý [5,20]px arasýnda rasgele top üretme metodu:
let toplar = [];
while (toplar.length < 100) {
    const yarýçap = rasgele (5, 20);
    let top = new Top (// argümanlar: (x, y, hýzX, hýzY, renk, yarýçap)
        rasgele (0 + yarýçap, en - yarýçap), // Tuval içinde yatay/dikey (enaz) yarýçap kadar içerde
        rasgele (0 + yarýçap, boy - yarýçap),
        rasgele (-6, 6),
        rasgele (-6, 6),
        "rgb(" + rasgele (0, 255) + "," + rasgele (0, 255) + "," + rasgele (0, 255) +")",
        yarýçap
    ); // let sonu...
    toplar.push (top); // Dizideki aktüel mevcuda (sona) ekle
} // while sonu...

// Sürekli hareketli toplar animasyonu döngüsü fonksiyonu:
function animasyonDöngüsü() {
    içerik.fillStyle = "rgba(0,0,0,0.25)"; // Zemin %25 netlikte siyah
    içerik.fillRect (0,0, en,boy);
    for (let i = 0; i < toplar.length; i++) {
        toplar [i].çiz();
        toplar [i].güncelle();
        toplar [i].çarpýþanTespiti();
    } // for sonu...
    requestAnimationFrame (animasyonDöngüsü); // Fonksiyon sonsuz tekrarlanacak
} // func sonu...

animasyonDöngüsü(); // Animasyonu baþlat...
// C1c33a1.js: �arp��arak renk de�i�tiren hareketli toplar�n js kodlamas� alt-�rne�i.

// Canvas/Tuval'in kurulumu
const tuval = document.querySelector ("canvas");
const i�erik = tuval.getContext ("2d");
const en = tuval.width = window.innerWidth;
const boy = tuval.height = window.innerHeight;

// Rasgele say� �reten fonksiyon
function rasgele (k���k, b�y�k) {return Math.floor (Math.random() * (b�y�k - k���k + 1)) + k���k;}

// Top (nesne) fonksiyonu constructor/kurucusu
function Top (x, y, h�zX, h�zY, renk, yar��ap) {
    this.x = x;
    this.y = y;
    this.h�zX = h�zX;
    this.h�zY = h�zY;
    this.renk = renk;
    this.yar��ap = yar��ap;
} // func sonu...

// Topun �izilmesi metodunun tan�m�:
Top.prototype.�iz = function() {
    i�erik.beginPath();
    i�erik.fillStyle = this.renk;
    i�erik.arc (this.x, this.y, this.yar��ap, 0, 2 * Math.PI); // 2pr tam yay �iz
    i�erik.fill(); // �ember i�ini �izgi rengiyle boya
}; // metod sonu...

// Hareketli topun g�ncellenme metodu:
Top.prototype.g�ncelle = function() {
    if ((this.x + this.yar��ap) >= en) {this.h�zX = -(this.h�zX);} // Yatay sa�/en'i ta�m��sa terse y�nel
    if ((this.x - this.yar��ap) <= 0) {this.h�zX = -(this.h�zX);} // Yatay sol/0 alt�na d��m��se terse y�nel
    if ((this.y + this.yar��ap) >= boy) {this.h�zY = -(this.h�zY);} // Dikey alt/boy'u ta�m��sa terse y�nel
    if ((this.y - this.yar��ap) <= 0) {this.h�zY = -(this.h�zY);} // Dikey �st/0 alt�na d��m��se terse y�nel
    this.x += this.h�zX; // Akt�el yatay konumu (+-)h�zX px art�r
    this.y += this.h�zY; // Akt�el dikeyy konumu (+-)h�zY px art�r
}; // metod sonu...

// �arp��an toplar�n renk de�i�tirme metodu
Top.prototype.�arp��anTespiti = function() {
    for (let j = 0; j < toplar.length; j++) {
        if (! (this === toplar [j])) {
            const dx = this.x - toplar [j].x;
            const dy = this.y - toplar [j].y;
            const fark = Math.sqrt (dx * dx + dy**2);
            // 2 top aras� mesafe fark� (yatay ve dikey mesafe kare toplamlar�n�n karek�k�) her ikisinin yar��aplar� toplam�ndan azsa, heriki topun da renkleri de�i�sin
            if (fark < this.yar��ap + toplar [j].yar��ap) {toplar [j].renk = this.renk = "rgb(" + rasgele(0,255) + "," + rasgele(0,255) + "," + rasgele(0,255) +")";}
        } // if sonu...
    } // for sonu...
}; // metod sonu...

// 100 adet, h�zlar� 6px, yar��aplar� [5,20]px aras�nda rasgele top �retme metodu:
let toplar = [];
while (toplar.length < 100) {
    const yar��ap = rasgele (5, 20);
    let top = new Top (// arg�manlar: (x, y, h�zX, h�zY, renk, yar��ap)
        rasgele (0 + yar��ap, en - yar��ap), // Tuval i�inde yatay/dikey (enaz) yar��ap kadar i�erde
        rasgele (0 + yar��ap, boy - yar��ap),
        rasgele (-6, 6),
        rasgele (-6, 6),
        "rgb(" + rasgele (0, 255) + "," + rasgele (0, 255) + "," + rasgele (0, 255) +")",
        yar��ap
    ); // let sonu...
    toplar.push (top); // Dizideki akt�el mevcuda (sona) ekle
} // while sonu...

// S�rekli hareketli toplar animasyonu d�ng�s� fonksiyonu:
function animasyonD�ng�s�() {
    i�erik.fillStyle = "rgba(0,0,0,0.25)"; // Zemin %25 netlikte siyah
    i�erik.fillRect (0,0, en,boy);
    for (let i = 0; i < toplar.length; i++) {
        toplar [i].�iz();
        toplar [i].g�ncelle();
        toplar [i].�arp��anTespiti();
    } // for sonu...
    requestAnimationFrame (animasyonD�ng�s�); // Fonksiyon sonsuz tekrarlanacak
} // func sonu...

animasyonD�ng�s�(); // Animasyonu ba�lat...
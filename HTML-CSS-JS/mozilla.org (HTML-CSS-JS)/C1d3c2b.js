// C1d3c2b.js: Audio ve video dosyalarýný çalýþtýrma js kodlamasý alt-örneði.

// oynatýcýlar dizisinde 2 müzik çalar (mp3 ve ogg), 2 de video oynatýcý (mp4 ve webm) var...
const videoOynatýcýlar = document.querySelectorAll ("video");
const müzikÇalarlar = document.querySelectorAll ("audio");
let oynatýcýlar = [];

for (let a = 0; a < müzikÇalarlar.length; a++) {oynatýcýlar.push (müzikÇalarlar [a]);}
for (let v = 0; v < videoOynatýcýlar.length; v++) {oynatýcýlar.push (videoOynatýcýlar [v]);} 
console.log (oynatýcýlar)
// Özelleþtirme öncesi oynatýcýlar'daki varsayýlý kontrollar (düðmeler) silinmeli...
for (let i = 0; i < oynatýcýlar.length; i++) {oynatýcýlar [i].removeAttribute ("controls");}

// Tüm 4 oynatýcýlar'a özelleþtirilen kontrol düðmeleri çubuðu (Oynat/Duraksa, Dur, Geri, Ýleri, Süre) eklenmeli...
for (let i = 0; i < oynatýcýlar.length; i++) {
    const kontrollar = document.createElement ("div");
    kontrollar.setAttribute ("class", "controls");
    oynatýcýlar [i].parentNode.appendChild (kontrollar);

    const oynatDuraksat = document.createElement ("button");
    const dur = document.createElement ("button");
    const geri = document.createElement ("button");
    const ileri = document.createElement ("button");
    const süre = document.createElement ("span");

    oynatDuraksat.setAttribute ("class", "oynatDuraksat");
    dur.setAttribute ("class", "dur");
    geri.setAttribute ("class", "geri");
    ileri.setAttribute ("class", "ileri");
    süre.setAttribute ("class", "süre");

    oynatDuraksat.textContent = "Oynat";
    dur.textContent = "Dur";
    geri.textContent = "Geri";
    ileri.textContent = "Ýleri";
    if (i == 0) süre.textContent = "MP3=00:00";
    else if (i == 1) süre.textContent = "OGG=00:00";
    else if (i == 2) süre.textContent = "MP4=00:00";
    else if (i == 3) süre.textContent = "WEBM=00:00";

    kontrollar.appendChild (oynatDuraksat);
    kontrollar.appendChild (dur);
    kontrollar.appendChild (geri);
    kontrollar.appendChild (ileri);
    kontrollar.appendChild (süre);

    new OynatýcýKontrollarý (i, oynatýcýlar [i], oynatDuraksat, dur, geri, ileri, süre);
} // for sonu...

// Kurucu fonksiyon deðiþkenlerine tahsisli düðmelerin týklanma ve süre kontrollarý tanýmlanýyor...
function OynatýcýKontrollarý (n, oynatýcý, oynatDuraksatDüðmesi, durDüðmesi, geriDüðmesi, ileriDüðmesi, süreEtiketi) {
    this.oynatýcý = oynatýcý;
    this.oynatDuraksatDüðmesi = oynatDuraksatDüðmesi;
    this.durDüðmesi = durDüðmesi;
    this.geriDüðmesi = geriDüðmesi;
    this.ileriDüðmesi = ileriDüðmesi;
    this.süreEtiketi = süreEtiketi;

    this.oynatDuraksatDüðmesi.onclick = function() {
        if (oynatýcý.paused) {
            oynatýcý.play();
            oynatDuraksatDüðmesi.textContent = "Duraksat";
        }else {
            oynatýcý.pause();
            oynatDuraksatDüðmesi.textContent = "Oynat";
        } // else sonu...
    } // oynat sonu...
    this.durDüðmesi.onclick = function() {
        oynatýcý.pause();
        oynatýcý.currentTime = 0;
        oynatDuraksatDüðmesi.textContent = "Oynat";
    } // dur sonu...
    this.geriDüðmesi.onclick = function() {oynatýcý.currentTime -= 3;}
    this.ileriDüðmesi.onclick = function() {
        oynatýcý.currentTime += 3;
        if (oynatýcý.currentTime >= oynatýcý.duration) {
            oynatýcý.pause();
            oynatýcý.currentTime = 0;
            oynatDuraksatDüðmesi.textContent = "Oynat";
        } // if sonu...
    } // ileri sonu...
    this.oynatýcý.ontimeupdate = function() {
        let dakika1 = Math.floor (oynatýcý.currentTime / 60);
        let saniye1 = Math.floor (oynatýcý.currentTime - (dakika1 * 60));
        let dakika2;
        let saniye2;
        if (dakika1 < 10) {dakika2 = "0" + dakika1;} else {dakika2 = dakika1;}
        if (saniye1 < 10) {saniye2 = "0" + saniye1;} else {saniye2 = saniye1;}
        if (n == 0) süreEtiketi.textContent = "MP3=" + dakika2 + ":" + saniye2;
        else if (n == 1) süreEtiketi.textContent = "OGG=" + dakika2 + ":" + saniye2;
        else if (n == 2) süreEtiketi.textContent = "MP4=" + dakika2 + ":" + saniye2;
        else if (n == 3) süreEtiketi.textContent = "WEBM=" + dakika2 + ":" + saniye2;
    } // süre sonu...
} // func sonu...
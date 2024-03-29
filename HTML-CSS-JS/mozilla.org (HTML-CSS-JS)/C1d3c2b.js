// C1d3c2b.js: Audio ve video dosyalarını çalıştırma js kodlaması alt-örneği.

// oynatıcılar dizisinde 2 müzik çalar (mp3 ve ogg), 2 de video oynatıcı (mp4 ve webm) var...
const videoOynatıcılar = document.querySelectorAll ("video");
const müzikÇalarlar = document.querySelectorAll ("audio");
let oynatıcılar = [];

for (let a = 0; a < müzikÇalarlar.length; a++) {oynatıcılar.push (müzikÇalarlar [a]);}
for (let v = 0; v < videoOynatıcılar.length; v++) {oynatıcılar.push (videoOynatıcılar [v]);} 
console.log (oynatıcılar)
// Özelleştirme öncesi oynatıcılar'daki varsayılı kontrollar (düğmeler) silinmeli...
for (let i = 0; i < oynatıcılar.length; i++) {oynatıcılar [i].removeAttribute ("controls");}

// Tüm 4 oynatıcılar'a özelleştirilen kontrol düğmeleri çubuğu (Oynat/Duraksa, Dur, Geri, İleri, Süre) eklenmeli...
for (let i = 0; i < oynatıcılar.length; i++) {
    const kontrollar = document.createElement ("div");
    kontrollar.setAttribute ("class", "controls");
    oynatıcılar [i].parentNode.appendChild (kontrollar);

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
    ileri.textContent = "İleri";
    if (i == 0) süre.textContent = "MP3=00:00";
    else if (i == 1) süre.textContent = "OGG=00:00";
    else if (i == 2) süre.textContent = "MP4=00:00";
    else if (i == 3) süre.textContent = "WEBM=00:00";

    kontrollar.appendChild (oynatDuraksat);
    kontrollar.appendChild (dur);
    kontrollar.appendChild (geri);
    kontrollar.appendChild (ileri);
    kontrollar.appendChild (süre);

    new OynatıcıKontrolları (i, oynatıcılar [i], oynatDuraksat, dur, geri, ileri, süre);
} // for sonu...

// Kurucu fonksiyon değişkenlerine tahsisli düğmelerin tıklanma ve süre kontrolları tanımlanıyor...
function OynatıcıKontrolları (n, oynatıcı, oynatDuraksatDüğmesi, durDüğmesi, geriDüğmesi, ileriDüğmesi, süreEtiketi) {
    this.oynatıcı = oynatıcı;
    this.oynatDuraksatDüğmesi = oynatDuraksatDüğmesi;
    this.durDüğmesi = durDüğmesi;
    this.geriDüğmesi = geriDüğmesi;
    this.ileriDüğmesi = ileriDüğmesi;
    this.süreEtiketi = süreEtiketi;

    this.oynatDuraksatDüğmesi.onclick = function() {
        if (oynatıcı.paused) {
            oynatıcı.play();
            oynatDuraksatDüğmesi.textContent = "Duraksat";
        }else {
            oynatıcı.pause();
            oynatDuraksatDüğmesi.textContent = "Oynat";
        } // else sonu...
    } // oynat sonu...
    this.durDüğmesi.onclick = function() {
        oynatıcı.pause();
        oynatıcı.currentTime = 0;
        oynatDuraksatDüğmesi.textContent = "Oynat";
    } // dur sonu...
    this.geriDüğmesi.onclick = function() {oynatıcı.currentTime -= 3;}
    this.ileriDüğmesi.onclick = function() {
        oynatıcı.currentTime += 3;
        if (oynatıcı.currentTime >= oynatıcı.duration) {
            oynatıcı.pause();
            oynatıcı.currentTime = 0;
            oynatDuraksatDüğmesi.textContent = "Oynat";
        } // if sonu...
    } // ileri sonu...
    this.oynatıcı.ontimeupdate = function() {
        let dakika1 = Math.floor (oynatıcı.currentTime / 60);
        let saniye1 = Math.floor (oynatıcı.currentTime - (dakika1 * 60));
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
// C1d3c2b.js: Audio ve video dosyalar�n� �al��t�rma js kodlamas� alt-�rne�i.

// oynat�c�lar dizisinde 2 m�zik �alar (mp3 ve ogg), 2 de video oynat�c� (mp4 ve webm) var...
const videoOynat�c�lar = document.querySelectorAll ("video");
const m�zik�alarlar = document.querySelectorAll ("audio");
let oynat�c�lar = [];

for (let a = 0; a < m�zik�alarlar.length; a++) {oynat�c�lar.push (m�zik�alarlar [a]);}
for (let v = 0; v < videoOynat�c�lar.length; v++) {oynat�c�lar.push (videoOynat�c�lar [v]);} 
console.log (oynat�c�lar)
// �zelle�tirme �ncesi oynat�c�lar'daki varsay�l� kontrollar (d��meler) silinmeli...
for (let i = 0; i < oynat�c�lar.length; i++) {oynat�c�lar [i].removeAttribute ("controls");}

// T�m 4 oynat�c�lar'a �zelle�tirilen kontrol d��meleri �ubu�u (Oynat/Duraksa, Dur, Geri, �leri, S�re) eklenmeli...
for (let i = 0; i < oynat�c�lar.length; i++) {
    const kontrollar = document.createElement ("div");
    kontrollar.setAttribute ("class", "controls");
    oynat�c�lar [i].parentNode.appendChild (kontrollar);

    const oynatDuraksat = document.createElement ("button");
    const dur = document.createElement ("button");
    const geri = document.createElement ("button");
    const ileri = document.createElement ("button");
    const s�re = document.createElement ("span");

    oynatDuraksat.setAttribute ("class", "oynatDuraksat");
    dur.setAttribute ("class", "dur");
    geri.setAttribute ("class", "geri");
    ileri.setAttribute ("class", "ileri");
    s�re.setAttribute ("class", "s�re");

    oynatDuraksat.textContent = "Oynat";
    dur.textContent = "Dur";
    geri.textContent = "Geri";
    ileri.textContent = "�leri";
    if (i == 0) s�re.textContent = "MP3=00:00";
    else if (i == 1) s�re.textContent = "OGG=00:00";
    else if (i == 2) s�re.textContent = "MP4=00:00";
    else if (i == 3) s�re.textContent = "WEBM=00:00";

    kontrollar.appendChild (oynatDuraksat);
    kontrollar.appendChild (dur);
    kontrollar.appendChild (geri);
    kontrollar.appendChild (ileri);
    kontrollar.appendChild (s�re);

    new Oynat�c�Kontrollar� (i, oynat�c�lar [i], oynatDuraksat, dur, geri, ileri, s�re);
} // for sonu...

// Kurucu fonksiyon de�i�kenlerine tahsisli d��melerin t�klanma ve s�re kontrollar� tan�mlan�yor...
function Oynat�c�Kontrollar� (n, oynat�c�, oynatDuraksatD��mesi, durD��mesi, geriD��mesi, ileriD��mesi, s�reEtiketi) {
    this.oynat�c� = oynat�c�;
    this.oynatDuraksatD��mesi = oynatDuraksatD��mesi;
    this.durD��mesi = durD��mesi;
    this.geriD��mesi = geriD��mesi;
    this.ileriD��mesi = ileriD��mesi;
    this.s�reEtiketi = s�reEtiketi;

    this.oynatDuraksatD��mesi.onclick = function() {
        if (oynat�c�.paused) {
            oynat�c�.play();
            oynatDuraksatD��mesi.textContent = "Duraksat";
        }else {
            oynat�c�.pause();
            oynatDuraksatD��mesi.textContent = "Oynat";
        } // else sonu...
    } // oynat sonu...
    this.durD��mesi.onclick = function() {
        oynat�c�.pause();
        oynat�c�.currentTime = 0;
        oynatDuraksatD��mesi.textContent = "Oynat";
    } // dur sonu...
    this.geriD��mesi.onclick = function() {oynat�c�.currentTime -= 3;}
    this.ileriD��mesi.onclick = function() {
        oynat�c�.currentTime += 3;
        if (oynat�c�.currentTime >= oynat�c�.duration) {
            oynat�c�.pause();
            oynat�c�.currentTime = 0;
            oynatDuraksatD��mesi.textContent = "Oynat";
        } // if sonu...
    } // ileri sonu...
    this.oynat�c�.ontimeupdate = function() {
        let dakika1 = Math.floor (oynat�c�.currentTime / 60);
        let saniye1 = Math.floor (oynat�c�.currentTime - (dakika1 * 60));
        let dakika2;
        let saniye2;
        if (dakika1 < 10) {dakika2 = "0" + dakika1;} else {dakika2 = dakika1;}
        if (saniye1 < 10) {saniye2 = "0" + saniye1;} else {saniye2 = saniye1;}
        if (n == 0) s�reEtiketi.textContent = "MP3=" + dakika2 + ":" + saniye2;
        else if (n == 1) s�reEtiketi.textContent = "OGG=" + dakika2 + ":" + saniye2;
        else if (n == 2) s�reEtiketi.textContent = "MP4=" + dakika2 + ":" + saniye2;
        else if (n == 3) s�reEtiketi.textContent = "WEBM=" + dakika2 + ":" + saniye2;
    } // s�re sonu...
} // func sonu...
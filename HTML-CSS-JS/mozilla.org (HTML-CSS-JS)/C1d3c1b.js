// C1d3c1b.js: JS koduyla �zel audio ve metin ayarlar�yla m�zik �alma alt-�rne�i.

// M�zik d��melerini referanslayal�m...
const �alDuraksaD��mesi = document.querySelector (".�alduraksa");
const durD��mesi = document.querySelector (".dur");
const geriD��mesi = document.querySelector (".geri");
const ileriD��mesi = document.querySelector (".ileri");
const s�reEtiketi = document.querySelector (".s�re");

// M�zik�alar�n varsay�l� ayarlar�n� iptal edelim...
const m�zik�alar = document.querySelector ("audio");
m�zik�alar.removeAttribute ("controls");

// M�zik�alar�n �al/duraksa, dur, geri ve ileri d��me t�klamalar� y�netilmeli...
�alDuraksaD��mesi.onclick = function() {
    if (m�zik�alar.paused) {
        m�zik�alar.play();
        �alDuraksaD��mesi.textContent = "Duraksa";
    }else {
        m�zik�alar.pause();
        �alDuraksaD��mesi.textContent = "�al";
    } // else sonu...
}; // �al..sonu...
durD��mesi.onclick = function() {
    m�zik�alar.pause();
    m�zik�alar.currentTime = 0;
    �alDuraksaD��mesi.textContent = "�al";
}; // dur..sonu...
geriD��mesi.onclick = function() {m�zik�alar.currentTime -= 3;};
ileriD��mesi.onclick = function() {
    m�zik�alar.currentTime += 3;
    if (m�zik�alar.currentTime >= m�zik�alar.duration) {
        m�zik�alar.pause();
        m�zik�alar.currentTime = 0;
        �alDuraksaD��mesi.textContent = "�al";
    } // if sonu...
}; // ileri..sonu...

m�zik�alar.ontimeupdate = function() {// S�re dd:ss = 00:00 olarak g�sterilecek...
    let dakika1 = Math.floor (m�zik�alar.currentTime / 60);
    let saniye1 = Math.floor (m�zik�alar.currentTime - (dakika1 * 60));
    let dakika2;
    let saniye2;
    if (dakika1 < 10) {dakika2 = "0" + dakika1;} else {dakika2 = dakika1;}
    if (saniye1 < 10) {saniye2 = "0" + saniye1;} else {saniye2 = saniye1;}
    s�reEtiketi.textContent = dakika2 + ":" + saniye2;
}; // m�zik sonu...

// Metin d��me ve kutusu ayarlar�...
const metin = document.querySelector (".metin");
const metinD��mesi = document.querySelector (".metin-kutusu button");
metinD��mesi.onclick = function() {
    if (metinD��mesi.textContent === "Metni g�ster") {
        metin.style.height = "200px";
        metinD��mesi.textContent = "Metni gizle";
    }else {
        metin.style.height = "0";
        metinD��mesi.textContent = "Metni g�ster";
    } // else sonu...
}; // metin sonu...
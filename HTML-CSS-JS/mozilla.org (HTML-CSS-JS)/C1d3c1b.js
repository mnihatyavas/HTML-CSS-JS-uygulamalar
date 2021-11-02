// C1d3c1b.js: JS koduyla özel audio ve metin ayarlarıyla müzik çalma alt-örneği.

// Müzik düğmelerini referanslayalım...
const çalDuraksaDüğmesi = document.querySelector (".çalduraksa");
const durDüğmesi = document.querySelector (".dur");
const geriDüğmesi = document.querySelector (".geri");
const ileriDüğmesi = document.querySelector (".ileri");
const süreEtiketi = document.querySelector (".süre");

// Müzikçaların varsayılı ayarlarını iptal edelim...
const müzikÇalar = document.querySelector ("audio");
müzikÇalar.removeAttribute ("controls");

// Müzikçaların çal/duraksa, dur, geri ve ileri düğme tıklamaları yönetilmeli...
çalDuraksaDüğmesi.onclick = function() {
    if (müzikÇalar.paused) {
        müzikÇalar.play();
        çalDuraksaDüğmesi.textContent = "Duraksa";
    }else {
        müzikÇalar.pause();
        çalDuraksaDüğmesi.textContent = "Çal";
    } // else sonu...
}; // çal..sonu...
durDüğmesi.onclick = function() {
    müzikÇalar.pause();
    müzikÇalar.currentTime = 0;
    çalDuraksaDüğmesi.textContent = "Çal";
}; // dur..sonu...
geriDüğmesi.onclick = function() {müzikÇalar.currentTime -= 3;};
ileriDüğmesi.onclick = function() {
    müzikÇalar.currentTime += 3;
    if (müzikÇalar.currentTime >= müzikÇalar.duration) {
        müzikÇalar.pause();
        müzikÇalar.currentTime = 0;
        çalDuraksaDüğmesi.textContent = "Çal";
    } // if sonu...
}; // ileri..sonu...

müzikÇalar.ontimeupdate = function() {// Süre dd:ss = 00:00 olarak gösterilecek...
    let dakika1 = Math.floor (müzikÇalar.currentTime / 60);
    let saniye1 = Math.floor (müzikÇalar.currentTime - (dakika1 * 60));
    let dakika2;
    let saniye2;
    if (dakika1 < 10) {dakika2 = "0" + dakika1;} else {dakika2 = dakika1;}
    if (saniye1 < 10) {saniye2 = "0" + saniye1;} else {saniye2 = saniye1;}
    süreEtiketi.textContent = dakika2 + ":" + saniye2;
}; // müzik sonu...

// Metin düğme ve kutusu ayarları...
const metin = document.querySelector (".metin");
const metinDüğmesi = document.querySelector (".metin-kutusu button");
metinDüğmesi.onclick = function() {
    if (metinDüğmesi.textContent === "Metni göster") {
        metin.style.height = "200px";
        metinDüğmesi.textContent = "Metni gizle";
    }else {
        metin.style.height = "0";
        metinDüğmesi.textContent = "Metni göster";
    } // else sonu...
}; // metin sonu...
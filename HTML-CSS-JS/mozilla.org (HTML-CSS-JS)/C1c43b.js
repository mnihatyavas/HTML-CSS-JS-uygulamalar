// C1c43b.js: Video kontrollarını özelleştirme kodlaması alt-örneği.
var videom = document.querySelector ("video");
var kontrollarım = document.querySelector (".özel-kontrollar");

var oynatma = document.querySelector (".oynat");
var başaAl = document.querySelector (".başa-al");
var zamanlayıcım = document.querySelector (".zamanlayıcı span");
var gerilet = document.querySelector (".geri");
var ilerlet = document.querySelector (".ileri");

var ilerlemeAdımı; // +3S
var gerilemeAdımı; // -3S

videom.removeAttribute ("controls"); // Varsayılı kontrolların iptali...
kontrollarım.style.visibility = "visible";

oynatma.addEventListener ("click", videomuOynatDuraksat);
başaAl.addEventListener ("click", videomuBaşaAl);
videom.addEventListener ("ended", videomuBaşaAl);
gerilet.addEventListener ("click", videomuGerilet);
ilerlet.addEventListener ("click", videomuİlerlet);
videom.addEventListener ("timeupdate", zamanıGüncelle);

function videomuOynatDuraksat() {
    gerilet.classList.remove ("aktif");
    ilerlet.classList.remove ("aktif");
    clearInterval (gerilemeAdımı);
    clearInterval (ilerlemeAdımı);
    if (videom.paused) {
        oynatma.setAttribute ("data-icon", "D");
        videom.play();
    }else {
        oynatma.setAttribute ("data-icon", "O");
        videom.pause();
    } // else sonu...
} // func sonu...

function videomuBaşaAl() {
    videom.pause();
    videom.currentTime = 0;
    gerilet.classList.remove ("aktif");
    ilerlet.classList.remove ("aktif");
    clearInterval (gerilemeAdımı);
    clearInterval (ilerlemeAdımı);
    oynatma.setAttribute ("data-icon", "O");
} // func sonu...

function videomuGerilet() {
    clearInterval (ilerlemeAdımı);
    ilerlet.classList.remove ("aktif");
    if (gerilet.classList.contains ("aktif")) {
        gerilet.classList.remove ("aktif");
        clearInterval (gerilemeAdımı);
        videom.play();
    }else {
        gerilet.classList.add ("aktif");
        videom.pause();
        gerilemeAdımı = setInterval (gerilemeSüresi, 200); // 200mS
    } // else sonu...
} // func sonu...

function videomuİlerlet() {
    clearInterval (gerilemeAdımı);
    gerilet.classList.remove ("aktif");
    if (ilerlet.classList.contains ("aktif")) {
        ilerlet.classList.remove ("aktif");
        clearInterval (ilerlemeAdımı);
        videom.play();
    } else {
        ilerlet.classList.add ("aktif");
        videom.pause();
        ilerlemeAdımı = setInterval (İlerlemeSüresi, 200);
    } // else sonu...
} // func sonu...

function gerilemeSüresi() {
    if (videom.currentTime <= 3) {videomuBaşaAl();
    }else {videom.currentTime -= 3;}
} // func sonu...

function İlerlemeSüresi() {
    if (videom.currentTime >= videom.duration - 3) {videomuBaşaAl();
    }else {videom.currentTime += 3;}
} // func sonu...

function zamanıGüncelle() {
    var dakikalar = Math.floor (videom.currentTime / 60);
    var saniyeler = Math.floor (videom.currentTime - dakikalar * 60);
    var dakikaDeğeri;
    var saniyeDeğeri;
    if (dakikalar < 10) {dakikaDeğeri = "0" + dakikalar;
    }else {dakikaDeğeri = dakikalar;}
    if (saniyeler < 10) {saniyeDeğeri = "0" + saniyeler;
    }else {saniyeDeğeri = saniyeler;}
    zamanlayıcım.textContent = dakikaDeğeri + ":" + saniyeDeğeri + " / 02:00";
} // func sonu...
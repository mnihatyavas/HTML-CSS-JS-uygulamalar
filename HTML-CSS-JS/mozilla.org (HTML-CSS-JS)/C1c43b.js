// C1c43b.js: Video kontrollarýný özelleþtirme kodlamasý alt-örneði.
var videom = document.querySelector ("video");
var kontrollarým = document.querySelector (".özel-kontrollar");

var oynatma = document.querySelector (".oynat");
var baþaAl = document.querySelector (".baþa-al");
var zamanlayýcým = document.querySelector (".zamanlayýcý span");
var gerilet = document.querySelector (".geri");
var ilerlet = document.querySelector (".ileri");

var ilerlemeAdýmý; // +3S
var gerilemeAdýmý; // -3S

videom.removeAttribute ("controls"); // Varsayýlý kontrollarýn iptali...
kontrollarým.style.visibility = "visible";

oynatma.addEventListener ("click", videomuOynatDuraksat);
baþaAl.addEventListener ("click", videomuBaþaAl);
videom.addEventListener ("ended", videomuBaþaAl);
gerilet.addEventListener ("click", videomuGerilet);
ilerlet.addEventListener ("click", videomuÝlerlet);
videom.addEventListener ("timeupdate", zamanýGüncelle);

function videomuOynatDuraksat() {
    gerilet.classList.remove ("aktif");
    ilerlet.classList.remove ("aktif");
    clearInterval (gerilemeAdýmý);
    clearInterval (ilerlemeAdýmý);
    if (videom.paused) {
        oynatma.setAttribute ("data-icon", "D");
        videom.play();
    }else {
        oynatma.setAttribute ("data-icon", "O");
        videom.pause();
    } // else sonu...
} // func sonu...

function videomuBaþaAl() {
    videom.pause();
    videom.currentTime = 0;
    gerilet.classList.remove ("aktif");
    ilerlet.classList.remove ("aktif");
    clearInterval (gerilemeAdýmý);
    clearInterval (ilerlemeAdýmý);
    oynatma.setAttribute ("data-icon", "O");
} // func sonu...

function videomuGerilet() {
    clearInterval (ilerlemeAdýmý);
    ilerlet.classList.remove ("aktif");
    if (gerilet.classList.contains ("aktif")) {
        gerilet.classList.remove ("aktif");
        clearInterval (gerilemeAdýmý);
        videom.play();
    }else {
        gerilet.classList.add ("aktif");
        videom.pause();
        gerilemeAdýmý = setInterval (gerilemeSüresi, 200); // 200mS
    } // else sonu...
} // func sonu...

function videomuÝlerlet() {
    clearInterval (gerilemeAdýmý);
    gerilet.classList.remove ("aktif");
    if (ilerlet.classList.contains ("aktif")) {
        ilerlet.classList.remove ("aktif");
        clearInterval (ilerlemeAdýmý);
        videom.play();
    } else {
        ilerlet.classList.add ("aktif");
        videom.pause();
        ilerlemeAdýmý = setInterval (ÝlerlemeSüresi, 200);
    } // else sonu...
} // func sonu...

function gerilemeSüresi() {
    if (videom.currentTime <= 3) {videomuBaþaAl();
    }else {videom.currentTime -= 3;}
} // func sonu...

function ÝlerlemeSüresi() {
    if (videom.currentTime >= videom.duration - 3) {videomuBaþaAl();
    }else {videom.currentTime += 3;}
} // func sonu...

function zamanýGüncelle() {
    var dakikalar = Math.floor (videom.currentTime / 60);
    var saniyeler = Math.floor (videom.currentTime - dakikalar * 60);
    var dakikaDeðeri;
    var saniyeDeðeri;
    if (dakikalar < 10) {dakikaDeðeri = "0" + dakikalar;
    }else {dakikaDeðeri = dakikalar;}
    if (saniyeler < 10) {saniyeDeðeri = "0" + saniyeler;
    }else {saniyeDeðeri = saniyeler;}
    zamanlayýcým.textContent = dakikaDeðeri + ":" + saniyeDeðeri + " / 02:00";
} // func sonu...
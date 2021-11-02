// C1c43b.js: Video kontrollar�n� �zelle�tirme kodlamas� alt-�rne�i.
var videom = document.querySelector ("video");
var kontrollar�m = document.querySelector (".�zel-kontrollar");

var oynatma = document.querySelector (".oynat");
var ba�aAl = document.querySelector (".ba�a-al");
var zamanlay�c�m = document.querySelector (".zamanlay�c� span");
var gerilet = document.querySelector (".geri");
var ilerlet = document.querySelector (".ileri");

var ilerlemeAd�m�; // +3S
var gerilemeAd�m�; // -3S

videom.removeAttribute ("controls"); // Varsay�l� kontrollar�n iptali...
kontrollar�m.style.visibility = "visible";

oynatma.addEventListener ("click", videomuOynatDuraksat);
ba�aAl.addEventListener ("click", videomuBa�aAl);
videom.addEventListener ("ended", videomuBa�aAl);
gerilet.addEventListener ("click", videomuGerilet);
ilerlet.addEventListener ("click", videomu�lerlet);
videom.addEventListener ("timeupdate", zaman�G�ncelle);

function videomuOynatDuraksat() {
    gerilet.classList.remove ("aktif");
    ilerlet.classList.remove ("aktif");
    clearInterval (gerilemeAd�m�);
    clearInterval (ilerlemeAd�m�);
    if (videom.paused) {
        oynatma.setAttribute ("data-icon", "D");
        videom.play();
    }else {
        oynatma.setAttribute ("data-icon", "O");
        videom.pause();
    } // else sonu...
} // func sonu...

function videomuBa�aAl() {
    videom.pause();
    videom.currentTime = 0;
    gerilet.classList.remove ("aktif");
    ilerlet.classList.remove ("aktif");
    clearInterval (gerilemeAd�m�);
    clearInterval (ilerlemeAd�m�);
    oynatma.setAttribute ("data-icon", "O");
} // func sonu...

function videomuGerilet() {
    clearInterval (ilerlemeAd�m�);
    ilerlet.classList.remove ("aktif");
    if (gerilet.classList.contains ("aktif")) {
        gerilet.classList.remove ("aktif");
        clearInterval (gerilemeAd�m�);
        videom.play();
    }else {
        gerilet.classList.add ("aktif");
        videom.pause();
        gerilemeAd�m� = setInterval (gerilemeS�resi, 200); // 200mS
    } // else sonu...
} // func sonu...

function videomu�lerlet() {
    clearInterval (gerilemeAd�m�);
    gerilet.classList.remove ("aktif");
    if (ilerlet.classList.contains ("aktif")) {
        ilerlet.classList.remove ("aktif");
        clearInterval (ilerlemeAd�m�);
        videom.play();
    } else {
        ilerlet.classList.add ("aktif");
        videom.pause();
        ilerlemeAd�m� = setInterval (�lerlemeS�resi, 200);
    } // else sonu...
} // func sonu...

function gerilemeS�resi() {
    if (videom.currentTime <= 3) {videomuBa�aAl();
    }else {videom.currentTime -= 3;}
} // func sonu...

function �lerlemeS�resi() {
    if (videom.currentTime >= videom.duration - 3) {videomuBa�aAl();
    }else {videom.currentTime += 3;}
} // func sonu...

function zaman�G�ncelle() {
    var dakikalar = Math.floor (videom.currentTime / 60);
    var saniyeler = Math.floor (videom.currentTime - dakikalar * 60);
    var dakikaDe�eri;
    var saniyeDe�eri;
    if (dakikalar < 10) {dakikaDe�eri = "0" + dakikalar;
    }else {dakikaDe�eri = dakikalar;}
    if (saniyeler < 10) {saniyeDe�eri = "0" + saniyeler;
    }else {saniyeDe�eri = saniyeler;}
    zamanlay�c�m.textContent = dakikaDe�eri + ":" + saniyeDe�eri + " / 02:00";
} // func sonu...
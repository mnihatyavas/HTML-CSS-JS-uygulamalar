// D2k.js: Fare imlecinin tuval irinoktasıyla kilitlenme kodlaması altprogramı örneği.

const YARIÇAP = 20;

// Tuval kurulumu...
var tuval = document.querySelector ("canvas");
var içerik = tuval.getContext ("2d");
var x = 50;
var y = 50;
function tuvalÇizimi() {
    içerik.fillStyle = "black";
    içerik.fillRect (0, 0, tuval.width, tuval.height);
    içerik.fillStyle = "#f00"; // Kırmızı...
    içerik.beginPath();
    içerik.arc (x, y, YARIÇAP, 0, derecedenRadyana (360), true);
    içerik.fill();
} // func sonu...
function derecedenRadyana (derece) {return Math.PI / 180 * derece;}
tuvalÇizimi();

// Tuval içinde imlecin tıklanınca irinoktaya kilitlenmesi ve ESC'yle kilitaçılması...
tuval.requestPointerLock = tuval.requestPointerLock || tuval.mozRequestPointerLock;
document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
tuval.onclick = function() {tuval.requestPointerLock();};

// İmleç kilitleme dinleyicileri ve konum takip foksiyonu...
document.addEventListener ("pointerlockchange", kilitlenmeUyarısı, false);
document.addEventListener ("mozpointerlockchange", kilitlenmeUyarısı, false);

function kilitlenmeUyarısı() {
    if (document.pointerLockElement === tuval || document.mozPointerLockElement === tuval) {
        console.log ("Fare imleci tuval irinoktasına kilitlendi");
        document.addEventListener ("mousemove", konumGüncelle, false);
    } else {// ESC tıklanırsa...
        console.log ("İmleçle tuval irinokta kilitlenmesi açıldı");
        document.removeEventListener ("mousemove", konumGüncelle, false);
    } // else sonu...
} // func sonu...

var konumTakipci = document.getElementById ("konum");
//var irinoktaHareketi; // gereksiz...

function konumGüncelle (olay) {
    x +=olay.movementX;
    y +=olay.movementY;
    if (x > tuval.width + YARIÇAP) {x = -YARIÇAP;}
    if (y > tuval.height + YARIÇAP) {y = -YARIÇAP;}  
    if (x < -YARIÇAP) {x = tuval.width + YARIÇAP;} // Yatay/dikey taşmalar diğer uçtan güncellenerek (640+20, 360+20) girer...
    if (y < -YARIÇAP) {y = tuval.height + YARIÇAP;}
    konumTakipci.textContent = "(X konum: " + x + ", Y konum: " + y + ")";
    requestAnimationFrame (function() {tuvalÇizimi();});
/*
    if (!irinoktaHareketi) {
        irinoktaHareketi = requestAnimationFrame (function() {
            irinoktaHareketi = null;
            tuvalÇizimi();
        }); // iri..sonu...
    } // if sonu...
*/
} // func sonu...
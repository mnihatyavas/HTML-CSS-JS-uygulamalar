// Resim de�i�tirme kodlamas�...
let resim = document.querySelector ("img");
resim.onclick = function() {
    let kaynak = resim.getAttribute ("src");
    if (kaynak === "resim/firefox.png") {resim.setAttribute ("src", "resim/firefox2.png");
    }else if (kaynak === "resim/firefox2.png") {resim.setAttribute ("src", "resim/firefox3.png");
    }else if (kaynak === "resim/firefox3.png") {resim.setAttribute ("src", "resim/firefox4.png");
    }else if (kaynak === "resim/firefox4.png") {resim.setAttribute ("src", "resim/arkada�.jpg");
    }else if (kaynak === "resim/arkada�.jpg") {resim.setAttribute ("src", "resim/firefox.png"); }
} // resim sonu...
//----------------------------------------------------------------------------------------------------------------------------
// Ki�iselle�tirilen ho�geldin mesaj�n�n kodlamas�...
let d��me = document.querySelector ("button");
let ba�l�k = document.querySelector ("h1");

function kullan�c�Ad�Kur() {
    let ad = prompt ("L�tfen ad�n�z� girin:");
    if (! ad) {kullan�c�Ad�Kur();
    }else {
        localStorage.setItem ("isim", ad);
        ba�l�k.innerHTML = "Mozilla muhte�em, " + ad + "!";
    } // else sonu...
} // func sonu...

if (! localStorage.getItem ("isim") ) {kullan�c�Ad�Kur();
}else {
    let y�kl�Ad = localStorage.getItem ("isim");
    ba�l�k.innerHTML = "Mozilla muhte�em, " + y�kl�Ad + "!";
} // else sonu...

d��me.onclick = function() {kullan�c�Ad�Kur(); }
// Resim deðiþtirme kodlamasý...
let resim = document.querySelector ("img");
resim.onclick = function() {
    let kaynak = resim.getAttribute ("src");
    if (kaynak === "resim/firefox.png") {resim.setAttribute ("src", "resim/firefox2.png");
    }else if (kaynak === "resim/firefox2.png") {resim.setAttribute ("src", "resim/firefox3.png");
    }else if (kaynak === "resim/firefox3.png") {resim.setAttribute ("src", "resim/firefox4.png");
    }else if (kaynak === "resim/firefox4.png") {resim.setAttribute ("src", "resim/arkadaþ.jpg");
    }else if (kaynak === "resim/arkadaþ.jpg") {resim.setAttribute ("src", "resim/firefox.png"); }
} // resim sonu...
//----------------------------------------------------------------------------------------------------------------------------
// Kiþiselleþtirilen hoþgeldin mesajýnýn kodlamasý...
let düðme = document.querySelector ("button");
let baþlýk = document.querySelector ("h1");

function kullanýcýAdýKur() {
    let ad = prompt ("Lütfen adýnýzý girin:");
    if (! ad) {kullanýcýAdýKur();
    }else {
        localStorage.setItem ("isim", ad);
        baþlýk.innerHTML = "Mozilla muhteþem, " + ad + "!";
    } // else sonu...
} // func sonu...

if (! localStorage.getItem ("isim") ) {kullanýcýAdýKur();
}else {
    let yüklüAd = localStorage.getItem ("isim");
    baþlýk.innerHTML = "Mozilla muhteþem, " + yüklüAd + "!";
} // else sonu...

düðme.onclick = function() {kullanýcýAdýKur(); }
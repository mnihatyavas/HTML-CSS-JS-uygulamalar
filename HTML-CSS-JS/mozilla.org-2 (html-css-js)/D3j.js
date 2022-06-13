var t�rnaklar = document.querySelectorAll (".t�rnak-resim");
var b�y�kResim = document.querySelector (".tek-resim");

for (var i = 1; i <= t�rnaklar.length ; i++) {
    var yurel = "resim/galeri/pic" + i + ".jpg";
    resmiGetir (yurel, i-1);
} // for sonu...

function resmiGetir (yurel, resimNo) {
    fetch (yurel)
    .then (yan�t=> {
        if (!yan�t.ok) {throw new Error ("Resmi okuma hatas�, stat�s�=" + yan�t.status);}
        return yan�t.blob();
    }) // then sonu...
    .then (damla=> resmiG�ster (resimNo, damla))
    .catch (hata=> {t�rnaklar [resimNo].title = "HATA: " + hata.message;}); // Hata verince, �zerinde bekle, title oku...
} // func sonu...

function resmiG�ster (resimNo, damla) {
    var yurelNesnesi = URL.createObjectURL (damla);
    t�rnaklar [resimNo].setAttribute ("src", yurelNesnesi);
    t�rnaklar [resimNo].onclick = function() {
        b�y�kResim.setAttribute ("src", yurelNesnesi);
        b�y�kResim.className = "b�y�k";
        for (var i = 0; i < t�rnaklar.length; i++) {t�rnaklar [i].className = "t�rnak-resim karart";}
    } // t�r..sonu...
} // func sonu...

b�y�kResim.onclick = function() {
    b�y�kResim.className = "tek-resim";
    for (var i = 0; i < t�rnaklar.length; i++) {t�rnaklar [i].className = "t�rnak-resim";}
} // b�y..sonu...

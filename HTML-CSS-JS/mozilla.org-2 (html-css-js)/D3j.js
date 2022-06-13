var týrnaklar = document.querySelectorAll (".týrnak-resim");
var büyükResim = document.querySelector (".tek-resim");

for (var i = 1; i <= týrnaklar.length ; i++) {
    var yurel = "resim/galeri/pic" + i + ".jpg";
    resmiGetir (yurel, i-1);
} // for sonu...

function resmiGetir (yurel, resimNo) {
    fetch (yurel)
    .then (yanýt=> {
        if (!yanýt.ok) {throw new Error ("Resmi okuma hatasý, statüsü=" + yanýt.status);}
        return yanýt.blob();
    }) // then sonu...
    .then (damla=> resmiGöster (resimNo, damla))
    .catch (hata=> {týrnaklar [resimNo].title = "HATA: " + hata.message;}); // Hata verince, üzerinde bekle, title oku...
} // func sonu...

function resmiGöster (resimNo, damla) {
    var yurelNesnesi = URL.createObjectURL (damla);
    týrnaklar [resimNo].setAttribute ("src", yurelNesnesi);
    týrnaklar [resimNo].onclick = function() {
        büyükResim.setAttribute ("src", yurelNesnesi);
        büyükResim.className = "büyük";
        for (var i = 0; i < týrnaklar.length; i++) {týrnaklar [i].className = "týrnak-resim karart";}
    } // týr..sonu...
} // func sonu...

büyükResim.onclick = function() {
    büyükResim.className = "tek-resim";
    for (var i = 0; i < týrnaklar.length; i++) {týrnaklar [i].className = "týrnak-resim";}
} // büy..sonu...

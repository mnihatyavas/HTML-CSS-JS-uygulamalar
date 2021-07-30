// C1c21.j2: Týrnak ebatlý resimlerden týklananý büyütme, karartma/aydýnlatma js kodlamasý alt-örneði.

const gösteridekiResim = document.querySelector (".gösterideki-resim");
const týrnakEbat = document.querySelector (".týrnak-ebat");
const düðme = document.querySelector ("button");
const perdele = document.querySelector (".perde");

for (let i = 1; i <= 16; i++) {// 16 týrnak resmi altta küçük, ve týklananý üstte büyük göster
    const yeniResim = document.createElement ("img");
    yeniResim.setAttribute ("src", "resim/galeri/pic" + i + ".jpg");
    týrnakEbat.appendChild (yeniResim);
    yeniResim.onclick = function (olay) {gösteridekiResim.src = olay.target.src;}
} // for sonu...

düðme.onclick = function() {// Düðme týklamasýyla büyükresim önündeki perdeyi karart/þeffaflaþtýr
    const düðmeSýnýfý = düðme.getAttribute ("class");
    if (düðmeSýnýfý === "karanlýk") {
        düðme.setAttribute ("class", "parlak");
        düðme.textContent = "Aydýnlat";
        perdele.style.backgroundColor = "rgba(0,0,0,0.6)"; // %60 karart
    }else {// === "parlak"
        düðme.setAttribute ("class", "karanlýk");
        düðme.textContent = "Karart";
        perdele.style.backgroundColor = "rgba(0,0,0,0)"; // %0 karart (siyah perde tamþeffaf)
    } // else sonu...
} // düð..sonu...
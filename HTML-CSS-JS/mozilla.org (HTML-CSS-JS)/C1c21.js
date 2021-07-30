// C1c21.j2: T�rnak ebatl� resimlerden t�klanan� b�y�tme, karartma/ayd�nlatma js kodlamas� alt-�rne�i.

const g�steridekiResim = document.querySelector (".g�sterideki-resim");
const t�rnakEbat = document.querySelector (".t�rnak-ebat");
const d��me = document.querySelector ("button");
const perdele = document.querySelector (".perde");

for (let i = 1; i <= 16; i++) {// 16 t�rnak resmi altta k���k, ve t�klanan� �stte b�y�k g�ster
    const yeniResim = document.createElement ("img");
    yeniResim.setAttribute ("src", "resim/galeri/pic" + i + ".jpg");
    t�rnakEbat.appendChild (yeniResim);
    yeniResim.onclick = function (olay) {g�steridekiResim.src = olay.target.src;}
} // for sonu...

d��me.onclick = function() {// D��me t�klamas�yla b�y�kresim �n�ndeki perdeyi karart/�effafla�t�r
    const d��meS�n�f� = d��me.getAttribute ("class");
    if (d��meS�n�f� === "karanl�k") {
        d��me.setAttribute ("class", "parlak");
        d��me.textContent = "Ayd�nlat";
        perdele.style.backgroundColor = "rgba(0,0,0,0.6)"; // %60 karart
    }else {// === "parlak"
        d��me.setAttribute ("class", "karanl�k");
        d��me.textContent = "Karart";
        perdele.style.backgroundColor = "rgba(0,0,0,0)"; // %0 karart (siyah perde tam�effaf)
    } // else sonu...
} // d��..sonu...
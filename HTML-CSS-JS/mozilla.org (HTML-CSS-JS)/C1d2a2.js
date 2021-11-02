// C1d2a2.js: �zelle�tirilen formgiri�i ve g�nderim ge�erlileme js kodlama alt-�rne�i.

const verigiri�leri = document.querySelectorAll ("input");
const etiketler = document.querySelectorAll ("label");
const form = document.querySelector ("form");
let formBirimleri = [];
const hataKutusu = document.querySelector (".hata");
const hataListesi = document.querySelector (".hata ul");
hataKutusu.style.left = "-100%";

for (let i = 0; i < verigiri�leri.length-1; i++) {
    let nesne = {};
    nesne.etiket = etiketler [i];
    nesne.verigiri�i = verigiri�leri [i];
    formBirimleri.push (nesne);
} // for sonu...
form.onsubmit = ge�erlile;

function ge�erlile (o) {
    o.preventDefault();
    hataListesi.innerHTML = "";
    for (let i = 0; i < formBirimleri.length; i++) {
        let testBirimi = formBirimleri [i];
        if (testBirimi.verigiri�i.value === "") {
            hataKutusu.style.left = "25%";
            ikazBa�lant�s�Yarat (testBirimi);
        } // if sonu...
    } // for sonu...
    if (hataListesi.innerHTML === "") {
        alert ("For g�nderme ba�ar�l� oldu.\nYeni formgiri�i yapabilirsiniz.");
        window.location.reload();
    } // if sonu...
} // func sonu...

function ikazBa�lant�s�Yarat (bo�Alan) {
    const listeEleman� = document.createElement ("li");
    const �apaEleman� = document.createElement ("a");
    �apaEleman�.textContent = "Yukardaki: [form." + bo�Alan.verigiri�i.name + "] kutusuna giri� yap�lmal�.";
    �apaEleman�.href = "#" + bo�Alan.verigiri�i.name;
    �apaEleman�.onclick = function() {bo�Alan.verigiri�i.focus();}; // Hata listesi t�kland���nda ilgili verigiri�e odaklanmal�...
    listeEleman�.appendChild (�apaEleman�);
    hataListesi.appendChild (listeEleman�);
} // func sonu...
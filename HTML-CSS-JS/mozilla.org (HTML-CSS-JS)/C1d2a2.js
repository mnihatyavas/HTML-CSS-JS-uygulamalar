// C1d2a2.js: Özelleþtirilen formgiriþi ve gönderim geçerlileme js kodlama alt-örneði.

const verigiriþleri = document.querySelectorAll ("input");
const etiketler = document.querySelectorAll ("label");
const form = document.querySelector ("form");
let formBirimleri = [];
const hataKutusu = document.querySelector (".hata");
const hataListesi = document.querySelector (".hata ul");
hataKutusu.style.left = "-100%";

for (let i = 0; i < verigiriþleri.length-1; i++) {
    let nesne = {};
    nesne.etiket = etiketler [i];
    nesne.verigiriþi = verigiriþleri [i];
    formBirimleri.push (nesne);
} // for sonu...
form.onsubmit = geçerlile;

function geçerlile (o) {
    o.preventDefault();
    hataListesi.innerHTML = "";
    for (let i = 0; i < formBirimleri.length; i++) {
        let testBirimi = formBirimleri [i];
        if (testBirimi.verigiriþi.value === "") {
            hataKutusu.style.left = "25%";
            ikazBaðlantýsýYarat (testBirimi);
        } // if sonu...
    } // for sonu...
    if (hataListesi.innerHTML === "") {
        alert ("For gönderme baþarýlý oldu.\nYeni formgiriþi yapabilirsiniz.");
        window.location.reload();
    } // if sonu...
} // func sonu...

function ikazBaðlantýsýYarat (boþAlan) {
    const listeElemaný = document.createElement ("li");
    const çapaElemaný = document.createElement ("a");
    çapaElemaný.textContent = "Yukardaki: [form." + boþAlan.verigiriþi.name + "] kutusuna giriþ yapýlmalý.";
    çapaElemaný.href = "#" + boþAlan.verigiriþi.name;
    çapaElemaný.onclick = function() {boþAlan.verigiriþi.focus();}; // Hata listesi týklandýðýnda ilgili verigiriþe odaklanmalý...
    listeElemaný.appendChild (çapaElemaný);
    hataListesi.appendChild (listeElemaný);
} // func sonu...
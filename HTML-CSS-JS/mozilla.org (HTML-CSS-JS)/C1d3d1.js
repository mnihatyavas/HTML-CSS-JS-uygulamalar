// C1d3d1.js: Resimli müzikli yorumlu namakbul ayı tanıtım js kodlaması alt-örneği.

// Yorum göster-gizle fonksiyonelitesi...
const gösterGizleDüğmesi = document.querySelector (".göster-gizle");
const yorumSarıcı = document.querySelector (".yorum-sarıcı");

yorumSarıcı.style.display = "none";

gösterGizleDüğmesi.onclick = function() {
    let gösterGizleİbaresi = gösterGizleDüğmesi.textContent;
    if (gösterGizleİbaresi === "Yorumları göster") {
        gösterGizleDüğmesi.textContent = "Yorumları gizle";
        yorumSarıcı.style.display = "block";
    }else {
        gösterGizleDüğmesi.textContent = "Yorumları göster";
        yorumSarıcı.style.display = "none";
    } // else sonu...
}; // göster sonu...

// (Altalta) Yorum yapma ve gönderme fonksiyonelitesi...
const form = document.querySelector (".yorum-formu");
const isimGirişi = document.querySelector ("#isim");
const yorumGirişi = document.querySelector ("#yorum");
const liste = document.querySelector (".yorum-kabı");

form.onsubmit = function (o) {
    o.preventDefault();
    yorumuGönder();
}; // form sonu...

function yorumuGönder() {
    const liElemanı = document.createElement ("li");
    const pİsim = document.createElement ("p");
    const pYorum = document.createElement ("p");
    const isim = isimGirişi.value;
    const yorum = yorumGirişi.value;

    pİsim.textContent = isim;
    pYorum.textContent = yorum;

    liste.appendChild (liElemanı);
    liElemanı.appendChild (pİsim);
    liElemanı.appendChild (pYorum);

    isimGirişi.value = "";
    yorumGirişi.value = "";
} // func sonu...
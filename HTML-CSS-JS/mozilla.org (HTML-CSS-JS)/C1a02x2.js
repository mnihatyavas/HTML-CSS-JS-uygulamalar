// C1a02x2.js: Basit h1, japonca h1, ul-li liste girişi ve meta özellikler-2 alt-örneği.

const listem = document.createElement ("ul");
const açıklamam = document.createElement ("p");
const sayfam = document.querySelector ("html");

açıklamam.style.color="Yellow";
açıklamam.textContent = "Alttaki dinamik bir listedir. Liste dışında sayfanın neresinde tıklarsanız, listeye yeni bir ekleme yapabilirsiniz. Mevcut bir liste birimini tıklarsanız da onu değiştirebilirsiniz. Listeyi tümden silmek için yeniden başlatın";


document.body.appendChild (açıklamam);
document.body.appendChild (listem);

sayfam.onclick = function() {
    const listeBirimim = document.createElement ("li");
    const listeİçeriğim = prompt ("Liste birimi içeriklerini girin:");
    listeBirimim.textContent = listeİçeriğim;
    listem.appendChild (listeBirimim);

    listeBirimim.onclick = function (olay) {
        olay.stopPropagation();
        const listeİçeriğim = prompt ("Mevcut liste birimine yeni içerik girin:");
        this.textContent = listeİçeriğim;
    } // lis..sonu...
} // say..sonu...
// B3d1x3.js: Dizi-bul kodlamasının Kodaynası penceresinde çalıştırılması-3 alt-örneği.

var editörüm = document.getElementById ("editör");
var çıktım = document.getElementById ("çıktı");

var işlet = document.getElementById ("çalıştır");
var yeniBaşlat = document.getElementById ("yenidenBaşlat");

let console = { // Konsol çıktısını HTML'ye aktarmakta; iptal edilirse konsolda yansıtacak...
    log: function (loggedItem) {
        if (typeof (loggedItem) === "string") {return loggedItem;
        }else {return eval (loggedItem);}
    } // log sonu...
} // let sonu...

var kaSeçenekleri = {
    mode: "javascript",
    theme: "eclipse",
    lineNumbers: true,
    showCursorWhenSelecting: true,
    styleActiveLine: true
} // var sonu...

var kaEditör = CodeMirror (editörüm, kaSeçenekleri);
kaEditör.setSize ("100%", 250);
kaEditör.doc.setValue (kaİlkİçerik);
kaEditör.focus();
kaEditör.doc.setCursor ({line: kaSeçilenSatır, ch: kaSeçilenKrkBaşı});

function koduUygula() {
    var kod = kaEditör.doc.getValue();
    try {var sonuç = eval (kod);
    } catch (o) {var sonuç = "HATA: " + o.message;}
    çıktım.classList.add ("netleştir");
    çıktım.firstChild.textContent = sonuç;
    çıktım.firstChild.addEventListener ("animationend", (o) => {o.target.parentNode.classList.remove ("netleştir");});
} // func sonu...

yeniBaşlat.addEventListener ("click", function() {
    kaEditör.doc.setValue (kaİlkİçerik);
    kaEditör.focus();
    kaEditör.doc.setCursor ({line: kaSeçilenSatır, ch: kaSeçilenKrkBaşı});
    koduUygula();
}); // yeni sonu...

işlet.addEventListener ("click", function() {koduUygula();});

window.addEventListener ("load", koduUygula);
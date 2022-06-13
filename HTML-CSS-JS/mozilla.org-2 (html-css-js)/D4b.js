var vt;
var aktifEndeks;
var ileti�imKay�tlar� = [// sn: S�raNo
    {sn: 1, ad�: "Birsen", soyad�: "Hasar", �nvan�: "Sinerji Uzman�", �irketi: "Acaip", ePosta: "birsen@acaip.com", GSM: "+905310000000", ya��: 37},
    {sn: 2, ad�: "Tar�k", soyad�: "Savul", �nvan�: "�ef Raport�r", �irketi: "Pirin� tanesi", ePosta: "tarik@haberbudur.co.uk", GSM: "+905551111111", ya��: 46},
    {sn: 3, ad�: "Aziz", soyad�: "B�n", �nvan�: "Kral Dalkavu�u", �irketi: "Ko�an Dibi", ePosta: "aziz@posta.com", GSM: "+905458888888", ya��: 50},
    {sn: 4, ad�: "R�dvan", soyad�: "Cam�z", �nvan�: "Ses M�hendisi", �irketi: "�kiz Maymun", ePosta: "ridvan@duraksz.com", GSM: "+905577777777", ya��: 43},
    {sn: 5, ad�: "Birsen", soyad�: "�iftnokta", �nvan�: "K�rp�c�", �irketi: "Metal Par�alar�", ePosta: "birsen40@boynuzlu.com", GSM: "+905556666666", ya��: 40},
    {sn: 6, ad�: "Caner", soyad�: "Vin�", �nvan�: "H�r Psikolog", �irketi: "Gerzek", ePosta: "can@gerzek.com", GSM: "yok1", ya��: 38},
    {sn: 7, ad�: "Haziran", soyad�: "G�n", �nvan�: "Takvim �zleyici", �irketi: "Gerzek", ePosta: "haziran@gerzek.com", GSM: "yok2", ya��: 43},
    {sn: 8, ad�: "Bulvar", soyad�: "Tra�", �nvan�: "R&D Ba�kan�", �irketi: "Tra�", ePosta: "bulvar@tras.com", GSM: "+905555555555", ya��: 55},
    {sn: 9, ad�: "Bulut", soyad�: "Arbede", �nvan�: "Silah Hocas�", �irketi: "���", ePosta: "bulut@cig.com", GSM: "+905753333333", ya��: 24},
    {sn: 10, ad�: "Biblo", soyad�: "�alvar", �nvan�: "�izgi Roman Bayisi", �irketi: "Hayal Pazar�", ePosta: "biblo@hayalpazar.ist.tr", GSM: "+905414444444", ya��: 43}
]; // var sonu...
var tabloG�vdesi = document.querySelector ("tbody");

window.onload = function() {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB; // Farkl� taray�c�lar�n ortak tan�m�...
    var vtA� = window.indexedDB.open ("bilgiBankas�", 1);
  
    vtA�.onsuccess = function() {vt = vtA�.result; kay�tlar�Y�kle();};

    vtA�.onupgradeneeded = function (olay) { 
        var vt = olay.target.result;
        vt.onerror = function() {console.log ("Veritaban� g�ncelleme hatas�.");};
        var nesneDeposu = vt.createObjectStore ("bilgiBankas�", {keyPath: "sn"});
        nesneDeposu.createIndex ("soyad�", "soyad�", {unique: false}); // T�m kay�t alanlar� i�in endeksleme yap�lmakta...
        nesneDeposu.createIndex ("ad�", "ad�", {unique: false}); // Endeks adlar� alan adlar�yla ayn�/farkl� olabilir...
        nesneDeposu.createIndex ("�nvan�", "�nvan�", {unique: false}); // unique:false ile ayn� alanl� �oklu kay�t olabilir...
        nesneDeposu.createIndex ("�irketi", "�irketi", {unique: false});
        nesneDeposu.createIndex ("ePosta", "ePosta", {unique: true}); // Eposta ve gsm i�in �oklu kay�t olamaz...
        nesneDeposu.createIndex ("GSM", "GSM", { unique: true});
        nesneDeposu.createIndex ("endeks1", "ya��", {unique: false}); // Veritaban�yla nesnedeposunun adlar� ayn� olabilir...
    }; // vtA� sonu...

    var kay�tAlanBa�l�klar�Kontrolu = document.querySelectorAll ("th");
    for (i = 0; i < kay�tAlanBa�l�klar�Kontrolu.length; i++) {
        var aktifBa�l�k = kay�tAlanBa�l�klar�Kontrolu [i];
        aktifBa�l�k.onclick = function (o) {
            aktifEndeks = o.target.innerHTML;
            if (aktifEndeks == "SN") {kay�tlar�SNileG�ster();
            }else {
                if (aktifEndeks == "Soyad�") {kay�tlar�EndeksleG�ster ("soyad�");
                }else if (aktifEndeks == "Ad�") {kay�tlar�EndeksleG�ster ("ad�");
                }else if (aktifEndeks == "�nvan�") {kay�tlar�EndeksleG�ster ("�nvan�");
                }else if (aktifEndeks == "�irketi") {kay�tlar�EndeksleG�ster ("�irketi");
                }else if (aktifEndeks == "Eposta") {kay�tlar�EndeksleG�ster ("ePosta");
                }else if (aktifEndeks == "GSM") {kay�tlar�EndeksleG�ster ("GSM");
                }else if (aktifEndeks == "Ya��") {kay�tlar�EndeksleG�ster ("endeks1"); }
            } // else sonu...
        } // akt..sonu...
    } // for sonu...


    function kay�tlar�Y�kle() {
        var i�lem = vt.transaction (["bilgiBankas�"], "readwrite"); // "put" i�in "readwrite" kullan�lmal�...
        var nesneDeposu = i�lem.objectStore ("bilgiBankas�");
        for (i = 0; i < ileti�imKay�tlar�.length ; i++) {var talep = nesneDeposu.put (ileti�imKay�tlar� [i]);};
        talep.onerror = ()=>{console.log ("Kay�tlar� veritaban�na y�kleme hatas�.");};
        i�lem.oncomplete = function() {kay�tlar�SNileG�ster();};
    } // func sonu...


    function kay�tlar�SNileG�ster() {
        tabloG�vdesi.innerHTML = "";
        var nesneDeposu = vt.transaction (["bilgiBankas�"], "readonly").objectStore ("bilgiBankas�"); // G�ster i�in "readonly" kullan�labilir...
        nesneDeposu.openCursor().onsuccess = function (olay) {
            var izlek = olay.target.result;
            if (izlek) {
                var tabloSat�r� = document.createElement ("tr");
                tabloSat�r�.innerHTML = "<td>" + izlek.value.sn + "</td>"
                    + "<td>" + izlek.value.soyad� + "</td>"
                    + "<td>" + izlek.value.ad� + "</td>"
                    + "<td>" + izlek.value.�nvan� + "</td>"
                    + "<td>" + izlek.value.�irketi + "</td>"
                    + "<td>" + izlek.value.ePosta + "</td>"
                    + "<td>" + izlek.value.GSM + "</td>"
                    + "<td>" + izlek.value.ya�� + "</td>";
                tabloG�vdesi.appendChild (tabloSat�r�);
                izlek.continue(); // Yada "izlek.advance (1)"
            }else {console.log ("T�m mevcut kay�tlar SN ile g�sterildi.");}
        }; // nes..sonu...
    } // func sonu...

  function kay�tlar�EndeksleG�ster (aktifEndeks) {
        tabloG�vdesi.innerHTML = "";
        var nesneDeposu = vt.transaction (["bilgiBankas�"], "readonly").objectStore ("bilgiBankas�");
        var endeksim = nesneDeposu.index (aktifEndeks);
// Bu iki aral�k se�eneklidir, 2./ ve sonraki ilk / yenine * koyarak iptal edilebilir...
        console.log (endeksim.name);
        console.log (endeksim.objectStore);
        console.log (endeksim.keyPath);
        console.log (endeksim.multiEntry);
        console.log (endeksim.unique);

        var saya�Talebi = endeksim.count();
        saya�Talebi.onsuccess = function() {console.log (saya�Talebi.result);}

        if (aktifEndeks == "ad�") {
            var talebiAl = endeksim.get ("Bulvar");
            talebiAl.onsuccess = function() {console.log (talebiAl.result);} // "Bulvar" adl� kay�t nesnesi
        } // if sonu...

        if (aktifEndeks == "soyad�") {
            var anahtarTalebiAl = endeksim.getKey ("G�n");
            anahtarTalebiAl.onsuccess = function() {console.log (anahtarTalebiAl.result);} // "G�n" soyadl� SN numaras�
        } // if sonu...
//
        endeksim.openCursor().onsuccess = function (olay) {
            var izlek = olay.target.result;
            if (izlek) {
                var tabloSat�r� = document.createElement ("tr");
                tabloSat�r�.innerHTML = "<td>" + izlek.value.sn + "</td>"
                    + "<td>" + izlek.value.soyad� + "</td>"
                    + "<td>" + izlek.value.ad� + "</td>"
                    + "<td>" + izlek.value.�nvan� + "</td>"
                    + "<td>" + izlek.value.�irketi + "</td>"
                    + "<td>" + izlek.value.ePosta + "</td>"
                    + "<td>" + izlek.value.GSM + "</td>"
                    + "<td>" + izlek.value.ya�� + "</td>";
                tabloG�vdesi.appendChild (tabloSat�r�);
                izlek.continue();
            }else {console.log (aktifEndeks + " endeksle mevcut t�m kay�tlar g�sterildi.");}
        }; // end..sonu...
    } // func sonu...

    t�mKay�tlar�Sil.onclick = function() {
        var talep = vt.transaction (["bilgiBankas�"], "readwrite").objectStore ("bilgiBankas�").clear();
        //console.log (talep);
        talep.onerror = function() {console.error ("HATA: " + talep.error);};
        talep.onsuccess = function() {kay�tlar�SNileG�ster(); console.log ("T�m kay�tlar silindi.");};
    } // func sonu...

    vtSil.onclick = function() {
        vt.close();
        var talep = indexedDB.deleteDatabase ("bilgiBankas�");
        //console.log (talep);
        talep.onerror = function() {console.error ("HATA: " + talep.error);};
        talep.onsuccess = function() {tabloG�vdesi.innerHTML = ""; console.log ("Veritaban� silinmi�tir");};
    } // func sonu...
};
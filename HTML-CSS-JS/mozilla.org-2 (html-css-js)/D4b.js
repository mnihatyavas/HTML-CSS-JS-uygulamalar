var vt;
var aktifEndeks;
var iletiþimKayýtlarý = [// sn: SýraNo
    {sn: 1, adý: "Birsen", soyadý: "Hasar", ünvaný: "Sinerji Uzmaný", þirketi: "Acaip", ePosta: "birsen@acaip.com", GSM: "+905310000000", yaþý: 37},
    {sn: 2, adý: "Tarýk", soyadý: "Savul", ünvaný: "Þef Raportör", þirketi: "Pirinç tanesi", ePosta: "tarik@haberbudur.co.uk", GSM: "+905551111111", yaþý: 46},
    {sn: 3, adý: "Aziz", soyadý: "Bön", ünvaný: "Kral Dalkavuðu", þirketi: "Koçan Dibi", ePosta: "aziz@posta.com", GSM: "+905458888888", yaþý: 50},
    {sn: 4, adý: "Rýdvan", soyadý: "Camýz", ünvaný: "Ses Mühendisi", þirketi: "Ýkiz Maymun", ePosta: "ridvan@duraksz.com", GSM: "+905577777777", yaþý: 43},
    {sn: 5, adý: "Birsen", soyadý: "Çiftnokta", ünvaný: "Kýrpýcý", þirketi: "Metal Parçalarý", ePosta: "birsen40@boynuzlu.com", GSM: "+905556666666", yaþý: 40},
    {sn: 6, adý: "Caner", soyadý: "Vinç", ünvaný: "Hür Psikolog", þirketi: "Gerzek", ePosta: "can@gerzek.com", GSM: "yok1", yaþý: 38},
    {sn: 7, adý: "Haziran", soyadý: "Gün", ünvaný: "Takvim Ýzleyici", þirketi: "Gerzek", ePosta: "haziran@gerzek.com", GSM: "yok2", yaþý: 43},
    {sn: 8, adý: "Bulvar", soyadý: "Traþ", ünvaný: "R&D Baþkaný", þirketi: "Traþ", ePosta: "bulvar@tras.com", GSM: "+905555555555", yaþý: 55},
    {sn: 9, adý: "Bulut", soyadý: "Arbede", ünvaný: "Silah Hocasý", þirketi: "Çýð", ePosta: "bulut@cig.com", GSM: "+905753333333", yaþý: 24},
    {sn: 10, adý: "Biblo", soyadý: "Þalvar", ünvaný: "Çizgi Roman Bayisi", þirketi: "Hayal Pazarý", ePosta: "biblo@hayalpazar.ist.tr", GSM: "+905414444444", yaþý: 43}
]; // var sonu...
var tabloGövdesi = document.querySelector ("tbody");

window.onload = function() {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB; // Farklý tarayýcýlarýn ortak tanýmý...
    var vtAç = window.indexedDB.open ("bilgiBankasý", 1);
  
    vtAç.onsuccess = function() {vt = vtAç.result; kayýtlarýYükle();};

    vtAç.onupgradeneeded = function (olay) { 
        var vt = olay.target.result;
        vt.onerror = function() {console.log ("Veritabaný güncelleme hatasý.");};
        var nesneDeposu = vt.createObjectStore ("bilgiBankasý", {keyPath: "sn"});
        nesneDeposu.createIndex ("soyadý", "soyadý", {unique: false}); // Tüm kayýt alanlarý için endeksleme yapýlmakta...
        nesneDeposu.createIndex ("adý", "adý", {unique: false}); // Endeks adlarý alan adlarýyla ayný/farklý olabilir...
        nesneDeposu.createIndex ("ünvaný", "ünvaný", {unique: false}); // unique:false ile ayný alanlý çoklu kayýt olabilir...
        nesneDeposu.createIndex ("þirketi", "þirketi", {unique: false});
        nesneDeposu.createIndex ("ePosta", "ePosta", {unique: true}); // Eposta ve gsm için çoklu kayýt olamaz...
        nesneDeposu.createIndex ("GSM", "GSM", { unique: true});
        nesneDeposu.createIndex ("endeks1", "yaþý", {unique: false}); // Veritabanýyla nesnedeposunun adlarý ayný olabilir...
    }; // vtAç sonu...

    var kayýtAlanBaþlýklarýKontrolu = document.querySelectorAll ("th");
    for (i = 0; i < kayýtAlanBaþlýklarýKontrolu.length; i++) {
        var aktifBaþlýk = kayýtAlanBaþlýklarýKontrolu [i];
        aktifBaþlýk.onclick = function (o) {
            aktifEndeks = o.target.innerHTML;
            if (aktifEndeks == "SN") {kayýtlarýSNileGöster();
            }else {
                if (aktifEndeks == "Soyadý") {kayýtlarýEndeksleGöster ("soyadý");
                }else if (aktifEndeks == "Adý") {kayýtlarýEndeksleGöster ("adý");
                }else if (aktifEndeks == "Ünvaný") {kayýtlarýEndeksleGöster ("ünvaný");
                }else if (aktifEndeks == "Þirketi") {kayýtlarýEndeksleGöster ("þirketi");
                }else if (aktifEndeks == "Eposta") {kayýtlarýEndeksleGöster ("ePosta");
                }else if (aktifEndeks == "GSM") {kayýtlarýEndeksleGöster ("GSM");
                }else if (aktifEndeks == "Yaþý") {kayýtlarýEndeksleGöster ("endeks1"); }
            } // else sonu...
        } // akt..sonu...
    } // for sonu...


    function kayýtlarýYükle() {
        var iþlem = vt.transaction (["bilgiBankasý"], "readwrite"); // "put" için "readwrite" kullanýlmalý...
        var nesneDeposu = iþlem.objectStore ("bilgiBankasý");
        for (i = 0; i < iletiþimKayýtlarý.length ; i++) {var talep = nesneDeposu.put (iletiþimKayýtlarý [i]);};
        talep.onerror = ()=>{console.log ("Kayýtlarý veritabanýna yükleme hatasý.");};
        iþlem.oncomplete = function() {kayýtlarýSNileGöster();};
    } // func sonu...


    function kayýtlarýSNileGöster() {
        tabloGövdesi.innerHTML = "";
        var nesneDeposu = vt.transaction (["bilgiBankasý"], "readonly").objectStore ("bilgiBankasý"); // Göster için "readonly" kullanýlabilir...
        nesneDeposu.openCursor().onsuccess = function (olay) {
            var izlek = olay.target.result;
            if (izlek) {
                var tabloSatýrý = document.createElement ("tr");
                tabloSatýrý.innerHTML = "<td>" + izlek.value.sn + "</td>"
                    + "<td>" + izlek.value.soyadý + "</td>"
                    + "<td>" + izlek.value.adý + "</td>"
                    + "<td>" + izlek.value.ünvaný + "</td>"
                    + "<td>" + izlek.value.þirketi + "</td>"
                    + "<td>" + izlek.value.ePosta + "</td>"
                    + "<td>" + izlek.value.GSM + "</td>"
                    + "<td>" + izlek.value.yaþý + "</td>";
                tabloGövdesi.appendChild (tabloSatýrý);
                izlek.continue(); // Yada "izlek.advance (1)"
            }else {console.log ("Tüm mevcut kayýtlar SN ile gösterildi.");}
        }; // nes..sonu...
    } // func sonu...

  function kayýtlarýEndeksleGöster (aktifEndeks) {
        tabloGövdesi.innerHTML = "";
        var nesneDeposu = vt.transaction (["bilgiBankasý"], "readonly").objectStore ("bilgiBankasý");
        var endeksim = nesneDeposu.index (aktifEndeks);
// Bu iki aralýk seçeneklidir, 2./ ve sonraki ilk / yenine * koyarak iptal edilebilir...
        console.log (endeksim.name);
        console.log (endeksim.objectStore);
        console.log (endeksim.keyPath);
        console.log (endeksim.multiEntry);
        console.log (endeksim.unique);

        var sayaçTalebi = endeksim.count();
        sayaçTalebi.onsuccess = function() {console.log (sayaçTalebi.result);}

        if (aktifEndeks == "adý") {
            var talebiAl = endeksim.get ("Bulvar");
            talebiAl.onsuccess = function() {console.log (talebiAl.result);} // "Bulvar" adlý kayýt nesnesi
        } // if sonu...

        if (aktifEndeks == "soyadý") {
            var anahtarTalebiAl = endeksim.getKey ("Gün");
            anahtarTalebiAl.onsuccess = function() {console.log (anahtarTalebiAl.result);} // "Gün" soyadlý SN numarasý
        } // if sonu...
//
        endeksim.openCursor().onsuccess = function (olay) {
            var izlek = olay.target.result;
            if (izlek) {
                var tabloSatýrý = document.createElement ("tr");
                tabloSatýrý.innerHTML = "<td>" + izlek.value.sn + "</td>"
                    + "<td>" + izlek.value.soyadý + "</td>"
                    + "<td>" + izlek.value.adý + "</td>"
                    + "<td>" + izlek.value.ünvaný + "</td>"
                    + "<td>" + izlek.value.þirketi + "</td>"
                    + "<td>" + izlek.value.ePosta + "</td>"
                    + "<td>" + izlek.value.GSM + "</td>"
                    + "<td>" + izlek.value.yaþý + "</td>";
                tabloGövdesi.appendChild (tabloSatýrý);
                izlek.continue();
            }else {console.log (aktifEndeks + " endeksle mevcut tüm kayýtlar gösterildi.");}
        }; // end..sonu...
    } // func sonu...

    tümKayýtlarýSil.onclick = function() {
        var talep = vt.transaction (["bilgiBankasý"], "readwrite").objectStore ("bilgiBankasý").clear();
        //console.log (talep);
        talep.onerror = function() {console.error ("HATA: " + talep.error);};
        talep.onsuccess = function() {kayýtlarýSNileGöster(); console.log ("Tüm kayýtlar silindi.");};
    } // func sonu...

    vtSil.onclick = function() {
        vt.close();
        var talep = indexedDB.deleteDatabase ("bilgiBankasý");
        //console.log (talep);
        talep.onerror = function() {console.error ("HATA: " + talep.error);};
        talep.onsuccess = function() {tabloGövdesi.innerHTML = ""; console.log ("Veritabaný silinmiþtir");};
    } // func sonu...
};
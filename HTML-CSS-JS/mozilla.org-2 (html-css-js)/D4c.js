var vt; // Veritabaný nesnesi...
var hobiler = [
    {hobim: "LTspice-XVII", puaným: 10},
    {hobim: "Aile", puaným: 10},
    {hobim: "Nemo", puaným: 9},    
    {hobim: "Gümüþ Kayakcý", puaným: 9},
    {hobim: "Ýnternet", puaným: 9},
    {hobim: "Maxthon", puaným: 9},
    {hobim: "Java Script", puaným: 9},
    {hobim: "Jogging", puaným: 9},
    {hobim: "Kaþar peyniri", puaným: 8},
    {hobim: "Türk mutfaðý", puaným: 8},
    {hobim: "Çikolata", puaným: 7},
    {hobim: "Gülben Ergen", puaným: 10},
    {hobim: "Monty Python", puaným: 8},
    {hobim: "Büyülü Rüzgar", puaným: 8},
    {hobim: "Að oyunlarý", puaným: 7},
    {hobim: "Cüneyt Arkýn", puaným: 9},
    {hobim: "Acýlanma meditasyonu", puaným: 10},
    {hobim: "Biking", puaným: 9},
    {hobim: "Tracking", puaným: 9},
    {hobim: "Köpüklü Kerebiç", puaným: 8}
]; // var sonu...
var ulListe = document.querySelector ("ul"); // HTML sayfamýzdaki elemanlar...
var süzgeçlemeButonu = document.querySelector ("button");
var tekAd = document.querySelector ("#tekad");
var kapsamýnÝlkAdý = document.querySelector ("#kapsamýnilkadý");
var kapsamýnSonAdý = document.querySelector ("#kapsamýnsonadý");
var altSýnýrAdý = document.querySelector ("#altsýnýradý");
var üstSýnýrAdý = document.querySelector('#üstsýnýradý');
var anahtarKapsamDeðeri = null;

window.onload = function() {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

    var vtAç = window.indexedDB.open ("Hobiler", 1); // Veritabaný'yla nesnedeposu'nun adlarý ayný/farklý olabilir...
    vtAç.onsuccess = function() {vt = vtAç.result; kayýtlarýYükle();};

    vtAç.onupgradeneeded = function (olay) {
        var vt = olay.target.result;
        vt.onerror = function() {console.error ("Veritabanýný yükleme hatasý.");};
        var nesneDeposu = vt.createObjectStore ("hobilerim", {keyPath: "hobim"});
        nesneDeposu.createIndex ("puanEndeksi", "puaným", {unique: false});
    }; // vtAç sonu...

    function kayýtlarýYükle() {
        var iþlem = vt.transaction (["hobilerim"], "readwrite");
        var nesneDeposu = iþlem.objectStore ("hobilerim");
        for (i = 0; i < hobiler.length ; i++) {nesneDeposu.put (hobiler [i]);};
        iþlem.oncomplete = function() {kayýtlarýGöster();};
    } // func sonu...

    function kayýtlarýGöster() {
        seçilenSüzgeç = document.querySelector ('input[name="deðer"]:checked').value;
        var süzgeçlemeEndeksi = document.querySelector ('input[name="süzgeçlemeEndeksi"]:checked').value;
        if (süzgeçlemeEndeksi == "hobim") {
            if (seçilenSüzgeç == "hiç") {anahtarKapsamDeðeri = null;
            }else if (seçilenSüzgeç == "tek") {anahtarKapsamDeðeri = IDBKeyRange.only (tekAd.value);
            }else if (seçilenSüzgeç == "kapsam") {anahtarKapsamDeðeri = IDBKeyRange.bound (kapsamýnÝlkAdý.value, kapsamýnSonAdý.value, false, false);
            }else if (seçilenSüzgeç == "ilkad") {anahtarKapsamDeðeri = IDBKeyRange.lowerBound (altSýnýrAdý.value);
            }else if (seçilenSüzgeç == "sonad") {anahtarKapsamDeðeri = IDBKeyRange.upperBound (üstSýnýrAdý.value); }
        }else { //süzgeçlemeEndeksi == "puaným"
            if (seçilenSüzgeç == "hiç") {anahtarKapsamDeðeri = null;
            }else if (seçilenSüzgeç == "tek") {anahtarKapsamDeðeri = IDBKeyRange.only (parseFloat (tekAd.value));
            }else if (seçilenSüzgeç == "kapsam") {anahtarKapsamDeðeri = IDBKeyRange.bound (parseFloat (kapsamýnÝlkAdý.value), parseFloat (kapsamýnSonAdý.value), false, false);
            }else if (seçilenSüzgeç == "ilkad") {anahtarKapsamDeðeri = IDBKeyRange.lowerBound (parseFloat (altSýnýrAdý.value));
            }else if (seçilenSüzgeç == "sonad") {anahtarKapsamDeðeri = IDBKeyRange.upperBound (parseFloat (üstSýnýrAdý.value)); }
        } // if-else sonu...
        if (anahtarKapsamDeðeri != null) {// Kapsam süzgeç deðerlerini konsolda yansýt...
            console.log ("Kapsamýn ilk deðeri: " + anahtarKapsamDeðeri.lower);
            console.log ("Kapsamýn son deðeri: " + anahtarKapsamDeðeri.upper);
            console.log ("Kapsam ilkdeðersiz mi? " + anahtarKapsamDeðeri.lowerOpen);
            console.log ("Kapsam son deðersiz mi? " + anahtarKapsamDeðeri.upperOpen);
        }; // if sonu...
        ulListe.innerHTML = "";
        var nesneDeposu = vt.transaction ("hobilerim", "readonly").objectStore ("hobilerim");
        var kayýtSayýsý = nesneDeposu.count();
        kayýtSayýsý.onsuccess = function() {console.log ("Depodaki toplam kayýt sayýsý: " + kayýtSayýsý.result);}
        if (süzgeçlemeEndeksi == "puaným") {nesneDeposu = nesneDeposu.index ("puanEndeksi");} // Tarama keypath="hobim" ile deðil "puaným" kayýtalanlý "puanEndeksi" ile...
        nesneDeposu.openCursor (anahtarKapsamDeðeri).onsuccess = function (olay) {
            var izlek = olay.target.result;
            if (izlek) {
                var liEleman = document.createElement ("li");
                liEleman.innerHTML = "<strong>" + izlek.value.hobim + "</strong>, " + izlek.value.puaným;
                ulListe.appendChild (liEleman);
                izlek.continue();
            }else {console.log ("Süzgeçlediðiniz tüm kayýtlar görüntülendi."); tekAd.value=""; kapsamýnÝlkAdý.value=""; kapsamýnSonAdý.value=""; altSýnýrAdý.value=""; üstSýnýrAdý.value="";}
        }; // nes..sonu...
    } // func sonu...

    süzgeçlemeButonu.onclick = function (o) {o.preventDefault(); kayýtlarýGöster();};

    tümKayýtlarýSil.onclick = function() {
        var talep = vt.transaction (["hobilerim"], "readwrite").objectStore ("hobilerim").clear();
        //console.log (talep.result);
        talep.onerror = function() {console.error ("HATA: " + talep.error);};
        talep.onsuccess = function() {kayýtlarýGöster(); console.log ("Tüm kayýtlar silindi.");};
    } // func sonu...

    vtSil.onclick = function() {
        vt.close();
        var talep = indexedDB.deleteDatabase ("Hobiler");
        //console.log (talep.result);
        talep.onerror = function() {console.error ("HATA: " + talep.error);};
        talep.onsuccess = function() {ulListe.innerHTML = ""; console.log ("Veritabaný silinmiþtir");};
    } // func sonu...
};
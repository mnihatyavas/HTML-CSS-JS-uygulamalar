var vt; // Veritaban� nesnesi...
var hobiler = [
    {hobim: "LTspice-XVII", puan�m: 10},
    {hobim: "Aile", puan�m: 10},
    {hobim: "Nemo", puan�m: 9},    
    {hobim: "G�m�� Kayakc�", puan�m: 9},
    {hobim: "�nternet", puan�m: 9},
    {hobim: "Maxthon", puan�m: 9},
    {hobim: "Java Script", puan�m: 9},
    {hobim: "Jogging", puan�m: 9},
    {hobim: "Ka�ar peyniri", puan�m: 8},
    {hobim: "T�rk mutfa��", puan�m: 8},
    {hobim: "�ikolata", puan�m: 7},
    {hobim: "G�lben Ergen", puan�m: 10},
    {hobim: "Monty Python", puan�m: 8},
    {hobim: "B�y�l� R�zgar", puan�m: 8},
    {hobim: "A� oyunlar�", puan�m: 7},
    {hobim: "C�neyt Ark�n", puan�m: 9},
    {hobim: "Ac�lanma meditasyonu", puan�m: 10},
    {hobim: "Biking", puan�m: 9},
    {hobim: "Tracking", puan�m: 9},
    {hobim: "K�p�kl� Kerebi�", puan�m: 8}
]; // var sonu...
var ulListe = document.querySelector ("ul"); // HTML sayfam�zdaki elemanlar...
var s�zge�lemeButonu = document.querySelector ("button");
var tekAd = document.querySelector ("#tekad");
var kapsam�n�lkAd� = document.querySelector ("#kapsam�nilkad�");
var kapsam�nSonAd� = document.querySelector ("#kapsam�nsonad�");
var altS�n�rAd� = document.querySelector ("#alts�n�rad�");
var �stS�n�rAd� = document.querySelector('#�sts�n�rad�');
var anahtarKapsamDe�eri = null;

window.onload = function() {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

    var vtA� = window.indexedDB.open ("Hobiler", 1); // Veritaban�'yla nesnedeposu'nun adlar� ayn�/farkl� olabilir...
    vtA�.onsuccess = function() {vt = vtA�.result; kay�tlar�Y�kle();};

    vtA�.onupgradeneeded = function (olay) {
        var vt = olay.target.result;
        vt.onerror = function() {console.error ("Veritaban�n� y�kleme hatas�.");};
        var nesneDeposu = vt.createObjectStore ("hobilerim", {keyPath: "hobim"});
        nesneDeposu.createIndex ("puanEndeksi", "puan�m", {unique: false});
    }; // vtA� sonu...

    function kay�tlar�Y�kle() {
        var i�lem = vt.transaction (["hobilerim"], "readwrite");
        var nesneDeposu = i�lem.objectStore ("hobilerim");
        for (i = 0; i < hobiler.length ; i++) {nesneDeposu.put (hobiler [i]);};
        i�lem.oncomplete = function() {kay�tlar�G�ster();};
    } // func sonu...

    function kay�tlar�G�ster() {
        se�ilenS�zge� = document.querySelector ('input[name="de�er"]:checked').value;
        var s�zge�lemeEndeksi = document.querySelector ('input[name="s�zge�lemeEndeksi"]:checked').value;
        if (s�zge�lemeEndeksi == "hobim") {
            if (se�ilenS�zge� == "hi�") {anahtarKapsamDe�eri = null;
            }else if (se�ilenS�zge� == "tek") {anahtarKapsamDe�eri = IDBKeyRange.only (tekAd.value);
            }else if (se�ilenS�zge� == "kapsam") {anahtarKapsamDe�eri = IDBKeyRange.bound (kapsam�n�lkAd�.value, kapsam�nSonAd�.value, false, false);
            }else if (se�ilenS�zge� == "ilkad") {anahtarKapsamDe�eri = IDBKeyRange.lowerBound (altS�n�rAd�.value);
            }else if (se�ilenS�zge� == "sonad") {anahtarKapsamDe�eri = IDBKeyRange.upperBound (�stS�n�rAd�.value); }
        }else { //s�zge�lemeEndeksi == "puan�m"
            if (se�ilenS�zge� == "hi�") {anahtarKapsamDe�eri = null;
            }else if (se�ilenS�zge� == "tek") {anahtarKapsamDe�eri = IDBKeyRange.only (parseFloat (tekAd.value));
            }else if (se�ilenS�zge� == "kapsam") {anahtarKapsamDe�eri = IDBKeyRange.bound (parseFloat (kapsam�n�lkAd�.value), parseFloat (kapsam�nSonAd�.value), false, false);
            }else if (se�ilenS�zge� == "ilkad") {anahtarKapsamDe�eri = IDBKeyRange.lowerBound (parseFloat (altS�n�rAd�.value));
            }else if (se�ilenS�zge� == "sonad") {anahtarKapsamDe�eri = IDBKeyRange.upperBound (parseFloat (�stS�n�rAd�.value)); }
        } // if-else sonu...
        if (anahtarKapsamDe�eri != null) {// Kapsam s�zge� de�erlerini konsolda yans�t...
            console.log ("Kapsam�n ilk de�eri: " + anahtarKapsamDe�eri.lower);
            console.log ("Kapsam�n son de�eri: " + anahtarKapsamDe�eri.upper);
            console.log ("Kapsam ilkde�ersiz mi? " + anahtarKapsamDe�eri.lowerOpen);
            console.log ("Kapsam son de�ersiz mi? " + anahtarKapsamDe�eri.upperOpen);
        }; // if sonu...
        ulListe.innerHTML = "";
        var nesneDeposu = vt.transaction ("hobilerim", "readonly").objectStore ("hobilerim");
        var kay�tSay�s� = nesneDeposu.count();
        kay�tSay�s�.onsuccess = function() {console.log ("Depodaki toplam kay�t say�s�: " + kay�tSay�s�.result);}
        if (s�zge�lemeEndeksi == "puan�m") {nesneDeposu = nesneDeposu.index ("puanEndeksi");} // Tarama keypath="hobim" ile de�il "puan�m" kay�talanl� "puanEndeksi" ile...
        nesneDeposu.openCursor (anahtarKapsamDe�eri).onsuccess = function (olay) {
            var izlek = olay.target.result;
            if (izlek) {
                var liEleman = document.createElement ("li");
                liEleman.innerHTML = "<strong>" + izlek.value.hobim + "</strong>, " + izlek.value.puan�m;
                ulListe.appendChild (liEleman);
                izlek.continue();
            }else {console.log ("S�zge�ledi�iniz t�m kay�tlar g�r�nt�lendi."); tekAd.value=""; kapsam�n�lkAd�.value=""; kapsam�nSonAd�.value=""; altS�n�rAd�.value=""; �stS�n�rAd�.value="";}
        }; // nes..sonu...
    } // func sonu...

    s�zge�lemeButonu.onclick = function (o) {o.preventDefault(); kay�tlar�G�ster();};

    t�mKay�tlar�Sil.onclick = function() {
        var talep = vt.transaction (["hobilerim"], "readwrite").objectStore ("hobilerim").clear();
        //console.log (talep.result);
        talep.onerror = function() {console.error ("HATA: " + talep.error);};
        talep.onsuccess = function() {kay�tlar�G�ster(); console.log ("T�m kay�tlar silindi.");};
    } // func sonu...

    vtSil.onclick = function() {
        vt.close();
        var talep = indexedDB.deleteDatabase ("Hobiler");
        //console.log (talep.result);
        talep.onerror = function() {console.error ("HATA: " + talep.error);};
        talep.onsuccess = function() {ulListe.innerHTML = ""; console.log ("Veritaban� silinmi�tir");};
    } // func sonu...
};
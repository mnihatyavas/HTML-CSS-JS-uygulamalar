var vt; // DataBase: VeriTaban�
var kay�tlar = [
    {alb�mAd�: "G�� pencereleri", y�l�: 1985},
    {alb�mAd�: "Bask� alt�ndaki Grace", y�l�: 1984},
    {alb�mAd�: "Sinyaller", y�l�: 1982},
    {alb�mAd�: "Hareketli resimler", y�l�: 1981},
    {alb�mAd�: "Daimi dalgalar", y�l�: 1980},
    {alb�mAd�: "Yar�k�reler", y�l�: 1978 },
    {alb�mAd�: "Krallara bir veda", y�l�: 1977},
    {alb�mAd�: "2112", y�l�: 1976},
    {alb�mAd�: "�eli�in ok�ay���", y�l�: 1975},
    {alb�mAd�: "Gece u�u�u", y�l�: 1975},
    {alb�mAd�: "Co�ku", y�l�: 1974}
]; // var sonu...
var ulListe = document.querySelector ("ul");
var azT�m� = document.querySelector (".t�m�");
var zaTersten = document.querySelector (".tersten");
var birAtlamal� = document.querySelector (".atlamal�");
var tekKayd�Sil = document.querySelector (".sil");
var tekKayd�G�ncelle = document.querySelector (".g�ncelle");
var t�mKay�tlar�Sil = document.querySelector (".t�msil");
var vtSil = document.querySelector (".vtsil");

window.onload = function() {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB; // Farkl� taray�c�lar i�in standart tan�mlar...
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

    var vtA� = window.indexedDB.open ("alb�mlerListesi", 1);
  
    vtA�.onsuccess = function() {vt = vtA�.result; kay�tlar�Y�kle();};
  
    vtA�.onupgradeneeded = function (olay) {
        var vt = olay.target.result;
        vt.onerror = function() {console.log ("Veritaban� y�kleme hatas�.")};
        var nesneDeposu = vt.createObjectStore ("rushAlb�mListesi", {keyPath: "alb�mAd�"});  
        //nesneDeposu.createIndex ("y�l�", "y�l�", {unique: false});
    }; // vt..sonu...
    
    function kay�tlar�Y�kle() {
        var i�lem = vt.transaction (["rushAlb�mListesi"], "readwrite");
        var nesneDeposu = i�lem.objectStore ("rushAlb�mListesi");
        for (i = 0; i < kay�tlar.length ; i++) {nesneDeposu.put (kay�tlar [i]);};
        i�lem.oncomplete = function() {kay�tlar�G�ster();};
    } // func sonu...

    function kay�tlar�G�ster() {
        ulListe.innerHTML = "";
        var i�lem = vt.transaction (["rushAlb�mListesi"], "readonly");
        var nesneDeposu = i�lem.objectStore ("rushAlb�mListesi");
        nesneDeposu.openCursor().onsuccess = function (olay) {
            var izlek = olay.target.result;
            if (izlek) {// S�rada kay�t varsa...
                var liEleman = document.createElement ("li");
                liEleman.innerHTML = "<strong>" + izlek.value.alb�mAd� + "</strong>, " + izlek.value.y�l�;
                ulListe.appendChild (liEleman);  
                //console.log (izlek.source, izlek.key, izlek.primaryKey, izlek.value);
                izlek.continue(); // Birsonraki kayda ge�...
            }else {console.log ("T�m kay�tlar g�sterildi.");}
        }; // nes..sonu...
    } // func sonu...

    azT�m�.onclick = function() {kay�tlar�G�ster();}

    zaTersten.onclick = function() {
        ulListe.innerHTML = "";
        var nesneDeposu = vt.transaction(["rushAlb�mListesi"], "readonly").objectStore ("rushAlb�mListesi");
        nesneDeposu.openCursor (null,"prev").onsuccess = function (olay) {
            var izlek = olay.target.result;
            if (izlek) {
                var liEleman = document.createElement ("li");
                liEleman.innerHTML = "<strong>" + izlek.value.alb�mAd� + "</strong>, " + izlek.value.y�l�;
                ulListe.appendChild (liEleman);
                //console.log (izlek.direction);
                izlek.continue();
            }else {console.log ("T�m kay�tlar tersten g�sterildi.");}
        }; // nes..sonu...
    }; // zaT..sonu...

    birAtlamal�.onclick = function() {
        ulListe.innerHTML = "";
        var nesneDeposu = vt.transaction (["rushAlb�mListesi"], "readonly").objectStore ("rushAlb�mListesi");
        nesneDeposu.openCursor().onsuccess = function (olay) {
            var izlek = olay.target.result;
            if (izlek) {
                var liEleman = document.createElement ("li");
                liEleman.innerHTML = "<strong>" + izlek.value.alb�mAd� + "</strong>, " + izlek.value.y�l�;
                ulListe.appendChild (liEleman);
                izlek.advance (2); // Birsonraki yerine ikisonraki kayda ilerle...
            }else {console.log ("Biratlamal� t�m kay�tlar g�sterildi.");}
        }; // nes..sonu...
    }; // bir..sonu...

    tekKayd�Sil.onclick = function() {
        ulListe.innerHTML = "";
        var nesneDeposu = vt.transaction (["rushAlb�mListesi"], "readwrite").objectStore ("rushAlb�mListesi");
        nesneDeposu.openCursor().onsuccess = function (olay) {
            var izlek = olay.target.result;
            if (izlek) {
                if (izlek.value.alb�mAd� === "Bask� alt�ndaki Grace") {
                    var talep = izlek.delete();
                    talep.onsuccess = function() {console.log ('"Bask� alt�ndaki Grace" kayd� silindi.');};
                }else {
                    var liEleman = document.createElement ("li");
                    liEleman.innerHTML = "<strong>" + izlek.value.alb�mAd� + "</strong>, " + izlek.value.y�l�;
                    ulListe.appendChild (liEleman);
                } // else sonu...
                izlek.continue();
            }else {console.log ("Silinen kay�t hari� t�m� g�sterildi.");}
        }; // nes..sonu...
    }; // sil..sonu...

    tekKayd�G�ncelle.onclick = function() {
        ulListe.innerHTML = "";
        var nesneDeposu = vt.transaction (["rushAlb�mListesi"], "readwrite").objectStore ("rushAlb�mListesi");
        nesneDeposu.openCursor().onsuccess = function (olay) {
            var izlek = olay.target.result;
            if (izlek) {
                if (izlek.value.alb�mAd� === "Krallara bir veda") {
                    var g�ncellenenKay�t = izlek.value;
                    g�ncellenenKay�t.y�l� = 2050;
                    var talep = izlek.update (g�ncellenenKay�t);
                    talep.onsuccess = function() {console.log ("Daha parlak bir alb�m y�l�!..");};
                }; // if sonu...
                var liEleman = document.createElement ("li");
                liEleman.innerHTML = "<strong>" + izlek.value.alb�mAd� + "</strong>, " + izlek.value.y�l�;
                ulListe.appendChild (liEleman);
                izlek.continue();
            }else {console.log ("G�nceli dahil t�m kay�tlar g�sterildi.");}
        }; // nes..sonu...
    }; // g�ncel sonu...

    
    t�mKay�tlar�Sil.onclick = function() {
        var talep = vt.transaction (["rushAlb�mListesi"], "readwrite").objectStore ("rushAlb�mListesi").clear();
        //console.log (talep);
        talep.onerror = function() {console.error ("HATA: " + talep.error);};
        talep.onsuccess = function() {kay�tlar�G�ster(); console.log ("T�m kay�tlar silindi.");};
    } // func sonu...

    vtSil.onclick = function() {
        vt.close();
        var talep = indexedDB.deleteDatabase ("alb�mlerListesi");
        //console.log (talep);
        talep.onerror = function() {console.error ("HATA: " + talep.error);};
        talep.onsuccess = function() {ulListe.innerHTML = ""; console.log ("Veritaban� silinmi�tir");};
    } // func sonu...
}; // window.onload sonu...
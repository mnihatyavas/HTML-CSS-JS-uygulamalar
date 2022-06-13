var vt; // DataBase: VeriTabaný
var kayýtlar = [
    {albümAdý: "Güç pencereleri", yýlý: 1985},
    {albümAdý: "Baský altýndaki Grace", yýlý: 1984},
    {albümAdý: "Sinyaller", yýlý: 1982},
    {albümAdý: "Hareketli resimler", yýlý: 1981},
    {albümAdý: "Daimi dalgalar", yýlý: 1980},
    {albümAdý: "Yarýküreler", yýlý: 1978 },
    {albümAdý: "Krallara bir veda", yýlý: 1977},
    {albümAdý: "2112", yýlý: 1976},
    {albümAdý: "Çeliðin okþayýþý", yýlý: 1975},
    {albümAdý: "Gece uçuþu", yýlý: 1975},
    {albümAdý: "Coþku", yýlý: 1974}
]; // var sonu...
var ulListe = document.querySelector ("ul");
var azTümü = document.querySelector (".tümü");
var zaTersten = document.querySelector (".tersten");
var birAtlamalý = document.querySelector (".atlamalý");
var tekKaydýSil = document.querySelector (".sil");
var tekKaydýGüncelle = document.querySelector (".güncelle");
var tümKayýtlarýSil = document.querySelector (".tümsil");
var vtSil = document.querySelector (".vtsil");

window.onload = function() {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB; // Farklý tarayýcýlar için standart tanýmlar...
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

    var vtAç = window.indexedDB.open ("albümlerListesi", 1);
  
    vtAç.onsuccess = function() {vt = vtAç.result; kayýtlarýYükle();};
  
    vtAç.onupgradeneeded = function (olay) {
        var vt = olay.target.result;
        vt.onerror = function() {console.log ("Veritabaný yükleme hatasý.")};
        var nesneDeposu = vt.createObjectStore ("rushAlbümListesi", {keyPath: "albümAdý"});  
        //nesneDeposu.createIndex ("yýlý", "yýlý", {unique: false});
    }; // vt..sonu...
    
    function kayýtlarýYükle() {
        var iþlem = vt.transaction (["rushAlbümListesi"], "readwrite");
        var nesneDeposu = iþlem.objectStore ("rushAlbümListesi");
        for (i = 0; i < kayýtlar.length ; i++) {nesneDeposu.put (kayýtlar [i]);};
        iþlem.oncomplete = function() {kayýtlarýGöster();};
    } // func sonu...

    function kayýtlarýGöster() {
        ulListe.innerHTML = "";
        var iþlem = vt.transaction (["rushAlbümListesi"], "readonly");
        var nesneDeposu = iþlem.objectStore ("rushAlbümListesi");
        nesneDeposu.openCursor().onsuccess = function (olay) {
            var izlek = olay.target.result;
            if (izlek) {// Sýrada kayýt varsa...
                var liEleman = document.createElement ("li");
                liEleman.innerHTML = "<strong>" + izlek.value.albümAdý + "</strong>, " + izlek.value.yýlý;
                ulListe.appendChild (liEleman);  
                //console.log (izlek.source, izlek.key, izlek.primaryKey, izlek.value);
                izlek.continue(); // Birsonraki kayda geç...
            }else {console.log ("Tüm kayýtlar gösterildi.");}
        }; // nes..sonu...
    } // func sonu...

    azTümü.onclick = function() {kayýtlarýGöster();}

    zaTersten.onclick = function() {
        ulListe.innerHTML = "";
        var nesneDeposu = vt.transaction(["rushAlbümListesi"], "readonly").objectStore ("rushAlbümListesi");
        nesneDeposu.openCursor (null,"prev").onsuccess = function (olay) {
            var izlek = olay.target.result;
            if (izlek) {
                var liEleman = document.createElement ("li");
                liEleman.innerHTML = "<strong>" + izlek.value.albümAdý + "</strong>, " + izlek.value.yýlý;
                ulListe.appendChild (liEleman);
                //console.log (izlek.direction);
                izlek.continue();
            }else {console.log ("Tüm kayýtlar tersten gösterildi.");}
        }; // nes..sonu...
    }; // zaT..sonu...

    birAtlamalý.onclick = function() {
        ulListe.innerHTML = "";
        var nesneDeposu = vt.transaction (["rushAlbümListesi"], "readonly").objectStore ("rushAlbümListesi");
        nesneDeposu.openCursor().onsuccess = function (olay) {
            var izlek = olay.target.result;
            if (izlek) {
                var liEleman = document.createElement ("li");
                liEleman.innerHTML = "<strong>" + izlek.value.albümAdý + "</strong>, " + izlek.value.yýlý;
                ulListe.appendChild (liEleman);
                izlek.advance (2); // Birsonraki yerine ikisonraki kayda ilerle...
            }else {console.log ("Biratlamalý tüm kayýtlar gösterildi.");}
        }; // nes..sonu...
    }; // bir..sonu...

    tekKaydýSil.onclick = function() {
        ulListe.innerHTML = "";
        var nesneDeposu = vt.transaction (["rushAlbümListesi"], "readwrite").objectStore ("rushAlbümListesi");
        nesneDeposu.openCursor().onsuccess = function (olay) {
            var izlek = olay.target.result;
            if (izlek) {
                if (izlek.value.albümAdý === "Baský altýndaki Grace") {
                    var talep = izlek.delete();
                    talep.onsuccess = function() {console.log ('"Baský altýndaki Grace" kaydý silindi.');};
                }else {
                    var liEleman = document.createElement ("li");
                    liEleman.innerHTML = "<strong>" + izlek.value.albümAdý + "</strong>, " + izlek.value.yýlý;
                    ulListe.appendChild (liEleman);
                } // else sonu...
                izlek.continue();
            }else {console.log ("Silinen kayýt hariç tümü gösterildi.");}
        }; // nes..sonu...
    }; // sil..sonu...

    tekKaydýGüncelle.onclick = function() {
        ulListe.innerHTML = "";
        var nesneDeposu = vt.transaction (["rushAlbümListesi"], "readwrite").objectStore ("rushAlbümListesi");
        nesneDeposu.openCursor().onsuccess = function (olay) {
            var izlek = olay.target.result;
            if (izlek) {
                if (izlek.value.albümAdý === "Krallara bir veda") {
                    var güncellenenKayýt = izlek.value;
                    güncellenenKayýt.yýlý = 2050;
                    var talep = izlek.update (güncellenenKayýt);
                    talep.onsuccess = function() {console.log ("Daha parlak bir albüm yýlý!..");};
                }; // if sonu...
                var liEleman = document.createElement ("li");
                liEleman.innerHTML = "<strong>" + izlek.value.albümAdý + "</strong>, " + izlek.value.yýlý;
                ulListe.appendChild (liEleman);
                izlek.continue();
            }else {console.log ("Günceli dahil tüm kayýtlar gösterildi.");}
        }; // nes..sonu...
    }; // güncel sonu...

    
    tümKayýtlarýSil.onclick = function() {
        var talep = vt.transaction (["rushAlbümListesi"], "readwrite").objectStore ("rushAlbümListesi").clear();
        //console.log (talep);
        talep.onerror = function() {console.error ("HATA: " + talep.error);};
        talep.onsuccess = function() {kayýtlarýGöster(); console.log ("Tüm kayýtlar silindi.");};
    } // func sonu...

    vtSil.onclick = function() {
        vt.close();
        var talep = indexedDB.deleteDatabase ("albümlerListesi");
        //console.log (talep);
        talep.onerror = function() {console.error ("HATA: " + talep.error);};
        talep.onsuccess = function() {ulListe.innerHTML = ""; console.log ("Veritabaný silinmiþtir");};
    } // func sonu...
}; // window.onload sonu...
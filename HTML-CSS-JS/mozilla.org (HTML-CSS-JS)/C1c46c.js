// C1c46c.js: Farklı adlarla veritabanı yaratma silme kodlaması alt-örneği.
const başlıkGirişi = document.querySelector ("#başlık");
const açıklamaGirişi = document.querySelector ("#açıklama");
const forum = document.querySelector ("form");
const ulListe = document.querySelector ("ul");

let vt;
window.onload = function() {
    let vtAdı = prompt ("Veritabanı adını girin:", "notlar_vt");
    let ndAdı = prompt ("Nesnedeposu adını girin:", "notlar_nd");
    let talep = window.indexedDB.open (vtAdı, 1);
    talep.onerror = ()=>{console.log ("HATA: Veritabanı açılma hatası oluştu!..\n" + talep.error);};
    talep.onsuccess = ()=>{
        console.log ("Veritabanı sorunsuzca açıldı.");
        vt = talep.result;
    }; // tal..sonu...
    talep.onupgradeneeded = (olay)=>{
        let vt = olay.target.result;
        // Otomatik kimlik no'nun yeniden 1'den başlaması için vt ve nd silinmeli, ve yeniden yaratılmalıdır.
        let nesneDeposu = vt.createObjectStore (ndAdı, {keyPath: "kimlik", autoIncrement:true});
        nesneDeposu.createIndex ("endeks1", "başlık", {unique: false});
        nesneDeposu.createIndex ("endeks2", "açıklama", {unique: false});
        nesneDeposu.createIndex ("endeks3", "tarih", {unique: true});
        console.log ("Veritabanı ve nesnedeposu sorunsuzca kuruldu.");
    }; // tal..sonu...

    forum.onsubmit = (o)=>{
        o.preventDefault();
        let yeniKayıt = {başlık: başlıkGirişi.value, açıklama: açıklamaGirişi.value, tarih: new Date()};
        var talep = vt.transaction ([ndAdı], "readwrite").objectStore (ndAdı).add (yeniKayıt); // get, getAll, put, add
        talep.onsuccess = ()=>{başlıkGirişi.value = ""; açıklamaGirişi.value = "";};
        talep.onerror = ()=>{console.log ("HATA: Kayıt girişi yapılamadı!.."); };
    } // for..sonu...

    function temizle() {while (ulListe.firstChild) {ulListe.removeChild (ulListe.firstChild);}}
    gizle.onclick = ()=>{temizle();}

    göster.onclick = ()=>{
        temizle();
        vt.transaction ([ndAdı], "readonly").objectStore (ndAdı).openCursor().onsuccess = (o)=>{
            let izlek = o.target.result;
            if (izlek) {// Bir sonra okunacak kayıt varsa...
                const liElemanı = document.createElement ("li");
                const h3 = document.createElement ("h3");
                const p1 = document.createElement ("p");
                const p2 = document.createElement ("p");
                const p3 = document.createElement ("p");
                h3.textContent = izlek.key;
                p1.textContent = izlek.value.başlık;
                p2.textContent = izlek.value.açıklama;
                p3.textContent = izlek.value.tarih.toString();
                console.log (izlek.key, izlek.value.başlık, izlek.value.açıklama, izlek.value.tarih.toString() );
                liElemanı.appendChild (h3);
                liElemanı.appendChild (p1);
                liElemanı.appendChild (p2);
                liElemanı.appendChild (p3);
                ulListe.appendChild (liElemanı);
                liElemanı.setAttribute ("sil-no", izlek.key); // Silerken yegane kimlikNo, id="sil-no" vasfıyla kullanılacak...
                const silDüğmesi = document.createElement ("button");
                liElemanı.appendChild (silDüğmesi);
                silDüğmesi.textContent = "Sil";
                silDüğmesi.onclick = kaydıSil;
                izlek.continue(); // Birsonraki kayda geç...
            }else {
                const liElemanı = document.createElement ("li");
                if (! ulListe.firstChild) {// Listelenmiş kayıt yoksa...
                    liElemanı.textContent = "Nesne deposunda hiç kayıt yok."; console.log ("Nesne deposunda hiç kayıt yok.");
                    ulListe.appendChild (liElemanı);
                }else {console.log ("Nesne deposu dökümü tamamlandı.");}
            } // else-dış sonu...
        }; // nes..sonu...
    } // gös..sonu...

    function kaydıSil (o) {
        let silNo = Number (o.target.parentNode.getAttribute ("sil-no") );
        let işlem = vt.transaction ([ndAdı], "readwrite");
        let nesneDeposu = işlem.objectStore (ndAdı);
        let talep = nesneDeposu.delete (silNo);
        // işlem.oncomplete, talep.onsuccess olmalı...
        işlem.oncomplete = ()=>{
            o.target.parentNode.parentNode.removeChild (o.target.parentNode);
            console.log (silNo + " numaralı kayıt silindi.");
            if (! ulListe.firstChild) {// Silinecek kayıt kalmamışsa...
                const liElemanı = document.createElement ("li");
                ulListe.appendChild (liElemanı);
                liElemanı.textContent = "Silinecek başka kayıt kalmadı."; console.log ("Silinecek başka kayıt kalmadı.");
            } // if sonu...
        }; // tal..sonu...
    } // func sonu...

    // Tarayıcıları rahatlatmak için arasıra veritabanı ve nesnedeposu silinmelidir...
    ndSil.onclick = ()=>{// Nesne deposunu sil...
        let cevap = prompt ("Nesne deponuz, içerdiği tüm kayıtlarla silinecek.\nEmin misin [e/h]: ", "h");
        if (cevap.toLowerCase() != "e") return false;
        var talep = vt.transaction ([ndAdı], "readwrite").objectStore (ndAdı).clear();
        talep.onsuccess = ()=>{console.log ("Veritabanındaki nesnedeposu temizlendi."); };
        talep.onerror = ()=>{console.error ("Nesne deposunu temizleme hatası: " + talep.error); };
    } // func sonu...

    vtSil.onclick = ()=>{// Veritabanını sil...
        let cevap = prompt ("Tüm veri tabanınız, içerdiği depolar ve kayıtlarla silinecek.\nEmin misin [e/h]: ", "h");
        vt.close(); // Veritabanı silinmeden önce kapatılmalıdır, yoksa silinmez, bloklama hatası verir...
        if (cevap.toLowerCase() != "e") return false;
        let talep = window.indexedDB.deleteDatabase (vtAdı);
        talep.onsuccess = ()=>{console.log ("Veritabanı silinmiştir."); };
        talep.onerror = ()=>{console.error ("Veritabanı silme hatası: " + talep.error); };
        talep.onblocked = ()=>{console.log ("Bloklanan işlem nedeniyle veritabanı silinemedi.");};
    } // func sonu...
}; // win..sonu...
// C1c46e.js: Mp4 ve webm videoları fetch'le getirme kodlaması alt-örneği.
const esas = document.querySelector ("main");
const videolar = [
    { "ad" : "kristal" },
    { "ad" : "elf" },
    { "ad" : "kurbağa" },
    { "ad" : "canavar" },
    { "ad" : "domuz" },
    { "ad" : "tavşan" },
    {"ad": "ejder"}
];
let vtAdı = prompt ("Veritabanı adını girin", "video_vt");
let ndAdı = prompt ("Nesnedeposu adını girin", "video_nd");
let vt;

window.onload = function() {
    let talep = window.indexedDB.open (vtAdı, 1);
    talep.onerror = function() {console.log ("Veritabanı açılamadı. HATA: " + talep.error);  };
    talep.onsuccess = function() {
        vt = talep.result;
        console.log ("Veritabanı sorunsuzca açıldı: " + vt);
    }; // tal..sonu...
    talep.onupgradeneeded = function (o) {
        let vt = o.target.result;
        let nesneDeposu = vt.createObjectStore (ndAdı, {keyPath: "ad"});
        nesneDeposu.createIndex ("endeks1", "webm", {unique: false});
        nesneDeposu.createIndex ("endeks2", "mp4", {unique: false});
        console.log ("Veritabanı kurulumu tamamlandı: " + vt);
    }; // tal..sonu...

    başlat.onclick=()=> {
        for (let i = 0; i < videolar.length; i++) {
            let nesneDeposu = vt.transaction (ndAdı).objectStore (ndAdı);
            let talep = nesneDeposu.get (videolar [i].ad);
            talep.onsuccess = function() {
                console.log (talep.result, videolar [i]);
                if (! talep.result) {videoyuGetir (videolar [i]); }
            }; // tal..sonu...
            talep.onerror=()=>{console.log ("HATA:" + talep.error);}
        }; // for sonu...
    } // func sonu...

    function videoyuGetir (video) {
        let mp4Damla = fetch ("resim/video/" + video.ad + ".mp4").then (yanıt =>yanıt.blob() );
        let webmDamla = fetch ("resim/video/" + video.ad + ".webm").then (yanıt =>yanıt.blob() );
        Promise.all ([mp4Damla, webmDamla]).then (function (değerler) {videoyuYükle (değerler [0], değerler [1], video.ad); });
    } // func sonu...

    function videoyuYükle (mp4Damla, webmDamla, isim) {
        let nesneDeposu = vt.transaction ([ndAdı], "readwrite").objectStore (ndAdı);
        let kayıt = {mp4: mp4Damla, webm: webmDamla, ad : isim};
        let talep = nesneDeposu.add (kayıt);
        talep.onerror = ()=>{console.log ("Nesne deposuna kayıt ekleme hatası: " + talep.error); }
        talep.onsuccess = ()=>{console.log ("Nesne deposuna kayıt eklendi: " + kayıt); }
    } // func sonu...

    function temizle() {while (esas.firstChild) {esas.removeChild (esas.firstChild);}}
    gizle.onclick = ()=>{temizle();}

    göster.onclick = ()=>{
        temizle();
        let nesneDeposu = vt.transaction ([ndAdı], "readonly").objectStore (ndAdı);
        nesneDeposu.openCursor().onsuccess = (o)=>{
            let izlek = o.target.result;
            if (izlek) {// Bir sonra okunacak kayıt varsa...
                let mp4URL = URL.createObjectURL (izlek.value.mp4);
                let webmURL = URL.createObjectURL (izlek.value.webm);
                const makale = document.createElement ("article");
                const bölüm = document.createElement ("div");
                const h2 = document.createElement ("h2");
                h2.textContent = izlek.value.ad;
                const video1 = document.createElement ("video");
                video1.controls = true;
                const kaynak1 = document.createElement ("source");
                kaynak1.src = mp4URL;
                kaynak1.type = "video/mp4";
                const video2 = document.createElement ("video");
                video2.controls = true;
                const kaynak2 = document.createElement ("source");
                kaynak2.src = webmURL;
                kaynak2.type = "video/webm";
                esas.appendChild (makale);
                makale.appendChild (h2);
                bölüm.appendChild (video1);
                bölüm.appendChild (video2);
                makale.appendChild (bölüm);
                video1.appendChild (kaynak1);
                //makale.appendChild (video2);
                video2.appendChild (kaynak2);
                izlek.continue(); // Birsonraki kayda geç...
            }else {console.log ("Nesne deposu dökümü tamamlandı."); }
        }; // nes..sonu...
    } // gös..sonu...

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

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register ("C1c46ex.js")
            .then (function() {console.log (' "serviceWorker" Kaydedildi'); } );
  } // if sonu...
}; // win..sonu...
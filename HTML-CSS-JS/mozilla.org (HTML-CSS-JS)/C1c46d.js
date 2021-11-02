// C1c46d.js: Veritabanına videoları fetch'le getirme kodlaması alt-örneği.
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
        vt.createObjectStore (ndAdı, {keyPath: "ad"}).createIndex ("endeks", "webm", {unique: false});
        console.log ("Veritabanı kurulumu tamamlandı: " + vt);
    }; // tal..sonu...

    başlat.onclick=()=> {
        for (let i = 0; i < videolar.length; i++) {
            let talep = vt.transaction (ndAdı).objectStore (ndAdı).get (videolar [i].ad);
            talep.onsuccess = function() {console.log (talep.result, videolar [i]);
                if (! talep.result) {videoyuGetir (videolar [i]);}
            }; // tal..sonu...
            talep.onerror=()=>{console.log ("HATA:" + talep.error);}
        }; // for sonu...
    } // func sonu...

    function videoyuGetir (video) {
        fetch ("resim/video/" + video.ad + ".webm")
            .then (yanıt =>yanıt.blob() )
            .then (damla =>videoyuYükle (damla, video.ad) );
    } // func sonu...

    function videoyuYükle (webmDamla, isim) {
        let kayıt = {webm: webmDamla, ad : isim};
        let talep = vt.transaction ([ndAdı], "readwrite").objectStore (ndAdı).add (kayıt);
        talep.onerror = ()=>{console.log ("Nesne deposuna kayıt ekleme hatası: " + talep.error); }
        talep.onsuccess = ()=>{console.log ("Nesne deposuna kayıt eklendi: " + isim); }
    } // func sonu...
    function temizle() {while (esas.firstChild) {esas.removeChild (esas.firstChild);}}
    gizle.onclick = ()=>{temizle();}

    göster.onclick = ()=>{
        temizle();
        vt.transaction ([ndAdı], "readonly").objectStore (ndAdı).openCursor().onsuccess = (o)=>{
            let izlek = o.target.result;
            if (izlek) {// Bir sonra okunacak kayıt varsa...
                let webmURL = URL.createObjectURL (izlek.value.webm);
                const makale = document.createElement ("article");
                const h2 = document.createElement ("h2");
                h2.textContent = izlek.value.ad;
                const video = document.createElement ("video");
                video.controls = true;
                const kaynak = document.createElement ("source");
                kaynak.src = webmURL;
                kaynak.type = "video/webm";
                esas.appendChild (makale);
                makale.appendChild (h2);
                makale.appendChild (video);
                video.appendChild (kaynak);
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
}; // win..sonu...
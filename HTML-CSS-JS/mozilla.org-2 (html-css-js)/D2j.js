// D2j.js: Müzikdosyasý indirme js kodlamalarý altprogramý örneði.

window.addEventListener ("load", baþlat, false);

function baþlat() {
    let müzikElemaný = document.getElementById ("müzik");
  
    document.getElementById ("namevcut-dosya").addEventListener ("click", function() {müzikElemaný.src = "resim/medya/namevcutMüzik.mp3";}, false);
    document.getElementById ("mevcut-dosya").addEventListener ("click", function() {müzikElemaný.src = "resim/medya/müzik2.mp3"; hataMesajýnýYansýt ("")});

    müzikElemaný.onerror = function() {
        let sonuç = "";
        let hata = müzikElemaný.error;
    
        switch (hata.code) {
            case MediaError.MEDIA_ERR_ABORTED:
                sonuç +="Müzik dosyasý indirimi yarýda kesildi.";
                break;
            case MediaError.MEDIA_ERR_NETWORK:
                sonuç +="Müzik dosyasý indirilirken að-hatasý oluþtu.";
                break;
            case MediaError.MEDIA_ERR_DECODE:
                sonuç+= "Müzik dosyasý çözümlenirken hata olutu.";
                break;
            case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                sonuç+= "Müzik dosyasý bulunamadý yada tarayýcý desteklemiyor.";
                break;
            default: sonuç += "Bilinmeyen bir hata oluþtu.";
        } // sw..sonu...
    
        let mesaj = hata.message;
        if (mesaj && mesaj.length) {sonuç += "<br/>" + mesaj;}
    
        hataMesajýnýYansýt ("<strong>Hata " + hata.code + ":</strong> " + sonuç + "<br>");
    }; // müz..sonu...
} // func sonu...

function hataMesajýnýYansýt (mesaj) {document.getElementById ("hata-mesajý").innerHTML = mesaj;}
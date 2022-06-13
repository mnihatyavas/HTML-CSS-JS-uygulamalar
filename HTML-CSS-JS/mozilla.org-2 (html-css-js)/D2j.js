// D2j.js: M�zikdosyas� indirme js kodlamalar� altprogram� �rne�i.

window.addEventListener ("load", ba�lat, false);

function ba�lat() {
    let m�zikEleman� = document.getElementById ("m�zik");
  
    document.getElementById ("namevcut-dosya").addEventListener ("click", function() {m�zikEleman�.src = "resim/medya/namevcutM�zik.mp3";}, false);
    document.getElementById ("mevcut-dosya").addEventListener ("click", function() {m�zikEleman�.src = "resim/medya/m�zik2.mp3"; hataMesaj�n�Yans�t ("")});

    m�zikEleman�.onerror = function() {
        let sonu� = "";
        let hata = m�zikEleman�.error;
    
        switch (hata.code) {
            case MediaError.MEDIA_ERR_ABORTED:
                sonu� +="M�zik dosyas� indirimi yar�da kesildi.";
                break;
            case MediaError.MEDIA_ERR_NETWORK:
                sonu� +="M�zik dosyas� indirilirken a�-hatas� olu�tu.";
                break;
            case MediaError.MEDIA_ERR_DECODE:
                sonu�+= "M�zik dosyas� ��z�mlenirken hata olutu.";
                break;
            case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                sonu�+= "M�zik dosyas� bulunamad� yada taray�c� desteklemiyor.";
                break;
            default: sonu� += "Bilinmeyen bir hata olu�tu.";
        } // sw..sonu...
    
        let mesaj = hata.message;
        if (mesaj && mesaj.length) {sonu� += "<br/>" + mesaj;}
    
        hataMesaj�n�Yans�t ("<strong>Hata " + hata.code + ":</strong> " + sonu� + "<br>");
    }; // m�z..sonu...
} // func sonu...

function hataMesaj�n�Yans�t (mesaj) {document.getElementById ("hata-mesaj�").innerHTML = mesaj;}
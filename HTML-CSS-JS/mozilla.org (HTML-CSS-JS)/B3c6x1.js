// B3c6x1.js: Modüllerle tuval'de buton tıklamalı dinamik kare, üçgen ve daire çizimi-1 örneği.

let tuvalDüğmesi = document.querySelector (".tuval");
let kareDüğmesi = document.querySelector (".kare");
let üçgenDüğmesi = document.querySelector (".üçgen");
let daireDüğmesi = document.querySelector (".daire");

let tuvalim, tuvalYaratıldı=false, raporYaratıldı=false, kareÇizildi=false, üçgenÇizildi=false, daireÇizildi=false;

// Buton tıklamalı dinamik tuvali yarat...
tuvalDüğmesi.addEventListener ("click", () => { if (tuvalYaratıldı) {console.log ("Tuval önceden yaratıldı."); return;} else tuvalYaratıldı=true;
    import ("./B3c6x2.js").then ((Module) => {
        tuvalim = new Module.Tuval ("tuval", document.body, 480, 320);
        tuvalim.tuvaliYarat(); console.log(tuvalim);
        tuvalim.raporlamayıYarat();
    }) // imp..sonu...
}); // kar..sonu...

// Buton tıklamalı dinamik kareyi çiz ve alanla çevre raporlarını yayınla...
kareDüğmesi.addEventListener ("click", () => { if (kareÇizildi) {console.log ("Kare önceden çizildi."); return;}
    import ("./B3c6x3.js").then ((Module) => {
        let karem = new Module.Kare (tuvalim.içerik, tuvalim.ulAdı, 100, 20, 100, "DodgerBlue", "Mavi");
        karem.şekliÇiz();
        karem.alanıÇevreyiRaporla(); kareÇizildi=true;
    }) // imp..sonu...
}); // kar..sonu...

// Buton tıklamalı dinamik üçgeni çiz ve alanla çevre raporlarını yayınla...
üçgenDüğmesi.addEventListener ("click", () => { if (üçgenÇizildi) {console.log ("Üçgen önceden çizildi."); return;}
    import ("./B3c6x4.js").then ((Module) => {
        let üçgenim = new Module.Üçgen (tuvalim.içerik, tuvalim.ulAdı, 125, 130, 200, "yellow", "Sarı");
        üçgenim.şekliÇiz();
        üçgenim.alanıÇevreyiRaporla(); üçgenÇizildi=true;
    }) // imp..sonu...
}); // üçg..sonu...

// Buton tıklamalı dinamik daireyi çiz ve alanla çevre raporlarını yayınla...
daireDüğmesi.addEventListener ("click", () => { if (daireÇizildi) {console.log ("Daire önceden çizildi."); return;}
    import ("./B3c6x5.js").then ((Module) => {
        let dairem = new Module.Daire (tuvalim.içerik, tuvalim.ulAdı, 100, 360, 150, "tomato", "Kırmızı");
        dairem.şekliÇiz();
        dairem.alanıÇevreyiRaporla(); daireÇizildi=true;
    }) // imp..sonu...
}); // dai..sonu...

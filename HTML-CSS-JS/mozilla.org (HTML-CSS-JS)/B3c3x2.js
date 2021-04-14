// B3c3x2.js: JS modüllerle tuval'de sınıflı sabit kare, üçgen ve daire çizimi-2 alt-örneği.

class Tuval {
    constructor (tuvalAdı, ebeveyn, en, boy) {
        this.tuvalAdı = tuvalAdı;
        this.listeAdı = null;
        this.ebeveyn = ebeveyn;
        this.en = en;
        this.boy = boy;
        this.içerik = null;
    } // kurucu sonu...

    tuvaliYarat() {
        if (this.içerik !== null) {console.log ("Tuval önceden yaratılmış!"); return;
        }else {
            let divElemanı = document.createElement ("div");
            let tuvalElemanı = document.createElement ("canvas");
            this.ebeveyn.appendChild (divElemanı);
            divElemanı.appendChild (tuvalElemanı);
            divElemanı.id = this.tuvalAdı;
            tuvalElemanı.width = this.en;
            tuvalElemanı.height = this.boy;
            this.içerik = tuvalElemanı.getContext ("2d");
        } // else sonu...
    } // tuv..sonu...

    raporuYarat() {
        if (this.listeAdı !== null) {console.log ("Rapor önceden yaratılmış!"); return;
        }else {
            let ulElemanı = document.createElement ("ul");
            ulElemanı.id = this.tuvalAdı + "-raporcusu";
            let tuvalSarıcı = document.getElementById (this.tuvalAdı);
            tuvalSarıcı.appendChild (ulElemanı);
            this.listeAdı = ulElemanı.id;
        } // else sonu...
    } // rap..sonu...
} // sınıf sonu...

export { Tuval };
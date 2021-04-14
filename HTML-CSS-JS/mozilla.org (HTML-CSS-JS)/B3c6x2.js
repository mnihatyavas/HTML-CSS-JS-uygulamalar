// B3c6x2.js: Modüllerle tuval'de buton tıklamalı dinamik kare, üçgen ve daire çizimi-2 örneği.

class Tuval {
    constructor (tuvalAdım, ebeveynim, enim, boyum) {
        this.tuvalAdı = tuvalAdım;
        this.ulAdı = null;
        this.ebeveyn = ebeveynim;
        this.en = enim;
        this.boy = boyum;
        this.içerik = null;
    } // con..sonu...

    tuvaliYarat() {
        let divElemanı = document.createElement ("div");
        let canvasElemanı = document.createElement ("canvas");
        this.ebeveyn.appendChild (divElemanı);
        divElemanı.appendChild (canvasElemanı);
        divElemanı.id = this.tuvalAdı;
        canvasElemanı.width = this.en;
        canvasElemanı.height = this.boy;
        this.içerik = canvasElemanı.getContext ("2d");
    } // tuv..sonu...

    raporlamayıYarat() {console.log (this.ulAdı);
        let ulElemanı = document.createElement ("ul");
        ulElemanı.id = this.tuvalAdı + "-raporcusu";
        let tuvalSarıcı = document.getElementById (this.tuvalAdı);
        tuvalSarıcı.appendChild (ulElemanı);
        this.ulAdı = ulElemanı.id;
    } // rap..sonu...
} // Tuval sonu...

export { Tuval };
// B3c4x1.js: Modüllerle tuval'de modül nesnesinden sabit kare, üçgen ve daire çizimi-1 alt-örneği.

import * as Tuval from "./B3c4x2.js";

import * as Kare from "./B3c4x3.js";
import * as Üçgen from "./B3c4x4.js";
import * as Daire from "./B3c4x5.js";


// Tuvali ve raporu yarat...
let tuvalim = Tuval.tuvaliYarat ("tuval", document.body, 480, 320); // return ctx, id
let raporum = Tuval.raporuYarat (tuvalim.id); // return ulElemanı.id="tuval-raporcusu"

// Kareyi çiz ve alanıyla çevresini raporla...
let karem = Kare.şekliÇiz (tuvalim.ctx, 100, 20, 100, "Navy"); // return length
Kare.alanıÇevreyiRaporla ("Mavi", "kare", karem.length, raporum);

// Üçgeni çiz ve alanıyla çevresini raporla...
let üçgenim = Üçgen.şekliÇiz (tuvalim.ctx, 125, 130, 200, "Green"); // return length
Üçgen.alanıÇevreyiRaporla ("Yeşil", "üçgen", 125, raporum); // uzunluk doğrudan da girilebilir...

// Daireyi çiz ve alanıyla çevresini raporla...
let dairem = Daire.şekliÇiz (tuvalim.ctx, 100, 360, 150, "Red"); // return radius
Daire.alanıÇevreyiRaporla ("Kırmızı", "daire", dairem.radius, raporum);


// B3c2x1.js: Modüllerle tuval'de kare, üçgen ve daire çizimi-1 alt-örneği.

import {tuvaliYarat, raporListesiniYarat} from "B3c2x1.js";

import {şeklinAdı as kareAdı,
         şekliÇiz as kareyiÇiz,
         alanıRaporla as kareAlanınıRaporla,
         çevreyiRaporla as kareÇevresiniRaporla} from "./B3c2x3.js";

import {şeklinAdı as üçgenAdı,
        şekliÇiz as üçgeniÇiz,
        alanıRaporla as üçgenAlanınıRaporla,
        çevreyiRaporla as üçgenÇevresiniRaporla} from "./B3c2x4.js";

import {şeklinAdı as daireAdı,
         şekliÇiz as daireyiÇiz,
         alanıRaporla as daireAlanınıRaporla,
         çevreyiRaporla as daireÇevresiniRaporla} from "./B3c2x5.js";

// body-div-canvas tuvali ve canvas-ul raporlamayı yarat...
let tuvalim = tuvaliYarat ("tuval", document.body, 480, 320);
let raporListesi = raporListesiniYarat (tuvalim.id); console.log (tuvalim);

// Kareyi çiz ve alan-çevre raporlarını yayınla...
let karem = kareyiÇiz (tuvalim.ctx, 100, 20, 100, "Navy");
kareAlanınıRaporla ("Mavi", karem.length, raporListesi);
kareÇevresiniRaporla ("Mavi", karem.length, raporListesi);

// Üçgeni çiz ve alan-çevre raporlarını yayınla...
let üçgenim = üçgeniÇiz (tuvalim.ctx, 125, 130, 200, "Red");
üçgenAlanınıRaporla ("Kırmızı", üçgenim.length, raporListesi);
üçgenÇevresiniRaporla ("Kırmızı", üçgenim.length, raporListesi);

// Daireyi çiz ve alan-çevre raporlarını yayınla...
let dairem = daireyiÇiz (tuvalim.ctx, 100, 360, 150, "Green");
daireAlanınıRaporla ("Yeşil", dairem.radius, raporListesi);
daireÇevresiniRaporla ("Yeşil", dairem.radius, raporListesi);

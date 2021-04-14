// B3c1x1.js: Tuvali yaratan ve şeklin alanla çevresini raporlayan alt-program örneği.

import {tuvaliYarat, raporListesiniYarat} from "./B3c1x2.js";
import {şeklinAdı, şekliÇiz, şeklinAlanınıÇevresiniRaporla} from "./B3c1x3.js";
import gelişigüzelKare from "./B3c1x3.js";

let tuvalim = tuvaliYarat ("tuval", document.body, 480, 320);
let raporListesi = raporListesiniYarat (tuvalim.id);

let sabitKare = şekliÇiz (tuvalim.ctx, 50, 50, 100, "Navy");
şeklinAlanınıÇevresiniRaporla ("Sabit", "Navy", sabitKare.length, raporListesi);

// Varsayılı default gelişigüzelKare(..)
let tesadüfiKare = gelişigüzelKare (tuvalim.ctx);
şeklinAlanınıÇevresiniRaporla ("Tesadüfi", tesadüfiKare.color, tesadüfiKare.length, raporListesi);

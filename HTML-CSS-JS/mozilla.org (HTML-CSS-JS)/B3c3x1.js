// B3c3x1.js: JS modüllerle tuval'de sınıflı sabit kare, üçgen ve daire çizimi-1 alt-örneği.

import { Tuval } from "./B3c3x2.js";
import { Kare } from "./B3c3x3.js";
import { Üçgen } from "./B3c3x4.js";
import { Daire } from "./B3c3x5.js";

// new Tuval sınıfı tuvali ve raporlama temelini yaratır...
let tuvalim = new Tuval ("tuval", document.body, 480, 320);
tuvalim.tuvaliYarat();
tuvalim.raporuYarat();

// new Kare sınıfı kareyi çizer ve raporları yayınlar...
let karem = new Kare (tuvalim.içerik, tuvalim.listeAdı, 100, 20, 100, "Red");
karem.şekliÇiz();
karem.şeklinAlanınıRaporla();
karem.şeklinÇevresiniRaporla();

// new Üçgen sınıfı üçgeni çizer ve raporları yayınlar...
let üçgenim = new Üçgen (tuvalim.içerik, tuvalim.listeAdı, 125, 130, 200, "Green");
üçgenim.şekliÇiz();
üçgenim.şeklinAlanınıRaporla();
üçgenim.şeklinÇevresiniRaporla();

// new Daire sınıfı daireyi çizer ve raporları yayınlar...
let daire = new Daire (tuvalim.içerik, tuvalim.listeAdı, 100, 360, 150, "Navy");
daire.şekliÇiz();
daire.şeklinAlanınıRaporla();
daire.şeklinÇevresiniRaporla();

// B3c5x1.js: Modüllerle tuval'de sınıflar toplamından sabit kare, üçgen ve daire çizimi-1 alt-örneği.

import { Tuval, Kare, Üçgen, Daire} from "./B3c5x2.js";

// Tuvali ve raporlamayı yarat...
let tuvalim = new Tuval ("tuval", document.body, 480, 320);
tuvalim.tuvaliYarat(); // this.ctx
tuvalim.raporlamayıYarat(); // this.listId

// Kareyi çiz ve alan çevre raporu yayınla...
let karem = new Kare (tuvalim.ctx, tuvalim.listId, 100, 20, 100, "DarkRed", "Kırmızı");
karem.şekliÇiz();
karem.alanıÇevreyiRaporla();

// Üçgeni çiz ve alan çevre raporu yayınla...
let üçgenim = new Üçgen (tuvalim.ctx, tuvalim.listId, 125, 130, 200, "MidnightBlue", "Mavi");
üçgenim.şekliÇiz();
üçgenim.alanıÇevreyiRaporla();

// Daireyi çiz ve alan çevre raporu yayınla...
let dairem = new Daire (tuvalim.ctx, tuvalim.listId, 100, 360, 150, "DarkGreen", "Yeşil");
dairem.şekliÇiz();
dairem.alanıÇevreyiRaporla();

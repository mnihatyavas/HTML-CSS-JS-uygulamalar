const şeklinAdı = "kare";

function şekliÇiz (içerik, uzunluk, x, y, renk) {
    içerik.fillStyle = renk;
    içerik.fillRect (x, y, uzunluk, uzunluk);
    return {length:uzunluk, x:x, y:y, color:renk};
} // çiz sonu...

function şeklinAlanınıÇevresiniRaporla (tip, renk, uzunluk, ulListeAdı) {
    let listeElemanı = document.createElement ("li");
    listeElemanı.textContent = `${tip} ${renk} ${şeklinAdı} alanı ${uzunluk}X${uzunluk}=${uzunluk * uzunluk}px karedir.`
    let liste = document.getElementById (ulListeAdı);
    liste.appendChild (listeElemanı);
    listeElemanı = document.createElement ("li");
    listeElemanı.textContent = `${tip} ${renk} ${şeklinAdı} çevresi 4*${uzunluk}=${uzunluk * 4}px'dir.`
    liste.appendChild (listeElemanı);
} // func sonu...

function gelişigüzelSayıÜret (küçük, büyük) {return Math.floor (Math.random() * (büyük - küçük)) + küçük;}

function gelişigüzelKare (içerik) {
    let renk1 = gelişigüzelSayıÜret (50, 255);
    let renk2 = gelişigüzelSayıÜret (50, 255);
    let renk3 = gelişigüzelSayıÜret (50, 255);
    let renk = `rgb(${renk1},${renk2},${renk3})`
    içerik.fillStyle = renk;
    let x = gelişigüzelSayıÜret (0, 460);
    let y = gelişigüzelSayıÜret (0, 300);
    let uzunluk = gelişigüzelSayıÜret (10, 200);
    içerik.fillRect (x, y, uzunluk, uzunluk);
    return {length:uzunluk, x:x, y:y, color:renk};
} // func sonu...

export {şeklinAdı, şekliÇiz, şeklinAlanınıÇevresiniRaporla};
export default gelişigüzelKare;
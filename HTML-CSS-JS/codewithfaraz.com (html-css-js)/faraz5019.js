const menüAçkapa = document.querySelector ('.menü-açkapa');
const seyrüsefer = document.querySelector ('.seyrüsefer');
const listeBirimleri = document.querySelectorAll ('.liste-birimi');
menüAçkapa.onclick = () => {seyrüsefer.classList.toggle ('aç');}
listeBirimleri.forEach (birim1 => {
    birim1.onclick = () => {
        listeBirimleri.forEach (birim2 => birim2.classList.remove ('aktif'));
        birim1.classList.add ('aktif');
    }
});
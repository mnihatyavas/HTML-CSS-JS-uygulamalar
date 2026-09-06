const kopyalamaDüðmesi = document.querySelector (".kopyalama-düðmesi");
const kopyalanacakMetin = document.querySelector (".kopyalanacak-metin");
kopyalamaDüðmesi.addEventListener ("click", () => {
    kopyalanacakMetin.select();
    kopyalanacakMetin.setSelectionRange (0, 99999);
    document.execCommand ("copy");
    kopyalamaDüðmesi.classList.toggle ("baþarý");
    kopyalamaDüðmesi.innerHTML = "Kopyalandý!";

    setTimeout (function () {
      kopyalamaDüðmesi.classList.toggle ("baþarý");
      kopyalamaDüðmesi.innerHTML = "Kopyala";
    }, 2000);
});
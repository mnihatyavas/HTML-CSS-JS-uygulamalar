const diller = document.getElementById ("buton-dil");
const sorular = document.querySelectorAll (".kab2 ul li");
diller.addEventListener ("click", () => {document.getElementById ("dil-sarkan").classList.toggle ("sun")});
sorular.forEach ((soru) => {soru.addEventListener ("click", (oly) => {soru.classList.toggle ("sun")}) });
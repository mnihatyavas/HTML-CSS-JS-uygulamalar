const akordiyonDüðme = document.querySelectorAll (".akordiyon");
akordiyonDüðme.forEach ((akordiyon) => {
    akordiyon.onclick = function () {this.classList.toggle ("açýk");
        let konsol = this.nextElementSibling;
        console.log (konsol);
        if (konsol.style.maxHeight) {konsol.style.maxHeight = null; //akordiyon açýksa
        }else {konsol.style.maxHeight = konsol.scrollHeight + "px";
            console.log (konsol.style.maxHeight);}
    };
});
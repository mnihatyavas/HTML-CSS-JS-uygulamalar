// Türkçe krk geçersiz
document.addEventListener ("DOMContentLoaded", function() {
    var beden = document.body;
    setInterval (yildizla, 100);
    function yildizla() {
        var sag = Math.random() * screen.width;
        var ust = Math.random() * screen.height;
        var yildiz = document.createElement ("div");
        yildiz.classList.add ("yýldýz");
        beden.appendChild (yildiz);
        setInterval (parla, 10);
        yildiz.style.top = ust + "px";
        function parla() {
            if (sag >= screen.width) {yildiz.remove();}
            sag+=3;
            yildiz.style.right = sag + "px";
        }
    } 
});
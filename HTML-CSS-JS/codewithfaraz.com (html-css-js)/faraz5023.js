window.addEventListener ("DOMContentLoaded", () => {
    const düðme = document.querySelector ("button");
    var tamamlamaSüresi = null, yenilemeSüresi = null;
    if (düðme) {düðme.addEventListener ("click", function() {
        const çalýþýyor = "düðme-çalýþýyor";
        const tamamlandý = "düðme-tamamlandý";
        // Gönderme ve yenileme süresi mS
        const gönderSüresi = 2000;
        const yenileSüresi = 3500;
        // Gönder
        this.disabled = true;
        this.classList.add (çalýþýyor);
        clearTimeout (tamamlamaSüresi);
        clearTimeout (yenilemeSüresi);
        tamamlamaSüresi = setTimeout (() => {
            this.classList.remove (çalýþýyor);
            this.classList.add (tamamlandý);
            // Yeniden baþlat
            yenilemeSüresi = setTimeout (() => {
                this.disabled = false;
                this.classList.remove (tamamlandý);
            }, yenileSüresi);
        }, 600 + gönderSüresi);
    }); } //if
});
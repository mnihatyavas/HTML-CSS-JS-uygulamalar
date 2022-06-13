(()=> {
    const pemKodluAnahtar = `-----GENEL ANAHTAR BAŞI-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy3Xo3U13dc+xojwQYWoJLCbOQ5fOVY8LlnqcJm1W1BFtxIhOAJWohiHuIRMctv7dzx47TLlmARSKvTRjd0dF92jx/xY20Lz+DXp8YL5yUWAFgA3XkO3LSJgEOex10NB8jfkmgSb7QIudTVvbbUDfd5fwIBmCtaCwWx7NyeWWDb7A9cFxj7EjRdrDaK3ux/ToMLHFXVLqSL341TkCf4ZQoz96RFPUGPPLOfvN0x66CM1PQCkdhzjE6U5XGE964ZkkYUPPsy6Dcie4obhW4vDjgUmLzv0z7UD010RLIneUgDE2FqBfY/C+uWigNPBPkkQ+Bv/UigS6dHqTCVeD5wgyBQIDAQAB
-----GENEL ANAHTAR SONU-----`;
    let şifrelemeAnahtarı;
    const şifrelemeDüğmesi = document.querySelector (".spki .şifreleme-düğmesi");

    function ikilidenAsciiye (dizge) {
        const uzunluk = dizge.length;
        const tampon = new ArrayBuffer (uzunluk);
        const tamponuGör = new Uint8Array (tampon);
        for (let i = 0; i < uzunluk; i++) {tamponuGör [i] = dizge.charCodeAt (i);}
        return tampon;
    } // func sonu...

    function genelAnahtarıDahilet (pem) {
        const pemBaşlığı = "-----GENEL ANAHTAR BAŞI-----";
        const pemAyaklığı = "-----GENEL ANAHTAR SONU-----";
        const pemİçeriği = pem.substring (pemBaşlığı.length, pem.length - pemAyaklığı.length);
        const ikiliPemDizgesi = window.atob (pemİçeriği);
        const asciiPemDizgesi = ikilidenAsciiye (ikiliPemDizgesi);
        return window.crypto.subtle.importKey (
            "spki",
            asciiPemDizgesi,
            {name: "RSA-OAEP", hash: "SHA-256"},
            true,
            ["encrypt"]
        ); // ret..sonu...
    } // func sonu...

    function kodlananMesajıAl() {
        const mesajKutusu = document.querySelector ("#spki-mesajı");
        const mesaj = mesajKutusu.value;
        const kodlayıcı = new TextEncoder();
        return kodlayıcı.encode (mesaj);
    } // func sonu...

    async function mesajıŞifrele() {
        const kodlananMesaj = kodlananMesajıAl();
        const şifrelimetin = await window.crypto.subtle.encrypt (
            {name: "RSA-OAEP"},
            şifrelemeAnahtarı,
            kodlananMesaj
        ); // con..sonu...
        const tampon = new Uint8Array (şifrelimetin, 0, 5);
        const şifrelimetinDeğeri = document.querySelector (".spki .şifrelimetin-değeri");
        şifrelimetinDeğeri.classList.add ("tebarruz");
        şifrelimetinDeğeri.addEventListener ("animationend", ()=> {şifrelimetinDeğeri.classList.remove ("tebarruz");});
        şifrelimetinDeğeri.textContent = `Toplam ${tampon}...[${şifrelimetin.byteLength} byte]`;
    } // asy..sonu...

    function şifrelemeAnahtarınıEtkinleştir() {
        şifrelemeDüğmesi.classList.add ("tebarruz");
        şifrelemeDüğmesi.addEventListener ("animationend", ()=> {şifrelemeDüğmesi.classList.remove ("tebarruz");});
        şifrelemeDüğmesi.removeAttribute ("disabled");
        şifrelemeDüğmesi.classList.remove ("gizli");
    } // func sonu...
 
    const ithalAnahtarDüğmesi = document.querySelector (".spki .ithal-anahtar-düğmesi");
    ithalAnahtarDüğmesi.addEventListener ("click", async ()=> {
        şifrelemeAnahtarı = await genelAnahtarıDahilet (pemKodluAnahtar);
        şifrelemeAnahtarınıEtkinleştir();
    }); // ith..sonu...
    şifrelemeDüğmesi.addEventListener ("click", mesajıŞifrele);
})();
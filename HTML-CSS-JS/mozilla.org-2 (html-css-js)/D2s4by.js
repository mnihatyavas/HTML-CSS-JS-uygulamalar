(()=> {
    const pemKodluAnahtar = `-----GENEL ANAHTAR BA�I-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy3Xo3U13dc+xojwQYWoJLCbOQ5fOVY8LlnqcJm1W1BFtxIhOAJWohiHuIRMctv7dzx47TLlmARSKvTRjd0dF92jx/xY20Lz+DXp8YL5yUWAFgA3XkO3LSJgEOex10NB8jfkmgSb7QIudTVvbbUDfd5fwIBmCtaCwWx7NyeWWDb7A9cFxj7EjRdrDaK3ux/ToMLHFXVLqSL341TkCf4ZQoz96RFPUGPPLOfvN0x66CM1PQCkdhzjE6U5XGE964ZkkYUPPsy6Dcie4obhW4vDjgUmLzv0z7UD010RLIneUgDE2FqBfY/C+uWigNPBPkkQ+Bv/UigS6dHqTCVeD5wgyBQIDAQAB
-----GENEL ANAHTAR SONU-----`;
    let �ifrelemeAnahtar�;
    const �ifrelemeD��mesi = document.querySelector (".spki .�ifreleme-d��mesi");

    function ikilidenAsciiye (dizge) {
        const uzunluk = dizge.length;
        const tampon = new ArrayBuffer (uzunluk);
        const tamponuG�r = new Uint8Array (tampon);
        for (let i = 0; i < uzunluk; i++) {tamponuG�r [i] = dizge.charCodeAt (i);}
        return tampon;
    } // func sonu...

    function genelAnahtar�Dahilet (pem) {
        const pemBa�l��� = "-----GENEL ANAHTAR BA�I-----";
        const pemAyakl��� = "-----GENEL ANAHTAR SONU-----";
        const pem��eri�i = pem.substring (pemBa�l���.length, pem.length - pemAyakl���.length);
        const ikiliPemDizgesi = window.atob (pem��eri�i);
        const asciiPemDizgesi = ikilidenAsciiye (ikiliPemDizgesi);
        return window.crypto.subtle.importKey (
            "spki",
            asciiPemDizgesi,
            {name: "RSA-OAEP", hash: "SHA-256"},
            true,
            ["encrypt"]
        ); // ret..sonu...
    } // func sonu...

    function kodlananMesaj�Al() {
        const mesajKutusu = document.querySelector ("#spki-mesaj�");
        const mesaj = mesajKutusu.value;
        const kodlay�c� = new TextEncoder();
        return kodlay�c�.encode (mesaj);
    } // func sonu...

    async function mesaj��ifrele() {
        const kodlananMesaj = kodlananMesaj�Al();
        const �ifrelimetin = await window.crypto.subtle.encrypt (
            {name: "RSA-OAEP"},
            �ifrelemeAnahtar�,
            kodlananMesaj
        ); // con..sonu...
        const tampon = new Uint8Array (�ifrelimetin, 0, 5);
        const �ifrelimetinDe�eri = document.querySelector (".spki .�ifrelimetin-de�eri");
        �ifrelimetinDe�eri.classList.add ("tebarruz");
        �ifrelimetinDe�eri.addEventListener ("animationend", ()=> {�ifrelimetinDe�eri.classList.remove ("tebarruz");});
        �ifrelimetinDe�eri.textContent = `Toplam ${tampon}...[${�ifrelimetin.byteLength} byte]`;
    } // asy..sonu...

    function �ifrelemeAnahtar�n�Etkinle�tir() {
        �ifrelemeD��mesi.classList.add ("tebarruz");
        �ifrelemeD��mesi.addEventListener ("animationend", ()=> {�ifrelemeD��mesi.classList.remove ("tebarruz");});
        �ifrelemeD��mesi.removeAttribute ("disabled");
        �ifrelemeD��mesi.classList.remove ("gizli");
    } // func sonu...
 
    const ithalAnahtarD��mesi = document.querySelector (".spki .ithal-anahtar-d��mesi");
    ithalAnahtarD��mesi.addEventListener ("click", async ()=> {
        �ifrelemeAnahtar� = await genelAnahtar�Dahilet (pemKodluAnahtar);
        �ifrelemeAnahtar�n�Etkinle�tir();
    }); // ith..sonu...
    �ifrelemeD��mesi.addEventListener ("click", mesaj��ifrele);
})();
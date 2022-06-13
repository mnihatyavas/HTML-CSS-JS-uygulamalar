(()=> {
    const pemKodluAnahtar = `-----GENEL ANAHTAR BAÞI-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy3Xo3U13dc+xojwQYWoJLCbOQ5fOVY8LlnqcJm1W1BFtxIhOAJWohiHuIRMctv7dzx47TLlmARSKvTRjd0dF92jx/xY20Lz+DXp8YL5yUWAFgA3XkO3LSJgEOex10NB8jfkmgSb7QIudTVvbbUDfd5fwIBmCtaCwWx7NyeWWDb7A9cFxj7EjRdrDaK3ux/ToMLHFXVLqSL341TkCf4ZQoz96RFPUGPPLOfvN0x66CM1PQCkdhzjE6U5XGE964ZkkYUPPsy6Dcie4obhW4vDjgUmLzv0z7UD010RLIneUgDE2FqBfY/C+uWigNPBPkkQ+Bv/UigS6dHqTCVeD5wgyBQIDAQAB
-----GENEL ANAHTAR SONU-----`;
    let þifrelemeAnahtarý;
    const þifrelemeDüðmesi = document.querySelector (".spki .þifreleme-düðmesi");

    function ikilidenAsciiye (dizge) {
        const uzunluk = dizge.length;
        const tampon = new ArrayBuffer (uzunluk);
        const tamponuGör = new Uint8Array (tampon);
        for (let i = 0; i < uzunluk; i++) {tamponuGör [i] = dizge.charCodeAt (i);}
        return tampon;
    } // func sonu...

    function genelAnahtarýDahilet (pem) {
        const pemBaþlýðý = "-----GENEL ANAHTAR BAÞI-----";
        const pemAyaklýðý = "-----GENEL ANAHTAR SONU-----";
        const pemÝçeriði = pem.substring (pemBaþlýðý.length, pem.length - pemAyaklýðý.length);
        const ikiliPemDizgesi = window.atob (pemÝçeriði);
        const asciiPemDizgesi = ikilidenAsciiye (ikiliPemDizgesi);
        return window.crypto.subtle.importKey (
            "spki",
            asciiPemDizgesi,
            {name: "RSA-OAEP", hash: "SHA-256"},
            true,
            ["encrypt"]
        ); // ret..sonu...
    } // func sonu...

    function kodlananMesajýAl() {
        const mesajKutusu = document.querySelector ("#spki-mesajý");
        const mesaj = mesajKutusu.value;
        const kodlayýcý = new TextEncoder();
        return kodlayýcý.encode (mesaj);
    } // func sonu...

    async function mesajýÞifrele() {
        const kodlananMesaj = kodlananMesajýAl();
        const þifrelimetin = await window.crypto.subtle.encrypt (
            {name: "RSA-OAEP"},
            þifrelemeAnahtarý,
            kodlananMesaj
        ); // con..sonu...
        const tampon = new Uint8Array (þifrelimetin, 0, 5);
        const þifrelimetinDeðeri = document.querySelector (".spki .þifrelimetin-deðeri");
        þifrelimetinDeðeri.classList.add ("tebarruz");
        þifrelimetinDeðeri.addEventListener ("animationend", ()=> {þifrelimetinDeðeri.classList.remove ("tebarruz");});
        þifrelimetinDeðeri.textContent = `Toplam ${tampon}...[${þifrelimetin.byteLength} byte]`;
    } // asy..sonu...

    function þifrelemeAnahtarýnýEtkinleþtir() {
        þifrelemeDüðmesi.classList.add ("tebarruz");
        þifrelemeDüðmesi.addEventListener ("animationend", ()=> {þifrelemeDüðmesi.classList.remove ("tebarruz");});
        þifrelemeDüðmesi.removeAttribute ("disabled");
        þifrelemeDüðmesi.classList.remove ("gizli");
    } // func sonu...
 
    const ithalAnahtarDüðmesi = document.querySelector (".spki .ithal-anahtar-düðmesi");
    ithalAnahtarDüðmesi.addEventListener ("click", async ()=> {
        þifrelemeAnahtarý = await genelAnahtarýDahilet (pemKodluAnahtar);
        þifrelemeAnahtarýnýEtkinleþtir();
    }); // ith..sonu...
    þifrelemeDüðmesi.addEventListener ("click", mesajýÞifrele);
})();
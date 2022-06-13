(()=> {
    const pem�ifreliAnahtar = `-----�ZEL ANAHTAR BA�I-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDD0tPV/du2vftjvXj1t/gXTK39sNBVrOAEb/jKzXae+Xa0H+3LhZaQIQNMfACiBSgIfZUvEGb+7TqXWQpoLoFR/R7MvGWcSk98JyrVtveD8ZmZYyItSY7m2hcasqAFiKyOouV5vzyRe87/lEyzzBpF3bQQ4IDaQu+K9Hj5fKuU6rrOeOhsdnJc+VdDQLScHxvMoLZ9Vtt+oK9J4/tOLwr4CG8khDlBURcBY6gPcLo3dPU09SW+6ctX2cX4mkXx6O/0mmdTmacr/vu50KdRMleFeZYOWPAEhhMfywybTuzBiPVIZVP8WFCSKNMbfi1S9A9PdBqnebwwHhX3/hsEBt2BAgMBAAECggEABEI1P6nf6Zs7mJlyBDv+Pfl5rjL2cOqLy6TovvZVblMkCPpJyFuNIPDK2tK2i897ZaXfhPDBIKmllM2Hq6jZQKB110OAnTPDg0JxzMiIHPs32S1d/KilHjGff4Hjd4NXp1l1Dp8BUPOllorR2TYm2x6dcCGFw9lhTr8O03Qp4hjn84VjGIWADYCk83mgS4nRsnHkdiqYnWx1AjKlY51yEK6RcrDMi0Th2RXrrINoC35sVv+APt2rkoMGi52RwTEseA1KZGFrxjq61ReJif6p2VXEcvHeX6CWLx014LGk43z6Q28P6HgeEVEfIjyqCUea5Du/mYb/QsRSCosXLxBqwQKBgQD1+fdC9ZiMrVI+km7Nx2CKBn8rJrDmUh5SbXn2MYJdrUd8bYNnZkCgKMgxVXsvJrbmVOrby2txOiqudZkk5mD3E5O/QZWPWQLgRu8ueYNpobAX9NRgNfZ7rZD+81vh5MfZiXfuZOuzv29iZhU0oqyZ9y75eHkLdrerNkwYOe5aUQKBgQDLzapDi1NxkBgsj9iiO4KUa7jvD4JjRqFy4Zhj/jbQvlvM0F/uFp7sxVcHGx4r11C+6iCbhX4u+Zuu0HGjT4d+hNXmgGyxR8fIUVxOlOtDkVJa5sOBZK73/9/MBeKusdmJPRhalZQfMUJRWIoEVDMhfg3tW/rBj5RYAtP2dTVUMQKBgDs8yr52dRmT+BWXoFWwaWB0NhYHSFz/c8v4D4Ip5DJ5M5kUqquxJWksySGQa40sbqnD05fBQovPLU48hfgr/zghn9hUjBcsoZOvoZR4sRw0UztBvA+7jzOz1hKAOyWIulR6Vca0yUrNlJ6G5R56+sRNkiOETupi2dLCzcqb0PoxAoGAZyNHvTLvIZN4iGSrjz5qkM4LIwBIThFadxbv1fq6pt0O/BGf2o+cEdq0diYlGK64cEVwBwSBnSg4vzlBqRIAUejLjwEDAJyA4EE8Y5A9l04dzV7nJb5cRak6CrgXxay/mBJRFtaHxVlaZGxYPGSYE6UFS0+3EOmmevvDZQBf4qECgYEA0ZF6Vavz28+8wLO6SP3w8NmpHk7K9tGEvUfQ30SgDx4G7qPIgfPrbB4OP/E0qCfsIImi3sCPpjvUMQdVVZyPOIMuB+rV3ZOxkrzxEUOrpOpR48FZbL7RN90yRQsAsrp9e4iv8QwB3VxLe7X0TDqqnRyqrc/osGzuS2ZcHOKmCU8=
-----�ZEL ANAHTAR SONU-----`;
    let imzalamaAnahtar�;
    const imzaD��mesi = document.querySelector (".pkcs8 .imzalama-d��mesi");

    function ikilidenAsciiye (dizge) {
        const tampon = new ArrayBuffer (dizge.length);
        const tamponG�rsel = new Uint8Array (tampon);
        for (let i = 0, uzunluk = dizge.length; i < uzunluk; i++) {tamponG�rsel [i] = dizge.charCodeAt (i);}
        return tampon;
    } // func sonu...

    function �zelanahtar��thalet (pem) {
        const pemBa�l��� = "-----�ZEL ANAHTAR BA�I-----";
        const pemAyakl��� = "-----�ZEL ANAHTAR SONU-----";
        const pem��eri�i = pem.substring (pemBa�l���.length, pem.length - pemAyakl���.length);
        const ikiliPem = window.atob (pem��eri�i);
        const asciiPem = ikilidenAsciiye (ikiliPem);
        return window.crypto.subtle.importKey (
            "pkcs8",
            asciiPem,
            {name: "RSA-PSS",
             modulusLength: 2048,
             publicExponent: new Uint8Array ([1, 0, 1]),
             hash: "SHA-256"},
            true,
            ["sign"]
        ); // ret..sonu...
    } // func sonu...

    function kodlananMesaj�Al() {
        const mesajKutusu = document.querySelector ("#pkcs8-mesaj�");
        const mesaj = mesajKutusu.value;
        const kodlay�c� = new TextEncoder();
        return kodlay�c�.encode (mesaj);
    } // func sonu...

    async function mesaj��mzala() {
        const kodlananMesaj = kodlananMesaj�Al();
        const dijitalimza = await window.crypto.subtle.sign (
           {name: "RSA-PSS", saltLength: 32,},
           imzalamaAnahtar�,
            kodlananMesaj
        ); // con..sonu...
        const imzaDe�eri = document.querySelector (".pkcs8 .dijitalimza-de�eri");
        imzaDe�eri.classList.add ("tebarruz");
        imzaDe�eri.addEventListener ("animationend", ()=> {imzaDe�eri.classList.remove ("tebarruz");});
        const tampon = new Uint8Array (dijitalimza, 0, 5);
        imzaDe�eri.textContent = `${tampon}...[Toplam ${dijitalimza.byteLength} byte]`;
    } // asy..sonu...

    function imzaD��mesiniEtkinle�tir() {
        imzaD��mesi.classList.add ("tebarruz");
        imzaD��mesi.addEventListener ("animationend", ()=> {imzaD��mesi.classList.remove ("tebarruz");});
        imzaD��mesi.removeAttribute ("disabled");
        imzaD��mesi.classList.remove ("gizli");
    } // func sonu...

    const ithalAnahtarD��mesi = document.querySelector (".pkcs8 .ithal-anahtar-d��mesi");
        ithalAnahtarD��mesi.addEventListener ("click", async ()=> {
            imzalamaAnahtar� = await �zelanahtar��thalet (pem�ifreliAnahtar);
            imzaD��mesiniEtkinle�tir();
    }); // con..sonu...
    imzaD��mesi.addEventListener ("click", mesaj��mzala);
})();
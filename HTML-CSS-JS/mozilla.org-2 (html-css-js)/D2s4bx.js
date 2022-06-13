(()=> {
    const pemÞifreliAnahtar = `-----ÖZEL ANAHTAR BAÞI-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDD0tPV/du2vftjvXj1t/gXTK39sNBVrOAEb/jKzXae+Xa0H+3LhZaQIQNMfACiBSgIfZUvEGb+7TqXWQpoLoFR/R7MvGWcSk98JyrVtveD8ZmZYyItSY7m2hcasqAFiKyOouV5vzyRe87/lEyzzBpF3bQQ4IDaQu+K9Hj5fKuU6rrOeOhsdnJc+VdDQLScHxvMoLZ9Vtt+oK9J4/tOLwr4CG8khDlBURcBY6gPcLo3dPU09SW+6ctX2cX4mkXx6O/0mmdTmacr/vu50KdRMleFeZYOWPAEhhMfywybTuzBiPVIZVP8WFCSKNMbfi1S9A9PdBqnebwwHhX3/hsEBt2BAgMBAAECggEABEI1P6nf6Zs7mJlyBDv+Pfl5rjL2cOqLy6TovvZVblMkCPpJyFuNIPDK2tK2i897ZaXfhPDBIKmllM2Hq6jZQKB110OAnTPDg0JxzMiIHPs32S1d/KilHjGff4Hjd4NXp1l1Dp8BUPOllorR2TYm2x6dcCGFw9lhTr8O03Qp4hjn84VjGIWADYCk83mgS4nRsnHkdiqYnWx1AjKlY51yEK6RcrDMi0Th2RXrrINoC35sVv+APt2rkoMGi52RwTEseA1KZGFrxjq61ReJif6p2VXEcvHeX6CWLx014LGk43z6Q28P6HgeEVEfIjyqCUea5Du/mYb/QsRSCosXLxBqwQKBgQD1+fdC9ZiMrVI+km7Nx2CKBn8rJrDmUh5SbXn2MYJdrUd8bYNnZkCgKMgxVXsvJrbmVOrby2txOiqudZkk5mD3E5O/QZWPWQLgRu8ueYNpobAX9NRgNfZ7rZD+81vh5MfZiXfuZOuzv29iZhU0oqyZ9y75eHkLdrerNkwYOe5aUQKBgQDLzapDi1NxkBgsj9iiO4KUa7jvD4JjRqFy4Zhj/jbQvlvM0F/uFp7sxVcHGx4r11C+6iCbhX4u+Zuu0HGjT4d+hNXmgGyxR8fIUVxOlOtDkVJa5sOBZK73/9/MBeKusdmJPRhalZQfMUJRWIoEVDMhfg3tW/rBj5RYAtP2dTVUMQKBgDs8yr52dRmT+BWXoFWwaWB0NhYHSFz/c8v4D4Ip5DJ5M5kUqquxJWksySGQa40sbqnD05fBQovPLU48hfgr/zghn9hUjBcsoZOvoZR4sRw0UztBvA+7jzOz1hKAOyWIulR6Vca0yUrNlJ6G5R56+sRNkiOETupi2dLCzcqb0PoxAoGAZyNHvTLvIZN4iGSrjz5qkM4LIwBIThFadxbv1fq6pt0O/BGf2o+cEdq0diYlGK64cEVwBwSBnSg4vzlBqRIAUejLjwEDAJyA4EE8Y5A9l04dzV7nJb5cRak6CrgXxay/mBJRFtaHxVlaZGxYPGSYE6UFS0+3EOmmevvDZQBf4qECgYEA0ZF6Vavz28+8wLO6SP3w8NmpHk7K9tGEvUfQ30SgDx4G7qPIgfPrbB4OP/E0qCfsIImi3sCPpjvUMQdVVZyPOIMuB+rV3ZOxkrzxEUOrpOpR48FZbL7RN90yRQsAsrp9e4iv8QwB3VxLe7X0TDqqnRyqrc/osGzuS2ZcHOKmCU8=
-----ÖZEL ANAHTAR SONU-----`;
    let imzalamaAnahtarý;
    const imzaDüðmesi = document.querySelector (".pkcs8 .imzalama-düðmesi");

    function ikilidenAsciiye (dizge) {
        const tampon = new ArrayBuffer (dizge.length);
        const tamponGörsel = new Uint8Array (tampon);
        for (let i = 0, uzunluk = dizge.length; i < uzunluk; i++) {tamponGörsel [i] = dizge.charCodeAt (i);}
        return tampon;
    } // func sonu...

    function özelanahtarýÝthalet (pem) {
        const pemBaþlýðý = "-----ÖZEL ANAHTAR BAÞI-----";
        const pemAyaklýðý = "-----ÖZEL ANAHTAR SONU-----";
        const pemÝçeriði = pem.substring (pemBaþlýðý.length, pem.length - pemAyaklýðý.length);
        const ikiliPem = window.atob (pemÝçeriði);
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

    function kodlananMesajýAl() {
        const mesajKutusu = document.querySelector ("#pkcs8-mesajý");
        const mesaj = mesajKutusu.value;
        const kodlayýcý = new TextEncoder();
        return kodlayýcý.encode (mesaj);
    } // func sonu...

    async function mesajýÝmzala() {
        const kodlananMesaj = kodlananMesajýAl();
        const dijitalimza = await window.crypto.subtle.sign (
           {name: "RSA-PSS", saltLength: 32,},
           imzalamaAnahtarý,
            kodlananMesaj
        ); // con..sonu...
        const imzaDeðeri = document.querySelector (".pkcs8 .dijitalimza-deðeri");
        imzaDeðeri.classList.add ("tebarruz");
        imzaDeðeri.addEventListener ("animationend", ()=> {imzaDeðeri.classList.remove ("tebarruz");});
        const tampon = new Uint8Array (dijitalimza, 0, 5);
        imzaDeðeri.textContent = `${tampon}...[Toplam ${dijitalimza.byteLength} byte]`;
    } // asy..sonu...

    function imzaDüðmesiniEtkinleþtir() {
        imzaDüðmesi.classList.add ("tebarruz");
        imzaDüðmesi.addEventListener ("animationend", ()=> {imzaDüðmesi.classList.remove ("tebarruz");});
        imzaDüðmesi.removeAttribute ("disabled");
        imzaDüðmesi.classList.remove ("gizli");
    } // func sonu...

    const ithalAnahtarDüðmesi = document.querySelector (".pkcs8 .ithal-anahtar-düðmesi");
        ithalAnahtarDüðmesi.addEventListener ("click", async ()=> {
            imzalamaAnahtarý = await özelanahtarýÝthalet (pemÞifreliAnahtar);
            imzaDüðmesiniEtkinleþtir();
    }); // con..sonu...
    imzaDüðmesi.addEventListener ("click", mesajýÝmzala);
})();
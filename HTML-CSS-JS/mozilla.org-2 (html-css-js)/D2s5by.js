(()=> {
    const rasgele16Baytlar� = [180,253,62,216,47,35,90,55,218,233,103,10,172,143,161,177];
    const rasgele12Baytlar� = [212,187,26,247,172,51,37,151,27,177,249,142];
    const sar�l�AnahtarBaytlar� = [6,155,182,208,7,141,44,18,3,151,58,126,68,100,252,
        225,241,11,25,201,153,171,102,174,150,29,62,195,110,138,106,109,14,6,108,
        148,104,221,22,93,102,221,146,25,65,112,4,140,79,194,164,163,156,250,108,
        11,14,220,78,194,161,17,14,57,121,70,13,28,220,210,78,32,46,217,36,165,220,
        170,244,152,214,150,83,2,138,128,11,251,227,213,72,100,158,10,162,40,195,
        60,248,77,37,156,34,10,213,171,67,147,73,231,31,63,80,176,103,206,187,164,
        214,250,49,223,185,5,48,241,17,1,253,59,185,181,209,255,42,223,175,90,159,
        174,169,205,156,120,195,1,135,165,226,46,119,27,97,183,23,197,227,85,138,
        235,79,158,167,59,62,194,34,210,214,240,215,101,233,63,138,53,87,253,189,
        27,66,150,76,242,76,102,174,179,163,184,205,11,161,224,19,110,34,175,192,
        101,117,169,86,66,56,241,128,13,156,165,125,139,110,138,50,108,129,251,137,
        26,186,110,117,113,207,179,59,213,18,175,14,203,192,2,97,131,125,167,227,
        182,87,72,123,54,156,60,195,88,224,96,46,126,245,251,247,147,110,147,173,
        82,106,93,210,55,71,127,133,41,37,181,17,106,16,158,220,136,43,75,133,96,
        240,151,116,40,44,254,2,32,74,226,193,172,48,211,71,109,163,143,30,92,28,
        30,183,25,16,176,207,77,93,139,242,114,91,218,126,123,234,18,9,245,53,46,
        172,215,62,92,249,191,17,27,0,58,151,33,23,169,93,177,253,152,147,198,196,
        226,42,202,166,99,250,127,40,221,196,121,195,198,235,30,159,159,95,182,107,
        175,137,177,49,72,63,131,162,198,186,22,255,230,237,195,56,147,177,101,52,
        227,125,32,180,242,47,92,212,6,148,218,107,125,137,123,15,51,107,159,228,
        238,212,60,54,184,48,110,248,252,208,46,23,149,78,169,201,68,242,193,251,
        156,227,42,90,109,102,172,61,207,124,96,98,79,37,218,16,212,139,162,0,183,
        235,171,75,18,84,160,120,173,156,187,99,24,58,88,213,148,24,193,111,75,169,
        10,158,207,148,84,249,156,248,19,221,2,175,1,8,74,221,212,244,123,34,223,
        175,54,166,101,51,175,141,80,87,9,146,72,223,46,251,199,192,2,22,125,16,15,
        99,26,159,165,133,172,169,26,236,44,86,182,162,81,143,249,15,207,12,232,15,
        205,199,78,133,199,19,232,183,33,183,72,117,72,27,43,254,13,17,252,1,143,
        137,154,10,4,77,85,24,85,143,200,81,76,171,43,124,42,191,150,70,10,90,178,
        198,40,233,233,225,146,231,209,254,2,90,216,5,97,105,204,82,88,81,99,92,
        159,116,192,223,148,252,12,24,197,211,187,212,98,252,201,154,184,65,54,47,
        13,106,151,168,208,112,212,74,204,36,233,98,104,58,103,1,194,13,26,109,101,
        60,42,3,215,20,25,99,176,63,28,112,102,121,190,96,198,228,196,78,38,82,37,
        248,42,150,115,6,10,22,101,42,237,175,69,232,212,231,40,193,70,211,245,106,
        231,175,150,88,105,170,139,238,196,64,218,250,47,165,22,36,196,161,30,79,
        175,14,133,88,129,182,56,140,147,168,134,91,68,172,110,195,134,156,68,78,
        249,215,68,250,11,23,70,59,156,99,75,249,159,84,16,206,93,16,130,34,66,210,
        82,252,53,251,84,59,226,212,154,15,20,163,58,228,109,53,214,151,237,10,169,
        107,180,123,174,159,182,8,240,115,115,220,131,128,79,80,61,133,58,24,98,
        193,225,56,36,159,254,199,49,44,160,28,81,140,163,24,143,114,31,237,235,
        250,83,72,215,44,232,182,45,39,182,193,248,65,174,186,52,219,30,198,48,1,
        134,151,81,114,38,124,7,213,205,138,28,22,216,76,46,224,241,88,156,7,62,
        23,104,34,54,25,156,93,212,133,182,61,93,255,195,68,244,234,53,132,151,140,
        72,146,127,113,227,34,243,218,222,47,218,113,18,173,203,158,133,90,156,214,
        77,20,113,1,231,164,52,55,69,132,24,68,131,212,7,153,34,179,113,156,81,
        127,83,57,29,195,90,64,211,115,202,188,5,42,188,142,203,109,231,53,206,72,
        220,90,23,12,1,178,122,60,221,68,6,14,154,108,203,171,142,159,249,13,55,52,
        110,214,33,147,164,181,50,79,164,200,83,251,40,105,223,50,0,115,240,146,23,
        122,80,204,169,38,198,154,31,29,23,236,39,35,131,147,242,163,138,158,236,
        117,7,108,33,132,98,50,111,46,146,251,82,34,85,5,130,237,67,40,170,235,124,
        92,66,71,239,12,97,136,251,1,206,13,51,232,92,46,35,95,5,123,24,183,99,243,
        124,75,155,89,66,54,72,17,255,99,137,199,232,204,9,248,78,35,218,136,117,
        239,102,240,187,40,89,244,140,109,229,120,116,54,207,171,11,248,190,199,81,
        53,109,8,188,51,93,165,34,255,165,191,198,130,220,41,192,166,194,69,104,
        124,158,122,236,176,24,60,87,240,42,158,143,37,143,208,155,249,230,21,4,
        230,56,194,62,235,132,14,50,180,216,134,28,25,159,64,199,161,236,60,233,
        160,172,68,169,2,5,252,190,20,54,115,248,63,93,107,156,8,96,85,32,189,118,
        66,114,126,64,203,97,235,13,18,102,192,51,59,5,122,171,96,129,40,32,154,4,
        191,234,75,184,112,201,244,110,50,216,44,88,139,175,58,112,7,52,25,64,112,
        40,148,187,39,234,96,151,16,158,114,113,109,164,47,108,94,148,35,232,221,
        33,110,126,170,25,234,45,165,180,210,193,120,247,155,127];
    let sar�ms�zlanan�mzalamaAnahtar�;
    const dijitalimzaD��mesi = document.querySelector (".pkcs8 .imzala-d��mesi");

    function baytdanDiziTamponuna (baytlar) {
        const diziTamponu = new ArrayBuffer (baytlar.length);
        const uint8 = new Uint8Array (diziTamponu);
        uint8.set (baytlar);
        return diziTamponu;
    } // func sonu...

    function anahtarMalzemesiniAl() {
        const �ifrem = window.prompt ('�ifrenizi girin. �ifre "correct horse battery staple" olmal�d�r.');
        const kodlay�c� = new TextEncoder();
        return window.crypto.subtle.importKey (
            "raw",
            kodlay�c�.encode (�ifrem),
            {name: "PBKDF2"},
            false,
            ["deriveBits", "deriveKey"]
        ); // ret..sonu...
    } // func sonu...

    async function sar�ms�zlamaAnahtar�n�Al() {
        const anahtarMalzemesi = await anahtarMalzemesiniAl();
        const rasgele16Tamponu = baytdanDiziTamponuna (rasgele16Baytlar�);
        return window.crypto.subtle.deriveKey (
            {"name": "PBKDF2",
             salt: rasgele16Tamponu,
             "iterations": 100000,
             "hash": "SHA-256"},
            anahtarMalzemesi,
            {"name": "AES-GCM", "length": 256},
            true,
            ["wrapKey", "unwrapKey"]
        ); // ret..sonu...
    } // asy..sonu...

    async function �zelAnahtar�Sar�ms�zla (sar�ml�Anahtar) {
        const sar�ms�zlayanAnahtar = await sar�ms�zlamaAnahtar�n�Al();
        const sar�ml�AnahtarDiziTamponu = baytdanDiziTamponuna (sar�ml�Anahtar);
        const rasgele12Tamponu = baytdanDiziTamponuna (rasgele12Baytlar�);
        return window.crypto.subtle.unwrapKey (
            "pkcs8",
            sar�ml�AnahtarDiziTamponu,
            sar�ms�zlayanAnahtar,
            {name: "AES-GCM", iv: rasgele12Tamponu},
            {name: "RSA-PSS", hash: "SHA-256"},
            true,
            ["sign"]
        ); // ret..sonu...
    } // asy..sonu...

    function mesajKodlay�c�s�n�Al() {
        const mesajKutusu = document.querySelector ("#raw-mesaj�");
        const mesaj = mesajKutusu.value;
        const kodlay�c� = new TextEncoder();
        return kodlay�c�.encode (mesaj);
    } // func sonu...

    async function mesaj�Dijitalmzala() {
        const kodlananMesaj = mesajKodlay�c�s�n�Al();
        const dijital�mza = await window.crypto.subtle.sign (
            {name: "RSA-PSS", saltLength: 32,},
            sar�ms�zlanan�mzalamaAnahtar�,
            kodlananMesaj
        ); // con..sonu...
        const dijitalimzaDe�eri = document.querySelector (".pkcs8 .dijitalimza-de�eri");
        dijitalimzaDe�eri.classList.add ("netle�");
        dijitalimzaDe�eri.addEventListener ("animationend", ()=> {dijitalimzaDe�eri.classList.remove ("netle�");});
        const tampon = new Uint8Array (dijital�mza, 0, 5);
        dijitalimzaDe�eri.textContent = `${tampon}...[Toplam ${dijital�mza.byteLength} byte]`;
    } // asy..sonu...

    function imzaD��mesiniS�f�rla() {
        dijitalimzaD��mesi.setAttribute ("disabled", true);
        dijitalimzaD��mesi.classList.add ("gizli");
    } // func sonu...

    function imzalaD��mesiniEtkinle�tir() {
        dijitalimzaD��mesi.classList.add ("netle�");
        dijitalimzaD��mesi.addEventListener ("animationend", ()=> {dijitalimzaD��mesi.classList.remove ("netle�");});
        dijitalimzaD��mesi.removeAttribute ("disabled");
        dijitalimzaD��mesi.classList.remove ("gizli");
    } // func sonu...

    const sar�ms�zlamaAnahtar�D��mesi = document.querySelector (".pkcs8 .anahtar�-sar�ms�zla-d��mesi");
    sar�ms�zlamaAnahtar�D��mesi.addEventListener ("click", async ()=> {
        try {
            sar�ms�zlanan�mzalamaAnahtar� = await �zelAnahtar�Sar�ms�zla (sar�l�AnahtarBaytlar�);
            imzalaD��mesiniEtkinle�tir();
        }catch (olay) {
            imzaD��mesiniS�f�rla();
            alert("Yanl�� �ifre girdiniz");
        } // try-catch sonu...
    }); // sar..sonu...
    dijitalimzaD��mesi.addEventListener ("click", mesaj�Dijitalmzala);
})();
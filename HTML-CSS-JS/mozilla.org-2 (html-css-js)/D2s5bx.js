(()=> {
    const tuzlamaBaytlar� = [89,113,135,234,168,204,21,36,55,93,1,132,242,242,192,156];
    const sar�l�AnahtarBaytlar� = [171,223,14,36,201,233,233,120,164,68,217,192,226,80,
      224,39,199,235,239,60,212,169,100,23,61,54,244,197,160,80,109,230,207,
      225,57,197,175,71,80,209];
    let sar�l�GizliAnahtar;
    const �ifreleD��mesi = document.querySelector (".raw .�ifrele-d��mesi");

    function baytdanDiziTamponuna�evir (baytlar) {
        const diziTamponBaytlar� = new ArrayBuffer (baytlar.length);
        const uint8Baytlar� = new Uint8Array (diziTamponBaytlar�);
        uint8Baytlar�.set (baytlar);
        return diziTamponBaytlar�;
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

    async function sar�ms�zlayanAnahtar�Al() {
        // 1. Anahtar malzemesi olan kullan�c�-tedarikli �ifre giri�i
        const anahtarMalzemesi = await anahtarMalzemesiniAl();
        // 2 Tuzlama byte'lar�n� diziye �evir
        const tuzlamaTamponu = baytdanDiziTamponuna�evir (tuzlamaBaytlar�);
        // 3 Anahtar malzemesi ve tuzlama baytlar�ndan anahtar� t�ret
        return window.crypto.subtle.deriveKey (
            {"name": "PBKDF2",
             salt: tuzlamaTamponu,
             "iterations": 100000,
             "hash": "SHA-256"},
            anahtarMalzemesi,
            {"name": "AES-KW", "length": 256},
            true,
            ["wrapKey", "unwrapKey"]
        ); // ret..sonu...
    } // asy..sonu...

    async function gizliAnahtar�Sar�ms�zla (sar�l�Anahtar) {
        // 1. Sar�ms�zlayan anahtar� al
        const sar�ms�zlayanAnahtar = await sar�ms�zlayanAnahtar�Al();
        // 2. Sar�l� anahtar� byte'dan diziye �evir
        const sar�l�AnahtarDizisiTamponu = baytdanDiziTamponuna�evir (sar�l�Anahtar);
        // 3. Anahtar� sar�ms�zla
        return window.crypto.subtle.unwrapKey (
            "raw",                      // Format� ithal et
            sar�l�AnahtarDizisiTamponu, // Sar�ms�zlanacak anahtar� temsilen DiziTamponu/ArrayBuffer
            sar�ms�zlayanAnahtar,       // Anahtar �ifreleme anahtar�n� temsilen �ifrelemeAnahtar�
            "AES-KW",                   // �ifreleme anahtar� i�in algoritma kimli�i
            "AES-GCM",                  // Sar�ms�zlama anahtar� i�in algoritma kimli�i
            true,                       // Sar�ms�zlama anahtar�n�n olu�turulabilirli�i
            ["encrypt", "decrypt"]      // Sar�ms�zlama anahtar� i�in anahtar kullan�mlar�
        ); // ret..sonu...
    } // asy..sonu...

    function kodlananMesaj�Al() {
        const mesajKutusu = document.querySelector ("#raw-mesaj�");
        const mesaj = mesajKutusu.value;
        const kodlay�c� = new TextEncoder();
        return kodlay�c�.encode (mesaj);
    } // func sonu...

    async function mesaj��ifrele() {
        const kodluMesaj = kodlananMesaj�Al();
        // De�ifreleme i�in rasgele12 gerekmekte
        const rasgele12 = window.crypto.getRandomValues (new Uint8Array (12));
        const �ifreliMetin = await window.crypto.subtle.encrypt (
            {name: "AES-GCM", iv: rasgele12},
            sar�l�GizliAnahtar,
            kodluMesaj
        ); // con..sonu...
        const tampon = new Uint8Array (�ifreliMetin, 0, 5);
        const �ifrelimetinDe�eri = document.querySelector (".raw .�ifrelimetin-de�eri");
        �ifrelimetinDe�eri.classList.add ("netle�");
        �ifrelimetinDe�eri.addEventListener ("animationend", ()=> {�ifrelimetinDe�eri.classList.remove ("netle�");});
        �ifrelimetinDe�eri.textContent = `${tampon}...[Toplam ${�ifreliMetin.byteLength} byte]`;
    } // asy..sonu...

    function �ifrelemeD��mesinS�f�rla() {
        �ifreleD��mesi.setAttribute ("disabled", true);
        �ifreleD��mesi.classList.add ("gizli");
    } // func sonu...

    function �ifrelemeD��mesiniEtkinle�tir() {
        �ifreleD��mesi.classList.add ("netle�");
        �ifreleD��mesi.addEventListener ("animationend", ()=> {�ifreleD��mesi.classList.remove ("netle�");});
        �ifreleD��mesi.removeAttribute ("disabled");
        �ifreleD��mesi.classList.remove ("gizli");
    } // func sonu...

    const anahtar�Sar�ms�zlaD��mesi = document.querySelector (".raw .anahtar�-sar�ms�zla-d��mesi");
    anahtar�Sar�ms�zlaD��mesi.addEventListener ("click", async ()=> {
        try {
            sar�l�GizliAnahtar = await gizliAnahtar�Sar�ms�zla (sar�l�AnahtarBaytlar�);
            �ifrelemeD��mesiniEtkinle�tir();
        }catch (olay) {
            �ifrelemeD��mesinS�f�rla();
            alert ("Yanl�� �ifre girdiniz");
        } // catch sonu...
    }); // ana..sonu...
    �ifreleD��mesi.addEventListener ("click", mesaj��ifrele);
})();
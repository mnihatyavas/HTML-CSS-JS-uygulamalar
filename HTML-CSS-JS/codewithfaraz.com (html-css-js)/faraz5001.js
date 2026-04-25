setInterval(() => {
    // html'den id'leri "00" al ve js deðiþkenlere ata
    let saat = document.getElementById ("saat");
    let dakika = document.getElementById ("dakika");
    let saniye = document.getElementById ("saniye");
    let sabahöðlen = document.getElementById ("sabahöðlen");
    // svg circle id'leri al
    let SS = document.getElementById ("SS");
    let dd = document.getElementById ("dd");
    let ss = document.getElementById ("ss");
    // dairesel saat-dakika-saniye sýnýflarý
    let saatNokta = document.querySelector (".saat_halka");
    let dakikaNokta = document.querySelector (".dakika_halka");
    let saniyeNokta = document.querySelector (".saniye_halka");
    // Aktüel sistem zamaný SS:dd:ss AM/PM
    let S = new Date().getHours();
    let d = new Date().getMinutes();
    let s = new Date().getSeconds();
    let sö = S >= 12 ? "PM" : "AM";
    // 24'lüðü 12'liðe çevir
    if (S > 12) {S = S - 12;}
    // tek rakamlarýn önünde 0
    S = S < 10 ? "0" + S : S;
    d = d < 10 ? "0" + d : d;
    s = s < 10 ? "0" + s : s;
    // Zaman etiketleri
    saat.innerHTML = S + "<br/><span>Saat</span>";
    dakika.innerHTML = d + "<br/><span>Dakika</span>";
    saniye.innerHTML = s + "<br/><span>Saniye</span>";
    sabahöðlen.innerHTML = sö;
    // Zaman halkasý gittikce (12 ve 60) hesaplansýn
    SS.style.strokeDashoffset = 440 - (440 * S) / 12;
    dd.style.strokeDashoffset = 440 - (440 * d) / 60;
    ss.style.strokeDashoffset = 440 - (440 * s) / 60;
    // Halkalar hesaplý çepeçevre tamamlansýn
    saatNokta.style.transform = `rotate (${S * 30}deg)`;// tek (`) veya çift (") týrnak deðil AltGr(,)=(´)
    dakikaNokta.style.transform = `rotate (${d * 6}deg)`;
    saniyeNokta.style.transform = `rotate (${s * 6}deg)`;
}, 1000); // Her saniye güncelle
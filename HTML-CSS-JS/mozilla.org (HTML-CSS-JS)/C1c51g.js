// C1c51g.js: İşci/Worker ile anaprogram arasındaki js kodlamalı mesaj alışverişi alt-örneği.

onmessage = function (o) {
    let tarih;
    console.log ("Gönderilen mesaj: " + o.data); // Anaprogramdan alınan event.data
    for (let i = 0; i < 1000000; i++) {tarih = new Date();}
    postMessage (tarih); // Anaprograma gönderilen event.data
}; // on..sonu...
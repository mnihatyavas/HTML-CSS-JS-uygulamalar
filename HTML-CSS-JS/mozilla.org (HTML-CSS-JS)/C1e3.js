// C1e3.js: Haz�r forEach fonksiyonunun oklu ve normal kullan�m JS kodlamas� alt-�rne�i.

let dizi = ["Hamza", "Nihal", "Canan", "Zafer", "Belk�s"];
const div = document.querySelector ("div");

// Normal forEach-function kullan�m�:
dizi.forEach (function (eleman, endeks, dizi) {
    const p = document.createElement ("p");
    p.textContent = (endeks + 1) + ". " + eleman;
    div.appendChild (p);
    console.log (dizi [endeks]);
}); // dizi sonu...

div.appendChild (document.createElement ("hr"));

// Oklu forEach-function kullan�m�:
dizi.forEach ( (a,b,c)=>{
    const p = document.createElement ("p");
    p.textContent = (b + 1) + ") " + a;
    div.appendChild (p);
    console.log (c [c.length - (b + 1)]); // Tersten...
}); // dizi sonu...

document.body.appendChild (div);
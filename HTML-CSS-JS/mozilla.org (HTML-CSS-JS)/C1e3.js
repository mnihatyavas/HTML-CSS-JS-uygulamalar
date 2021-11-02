// C1e3.js: Hazýr forEach fonksiyonunun oklu ve normal kullaným JS kodlamasý alt-örneði.

let dizi = ["Hamza", "Nihal", "Canan", "Zafer", "Belkýs"];
const div = document.querySelector ("div");

// Normal forEach-function kullanýmý:
dizi.forEach (function (eleman, endeks, dizi) {
    const p = document.createElement ("p");
    p.textContent = (endeks + 1) + ". " + eleman;
    div.appendChild (p);
    console.log (dizi [endeks]);
}); // dizi sonu...

div.appendChild (document.createElement ("hr"));

// Oklu forEach-function kullanýmý:
dizi.forEach ( (a,b,c)=>{
    const p = document.createElement ("p");
    p.textContent = (b + 1) + ") " + a;
    div.appendChild (p);
    console.log (c [c.length - (b + 1)]); // Tersten...
}); // dizi sonu...

document.body.appendChild (div);
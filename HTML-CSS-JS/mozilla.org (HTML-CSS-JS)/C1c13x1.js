// C1c13x1.js: Hikaye ağırlık, sıcaklık, lakap, mekan, zamir ibarelerinin rasgele seçilmesi alt-örneği.

const hikayeci = document.getElementById ("hikayeci");
const rasgele = document.querySelector (".rasgele");
const hikaye = document.querySelector (".hikaye");

rasgele.addEventListener ("click", türet);
function türet() {
    let yeniHikaye = hikayeMetni;

    let xEleman = diziElemanlarınıRasgeleSeç (sokX);
    let yEleman = diziElemanlarınıRasgeleSeç (sokY);
    let zEleman = diziElemanlarınıRasgeleSeç (sokZ);

    yeniHikaye = yeniHikaye.replace (":sokx:", xEleman);
    yeniHikaye = yeniHikaye.replace (":soky:", yEleman);
    yeniHikaye = yeniHikaye.replace (":sokz:", zEleman);
    yeniHikaye = yeniHikaye.replace (":sokx:", xEleman);

    if (hikayeci.value !== "") {yeniHikaye = yeniHikaye.replace ("Mahmut", hikayeci.value);}

    if (document.getElementById ("tr").checked) {
        const ağırlık = Math.round (500 * 0.456) + " kilo";
        const sıcaklık =  Math.round ((94 - 32) * 5 / 9) + " santigrat";
        yeniHikaye = yeniHikaye.replace ("94 fahrenhayt", sıcaklık);
        yeniHikaye = yeniHikaye.replace ("500 pounds", ağırlık);
    }else if (document.getElementById ("uk").checked) {
        const ağırlık = Math.round (500 * 0.0714286) + " stone";
        const sıcaklık =  Math.round ((94 - 32) * 5 / 9) + " santigrad";
        yeniHikaye = yeniHikaye.replace ("94 fahrenhayt", sıcaklık);
        yeniHikaye = yeniHikaye.replace ("500 pounds", ağırlık);
    } // if-else sonu...

    hikaye.textContent = yeniHikaye;
    hikaye.style.visibility = "visible";
} // func sonu...

function diziElemanlarınıRasgeleSeç (dizi) {return dizi [Math.floor (Math.random() * dizi.length)];}

let hikayeMetni = "Dışarda hava 94 fahrenhayt dereceydi, ve adamımız :sokx: yürüyüşe çıktı. Yolunun üzerinde :soky: mekanına raslayınca, birkaç saniye süreyle korkuyla donakaldı, sonra :sokz:. Mahmut herşeyi apaçık gördü, ama şaşırmadı — :sokx: tam 500 pounds'luk bir devdi, ve çok sıcak bir gündü.";
let sokX = ["Dev Hamza", "Koca Babacık", "Noel Baba"];
let sokY = ["şişmanlar lokantası", "Hayvanat Bahçesi", "Beyaz Saray"];
let sokZ = ["birden kızgınlıkla parladı", "kaldırımdaki bir su birikintisine tökezleyerek düştü", "bir sümüklüböcek gibi sünerek oradan sıvıştı"];




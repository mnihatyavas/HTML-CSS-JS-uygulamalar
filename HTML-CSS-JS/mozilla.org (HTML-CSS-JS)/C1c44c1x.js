// C1c44c1x.js: �� boyutlu d�ner k�p TREE fonksiyonlar� kodlamas� alt-�rne�i.
// �nce THREE kurucu fonksiyon ve altfonksiyonlar�n�n i�erildi�i "C1c44c1y.js" �a�r�lmal�.

const sahne = new THREE.Scene();

const kamera = new THREE.PerspectiveCamera (45, 800/560, 0.1, 1000); // Orijinal arg�manlar: (75, window.innerWidth*0.1 / window.innerHeight, 0.1, 1000);
kamera.position.z = 5;

const sunucu = new THREE.WebGLRenderer();
sunucu.setSize (800, 560); // Orijinali: (window.innerWidth, window.innerHeight);
document.body.appendChild (sunucu.domElement);

let k�p;
let y�kleyici = new THREE.TextureLoader();
y�kleyici.load ("resim/metal.png", function (doku) {//karo2.png, karo4.png
        doku.wrapS = THREE.RepeatWrapping;
        doku.wrapT = THREE.RepeatWrapping;
        doku.repeat.set (2, 2);

        let geometri = new THREE.BoxGeometry (2.4, 2.4, 2.4);
        let malzeme = new THREE.MeshLambertMaterial ({map: doku, shading: THREE.FlatShading});
        k�p = new THREE.Mesh (geometri, malzeme);
        sahne.add (k�p);

        �iz();
}); // y�k..sonu...

let ortamI���� = new THREE.AmbientLight ("rgb(255, 255, 0)"); // =sar�; orijinali: beyaz
sahne.add (ortamI����);

let odakl�Projekt�r = new THREE.SpotLight ("rgb(255, 0, 0)"); // =k�rm�z�; orijinali: beyaz
odakl�Projekt�r.position.set (100, 1000, 1000);
odakl�Projekt�r.castShadow = true;
sahne.add (odakl�Projekt�r);

function �iz() {
    k�p.rotation.x += 0.02; // Orijinal de�er: 0.01
    k�p.rotation.y += 0.02;
    sunucu.render (sahne, kamera);

    requestAnimationFrame (�iz); // s�rekli canland�rma...
} // func sonu...
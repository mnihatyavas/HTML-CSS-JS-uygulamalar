// C1c44c1x.js: Üç boyutlu döner küp TREE fonksiyonlarý kodlamasý alt-örneði.
// Önce THREE kurucu fonksiyon ve altfonksiyonlarýnýn içerildiði "C1c44c1y.js" çaðrýlmalý.

const sahne = new THREE.Scene();

const kamera = new THREE.PerspectiveCamera (45, 800/560, 0.1, 1000); // Orijinal argümanlar: (75, window.innerWidth*0.1 / window.innerHeight, 0.1, 1000);
kamera.position.z = 5;

const sunucu = new THREE.WebGLRenderer();
sunucu.setSize (800, 560); // Orijinali: (window.innerWidth, window.innerHeight);
document.body.appendChild (sunucu.domElement);

let küp;
let yükleyici = new THREE.TextureLoader();
yükleyici.load ("resim/metal.png", function (doku) {//karo2.png, karo4.png
        doku.wrapS = THREE.RepeatWrapping;
        doku.wrapT = THREE.RepeatWrapping;
        doku.repeat.set (2, 2);

        let geometri = new THREE.BoxGeometry (2.4, 2.4, 2.4);
        let malzeme = new THREE.MeshLambertMaterial ({map: doku, shading: THREE.FlatShading});
        küp = new THREE.Mesh (geometri, malzeme);
        sahne.add (küp);

        çiz();
}); // yük..sonu...

let ortamIþýðý = new THREE.AmbientLight ("rgb(255, 255, 0)"); // =sarý; orijinali: beyaz
sahne.add (ortamIþýðý);

let odaklýProjektör = new THREE.SpotLight ("rgb(255, 0, 0)"); // =kýrmýzý; orijinali: beyaz
odaklýProjektör.position.set (100, 1000, 1000);
odaklýProjektör.castShadow = true;
sahne.add (odaklýProjektör);

function çiz() {
    küp.rotation.x += 0.02; // Orijinal deðer: 0.01
    küp.rotation.y += 0.02;
    sunucu.render (sahne, kamera);

    requestAnimationFrame (çiz); // sürekli canlandýrma...
} // func sonu...
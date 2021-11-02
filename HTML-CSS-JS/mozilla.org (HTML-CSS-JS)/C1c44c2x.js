// C1c44c2x.js: Video kay�t g�r�nt�l� �� boyutlu k�p TREE fonksiyonlar�n� ayarlama alt-�rne�i.
// Video kayd� yapan esas blok
if (navigator.mediaDevices.getUserMedia) {
    let s�n�rlay�c�lar = {
        audio: false,
        video: true
    } // let sonu...
    navigator.mediaDevices.getUserMedia (s�n�rlay�c�lar)
        .then (function (ak��) {
            const videom = document.createElement ("video");
            videom.srcObject = ak��;
            videom.onloadedmetadata = function() {
                videom.play();
                ��boyutluSunucu (videom);
            }; // vid..sonu...
        }) // then sonu...
        .catch (function (hata) {console.log ("HATA: " + hata); });
}else {console.log ("Taray�c�n�z getUserMedia'y� desteklemiyor!"); }

// three.js/C1c44c2y.js k�p �iziyor
function ��boyutluSunucu (vid) {
    const sahne = new THREE.Scene();
    const kamera = new THREE.PerspectiveCamera (60, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const sunucu = new THREE.WebGLRenderer();

    sunucu.setSize (window.innerWidth, window.innerHeight);
    document.body.appendChild (sunucu.domElement);

    // Doku ve tekrarlayan sar�c� kipi
    let doku = new THREE.Texture (vid);
    doku.wrapS = THREE.RepeatWrapping;
    doku.wrapT = THREE.RepeatWrapping;
    doku.repeat.set (1, 1);

    let geometri = new THREE.BoxGeometry (3,3,3);
    let malzeme = new THREE.MeshLambertMaterial ( {map: doku, shading: THREE.FlatShading} );
    let k�p = new THREE.Mesh (geometri, malzeme);
    sahne.add (k�p);

    kamera.position.x = 0;
    kamera.position.y = 0;
    kamera.position.z = 5;

    let �evreI���� = new THREE.AmbientLight ("rgb(150,50,150"); // menek�e
    sahne.add (�evreI����);

    // White directional light at half intensity shining from the top.
    //var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    //directionalLight.position.set( 0, 1, 0 );
    //scene.add( directionalLight );

    // Kenardan vuran ve g�lge yapan projekt�r �����
    let spotLambas� = new THREE.SpotLight ("rgb(255,200,50)"); // sar�
    spotLambas�.position.set (100, 1000, 1000);
    spotLambas�.castShadow = true;
    spotLambas�.shadowMapWidth = 1024;
    spotLambas�.shadowMapHeight = 1024;
    spotLambas�.shadowCameraNear = 500;
    spotLambas�.shadowCameraFar = 4000;
    spotLambas�.shadowCameraFov = 30;
    sahne.add (spotLambas�);

    // sahneyi sun
    function sun() {
        requestAnimationFrame (sun);
        k�p.rotation.x += 0.01; // orijinali: 0.005
        k�p.rotation.y += 0.01;
        doku.needsUpdate = true;
        sunucu.render (sahne, kamera);
    } // func sonu...
    sun();

    // Klavye kontrollar�
    const g�vde = document.querySelector ("body");
    g�vde.onkeydown = function (o) {
        // 37: <--, 39: -->, 38: ^, 40: altok
        if (o.keyCode == 37) {kamera.position.x += 0.05;};
        if (o.keyCode == 39) {kamera.position.x -= 0.05;};
        if (o.keyCode == 38) {kamera.position.y -= 0.05;};
        if (o.keyCode == 40) {kamera.position.y += 0.05;};
    } // g�v..sonu...

    function yenidenEbatland�r() {
        sunucu.setSize (window.innerWidth, window.innerHeight);
        kamera.aspect = window.innerWidth / window.innerHeight;
        kamera.updateProjectionMatrix();
    } // func sonu...
    window.addEventListener ("resize", yenidenEbatland�r, false );
} // func sonu...
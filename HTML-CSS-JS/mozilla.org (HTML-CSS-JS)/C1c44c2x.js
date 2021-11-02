// C1c44c2x.js: Video kayýt görüntülü üç boyutlu küp TREE fonksiyonlarýný ayarlama alt-örneði.
// Video kaydý yapan esas blok
if (navigator.mediaDevices.getUserMedia) {
    let sýnýrlayýcýlar = {
        audio: false,
        video: true
    } // let sonu...
    navigator.mediaDevices.getUserMedia (sýnýrlayýcýlar)
        .then (function (akýþ) {
            const videom = document.createElement ("video");
            videom.srcObject = akýþ;
            videom.onloadedmetadata = function() {
                videom.play();
                üçboyutluSunucu (videom);
            }; // vid..sonu...
        }) // then sonu...
        .catch (function (hata) {console.log ("HATA: " + hata); });
}else {console.log ("Tarayýcýnýz getUserMedia'yý desteklemiyor!"); }

// three.js/C1c44c2y.js küp çiziyor
function üçboyutluSunucu (vid) {
    const sahne = new THREE.Scene();
    const kamera = new THREE.PerspectiveCamera (60, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const sunucu = new THREE.WebGLRenderer();

    sunucu.setSize (window.innerWidth, window.innerHeight);
    document.body.appendChild (sunucu.domElement);

    // Doku ve tekrarlayan sarýcý kipi
    let doku = new THREE.Texture (vid);
    doku.wrapS = THREE.RepeatWrapping;
    doku.wrapT = THREE.RepeatWrapping;
    doku.repeat.set (1, 1);

    let geometri = new THREE.BoxGeometry (3,3,3);
    let malzeme = new THREE.MeshLambertMaterial ( {map: doku, shading: THREE.FlatShading} );
    let küp = new THREE.Mesh (geometri, malzeme);
    sahne.add (küp);

    kamera.position.x = 0;
    kamera.position.y = 0;
    kamera.position.z = 5;

    let çevreIþýðý = new THREE.AmbientLight ("rgb(150,50,150"); // menekþe
    sahne.add (çevreIþýðý);

    // White directional light at half intensity shining from the top.
    //var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    //directionalLight.position.set( 0, 1, 0 );
    //scene.add( directionalLight );

    // Kenardan vuran ve gölge yapan projektör ýþýðý
    let spotLambasý = new THREE.SpotLight ("rgb(255,200,50)"); // sarý
    spotLambasý.position.set (100, 1000, 1000);
    spotLambasý.castShadow = true;
    spotLambasý.shadowMapWidth = 1024;
    spotLambasý.shadowMapHeight = 1024;
    spotLambasý.shadowCameraNear = 500;
    spotLambasý.shadowCameraFar = 4000;
    spotLambasý.shadowCameraFov = 30;
    sahne.add (spotLambasý);

    // sahneyi sun
    function sun() {
        requestAnimationFrame (sun);
        küp.rotation.x += 0.01; // orijinali: 0.005
        küp.rotation.y += 0.01;
        doku.needsUpdate = true;
        sunucu.render (sahne, kamera);
    } // func sonu...
    sun();

    // Klavye kontrollarý
    const gövde = document.querySelector ("body");
    gövde.onkeydown = function (o) {
        // 37: <--, 39: -->, 38: ^, 40: altok
        if (o.keyCode == 37) {kamera.position.x += 0.05;};
        if (o.keyCode == 39) {kamera.position.x -= 0.05;};
        if (o.keyCode == 38) {kamera.position.y -= 0.05;};
        if (o.keyCode == 40) {kamera.position.y += 0.05;};
    } // göv..sonu...

    function yenidenEbatlandýr() {
        sunucu.setSize (window.innerWidth, window.innerHeight);
        kamera.aspect = window.innerWidth / window.innerHeight;
        kamera.updateProjectionMatrix();
    } // func sonu...
    window.addEventListener ("resize", yenidenEbatlandýr, false );
} // func sonu...
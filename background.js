var stageWidth = window.innerWidth;
var stageHeight = window.innerHeight;
var xRows = 25;
var zRows = 25;
var cubeSize = 600;
var cubeGap = 200;
var cubeRow = cubeSize + cubeGap;

var container = document.getElementById('contain');

var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
camera.position.y = 5000;
camera.lookAt( new THREE.Vector3(0,0,0) );

var scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0x000000, 5000, 10000 );

var pointLight =  new THREE.PointLight(0xFF4040);
pointLight.position.x = 0;
pointLight.position.y = 1800;
pointLight.position.z = -1800;
scene.add(pointLight);

/*var pointLight =  new THREE.PointLight(0xc0c0f0);
pointLight.position.x = 0;
pointLight.position.y = 800;
pointLight.position.z = 1000;
scene.add(pointLight);*/

group = new THREE.Object3D();
scene.add( group );

var cubes = [];

var halfXRows, halfZRows;

var renderer = new THREE.WebGLRenderer();
updateRendererSize();
container.appendChild(renderer.domElement);

function updateRendererSize() {
    stageWidth = window.innerWidth;
    stageHeight = window.innerHeight;
    halfXRows = (cubeRow * -xRows / 2);
    halfZRows = (cubeRow * -zRows / 2);
    renderer.setSize(stageWidth, stageHeight);
    camera.aspect = stageWidth / stageHeight;
    camera.updateProjectionMatrix();
}

function onWindowResize() {
    updateRendererSize();
}

window.addEventListener('resize', onWindowResize, false);

function createCubes() {
    for (var x = 0; x < xRows; x++) {
        cubes[x] = []
        for (var z = 0; z < zRows; z++) {
            var cubeHeight = 100 + Math.random() * 700;
            cubeHeight = 10 + (Math.sin(x / xRows * Math.PI) + Math.sin(z / zRows * Math.PI)) * 200 + Math.random() * 150;

            var geometry = new THREE.BoxGeometry(cubeSize, cubeHeight, cubeSize);

            var material = new THREE.MeshPhongMaterial({
                ambient: 0x030303,
                color: 0x4444ff,
                specular: 0xffffff,
                shininess: 10,
                shading: THREE.SmoothShading
            })

            var cube = new THREE.Mesh(geometry, material);
            cube.position.x = halfXRows + x * cubeRow;
            cube.position.y = cubeHeight / 2;
            cube.position.z = (cubeRow * -zRows / 2) + z * cubeRow;

            cube.height = cubeHeight;
            group.add(cube);

            cubes[x][z] = cube;

        }
    }
}

function checkRow() {

    var position = { x: camera.position.x, z: camera.position.z };

    var xIndex = (position.x / cubeRow);
    var xLoops = Math.floor(xIndex / xRows);

    var zIndex = (position.z / cubeRow);
    var zLoops = Math.floor(zIndex / zRows);

    for (var x = 0; x < xRows; x++) {
        for (var z = 0; z < zRows; z++) {

            var dx, dz = 0;
            if (x >= xIndex - xLoops * xRows) {
                dx = xRows * (1 - xLoops);
            } else {
                dx = xRows * (0 - xLoops)
            }
            if (z >= zIndex - zLoops * zRows) {
                dz = zRows * (1 - zLoops);
            } else {
                dz = zRows * (0 - zLoops)
            }


            cubes[x][z].position.x = (x - dx) * cubeRow - halfXRows;
            cubes[x][z].position.z = (z - dz) * cubeRow - halfZRows

            var scale = (cubes[x][z].position.z + group.position.z) / 1500;
            if (scale < 1) scale = 1;
            scale = Math.pow(scale, 1.2);

            cubes[x][z].scale.y = scale;

            cubes[x][z].position.y = (cubes[x][z].height * scale) / 2;

        }
    }

}

function render(t) {
    requestAnimationFrame(render);

    checkRow();

    camera.position.x = Math.sin(t * 0.0003) * 1000;
    camera.position.z = -4000;
    camera.position.y = (Math.cos(t * 0.0004) + 1.3) * 3000;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);

}
render(0);

window.addEventListener("mousedown", function() {
    //isRunning = false;
})

window.addEventListener("mousemove", function(event) {
    mouse = event;
})
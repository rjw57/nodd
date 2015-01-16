(function(){

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

// Create a camera which covers the entire window with x in range [-1, 1] and y
// scaled to give an aspect ratio of 1. Near and far are also set to -1, 1.
var rendererAspectRatio = window.innerHeight / window.innerWidth;
var camera = new THREE.OrthographicCamera(-1, 1, -rendererAspectRatio, rendererAspectRatio, 1, 100);
camera.position.z = 10;

// Create a texture from an external source
var world_texture = THREE.ImageUtils.loadTexture("tex/world-map-1.jpg");
world_texture.wrapS = THREE.RepeatWrapping;

// Create a single plane which covers the NODDY logo area
var nodd_geom = new THREE.PlaneBufferGeometry(2, 2.0/3.0);
//var nodd_material = new THREE.MeshNormalMaterial();
var nodd_material = new THREE.ShaderMaterial({
  vertexShader: document.getElementById('noddVS').textContent,
  fragmentShader: document.getElementById('noddFS').textContent,
  uniforms: {
    time: { type: "f", value: 0.0 },
    mapTexture: { type: "t", value: world_texture },
  },
});
var nodd_mesh = new THREE.Mesh(nodd_geom, nodd_material);
nodd_mesh.rotation.y = Math.PI; // To show the visible face to the camera
nodd_mesh.rotation.z = Math.PI;

scene.add(nodd_mesh);

var angularSpeed = 0.2;
var lastTime = 0, startTime = (new Date()).getTime();
function render() {
  // update
  var time = (new Date()).getTime() - startTime;
  nodd_material.uniforms.time.value = time * 7e-5;
  var timeDiff = time - lastTime;
  var angleChange = angularSpeed * timeDiff * 2 * Math.PI / 1000;
  lastTime = time;

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}
render();

})();

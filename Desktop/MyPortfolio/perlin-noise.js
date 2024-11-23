window.addEventListener('load', init, false);

var scene, camera, renderer, container;
var _width, _height;
var _primitive;
var shapeGroup = new THREE.Group();
var start = Date.now();

function init() {
  createWorld();
  createPrimitive();
  animation();
}

function createWorld() {
  _width = window.innerWidth;
  _height = window.innerHeight;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x010100); // background color

  camera = new THREE.PerspectiveCamera(35, _width / _height, 1, 1000);
  camera.position.set(0, 0, 16);

  renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
  renderer.setSize(_width, _height);
  renderer.shadowMap.enabled = true;
  document.getElementById('webgl-canvas').appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  _width = window.innerWidth;
  _height = window.innerHeight;
  renderer.setSize(_width, _height);
  camera.aspect = _width / _height;
  camera.updateProjectionMatrix();
}

var primitiveElement = function() {
  this.mesh = new THREE.Object3D();
  var mat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
      time: { type: "f", value: 0.1 },
      pointscale: { type: "f", value: 0.2 },
      decay: { type: "f", value: 0.3 },
      size: { type: "f", value: 0.3 },
      displace: { type: "f", value: 0.3 },
      complex: { type: "f", value: 0.0 },
      waves: { type: "f", value: 0.10 },
      eqcolor: { type: "f", value: 0.0 },
      rcolor: { type: "f", value: 0.0 },
      gcolor: { type: "f", value: 0.0 },
      bcolor: { type: "f", value: 0.0 },
      fragment: { type: "i", value: true },
      redhell: { type: "i", value: true }
    },
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
  });

  var geo = new THREE.IcosahedronBufferGeometry(2, 30);
  var wir = new THREE.IcosahedronBufferGeometry(2.3, 2);
  this.shape = new THREE.Points(geo, mat);
  this.point = new THREE.Points(wir, mat);

  shapeGroup.add(this.point);
  shapeGroup.add(this.shape);

  scene.add(shapeGroup);
}

function createPrimitive() {
  _primitive = new primitiveElement();
}

function animation() {
  requestAnimationFrame(animation);
  var time = Date.now() - start;
  _primitive.mesh.rotation.y += 0.005;
  renderer.render(scene, camera);
}

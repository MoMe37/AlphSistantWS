import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/OBJLoader.js';

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>
{
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Scene
const scene = new THREE.Scene()

// Lights
const light = new THREE.AmbientLight( 0x404040 );
scene.add(light);
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 3
scene.add(camera)

// Renderer
const canvas = document.querySelector('canvas.webgl')

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Object Loader
const loader = new OBJLoader();

var _obj;

loader.load( 'assets/suzanne.obj', function ( obj ) {
  _obj = obj
	scene.add( obj );

}, undefined, function ( error ) {

	console.error( error );

} );

// Sphere object
var arr_sphere = []
var nmb_sphere = 500

for(let i = 0; i < nmb_sphere; i++)
{
  var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.1,5,5),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  )
  var rand = Math.random() - 0.5
  sphere.position.x = rand * 300
  rand = Math.random() - 0.5
  sphere.position.y = rand * 150
  rand = Math.random() - 1
  var rand = Math.random()
  sphere.position.z = - rand * 100
  arr_sphere.push(sphere)
  scene.add(sphere)
}

for(let i = 0; i < 1000; i++)
{
  var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.1,9,9),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  )
  var rand = (Math.random() - 0.5)
  sphere.position.x = rand * 300
  rand = Math.random() - 0.5
  sphere.position.y = rand * 150
  rand = Math.random() - 1
  var rand = Math.random()
  sphere.position.z = -100
  scene.add(sphere)
}

// Animation
var speed = 0.1

function tick()
{
  for(let i = 0; i < nmb_sphere; i++)
  {
    if(arr_sphere[i].position.z < 5)
    {
      arr_sphere[i].position.z += speed
    }
    else
    {
      var rand = Math.random() - 0.5
      arr_sphere[i].position.x = rand * 300
      rand = Math.random() - 0.5
      arr_sphere[i].position.y = rand * 150
      rand = Math.random() - 1
      arr_sphere[i].position.z = - 100
    }
  }

  if(_obj)
    _obj.rotation.y -= 0.01

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick();
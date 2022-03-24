import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/OBJLoader.js';
import { Clock } from 'https://cdn.skypack.dev/three@0.129.0';

const fs = require('fs');

// Sizes
const sizes = {
  width: 0.98 * self.innerWidth,
  height: 0.98 * self.innerHeight
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
camera.position.z = 0.5
camera.position.y = -0.5
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

loader.load( './assets/suzanne.obj', function ( obj ) {
  _obj = obj
  _obj.rotation.y += 3.14;
  _obj.rotation.z += 3.14;
  _obj.position.x -= 0.5;
	scene.add( obj );

}, undefined, function ( error ) {

	console.error( error );

} );










// Rendu + Game loop

const clock = new Clock();
var time = 0
var idx = 120
let start = document.getElementById('btnStartAnimation');

start.addEventListener('click', function (ev) {
  idx = 2
})

function calculateTime()
{
  time += clock.getDelta()
  if(time > 1/45)
  {
    window.requestAnimationFrame(render)
    if(idx < 119)
    {
      window.requestAnimationFrame(faceAnimation)
    }
    time = 0
  }
  window.requestAnimationFrame(calculateTime)
}

calculateTime()

function render()
{
  renderer.render(scene, camera)
}

function faceAnimation()
{
  if(idx < 119)
  {
    var idxstring = idx.toString()

    if(idx < 10)
    {
      idxstring = idxstring.padStart(3, '0')
    }
    else if(idx < 100)
    {
      idxstring = idxstring.padStart(3, '0')
    }

    var string = './public/mesh/face_' + idxstring + '.obj'

    loader.load( string, function ( obj ) {
      scene.remove( _obj );
      _obj = obj
      _obj.rotation.y += 3.14;
      _obj.rotation.z += 3.14;
      _obj.position.x -= 0.5;
      scene.add( obj );
    
    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );

    idx += 1
  }
}
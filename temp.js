import "./style.css";
import * as THREE from "three";
import gsap from 'gsap'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  (window.innerWidth / window.innerHeight)
);
camera.position.set(2,2,2);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color : "red"})
);

const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    mesh.rotation.y = elapsedTime;
    camera.lookAt(mesh.position);
    renderer.render( scene, camera );
    window.requestAnimationFrame(tick);
}

tick();

scene.add(mesh);
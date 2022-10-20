import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "dat.gui";

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
  "/textures/door/color.jpg",
  () => {
    
  },
  () => {},
  () => {}
);

const GUI = new dat.GUI();
const gui = GUI.addFolder("Tweaks");
const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, { y: mesh.rotation.y + 10, duration: 1 });
  },
};

const sizes = {
  height: window.innerHeight,
  width: window.innerWidth,
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
const canvas = document.querySelector("canvas.webgl");

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const scene = new THREE.Scene();
camera.position.z = 3;

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ map: texture })
);

gui.add(mesh.position, "x").min(-3).max(3).step(0.01).name("position - x");
gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("position - y");
gui.add(mesh.position, "z").min(-3).max(3).step(0.01).name("position - z");

scene.add(mesh);

// const clock = new THREE.Clock();
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const tick = () => {
  // const elapsedTime = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();

//GUI PROPERTIES

gui.add(mesh, "visible");
gui.add(mesh.material, "wireframe");
gui.addColor(parameters, "color").onChange(() => {
  mesh.material.color.set(parameters.color);
});
gui.add(parameters, "spin");

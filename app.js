// Import necessary Three.js classes
import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';

// Import OrbitControls
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xcccccc);
document.body.appendChild(renderer.domElement);

// Add fog to the scene
scene.fog = new THREE.FogExp2(0xcccccc, 0.01);

// Create a ground plane
const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 }); // Grass color
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = - Math.PI / 2;
scene.add(plane);

// Add buildings
const buildingGeometry = new THREE.BoxGeometry(20, 100, 20); // Larger buildings
const buildingMaterial = new THREE.MeshLambertMaterial({ color: 0x8B8B8B }); // Building color
for (let i = 0; i < 50; i++) { // More buildings
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.set(Math.random() * 800 - 400, 50, Math.random() * 800 - 400);
    scene.add(building);
}

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Adjust camera position to be slightly higher
camera.position.set(0, 10, 0);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = true;
controls.enableZoom = false;
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.update();

// Set camera to look at the horizon
controls.target.set(0, 10, -1);
controls.update();

// Ensure the renderer's DOM element captures mouse events
document.body.style.margin = '0';
document.body.style.overflow = 'hidden';

// Lock the camera's up vector
camera.up.set(0, 1, 0);

// Limit vertical rotation
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 4;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update controls
    controls.update();

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation loop
animate();

// Add event listener for window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}); 
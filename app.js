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

// Add more and larger buildings, avoiding the path
const buildingGeometry = new THREE.BoxGeometry(80, 400, 80); // Increase thickness and height for epic scale
const buildingMaterial = new THREE.MeshLambertMaterial({ color: 0x8B8B8B }); // Building color
for (let i = 0; i < 300; i++) { // Increase the number of buildings
    const x = Math.random() * 800 - 400;
    const z = Math.random() * 800 - 400;
    // Define a clear corridor along the z-axis where no buildings should be placed
    const pathWidth = 50; // Width of the path along the x-axis
    if (Math.abs(x) > pathWidth) {
        // Ensure buildings are not placed within the path corridor
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
        building.position.set(x, 200, z); // Adjust y-position for taller buildings
        scene.add(building);
    }
}

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Set the initial camera position
camera.position.set(0, 10, 0);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = true;
controls.enableZoom = false;
controls.enablePan = false;
controls.enableDamping = false;
controls.update();

// Verify camera target configuration
controls.target.set(camera.position.x, camera.position.y, camera.position.z - 1);
controls.update();

// Ensure the renderer's DOM element captures mouse events
document.body.style.margin = '0';
document.body.style.overflow = 'hidden';

// Lock the camera's up vector
camera.up.set(0, 1, 0);

// Allow full rotation by removing polar angle limits
controls.maxPolarAngle = Math.PI;
controls.minPolarAngle = 0;

// Allow unrestricted azimuthal angles for full rotation
controls.minAzimuthAngle = -Infinity;
controls.maxAzimuthAngle = Infinity;

// Reintroduce train movement logic
let trainPosition = 0;
const trainSpeed = 0.5;

function updateCameraPosition() {
    trainPosition -= trainSpeed; // Decrement to move in the opposite direction
    // Update only the camera's z-position
    camera.position.z = trainPosition;
    // Update controls target to follow the camera's z position
    controls.target.z = camera.position.z - 1;
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update camera position to simulate train movement
    updateCameraPosition();

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
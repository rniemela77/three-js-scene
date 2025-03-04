// Import necessary Three.js classes
import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a geometry
const geometry = new THREE.BoxGeometry();

// Create a material
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// Create a mesh
const cube = new THREE.Mesh(geometry, material);

// Add the mesh to the scene
scene.add(cube);

// Position the camera
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation loop
animate(); 
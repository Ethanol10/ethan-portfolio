import * as THREE from 'three';
import { useEffect, useRef } from "react";
import { EulerToRad } from './ThreeJSHelpers';


function ThreeEntrypoint() {
  const refContainer = useRef(null);
  
  useEffect(() => {
    //Initialize everything
    let scene = new THREE.Scene();
    let scene_cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Attach to dom element
    refContainer.current && refContainer.current.appendChild( renderer.domElement );

    //Setup Cube
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
    let cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.set(0,0,0);

    //Setup ground
    let groundGeometry = new THREE.PlaneGeometry(1, 1, 1);
    let groundMaterial = new THREE.MeshStandardMaterial({color: 0x00FF00});
    let ground = new THREE.Mesh(groundGeometry, groundMaterial);
    scene.add(ground);
    ground.position.set(0, -2, 0);
    ground.scale.set(100, 100, 100);
    ground.rotation.x = EulerToRad(-90);

    //Setup Ambient Light
    let ambientLight = new THREE.AmbientLight( 0x404040 );
    scene.add(ambientLight);

    //Setup Point Light
    const pointLight = new THREE.PointLight(0xFFFFFF, 50, 0);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight)

    // Setup Directional Light
    // const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.2);
    // directionalLight.position.set(-1, 2, 4);
    // scene.add(directionalLight);

    //Setup camera
    scene_cam.position.z = 3;
    scene_cam.position.y = 5;
    scene_cam.rotation.x = EulerToRad(-65);

    //Animate func should run, sort of like a game loop of sorts.
    let animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, scene_cam);
    };
    animate();
  }, []);


  return (
    <div ref={refContainer}></div>
  );
}

export default ThreeEntrypoint
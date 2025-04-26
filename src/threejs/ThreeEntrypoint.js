import * as THREE from 'three';
import { useEffect, useRef } from "react";

function ThreeEntrypoint() {
  const refContainer = useRef(null);
  
  useEffect(() => {
    //Initialize everything
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Attach to dom element
    refContainer.current && refContainer.current.appendChild( renderer.domElement );

    //Setup Cube
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    //Setup camera
    camera.position.z = 5;

    //Animate func should run, sort of like a game loop of sorts.
    var animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }, []);


  return (
    <div ref={refContainer}></div>

  );
}

export default ThreeEntrypoint
import * as THREE from 'three';
import { EulerToRad, isNumber } from './ThreeJSHelpers';
import Boid from './boid';

const targetFixedFramerate = 60
const targetRenderInterval = 1 / targetFixedFramerate;

export default class Main{
    constructor(refContainer){
      this.scene = new THREE.Scene();
      this.scene_cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.shadowMap.enabled = true;
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      //Attach to dom element
      refContainer.current && refContainer.current.appendChild( this.renderer.domElement );

      //Setup Cube
      // let geometry = new THREE.BoxGeometry(1, 1, 1);
      // let material = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
      // this.cube = new THREE.Mesh(geometry, material);
      // this.cube.castShadow = true;
      // this.cube.receiveShadow = true;
      // this.scene.add(this.cube);
      // this.cube.position.set(0,0,0);
      
      this.boid = new Boid();
      this.scene.add(this.boid.GetBoidObj());

      //Setup ground
      let groundGeometry = new THREE.PlaneGeometry(1, 1, 1);
      let groundMaterial = new THREE.MeshStandardMaterial({color: 0xd1ffbd});
      this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
      this.ground.receiveShadow = true;
      this.scene.add(this.ground);
      this.ground.position.set(0, -2, 0);
      this.ground.scale.set(30, 30, 30);
      this.ground.rotation.x = EulerToRad(-90);

      //Setup Ambient Light
      this.ambientLight = new THREE.AmbientLight( 0xFFFFFF );
      this.ambientLight.castShadow = true;
      this.scene.add(this.ambientLight);

      //Setup Point Light
      this.pointLight = new THREE.PointLight(0xFFFFFF, 50, 0);
      this.pointLight.position.set(0, 5, 0);
      this.pointLight.castShadow = true;
      this.scene.add(this.pointLight)

      // Setup Directional Light
      // const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
      // directionalLight.position.set(0, 2, 4);
      // directionalLight.castShadow = true;
      // this.scene.add(directionalLight);

      //Setup camera
      this.scene_cam.position.z = 0;
      this.scene_cam.position.y = 30;
      this.scene_cam.rotation.x = EulerToRad(-90);

      this.clock = new THREE.Clock();

      //setup timers
      this.gameLoopDelta = 0;

      //Render First frame
      this.Render(this.clock.getDelta());
    }

    Update(delta){
      this.renderer.render(this.scene, this.scene_cam);
    }

    FixedUpdate(delta){
      this.boid.Update(delta);
    }

    Render(delta){
      requestAnimationFrame(() => this.Render(this.clock.getDelta()));
      // if( delta > 0){
      //   console.log("frametime: ", 1 / delta);
      // }
      if(isNumber(delta)){
        this.gameLoopDelta += delta;
      }
      
      if (this.gameLoopDelta > targetRenderInterval){
        this.FixedUpdate(this.gameLoopDelta);
        this.gameLoopDelta = this.gameLoopDelta % targetRenderInterval;
      }

      this.Update(this.gameLoopDelta);
    }
  }
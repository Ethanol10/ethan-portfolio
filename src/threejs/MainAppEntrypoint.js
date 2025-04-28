import * as THREE from 'three';
import { EulerToRad, isNumber } from './ThreeJSHelpers';
import Boid from './objects/boid';
import Ground from './objects/ground';

const targetFixedFramerate = 60
const targetRenderInterval = 1 / targetFixedFramerate;

export default class Main{
    constructor(refContainer){
      this.scene = new THREE.Scene();
      this.scene_cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.shadowMap.enabled = true;
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      
      this.clock = new THREE.Clock();

      //Attach to dom element
      refContainer.current && refContainer.current.appendChild( this.renderer.domElement );
      
      this.boid = new Boid(this.clock);
      this.scene.add(this.boid.getObj());
      this.boid2 = new Boid(this.clock);
      this.scene.add(this.boid2.getObj());
      this.boid2.getObj().position.set(-2,0,0);

      this.ground = new Ground(this.clock);
      this.scene.add(this.ground.getObj());

      //Setup Ambient Light
      this.ambientLight = new THREE.AmbientLight( 0xFFFFFF );
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
      this.scene_cam.position.z = 5;
      this.scene_cam.position.y = 2;
      this.scene_cam.rotation.x = EulerToRad(-15);

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
      this.boid2.Update(delta);
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
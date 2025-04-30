import * as THREE from 'three';
import { EulerToRad, isNumber } from './ThreeJSHelpers';
import Boid from './objects/boid';
import Ground from './objects/ground';
import { BOID_BOUNDS, TARGET_FRAMERATE, TARGET_RENDER_FRAMETIME } from './StaticValues';

export default class Main{
  //Assume center is calculated from (0,0) to (bounds, bounds)
    constructor(refContainer, bounds){
      this.scene = new THREE.Scene();
      this.scene_cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.shadowMap.enabled = true;
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      
      this.clock = new THREE.Clock();

      //Attach to dom element
      refContainer.current && refContainer.current.appendChild( this.renderer.domElement );
      
      this.ground = new Ground(this.clock);
      this.scene.add(this.ground.getObj());

      let centerPoint = this.ground.getCenterPoint();

      this.boid = new Boid(this.clock);
      this.scene.add(this.boid.getObj());
      this.boid2 = new Boid(this.clock);
      this.scene.add(this.boid2.getObj());
      this.boid2.getObj().position.set(20, 0, 15);

      //Setup Ambient Light
      this.ambientLight = new THREE.AmbientLight( 0xFFFFFF );
      this.scene.add(this.ambientLight);

      //Setup Point Light
      this.pointLight = new THREE.PointLight(0xFFFFFF, 50, 0);
      this.pointLight.position.set(centerPoint.x, 5, centerPoint.y);
      this.pointLight.castShadow = true;
      this.scene.add(this.pointLight)

      // Setup Directional Light
      // const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
      // directionalLight.position.set(0, 2, 4);
      // directionalLight.castShadow = true;
      // this.scene.add(directionalLight);

      //Setup camera
      // this.scene_cam.position.z = this.ground.getCenterPoint().x;
      // this.scene_cam.position.x = this.ground.getCenterPoint().y;
      // this.scene_cam.position.y = 30;

      this.scene_cam.position.set(15, 5, 40);
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
      
      if (this.gameLoopDelta > TARGET_RENDER_FRAMETIME){
        this.FixedUpdate(this.gameLoopDelta);
        this.gameLoopDelta = this.gameLoopDelta % TARGET_RENDER_FRAMETIME;
      }

      this.Update(this.gameLoopDelta);
    }
  }
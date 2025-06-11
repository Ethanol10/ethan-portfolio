import * as THREE from 'three';
import { EulerToRad, isNumber } from './ThreeJSHelpers';
import Boid from './objects/boid';
import Ground from './objects/ground';
import { TARGET_RENDER_FRAMETIME, BOID_COUNT } from './StaticValues';

export function getScene(){
	return scene;
}

export let scene = null;

export default class Main{
  //Assume center is calculated from (0,0) to (bounds, bounds)
    constructor(refContainer, bounds){
      scene = new THREE.Scene();
      this.scene_cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      // this.scene_cam = new THREE.OrthographicCamera(0, window.innerWidth, 0, window.innerHeight, 1, 1000);
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.shadowMap.enabled = true;
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      
      this.clock = new THREE.Clock();

      //Attach to dom element
      refContainer.current && refContainer.current.appendChild( this.renderer.domElement );
      
      this.ground = new Ground(this.clock);
      scene.add(this.ground.getObj());

      let centerPoint = this.ground.getCenterPoint();
      
      this.boidList = [];

      for(let i = 0; i < BOID_COUNT; i++ ){
        let newBoid = new Boid(this.clock);
        this.boidList.push(newBoid);
      }

      //Setup Ambient Light
      this.ambientLight = new THREE.AmbientLight( 0xFFFFFF );
      scene.add(this.ambientLight);

      //Setup Point Light
      this.pointLight = new THREE.PointLight(0xFFFFFF, 50, 0);
      this.pointLight.position.set(centerPoint.x, 5, centerPoint.y);
      this.pointLight.castShadow = true;
      scene.add(this.pointLight)

      // Setup Directional Light
      // const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
      // directionalLight.position.set(0, 2, 4);
      // directionalLight.castShadow = true;
      // this.scene.add(directionalLight);

      //Setup camera
      this.scene_cam.position.z = this.ground.getCenterPoint().x + 20;
      this.scene_cam.position.x = this.ground.getCenterPoint().y;
      this.scene_cam.position.y = 15;

      // this.scene_cam.position.set(15, 5, 40);
      this.scene_cam.rotation.x = EulerToRad(-45);

      //setup timers
      this.gameLoopDelta = 0;

      //Render First frame
      this.Render(this.clock.getDelta());
    }    

    Update(delta){
      this.renderer.render(scene, this.scene_cam);
    }

    FixedUpdate(delta){
      for(let i = 0; i < BOID_COUNT; i++){
        this.boidList[i].Update(delta);
      }
      // this.boid.Update(delta);
      // this.boid2.Update(delta);
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
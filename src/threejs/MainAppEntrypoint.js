import * as THREE from 'three';
import { EulerToRad, isNumber } from './ThreeJSHelpers';
import Boid from './objects/boid';
import Ground from './objects/ground';
import { TARGET_RENDER_FRAMETIME, BOID_COUNT } from './StaticValues';
import Skybox from './objects/skybox';
import { Target } from './objects/target';

export function getScene(){
	return scene;
}

export function getClock(){
  return clock;
}

export function getAndIncrementObjectID(){
  let old_id = OBJECT_ID_INT;
  OBJECT_ID_INT += 1;
  return old_id;
}

export function AddNewObject(obj){
  OBJECT_LIST.push(obj);
  obj.id = getAndIncrementObjectID();
}

export let OBJECT_ID_INT = 0;
export let scene = null;
export let OBJECT_LIST = [];
export let MainObj = null;
export let clock = null;

export default class Main{
  //Assume center is calculated from (0,0) to (bounds, bounds)
    constructor(refContainer){
      MainObj = this;

      scene = new THREE.Scene();
      this.scene_cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
      // this.scene_cam = new THREE.OrthographicCamera(0, window.innerWidth, 0, window.innerHeight, 1, 1000);
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
      this.renderer.setSize(refContainer.current?.clientWidth, window.innerHeight);
      
      clock = new THREE.Clock();

      //Attach to dom element
      refContainer.current && refContainer.current.appendChild( this.renderer.domElement );
      
      this.ground = new Ground();

      this.skybox = new Skybox();

      let centerPoint = this.ground.getCenterPoint();
      
      this.boidList = [];

      for(let i = 0; i < BOID_COUNT; i++ ){
        this.boidList.push(new Boid());
      }

      this.targetList = [];
      for(let i = 0; i < 4; i++){
        this.targetList.push(new Target());
      }

      //Setup Ambient Light
      this.ambientLight = new THREE.AmbientLight( 0xe0e0e0, 2 );
      scene.add(this.ambientLight);
      
      this.targetPoint = new THREE.Object3D();
      this.targetPoint.position.set(centerPoint.x, 0, centerPoint.y);
      scene.add(this.targetPoint);

      //Setup Point Light
      this.pointLight = new THREE.PointLight(new THREE.Color(1,1,1), 20, 0, 1);
      this.pointLight.position.set(centerPoint.x, 20, centerPoint.y);
      this.pointLight.castShadow = true;
      this.pointLight.shadow.camera.near = 0.1;
      this.pointLight.shadow.camera.far = 50;
      this.pointLight.shadow.mapSize.width = 2048;
      this.pointLight.shadow.mapSize.height = 2048;
      // this.pointLight.target = this.targetPoint;
      scene.add(this.pointLight);
      //Setup camera

      // this.scene_cam.position.set(15, 5, 40);
      // this.scene_cam.rotation.z = EulerToRad(80);

      this.scene_cam_container = new THREE.Object3D();
      scene.add(this.scene_cam_container);
      scene.add(this.scene_cam);
      this.scene_cam.parent = this.scene_cam_container;
      this.scene_cam_container.position.set(this.ground.getCenterPoint().x, 0, this.ground.getCenterPoint().y);

      
      this.scene_cam.position.z = 30;
      this.scene_cam.position.x = 0;
      this.scene_cam.position.y = 15;

      this.scene_cam.rotation.x = EulerToRad(-25);
      //setup timers
      this.gameLoopDelta = 0;

      //Render First frame
      this.Render(clock.getDelta());
    }    

    Update(delta){
      this.renderer.render(scene, this.scene_cam);
      
      this.scene_cam_container.rotation.y += EulerToRad(10) * delta;
      
      for(let i = 0; i < OBJECT_LIST.length; i++){
        OBJECT_LIST[i].Update(delta);
      }
    }

    FixedUpdate(delta){
      for(let i = 0; i < OBJECT_LIST.length; i++){
        OBJECT_LIST[i].FixedUpdate(delta);
      }
    }

    Render(delta){
      requestAnimationFrame(() => this.Render(clock.getDelta()));
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
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
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

export class Main{
  //Assume center is calculated from (0,0) to (bounds, bounds)
    constructor(refContainer, sceneInteractable = false){
      MainObj = this;
      this.sceneInteractable = sceneInteractable;
      this.refContainer = refContainer;

      scene = new THREE.Scene();

      this.divider = 16;
      this.scene_cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
      // this.scene_cam = new THREE.OrthographicCamera(-1 * window.innerWidth / this.divider, window.innerWidth / this.divider, window.innerHeight / this.divider, -1 * window.innerHeight / this.divider, 0.1, 2000);
      // this.FRUSTRUM_SIZE = 16;
      // this.scene_cam = new THREE.OrthographicCamera(this.FRUSTRUM_SIZE * window.innerWidth / window.innerHeight / -this.divider, this.FRUSTRUM_SIZE * window.innerWidth / window.innerHeight / this.divider, this.FRUSTRUM_SIZE / -this.divider, this.FRUSTRUM_SIZE / this.divider, 0.1, 2000);
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
      this.renderer.debug.checkShaderErrors = true;
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
      this.ambientLight = new THREE.AmbientLight( 0xcfcfcf, 2 );
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

      
      this.scene_cam.position.set(0, 15, 30);
      this.scene_cam.rotation.x = EulerToRad(-45);
      
      if(this.sceneInteractable){
        this.controls = new OrbitControls(this.scene_cam, this.renderer.domElement); 
        this.scene_cam.parent = null;
        this.scene_cam.position.set(10, 20, 10);
        this.controls.target.set(this.ground.getCenterPoint().x, 0, this.ground.getCenterPoint().y);
        this.controls.maxDistance = 100;
        // this.scene_cam.rotation.x = EulerToRad(-45);
        this.controls.update();
      }

      // this.scene_cam_container.rotation.y = EulerToRad(-45);
      //setup timers
      this.gameLoopDelta = 0;

      //Render First frame
      this.Render(clock.getDelta());

      this.isFocused = true;
    }    

    Update(delta){
      if(this.isFocused){
        if(this.sceneInteractable){
          this.controls.update();
        }
        else{
          this.scene_cam_container.rotation.y += EulerToRad(10) * delta;
        }

        this.renderer.render(scene, this.scene_cam);        

        for(let i = 0; i < OBJECT_LIST.length; i++){
          OBJECT_LIST[i].Update(delta);
        }
      }
    }

    FixedUpdate(delta){
      if(this.isFocused){
        for(let i = 0; i < OBJECT_LIST.length; i++){
          OBJECT_LIST[i].FixedUpdate(delta);
        }
      }
    }

    ResizeCam(){
      this.renderer.setSize(this.refContainer.current?.clientWidth, window.innerHeight);

      //For Perspective
      this.scene_cam.aspect = this.refContainer.current?.clientWidth / window.innerHeight;

      //For Ortho
      // this.scene_cam.left = -1 * window.innerWidth / this.divider;
      // this.scene_cam.right = window.innerWidth / this.divider;
      // this.scene_cam.top = window.innerHeight / this.divider;
      // this.scene_cam.bottom = -1 * window.innerHeight / this.divider;

      this.scene_cam.updateProjectionMatrix();

      //Render once after the projection matrix and camera details have changed.
      this.renderer.render(scene, this.scene_cam);
    }

    SetFocusState(state){
      this.isFocused = state;
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

    Destroy(){
      // Destroy everything?
      for(let i = 0; i < OBJECT_LIST.length; i++){
        OBJECT_LIST[i].Destroy();
      }
      this.renderer.dispose();
    }
  }
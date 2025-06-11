import * as THREE from 'three';
import { EulerToRad, easeInOutParabola } from '../ThreeJSHelpers';
import { BOID_BOUNDS } from '../StaticValues';
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { getScene } from '../MainAppEntrypoint';
import airplane from '../../media/models/airplane_fixed.glb';

export default class Boid{
    constructor(clock){
        this.HOVER_POSITION = 0;
        this.WAVELENGTH = Math.random() * 5;
        this.AMPLITUDE = 1;
        this.SPEED = 4;
        this.MAX_PITCH = 10;
        this.target = this.Retarget();

        new GLTFLoader().load(airplane, (obj) => {this.onLoad(obj)}, this.onLoading, this.onLoadError);
        // let objLoader = new OBJLoader();

        this.clock = clock;
        
        this.directionalVector = new THREE.Vector3(1, 0, -1); 
        console.log("load lol");
    }

    onLoad(gltf){
        //Setup the object.
        this.model_obj = gltf.scene;
        let material = new THREE.MeshStandardMaterial({ color: 0x0000FF });
        this.model_obj.material = material;

        // this.obj = new THREE.Mesh(mesh, material);
        this.model_obj.castShadow = true;
        this.model_obj.receiveShadow = true;
        this.model_obj.scale.set(2,2,2);
        this.model_obj.position.set(0, 0, 0);

        //Outer Object for positioning, irrespective of Rotation
        this.obj = new THREE.Object3D();

        this.obj.position.set(BOID_BOUNDS / 2, 0, BOID_BOUNDS / 2);
        this.obj.rotation.set(0, 0, 0);
        
        //add to Scene
        getScene().add(this.model_obj);
        getScene().add(this.obj);
        this.model_obj.parent = this.obj;
        
    }

    onLoading(xhr){
        console.log( (xhr.loaded / (xhr.total * 100)) + "% loaded");
    }

    onLoadError(error){
        console.log(error);
    }

    getObj(){
        return this.obj;
    }

    Update(delta){
        if(!this.obj){
            return;
        }

        this.model_obj.rotation.x = EulerToRad(this.MAX_PITCH * (-1) * easeInOutParabola(Math.sin(this.WAVELENGTH * this.clock.elapsedTime)));
        // this.obj.rotation.y += EulerToRad(90) * delta;

        // console.log(rotationToDirection);

        // this.directionalVector.x = Math.sin(this.clock.elapsedTime);
        //Bob up and down
        this.obj.position.y = this.HOVER_POSITION + (this.AMPLITUDE * easeInOutParabola(Math.sin(this.WAVELENGTH * this.clock.elapsedTime)));

        this.RotateModel();
        this.CheckTarget();
        this.Move(delta);
    }

    Retarget(){
        return new THREE.Vector3(Math.random() * BOID_BOUNDS, 0, Math.random() * BOID_BOUNDS)
    }
    
    RotateModel(){
        //Calc Y angle on directional vector.
        let rotationToDirection = Math.atan2(this.directionalVector.x, this.directionalVector.z);
        this.obj.rotation.y = rotationToDirection;
    }

    CheckTarget(){
        // this.directionalVector.lerp(this.target, 0.5);
        let xDiff = this.target.x - this.obj.position.x;
        let zDiff = this.target.z - this.obj.position.z;

        // Always take the path that doesn't jerk the movement directly behind the boid. 
        if(xDiff < 0){
            xDiff = this.obj.position.x - this.target.x;
        }
        if(zDiff < 0){
            zDiff = this.obj.position.z - this.target.z;
        }
        let intermediate = new THREE.Vector3(xDiff, 0, zDiff);
        intermediate.normalize();

        this.directionalVector.lerp(intermediate, 0.1);

        let distance = this.obj.position.distanceTo(this.target);
        if(distance < 0.4){
            this.target = this.Retarget();
        }

    }

    Move(delta){
        if(!this.obj){
            return;
        }

        this.obj.position.x += this.directionalVector.x * this.SPEED * delta;
        this.obj.position.z += this.directionalVector.z * this.SPEED * delta;

        // Check bounds and see where it's going
        if(this.obj.position.x > BOID_BOUNDS){
            //Where are we going?
            if (this.directionalVector.x > 0){
                //Going right
                this.obj.position.x = 0;
            }
            else{
                //Going left, set to right bound.
                this.obj.position.x = BOID_BOUNDS;
            }
        }
        else if (this.obj.position.x < 0){
            //Where are we going?
            if (this.directionalVector.x > 0){
                //Going right
                this.obj.position.x = 0;
            }
            else{
                //Going left, set to right bound.
                this.obj.position.x = BOID_BOUNDS;
            }
        }

        if(this.obj.position.z > BOID_BOUNDS){
            //Where are we going?
            if (this.directionalVector.z > 0){
                //Going down
                this.obj.position.z = 0;
            }
            else{
                //Going up, set to lower bound.
                this.obj.position.z = BOID_BOUNDS;
            }
        }
        else if (this.obj.position.z < 0){
            //Where are we going?
            if (this.directionalVector.z > 0){
                //Going right
                this.obj.position.z = 0;
            }
            else{
                //Going up, set to lower bound.
                this.obj.position.z = BOID_BOUNDS;
            }
        }
    }
}
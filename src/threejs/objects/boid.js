import * as THREE from 'three';
import { EulerToRad, easeInOutParabola } from '../ThreeJSHelpers';
import { BOID_BOUNDS } from '../StaticValues';
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { getScene, AddNewObject, MainObj } from '../MainAppEntrypoint';
import airplane from '../../media/models/airplane_fixed.glb';

export default class Boid{
    constructor(clock){
        this.HOVER_POSITION = 0;
        this.WAVELENGTH = Math.random() * 5;
        this.AMPLITUDE = 1;
        this.MIN_SPEED = 20;
        this.MAX_SPEED = 20;
        this.MAX_PITCH = 10;
        this.SCALE = 1;
        this.VISUAL_RANGE = 20;
        this.PROTECTED_RANGE = 2;
        this.CENTERING_FACTOR = 0.0005;
        this.MATCHING_FACTOR = 0.05;
        this.AVOID_FACTOR = 0.2;
        this.TURN_FACTOR = 50;
        this.BIAS_FACTOR = 0.02;

        this.target = this.Retarget();

        new GLTFLoader().load(airplane, (obj) => {this.onLoad(obj)}, this.onLoading, this.onLoadError);
        // let objLoader = new OBJLoader();

        this.clock = clock;
        
        this.directionalVector = new THREE.Vector3(1, 0, -1); 
        this.intermediateDirectionalVector = this.directionalVector;

        this.biasType = Math.trunc(Math.random() * 4);    
    }

    onLoad(gltf){
        //Setup the object.
        this.model_obj = gltf.scene;
        let material = new THREE.MeshStandardMaterial({ color: 0x0000FF });
        this.model_obj.material = material;

        // this.obj = new THREE.Mesh(mesh, material);
        this.model_obj.castShadow = true;
        this.model_obj.receiveShadow = true;
        this.model_obj.scale.set(this.SCALE, this.SCALE, this.SCALE);
        this.model_obj.position.set(0, 0, 0);

        //Outer Object for positioning, irrespective of Rotation
        this.obj = new THREE.Object3D();

        this.obj.position.set(Math.random() * BOID_BOUNDS, 0, Math.random() * BOID_BOUNDS);
        this.obj.rotation.set(0, 0, 0);
        
        //add to Scene
        getScene().add(this.model_obj);
        getScene().add(this.obj);
        this.model_obj.parent = this.obj;
        
        AddNewObject(this);
    }

    onLoading(xhr){
        console.log( xhr.loaded + " loaded");
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

        //Bob up and down
        this.obj.position.y = this.HOVER_POSITION + (this.AMPLITUDE * easeInOutParabola(Math.sin(this.WAVELENGTH * this.clock.elapsedTime)));

        this.RotateModel();
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

    Move(delta){
        if(!this.obj){
            return;
        }

        // We use Vector2 to not waste allocation, apply on X/Z from X/Y
        let posAvg = new THREE.Vector2();
        let velAvg = new THREE.Vector2();
        let neighbouringBoids = 0;
        let closeField = new THREE.Vector2();
        let visualRangeSquared = Math.pow(this.VISUAL_RANGE, 2);
        let protectedRangeSquared = Math.pow(this.PROTECTED_RANGE, 2);

        for(let i = 0; i < MainObj.boidList.length; i++){
            // Filter out own ID
            if (MainObj.boidList[i].id === this.id){
                continue;
            }

            let comparingBoid = MainObj.boidList[i];
            
            let dx = this.obj.position.x - comparingBoid.obj.position.x;
            let dy = this.obj.position.z - comparingBoid.obj.position.z;

            //Check if the differences are less than the visual range
            if(Math.abs(dx) < this.VISUAL_RANGE && Math.abs(dy) < this.VISUAL_RANGE){
                let squaredDistance = Math.pow(dx, 2) + Math.pow(dy, 2);
                
                //Check if the squared distance is less than the protected range
                if (squaredDistance < protectedRangeSquared){
                    closeField.x += this.obj.position.x - comparingBoid.obj.position.x;
                    closeField.y += this.obj.position.z - comparingBoid.obj.position.z;
                }
                else if (squaredDistance < visualRangeSquared){
                    posAvg.x += comparingBoid.obj.position.x;
                    posAvg.y += comparingBoid.obj.position.z;
                    velAvg.x += comparingBoid.directionalVector.x;
                    velAvg.y += comparingBoid.directionalVector.y;
                    neighbouringBoids += 1;
                }
            }
        }

        // Appropriately adjust the velocity based on neighboring boids
        if(neighbouringBoids > 0){
            posAvg.x = posAvg.x / neighbouringBoids;
            posAvg.y = posAvg.y / neighbouringBoids;
            velAvg.x = velAvg.x / neighbouringBoids;
            velAvg.y = velAvg.y / neighbouringBoids;

            this.directionalVector.x = this.directionalVector.x + 
                (posAvg.x - this.obj.position.x) * this.CENTERING_FACTOR +
                (velAvg.x - this.directionalVector.x) * this.MATCHING_FACTOR;
                
            this.directionalVector.z = this.directionalVector.z + 
                (posAvg.y - this.obj.position.z) * this.CENTERING_FACTOR +
                (velAvg.y - this.directionalVector.z) * this.MATCHING_FACTOR;
        }

        this.directionalVector.x = this.directionalVector.x + (closeField.x * this.AVOID_FACTOR);
        this.directionalVector.z = this.directionalVector.z + (closeField.y * this.AVOID_FACTOR);
    
        // Turn objects back towards the bounds
        if(this.obj.position.x > BOID_BOUNDS){
            this.directionalVector.x -= this.TURN_FACTOR * delta;
        }

        if(this.obj.position.x < 0){
            this.directionalVector.x += this.TURN_FACTOR * delta;
        }

        if(this.obj.position.z > BOID_BOUNDS){
            this.directionalVector.z -= this.TURN_FACTOR * delta;
        }

        if(this.obj.position.z < 0){
            this.directionalVector.z += this.TURN_FACTOR * delta;
        }

        //Apply Bias
        switch(this.biasType){
            case 0:
                this.directionalVector.x = (1 - this.BIAS_FACTOR) * this.directionalVector.x + (this.BIAS_FACTOR * 1);
                break;
            case 1:
                this.directionalVector.x = (1 - this.BIAS_FACTOR) * this.directionalVector.x + (this.BIAS_FACTOR * (-1));
                break;
            case 2:
                this.directionalVector.z = (1 - this.BIAS_FACTOR) * this.directionalVector.z + (this.BIAS_FACTOR * 1);
                break;
            case 3:
                this.directionalVector.z = (1 - this.BIAS_FACTOR) * this.directionalVector.z + (this.BIAS_FACTOR * (-1));
                break;
            default: 
                //Follow case 0
                this.directionalVector.z = (1 - this.BIAS_FACTOR) * this.directionalVector.x + (this.BIAS_FACTOR * 1);
                break;
        }


        //Calc speed for boid
        let speed = Math.sqrt(this.directionalVector.x * this.directionalVector.x + this.directionalVector.z * this.directionalVector.z);

        if(speed < this.MIN_SPEED){
            this.directionalVector.x = (this.directionalVector.x / speed) * this.MIN_SPEED;
            this.directionalVector.z = (this.directionalVector.z / speed) * this.MIN_SPEED;
        }
        if(speed > this.MAX_SPEED){
            this.directionalVector.x = (this.directionalVector.x / speed) * this.MAX_SPEED;
            this.directionalVector.z = (this.directionalVector.z / speed) * this.MAX_SPEED;
        }

        this.obj.position.x += this.directionalVector.x * delta;
        this.obj.position.z += this.directionalVector.z * delta;
    }
}
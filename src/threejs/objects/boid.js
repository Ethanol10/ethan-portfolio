import * as THREE from 'three';
import { EulerToRad } from '../ThreeJSHelpers';
import { BOID_BOUNDS } from '../StaticValues';
import { GLTFLoader, OBJLoader } from "three/examples/jsm/Addons.js";
import { getScene } from '../MainAppEntrypoint';
import airplane from '../../media/models/airplane.glb';

export default class Boid{
    constructor(clock){
        this.HOVER_POSITION = 0;
        this.WAVELENGTH = Math.random() * 10;
        this.AMPLITUDE = 1;
        this.SPEED = 4;

        new GLTFLoader().load(airplane, (obj) => {this.onLoad(obj)}, this.onLoading, this.onLoadError);
        // let objLoader = new OBJLoader();

        this.clock = clock;
        
        this.directionalVector = new THREE.Vector3(1,0,0); 
        console.log("load lol");
    }

    onLoad(gltf){
        //Setup the object.
        this.obj = gltf.scene;
        let material = new THREE.MeshStandardMaterial({ color: 0x0000FF });
        this.obj.material = material;

        // this.obj = new THREE.Mesh(mesh, material);
        this.obj.castShadow = true;
        this.obj.receiveShadow = true;
        this.obj.position.set(BOID_BOUNDS / 2, 0, BOID_BOUNDS / 2);
        this.obj.scale.set(2,2,2);
        
        //add to Scene
        getScene().add(this.obj);
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

        this.obj.rotation.x += EulerToRad(90) * delta;
        // this.obj.rotation.y += EulerToRad(90) * delta;
    
        //Bob up and down
        this.obj.position.y = this.HOVER_POSITION + (this.AMPLITUDE * Math.sin(this.WAVELENGTH * this.clock.elapsedTime));


        // this.Move(delta);
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
                
    }
}
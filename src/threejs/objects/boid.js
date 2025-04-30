import * as THREE from 'three';
import { EulerToRad } from '../ThreeJSHelpers';
import { BOID_BOUNDS } from '../StaticValues';

export default class Boid{
    constructor(clock){
        this.HOVER_POSITION = 0;
        this.WAVELENGTH = Math.random() * 10;
        this.AMPLITUDE = 1;
        this.SPEED = 4;

        console.log("selectedWavelength: ", this.WAVELENGTH);

        this.clock = clock;
        let geometry = new THREE.BoxGeometry(1, 1, 1);
        let material = new THREE.MeshStandardMaterial({ color: 0x0000FF });
        this.obj = new THREE.Mesh(geometry, material);
        this.obj.castShadow = true;
        this.obj.receiveShadow = true;
        this.obj.position.set(BOID_BOUNDS / 2, 0, BOID_BOUNDS / 2);
        
        this.directionalVector = new THREE.Vector3(1,0,0); 
    }

    getObj(){
        return this.obj;
    }

    Update(delta){
        this.obj.rotation.x += EulerToRad(90) * delta;
        this.obj.rotation.y += EulerToRad(90) * delta;
    
        //Bob up and down
        // this.obj.position.y = this.HOVER_POSITION + (this.AMPLITUDE * Math.sin(this.WAVELENGTH * this.clock.elapsedTime));
        this.Move(delta);
    }

    Move(delta){
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
import * as THREE from 'three';
import { MAX_TARGET_HIT, BOID_BOUNDS } from '../StaticValues';
import { MainObj, AddNewObject } from '../MainAppEntrypoint';

export class Target{
    constructor(){
        this.position = new THREE.Vector3();
        this.Retarget();

        this.MAXHIT = MAX_TARGET_HIT;
        this.RANGE = 3;
        this.countHit = 0;

        AddNewObject(this);        
    }
    
    Retarget(){
        this.position = new THREE.Vector3(Math.random() * BOID_BOUNDS, 0, Math.random() * BOID_BOUNDS)
        this.countHit = 0;
    }

    IncrementHit(){
        this.countHit += 1;
    }

    Update(){
        if(this.countHit >= this.MAXHIT){
            this.Retarget();
        }
    }

    FixedUpdate(){
        for(let i = 0; i < MainObj.boidList.length; i++){
            let boidObj = MainObj.boidList[i];
            try{
                if(this.position.distanceTo(boidObj.obj.position) < this.RANGE){
                    this.IncrementHit();
                }
            }
            catch ({name, message}){
                if(name !== "TypeError"){
                    console.log(name, message);
                }
            }
        }
    }
    
}
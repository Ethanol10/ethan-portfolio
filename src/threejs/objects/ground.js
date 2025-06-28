import * as THREE from 'three';
import { EulerToRad } from '../ThreeJSHelpers';
import { BOID_BOUNDS } from '../StaticValues';
import { getScene } from '../MainAppEntrypoint';

export default class Ground{
    constructor(){
        let groundGeometry = new THREE.PlaneGeometry(1, 1, 1);
        let groundMaterial = new THREE.MeshPhongMaterial({color: 0xd1ffbd});
        this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
        this.ground.receiveShadow = true;

        this.bounds = BOID_BOUNDS;
        this.BOUND_FACTOR = 20;
        this.ground.position.set(this.bounds / 2, -2, this.bounds / 2);
        this.ground.scale.set(BOID_BOUNDS * this.BOUND_FACTOR , BOID_BOUNDS *this.BOUND_FACTOR , BOID_BOUNDS * this.BOUND_FACTOR );
        this.ground.rotation.x = EulerToRad(270);
        //Bounds start from 0,0

        /*
            e.g size 10, across X/Z
      (0, 0)_ _ _ _ _ _ _ _ _ _ (10,0)
            |                   |
            |                   |
            |                   |
            |                   |   
            |       (5,5)       |
            |                   |   
            |                   |
            |                   |           
            |                   |
            |_ _ _ _ _ _ _ _ _ _|
        (0, 10)                 (10, 10)
        */

        getScene().add(this.ground);
    }

    getBounds(){
        return this.bounds;
    }

    getCenterPoint(){
        return new THREE.Vector2(this.bounds/2, this.bounds/2);
    }

    getObj(){
        return this.ground;
    }

    Update(delta){
        
    }
}
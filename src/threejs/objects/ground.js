import * as THREE from 'three';
import { EulerToRad } from '../ThreeJSHelpers';

export default class Ground{
    constructor(clock){
        this.clock = clock;
        let groundGeometry = new THREE.PlaneGeometry(1, 1, 1);
        let groundMaterial = new THREE.MeshStandardMaterial({color: 0xd1ffbd});
        this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
        this.ground.receiveShadow = true;
        this.ground.position.set(0, -2, 0);
        this.ground.scale.set(30, 30, 30);
        this.ground.rotation.x = EulerToRad(-90);
    }

    getBounds(){

    }

    getObj(){
        return this.ground;
    }

    Update(delta){
        
    }
}
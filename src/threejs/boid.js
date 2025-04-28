import * as THREE from 'three';
import { EulerToRad, isNumber } from './ThreeJSHelpers';

export default class Boid{
    constructor(){
        //Create the Object
        let geometry = new THREE.BoxGeometry(1, 1, 1);
        let material = new THREE.MeshStandardMaterial({ color: 0x0000FF });
        this.obj = new THREE.Mesh(geometry, material);
        this.obj.castShadow = true;
        this.obj.receiveShadow = true;
        this.obj.position.set(2,0,0);
    }

    GetBoidObj(){
        return this.obj;
    }

    Update(delta){
      this.obj.rotation.x += EulerToRad(90) * delta;
      this.obj.rotation.y += EulerToRad(90) * delta;
    }
}
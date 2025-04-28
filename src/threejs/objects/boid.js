import * as THREE from 'three';
import { EulerToRad } from '../ThreeJSHelpers';

export default class Boid{
    constructor(clock){
        this.HOVER_POSITION = 0;
        this.WAVELENGTH = Math.random() * 10;
        this.AMPLITUDE = 1;

        console.log("selectedWavelength: ", this.WAVELENGTH);

        this.clock = clock;
        let geometry = new THREE.BoxGeometry(1, 1, 1);
        let material = new THREE.MeshStandardMaterial({ color: 0x0000FF });
        this.obj = new THREE.Mesh(geometry, material);
        this.obj.castShadow = true;
        this.obj.receiveShadow = true;
        this.obj.position.set(2,0,0);
    }

    getObj(){
        return this.obj;
    }

    Update(delta){
        this.obj.rotation.x += EulerToRad(90) * delta;
        this.obj.rotation.y += EulerToRad(90) * delta;
    
        //Bob up and down
        this.obj.position.y = this.HOVER_POSITION + (this.AMPLITUDE * Math.sin(this.WAVELENGTH * this.clock.elapsedTime));
    }
}
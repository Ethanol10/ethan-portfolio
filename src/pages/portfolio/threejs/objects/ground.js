import * as THREE from 'three';
import { EulerToRad } from '../ThreeJSHelpers';
import { BOID_BOUNDS } from '../StaticValues';
import { getScene, getClock, AddNewObject } from '../MainAppEntrypoint';
import { generatePerlinNoise } from '../ThreeJSHelpers';
// import { fragShader } from '../shader/groundshaderfrag';
// import { vertexShader } from '../shader/groundshadervert'; 

export default class Ground{
    constructor(){
        let groundGeometry = new THREE.PlaneGeometry(1, 1, 1000, 1000);
        // groundGeometry.rotateX(EulerToRad(-90));
        this.groundMaterial = new THREE.MeshStandardMaterial({color: 0xd1ffbd});
        this.perlinTex = generatePerlinNoise(256, 256);
        this.clock = getClock();
        //material modification
        this.groundMaterial.onBeforeCompile = (shader) => {
            shader.vertexShader = `
                uniform float time;
            ` + shader.vertexShader;

            // shader.vertexShader = shader.vertexShader.replace(
            //     "#include <begin_vertex>", 
            //     `
            //         // BEGIN custom pillar displacement
            //         vec3 transformed = vec3(position);

            //         float blockSize = 1.0;
            //         float bx = floor(transformed.x / blockSize);
            //         float bz = floor(transformed.z / blockSize);

            //         // Simple pillar height pattern
            //         float pillarHeight = mod(bx + bz, 2.0) * 2.0;

            //         // Animate height
            //         pillarHeight *= sin(time + bx * 0.5 + bz * 0.5);

            //         transformed.y += pillarHeight;
            //         // END custom pillar displacement
            //     `
            // )
        }
        
        this.ground = new THREE.Mesh(groundGeometry, this.groundMaterial);
        this.ground.receiveShadow = true;

        this.bounds = BOID_BOUNDS;
        this.BOUND_FACTOR = 20;
        this.ground.position.set(this.bounds / 2, -2, this.bounds / 2);
        this.ground.scale.set(BOID_BOUNDS * this.BOUND_FACTOR , BOID_BOUNDS *this.BOUND_FACTOR , BOID_BOUNDS * this.BOUND_FACTOR );
        this.ground.rotation.x = EulerToRad(270);
        //Bounds start from 0,0]

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
        AddNewObject(this);
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

    Destroy(){
        if(this.groundMaterial !== null){
            this.groundMaterial?.dispose();
        }
    }

    FixedUpdate(delta){
        if(this.clock){
            this.groundMaterial.uniforms = {
                time: { value: this.clock.getElapsedTime() }
            };
        }
    }

    Update(delta){

    }
}
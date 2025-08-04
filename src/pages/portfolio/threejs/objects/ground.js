import * as THREE from 'three';
import { EulerToRad } from '../ThreeJSHelpers';
import { BOID_BOUNDS, BOID_COUNT } from '../StaticValues';
import { getScene, getClock, AddNewObject, MainObj } from '../MainAppEntrypoint';
import { generatePerlinNoise } from '../ThreeJSHelpers';
// import { fragShader } from '../shader/groundshaderfrag';
// import { vertexShader } from '../shader/groundshadervert'; 

export default class Ground{
    constructor(){
        let groundGeometry = new THREE.PlaneGeometry(1, 1, 1000, 1000);
        groundGeometry.rotateX(EulerToRad(-90));
        this.groundMaterial = new THREE.MeshStandardMaterial({color: 0xd1ffbd});
        // this.groundMaterial.wireframe = true;
        this.perlinTex = generatePerlinNoise(256, 256);
        this.clock = getClock();
        this.positionsArray = new Float32Array(BOID_COUNT * 3);
        //material modification
        this.groundMaterial.onBeforeCompile = (shader) => {
            shader.vertexShader = `
                #define BOID_POINT_MAX ${BOID_COUNT}
                uniform float time;
                uniform vec3 pointList[BOID_POINT_MAX];
                uniform int pointCount;

                float getProximity(vec3 worldPos) {
                    float influence = 0.0;
                    for (int i = 0; i < BOID_POINT_MAX; i++) {
                        if (i >= pointCount) break;
                        float dist = distance(worldPos.xz, pointList[i].xz);
                        influence += 1.0 / (1.0 + dist);
                    }
                    return influence;
                }
            ` + shader.vertexShader;

            shader.vertexShader = shader.vertexShader.replace(
                "#include <begin_vertex>", 
                `
                    vec3 transformed = vec3(position);

                    float blockSize = 0.002;
                    float blockX = floor(transformed.x / blockSize);
                    float blockZ = floor(transformed.z / blockSize);

                    // Simple pillar height pattern
                    float initHeight = 0.001;
                    // float pillarHeight = mod(blockX + blockZ, 2.0) * initHeight;
                    float pillarHeight = mod(blockX + blockZ, 2.0) * getProximity(vec3(blockX, 0, blockZ)); 

                    // // Animate height
                    // // pillarHeight *= sin(time + blockX * 0.5 + blockZ * 0.5);

                    transformed.y += pillarHeight;
                `
            )
        }
        
        this.ground = new THREE.Mesh(groundGeometry, this.groundMaterial);
        this.ground.receiveShadow = true;

        this.bounds = BOID_BOUNDS;
        this.BOUND_FACTOR = 20;
        this.ground.position.set(this.bounds / 2, -5, this.bounds / 2);
        this.ground.scale.set(BOID_BOUNDS * this.BOUND_FACTOR , BOID_BOUNDS *this.BOUND_FACTOR , BOID_BOUNDS * this.BOUND_FACTOR );
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

    updateBoidPositions(){
        for(let i = 0; i < MainObj.boidList.length; i++){
            if(MainObj.boidList[i].position === undefined){
                continue;
            }
            let worldPos = MainObj.boidList[i].getWorldPosition();
            this.positionsArray[i * 3] = worldPos.x;
            this.positionsArray[i * 3 + 1] = worldPos.y;
            this.positionsArray[i * 3 + 2] = worldPos.z;
        }
    }

    FixedUpdate(delta){
        this.updateBoidPositions();
        
        if(this.clock){
            this.groundMaterial.uniforms = {
                time: { value: this.clock.getElapsedTime() },
                pointList: { value: this.positionsArray },
                pointCount: { value: MainObj.boidList.length } 
            };
        }
    }

    Update(delta){

    }
}
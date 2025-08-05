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
        this.groundMaterial = new THREE.MeshStandardMaterial({color: 0x69a1d6});
        // this.groundMaterial.wireframe = true;
        this.perlinTex = generatePerlinNoise(256, 256);
        this.clock = getClock();
        this.positionsArray = new Float32Array(BOID_COUNT * 3);
        //material modification
        this.groundMaterial.onBeforeCompile = (shader) => {
            this.groundMaterial.userData.shader = shader;
            shader.uniforms.pointList = { value: this.positionsArray };
            shader.uniforms.time = { value: this.clock.getElapsedTime()};
            shader.uniforms.pointCount = { value: BOID_COUNT};
            shader.vertexShader = `
                #define BOID_POINT_MAX ${BOID_COUNT}
                uniform float time;
                uniform vec3 pointList[BOID_POINT_MAX];
                uniform int pointCount;

                varying float vInfluence;
            ` + shader.vertexShader;

            shader.vertexShader = shader.vertexShader.replace(
                "#include <begin_vertex>", 
                `
                    vec3 transformed = vec3(position);                    
                    vec4 worldPos = modelMatrix * vec4(transformed, 1.0);

                    float blockSize = 3.0;
                    float bx = floor(transformed.x / blockSize);
                    float bz = floor(transformed.z / blockSize);
                    float worldBx = floor(worldPos.x / blockSize);
                    float worldBz = floor(worldPos.z / blockSize);

                    float influence = 0.0;
                    
                    vec2 cellCenterWorld = vec2(
                        (worldBx + blockSize * 0.5) * blockSize,
                        (worldBz + blockSize * 0.5) * blockSize
                    );

                    vec2 cellCenter = vec2(
                        (bx + (blockSize * 0.5)) * blockSize,
                        (bz + (blockSize * 0.5)) * blockSize
                    );

                    for (int i = 0; i < BOID_POINT_MAX; i++) {
                        if(i >= pointCount) break;
                        float dist = distance(cellCenterWorld, pointList[i].xz);
                        influence += 1.0 / (1.0 + dist * dist); // inverse-square falloff
                    }

                    vInfluence = influence;
                    transformed.y += influence * 0.002;
                `
            );

            shader.fragmentShader = `
                varying float vInfluence;
            ` + shader.fragmentShader;

            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <map_fragment>',
                `
                    #ifdef USE_MAP
                        vec4 texelColor = texture2D( map, vMapUv );
                        texelColor = mapTexelToLinear( texelColor );
                        diffuseColor *= texelColor;
                    #endif

                    // Posterize based on influence
                    float levels = 3.0;
                    float posterizeVal = floor(vInfluence * levels) / levels;
                    
                    //Remap to complimentary colour;
                    float compR = abs(diffuseColor.r - 1.0);
                    float compG = abs(diffuseColor.g - 1.0);
                    float compB = abs(diffuseColor.b - 1.0);
                    diffuseColor.rgb = mix(diffuseColor.rgb, vec3(compR, compG, compB), posterizeVal);
                `
            );
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
            if(!MainObj.boidList[i].isInitialized){
                continue;
            }
            
            if(MainObj.boidList[i].obj === undefined){
                continue;
            }

            let worldPos = new THREE.Vector3();
            // MainObj.boidList[i].obj.getWorldPosition(worldPos);
            worldPos = MainObj.boidList[i].obj.position;
            if(worldPos === undefined){
                continue;
            }
            this.positionsArray[i * 3] = worldPos.x;
            this.positionsArray[i * 3 + 1] = worldPos.y;
            this.positionsArray[i * 3 + 2] = worldPos.z;
        }
    }

    FixedUpdate(delta){
        this.updateBoidPositions();
        
        if(this.clock){
            if(this.groundMaterial.userData.shader){
                this.groundMaterial.userData.shader.uniforms = {
                    time: { value: this.clock.getElapsedTime() },
                    pointList: { value: this.positionsArray },
                    pointCount: { value: MainObj.boidList.length } 
                }
            }
            this.groundMaterial.needsUpdate = true;
        }
    }

    Update(delta){

    }
}
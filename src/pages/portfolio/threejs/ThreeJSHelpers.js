import { Noise } from 'noisejs';
import * as THREE from "three";

export const EulerToRad = (input) => {
    return (input * Math.PI) / 180; 
}

export const RadToEuler = (input) => {
    return (input * 180) / Math.PI;
}

export var isNumber = function isNumber(value) {
   return typeof value === 'number' && isFinite(value);
}

export const easeInOutParabola = (progress, offset = 0) => {
    let shouldInvert = progress < 0; 
    let result = 0;
    let absoluteProgress = Math.abs(progress);

    result = Math.pow(absoluteProgress + offset, 1/1.4);

    if (shouldInvert){
        return (-1) * result;
    }

    return result;
}

//Can be a value from -1 to 1, treat 
export const easeInOutQuint = (progress) => {
    let shouldInvert = progress < 0; 
    let result = 0;
    let absoluteProgress = Math.abs(progress);

    if (absoluteProgress < 0.5){
        result = 16 * Math.pow(absoluteProgress, 5);
    }
    else{
        result = 1 - Math.pow(-2 * absoluteProgress + 2, 5) / 2;
    }

    if (shouldInvert){
        return (-1) * result;
    }

    return result;
}


export function generatePerlinNoise(width = 256, height= 256){
    const noise = new Noise(Math.random());
    const size = width * height;
    const data = new Uint8Array(size * 4); // store the values in here, each bit is RGBA
    let i = 0;

    for (let x = 0; x < width; x ++){
        for(let y = 0; y < height; y++){
            //normalize the value between 0 - 255
            const value = Math.floor((noise.perlin2(x / 50, y / 50) + 1) * (255/2) );
            data[i++] = value;
            data[i++] = value;
            data[i++] = value;
            data[i++] = 255;
            // R G B then A
        }
    }

    const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
    texture.needsUpdate = true;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    return texture;
}
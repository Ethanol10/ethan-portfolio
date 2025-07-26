import * as THREE from 'three';
import arid_ft from '../../media/textures/skybox_arid/arid2_ft.jpg';
import arid_bk from '../../media/textures/skybox_arid/arid2_bk.jpg';
import arid_up from '../../media/textures/skybox_arid/arid2_up.jpg';
import arid_dn from '../../media/textures/skybox_arid/arid2_dn.jpg';
import arid_rt from '../../media/textures/skybox_arid/arid2_rt.jpg';
import arid_lf from '../../media/textures/skybox_arid/arid2_lf.jpg';
import { getScene } from '../MainAppEntrypoint';


export default class Skybox{
    constructor() {
        this.materialArray = [];
        let texture_ft = new THREE.TextureLoader().load(arid_ft);
        let texture_bk = new THREE.TextureLoader().load(arid_bk);
        let texture_up = new THREE.TextureLoader().load(arid_up);
        let texture_dn = new THREE.TextureLoader().load(arid_dn);
        let texture_rt = new THREE.TextureLoader().load(arid_rt);
        let texture_lf = new THREE.TextureLoader().load(arid_lf);
        
        this.materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
        this.materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
        this.materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
        this.materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
        this.materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
        this.materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

        for (let i = 0; i < 6; i++){
            this.materialArray[i].side = THREE.BackSide;
        }

        let skyboxGeo = new THREE.BoxGeometry(1500, 1500, 1500);
        this.skybox = new THREE.Mesh(skyboxGeo, this.materialArray);

        getScene().add(this.skybox);
        this.skybox.position.set(0, -250, 0);
    }

    Destroy(){
        for(let i = 0; i < this.materialArray.length; i++){
            if(this.materialArray[i] !== null){
                this.materialArray[i]?.dispose();
            }
        }
    }
}
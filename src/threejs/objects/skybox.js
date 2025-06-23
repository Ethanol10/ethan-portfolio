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
        let materialArray = [];
        let texture_ft = new THREE.TextureLoader().load(arid_ft);
        let texture_bk = new THREE.TextureLoader().load(arid_bk);
        let texture_up = new THREE.TextureLoader().load(arid_up);
        let texture_dn = new THREE.TextureLoader().load(arid_dn);
        let texture_rt = new THREE.TextureLoader().load(arid_rt);
        let texture_lf = new THREE.TextureLoader().load(arid_lf);
        
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

        for (let i = 0; i < 6; i++){
            materialArray[i].side = THREE.BackSide;
        }

        let skyboxGeo = new THREE.BoxGeometry(1500, 1500, 1500);
        this.skybox = new THREE.Mesh(skyboxGeo, materialArray);

        getScene().add(this.skybox);
        this.skybox.position.set(0, -250, 0);
    }
}
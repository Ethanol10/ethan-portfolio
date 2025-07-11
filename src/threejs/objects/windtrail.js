import * as THREE from 'three';
import { getScene, AddNewObject, MainObj, getClock } from '../MainAppEntrypoint';

export class Windtrail{
    constructor(){
        // Generate Texture with transparent edges
        let canvas = document.createElement( 'CANVAS' );
        canvas.width = 64;
        canvas.height = 8;
        
        // setup context
        let context = canvas.getContext( '2d' );

        // Set gradient on texture
        let gradient = context.createLinearGradient( 0, 0, 64, 0 );
        gradient.addColorStop( 0.0, 'rgba(255,255,255,0)' );
        gradient.addColorStop( 0.5, 'rgba(255,255,255,128)' );
        gradient.addColorStop( 1.0, 'rgba(255,255,255,0)' );
        context.fillStyle = gradient;
        context.fillRect( 0, 0, 64, 8 );

        let texture = new THREE.CanvasTexture( canvas );

        //Create the line mesh
        this.line = new THREE.Mesh(
            new THREE.PlaneGeometry( 1, 1, 20, 1 ), // Create a 1x1 tex with 20 segments in the width, and 1 in the height
            new THREE.MeshBasicMaterial( {
                map: texture,
                side:THREE.DoubleSide,
                transparent: true,
                depthWrite: false,
            }
        ));
		this.line.pos = this.line.geometry.getAttribute( 'position' );
		this.line.rnda = Math.random();
		this.line.rndb = Math.random();
		this.line.rndc = Math.random();
		this.line.rndd = Math.random();

        this.target = null;

        getScene().add(this.line);
        AddNewObject(this);
    }

    Update(delta){
		for( let i=0; i<43; i++ )
		{
            // Go through each of the slices on the mesh, and set the positions accordingly.
            // I think we should store the last no of positions and apply it to the mesh positions.

            if (this.target !== null){
                let x = this.target.position.x;
                let y = this.target.position.y;
                let z = this.target.position.z;
                // var t = delta + (i%21)/60;
                // var x = 4*Math.sin( 5*this.line.rnda*t + 6*this.line.rndb );
                // var y = 4*Math.cos( 5*this.line.rndc*t + 6*this.line.rndd );
                // var z = elevation( x, y ) + 0.5 + 0.04*(i>20?1:-1)*Math.cos((i%21-10)/8);
                this.line.pos.setXYZ( i, x, z, -y );
            }
		}
        // console.log(this.target.position.x);
		this.line.pos.needsUpdate = true;
    }

    FixedUpdate(delta){

    }
}
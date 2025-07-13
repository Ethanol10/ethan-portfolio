import * as THREE from 'three';
import { getScene, AddNewObject, getClock } from '../MainAppEntrypoint';
import { SimplexNoise } from 'three/examples/jsm/Addons.js';

export class Windtrail{
    constructor(){
        // Generate Texture with transparent edges
        let canvas = document.createElement( 'canvas' );
        canvas.width = 64;
        canvas.height = 8;
        this.clock = getClock();
        this.AMPLITUDE = 5;

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
                // color: 0xffffff,
                side:THREE.DoubleSide,
                transparent: false,
                // depthWrite: false,
            }
        ));
		this.line.pos = this.line.geometry.getAttribute( 'position' );
		this.line.rnda = Math.random();
		this.line.rndb = Math.random();
		this.line.rndc = Math.random();
		this.line.rndd = Math.random();
        this.simplex = new SimplexNoise();

        this.boid_target = null;

        this.target_trail = [];

        getScene().add(this.line);
        AddNewObject(this);
        this.stopwatch = 0;
    }

    Elevation( x, y )
    {
        if( x*x > 24.9 ) return -1;
        if( y*y > 24.9 ) return -1;

        let major = 0.6 * this.simplex.noise( 0.1*x, 0.1*y );
        let minor = 0.2 * this.simplex.noise( 0.3*x, 0.3*y );

        return major + minor;
    }


    Update(delta){
        if(this.boid_target === null){
            // Record the previous positions
            // play them back sequentially in an array of 20 elements that constantly shift
            return;
        }        
        
        for( let i=0; i<43; i++ )
		{
            // Go through each of the slices on the mesh, and set the positions accordingly.
            // I think we should store the last no of positions and apply it to the mesh positions.
            // let time = this.clock.elapsedTime;
            if(i > this.target_trail.length - 1){
                continue;
            }
            
            let x = this.target_trail[this.target_trail.length - 1 - i].x;
            let y = this.target_trail[this.target_trail.length - 1- i].y;
            let z = this.target_trail[this.target_trail.length - 1- i].z;
            this.line.pos.setXYZ( i, x, y, z );
		}
        
        this.line.pos.needsUpdate = true;
    }

    FixedUpdate(delta){
        //Check the list and update it every FixedUpdate
        if(this.boid_target === null){
            return;
        }

        this.stopwatch += delta;

        if(this.stopwatch >= 1 / 15){
            this.stopwatch = 0;

            // Push a new element every 1/30th of a second.
            this.target_trail.push(this.boid_target.obj.position);

            this.inc += 1;

            // console.log(this.boid_target.obj.position);
            
            if(this.target_trail.length > 60){
                this.target_trail.shift();
                //console.log(this.target_trail);
            }
        }
    }
}
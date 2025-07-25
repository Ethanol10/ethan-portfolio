import * as THREE from 'three';
import { getScene, AddNewObject, getClock } from '../MainAppEntrypoint';

export class Windtrail{
    constructor(color){
        // Generate Texture with transparent edges
        let canvas = document.createElement( 'canvas' );
        canvas.width = 64;
        canvas.height = 8;
        this.clock = getClock();
        this.AMPLITUDE = 5;
        this.THICKNESS = 0.25;

        if (color === null){
            this.color = 0xffffff; // Default to white if no color is provided
        }

        // setup context
        let context = canvas.getContext( '2d' );

        // Set gradient on texture
        let gradient = context.createLinearGradient( 0, 0, canvas.width, canvas.height );
        gradient.addColorStop( 0.0, '#' + color + "FF");
        gradient.addColorStop( 0.5, '#' + color + "AA");
        gradient.addColorStop( 1.0, '#' + color + "00");
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
                transparent: true,
                // depthWrite: false,
            }
        ));
        this.line.frustumCulled = false;
		this.line.pos = this.line.geometry.getAttribute( 'position' );

        this.boid_target = null;

        this.target_trail = [];

        getScene().add(this.line);
        AddNewObject(this);
        this.stopwatch = 0;
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

            if (i > this.target_trail.length - 1){
                let x = this.target_trail[0].x;
                let y = this.target_trail[0].y;
                let z = this.target_trail[0].z;
                // Set it to the last valid position if we don't have enough trail data
                this.line.pos.setXYZ( i, x, y, z );
                continue;
            }        

            if(i === 0){
                // Set the first position to the current target position
                this.line.pos.setXYZ( i, this.boid_target.obj.position.x, this.boid_target.obj.position.y, this.boid_target.obj.position.z );
                continue;
            }
            if (i === 21){
                // Set the middle position to the current target position
                this.line.pos.setXYZ( i, this.boid_target.obj.position.x, this.boid_target.obj.position.y, this.boid_target.obj.position.z );
                continue;
            }
            
            let thickness = THREE.MathUtils.lerp(1, 0, i > 20 ? (i - 20) / 20 : i / 20) * this.THICKNESS;
            
            let x = this.target_trail[this.target_trail.length - 1 - i].x;
            let y = this.target_trail[this.target_trail.length - 1 - i].y + thickness;
            let z = this.target_trail[this.target_trail.length - 1 - i].z;

            if(i > 20){
                // Apply an offset to the y position to create a clear trail width.
                y = this.target_trail[this.target_trail.length - 1 - i + 20].y - thickness;
                x = this.target_trail[this.target_trail.length - 1 - i + 20].x;
                z = this.target_trail[this.target_trail.length - 1 - i + 20].z;
            }

            this.line.pos.setXYZ( i, x, y, z );
            
		}
        
        // if(this.target_trail.length > 50){
        //     console.log(this.boid_target.obj.position.distanceTo(this.target_trail[this.target_trail.length - 1 - 42]), this.target_trail[0].x, this.boid_target.obj.position.x);
        // }

        this.line.pos.needsUpdate = true;
    }

    FixedUpdate(delta){
        //Check the list and update it every FixedUpdate
        if(this.boid_target === null){
            return;
        }

        this.stopwatch += delta;

        if(this.stopwatch >= 1 / 60){
            this.stopwatch = 0;

            // Push a new element every 1/30th of a second.
            this.target_trail.push(new THREE.Vector3(this.boid_target.obj.position.x, this.boid_target.obj.position.y, this.boid_target.obj.position.z));

            this.inc += 1;

            // console.log(this.boid_target.obj.position);
            
            if(this.target_trail.length > 60){
                this.target_trail.shift();
                //console.log(this.target_trail);
            }
        }
    }
}
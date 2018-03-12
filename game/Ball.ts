import * as ex from "excalibur";
import {Resources} from "./Resources";

export class Ball extends ex.Actor {

    constructor(x: number, y: number) {
        super(x, y, 20, 20, ex.Color.Red);

        this.collisionType = ex.CollisionType.Passive;

        this.vel.setTo(100, 100);

        // On collision remove the brick, bounce the ball
        this.on('precollision', (ev) => {
            this.onCollision(ev);
        });
    }

    update(engine: ex.Engine, delta: number) {
        super.update(engine, delta);

        // If the ball collides with the left side
        // of the screen reverse the x velocity
        if (this.pos.x < (this.getWidth() / 2)) {
            this.vel.x *= -1;
        }

        // If the ball collides with the right side
        // of the screen reverse the x velocity
        if (this.pos.x + (this.getWidth() / 2) > 1024) {
            this.vel.x *= -1;
        }

        // If the ball collides with the top
        // of the screen reverse the y velocity
        if (this.pos.y < (this.getHeight() / 2)) {
            this.vel.y *= -1;
        }

        // If the ball collides with the top
        // of the screen reverse the y velocity
        if (this.pos.y + (this.getHeight() / 2) > 768) {
            this.vel.y *= -1;
        }
    }

    draw(ctx: CanvasRenderingContext2D, delta: number) {
        //super.draw(ctx, delta);

        // Custom draw code
        ctx.fillStyle = this.color.toString();
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    onCollision(ev) {
        //if (bricks.indexOf(ev.other) > -1) {
            // kill removes an actor from the current scene
            // therefore it will no longer be drawn or updated
            //ev.other.kill();
        //}

        // reverse course after any collision
        // intersections are the direction body A has to move to not be clipping body B
        // `ev.intersection` is a vector `normalize()` will make the length of it 1
        // `negate()` flips the direction of the vector
        let intersection = ev.intersection.normalize();

        // The largest component of intersection is our axis to flip
        if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
            this.vel.x *= -1;
        } else {
            this.vel.y *= -1;
        }
    }
}
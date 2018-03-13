import * as ex from "excalibur";
import {Resources} from "./Resources";
import {Brick} from "./Brick";
import {Ball} from "./Ball";
import {Panel} from "./Panel";
import {Position, Config} from "./Config";

export class Shot extends ex.Actor {

    private bricks: Array<Brick>; 
    private creator: Panel;

    constructor(x: number, y: number, bricks: Array<Brick>, creator: Panel) {
        super(x, y, Config.Bulletsize, Config.Bulletsize, creator.color.clone());

        this.bricks = bricks;
        this.creator = creator;
        this.collisionType = ex.CollisionType.Passive;

        if (this.creator.position === Position.Left) {
            this.vel.setTo(Config.Bulletspeed, 0);
        } else if (this.creator.position === Position.Right) {
            this.vel.setTo(-Config.Bulletspeed, 0);
        }

        this.on('precollision', (ev) => {
            this.onCollision(ev);
        });
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
        if (this.bricks.indexOf(ev.other) > -1) {
            ev.other.kill();
        }

        this.kill();
    }
}
import * as ex from "excalibur";
import {Resources} from "./Resources";

export class Brick extends ex.Actor {
    constructor(x, y, w, h, color) {
        super(x, y, w, h, color);

        this.anchor.setTo(.5, .5);
        this.collisionType = ex.CollisionType.Active;
    }
}
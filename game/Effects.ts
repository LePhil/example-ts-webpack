import * as ex from "excalibur";
import {Resources} from "./Resources";
import {Config, PlayerPosition} from "./Config";
import { Vector } from "excalibur";

class Effect extends ex.Actor {
    protected _duration: number;
    protected _autoplay: boolean;
    protected emitter: ex.ParticleEmitter;

    // defaults: at 0|0, infinite and starting immediately
    constructor(pos: ex.Vector = new ex.Vector(0,0), duration: number = 0, autoplay: boolean = true) {
        super(pos.x, pos.y, 0, 0);
        this.anchor.setTo(0,0);
        this._duration = duration;
        this._autoplay = autoplay;
    }

    public pause(): void {
        if (this.emitter) {
            this.emitter.isEmitting = false;
        }
    }

    public play(): void {
        if (this.emitter) {
            this.emitter.isEmitting = true;
        }
    }
}

class WaterBubbleEffect extends Effect {
    onInitialize(engine: ex.Engine): void {
        this.emitter = new ex.ParticleEmitter(this.pos.x, this.pos.y);

        this.emitter.emitterType = ex.EmitterType.Circle;
        this.emitter.radius = 14;
        this.emitter.minVel = 19;
        this.emitter.maxVel = 90;
        this.emitter.minAngle = 0;
        this.emitter.maxAngle = 6.2;
        this.emitter.emitRate = 84;
        this.emitter.opacity = 0.5;
        this.emitter.fadeFlag = false;
        this.emitter.particleLife = 1328;
        this.emitter.maxSize = 17;
        this.emitter.minSize = 1;
        this.emitter.startSize = 1;
        this.emitter.endSize = 12;
        this.emitter.acceleration = new ex.Vector(0, 0);
        this.emitter.beginColor = ex.Color.Blue;
        this.emitter.endColor = ex.Color.Transparent;
        this.emitter.isEmitting = this._autoplay;

        if (this._duration > 0) {
            setTimeout(() => {
                    this.emitter.isEmitting = false;
                    this.emitter.kill();
                    this.kill();
                }, this._duration * 1000
            );
        }
    }
}

export class TrailEffect extends Effect {
    private origin: PlayerPosition;

    constructor(x, y, origin: PlayerPosition) {
        super(new Vector(x,y), 0, true);
        this.origin = origin;        
    }

    onInitialize(engine: ex.Engine): void {
        this.emitter = new ex.ParticleEmitter(0, 0, 10, 10);
        this.emitter.emitterType = ex.EmitterType.Circle;
        this.emitter.radius = 10;
        this.emitter.minVel = 100;
        this.emitter.maxVel = 200;

        if (this.origin === PlayerPosition.Left) {
            this.emitter.minAngle = 3.5;
            this.emitter.maxAngle = 2.7;
            this.emitter.acceleration = new ex.Vector(-481, 0);
        } else if (this.origin === PlayerPosition.Right) {
            this.emitter.minAngle = 5.7;
            this.emitter.maxAngle = 6.2;
            this.emitter.acceleration = new ex.Vector(481, 0);            
        }
        this.emitter.emitRate = 10;
        this.emitter.opacity = 0.17;
        this.emitter.fadeFlag = true;
        this.emitter.particleLife = 400;
        this.emitter.maxSize = 10;
        this.emitter.minSize = 1;
        this.emitter.startSize = 10;
        this.emitter.endSize = 0;
        this.emitter.beginColor = ex.Color.Yellow;
        this.emitter.endColor = ex.Color.Transparent;
        this.emitter.isEmitting = this._autoplay;

        this.add(this.emitter);

        if (this._duration > 0) {
            setTimeout(() => {
                    this.emitter.isEmitting = false;
                    this.emitter.kill();
                    this.kill();
                }, this._duration * 1000
            );
        }
    }
}
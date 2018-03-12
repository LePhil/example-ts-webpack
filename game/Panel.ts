import * as ex from "excalibur";
import {Resources} from "./Resources";
import { KeyEvent } from "Input/Index";

export enum ControlType {
    Mouse,
    WASD,
    IJKL,
    Arrows
}

export class Panel extends ex.Actor {
    private controlType: ControlType;

    constructor(x, y, color, controlType: ControlType) {
        super(x, y, 10, 100, color);

        this.collisionType = ex.CollisionType.Fixed;
        this.controlType = controlType;
    }

    movePanelUp(delta: number = 10) {
        if(this.pos.y - (this.getHeight()/2) - delta <= 0) {
            this.pos.y = this.getHeight()/2;
        } else {
            this.pos.y -= delta;
        }
    }

    movePanelDown(delta: number = 10) {
        if(this.pos.y + (this.getHeight()/2) + delta >= 768) {
            this.pos.y = 768 - (this.getHeight()/2);
        } else {
            this.pos.y += delta;
        }
    }

    onInitialize(engine: ex.Engine) {
        super.onInitialize(engine);

        switch (this.controlType) {
            case ControlType.WASD:
                engine.input.keyboard.on("hold", (evt: KeyEvent) => {
                    if(evt.key === ex.Input.Keys.W) {
                        this.movePanelUp();
                    } else if(evt.key === ex.Input.Keys.S) {
                        this.movePanelDown();
                    }
                });
                break;
            case ControlType.IJKL:
                engine.input.keyboard.on("hold", (evt: KeyEvent) => {
                    if(evt.key === ex.Input.Keys.I) {
                        this.movePanelUp();
                    } else if(evt.key === ex.Input.Keys.K) {
                        this.movePanelDown();
                    }
                });
                break;
            case ControlType.Arrows:
                engine.input.keyboard.on("hold", (evt: KeyEvent) => {
                    if(evt.key === ex.Input.Keys.Up) {
                        this.movePanelUp();
                    } else if(evt.key === ex.Input.Keys.Down) {
                        this.movePanelDown();
                    }
                });
                break;
            case ControlType.Mouse:
            default:
                engine.input.pointers.primary.on('move', (evt: PointerEvent) => {
                    this.pos.y = evt.y;
                });
                break;
        }
        
    }
}
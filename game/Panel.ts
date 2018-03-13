import * as ex from "excalibur";
import {Position, Config} from "./Config";
import {Resources} from "./Resources";
import {Brick} from "./Brick";
import {Shot} from "./Shot";
import {KeyEvent} from "Input/Index";
import { Engine } from "excalibur";

export enum ControlType {
    Mouse,
    WASD,
    IJKL,
    Arrows
}

export class Panel extends ex.Actor {
    public position: Position;
    public color: ex.Color;
    private controlType: ControlType;
    private bricks: Array<Brick>;
    private game: ex.Engine;

    constructor(x, y, color, controlType: ControlType, bricks: Array<Brick>, position: Position) {
        super(x, y, 10, 100, color);

        this.collisionType = ex.CollisionType.Fixed;
        this.controlType = controlType;
        this.bricks = bricks;
        this.position = position;
        this.color = color;
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

    shoot(): void {
        let xPos = this.pos.x;

        if (this.position === Position.Left) {
            xPos += this.getWidth();
        } else if (this.position === Position.Right) {
            xPos -= this.getWidth();
        }
        let newShot = new Shot(xPos, this.pos.y, this.bricks, this);
        this.game.add(newShot);
    }

    onInitialize(engine: ex.Engine) {
        super.onInitialize(engine);

        this.game = engine;

        switch (this.controlType) {
            case ControlType.WASD:
                engine.input.keyboard.on("hold", (evt: KeyEvent) => {
                    if(evt.key === ex.Input.Keys.W) {
                        this.movePanelUp();
                    } else if(evt.key === ex.Input.Keys.S) {
                        this.movePanelDown();
                    }
                });

                engine.input.keyboard.on("press", (evt: KeyEvent) => {
                    if(evt.key === ex.Input.Keys.A || evt.key === ex.Input.Keys.D) {
                        this.shoot();
                    }
                })
                break;
            case ControlType.IJKL:
                engine.input.keyboard.on("hold", (evt: KeyEvent) => {
                    if(evt.key === ex.Input.Keys.I) {
                        this.movePanelUp();
                    } else if(evt.key === ex.Input.Keys.K) {
                        this.movePanelDown();
                    }
                });

                engine.input.keyboard.on("press", (evt: KeyEvent) => {
                    if(evt.key === ex.Input.Keys.J || evt.key === ex.Input.Keys.L) {
                        this.shoot();
                    }
                })
                break;
            case ControlType.Arrows:
                engine.input.keyboard.on("hold", (evt: KeyEvent) => {
                    if(evt.key === ex.Input.Keys.Up) {
                        this.movePanelUp();
                    } else if(evt.key === ex.Input.Keys.Down) {
                        this.movePanelDown();
                    }
                });

                engine.input.keyboard.on("press", (evt: KeyEvent) => {
                    if(evt.key === ex.Input.Keys.Left || evt.key === ex.Input.Keys.Right) {
                        this.shoot();
                    }
                })
                break;
            case ControlType.Mouse:
            default:
                engine.input.pointers.primary.on('move', (evt: PointerEvent) => {
                    this.pos.y = evt.y;
                });
                engine.input.pointers.primary.on('click', (evt: PointerEvent) => {
                    this.shoot();
                });
                break;
        }
        
    }
}
import * as ex from "excalibur";
import {PlayerPosition, Config} from "../Config";
import {Panel, ControlType} from "../Panel";
import {Ball} from "../Ball";
import {Brick} from "../Brick";

export class GameScene extends ex.Scene {
    constructor(engine: ex.Engine) {
        super(engine);

        // Padding between bricks
        let nrOfBricks = 10;    // per side
        let padding = 20;
        let width = 30;
        let height = (engine.drawHeight - ((nrOfBricks+1) * padding) ) / nrOfBricks;
    
        let bricks = [];
    
        for (let i = 0; i < nrOfBricks; i++) {
            let brick = new Brick(
                padding + (width/2),
                (i+1)*padding + i*height + height/2,
                width,
                height,
                ex.Color.Blue
            );
    
            let brick2 = new Brick(
                engine.drawWidth - padding - (width/2),
                (i+1)*padding + i*height + height/2,
                width,
                height,
                ex.Color.Red
            );
    
            bricks.push(brick);
            bricks.push(brick2);
    
            // Add the brick to the current scene to be drawn
            this.add(brick);
            this.add(brick2);
        }
    
        let ball = new Ball(100, 300, bricks);
        this.add(ball);
    
        let panelLeft = new Panel(200, 200, ex.Color.Blue, ControlType.WASD, bricks, PlayerPosition.Left);
        this.add(panelLeft);
    
        let panelRight = new Panel(800, 200, ex.Color.Red, ControlType.Arrows, bricks, PlayerPosition.Right);
        this.add(panelRight);
    }

    onActivate() {
    }

    update(engine: ex.Engine, delta: number) {
        super.update(engine, delta);

        if (engine.input.keyboard.wasReleased(ex.Input.Keys.Esc)) {
            engine.goToScene("menu");
        }
    }
}

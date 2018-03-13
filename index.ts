import * as ex from 'excalibur';
import {Position, Config} from "./game/Config";
import {Resources} from "./game/Resources";
import {Panel, ControlType} from "./game/Panel";
import {Ball} from "./game/Ball";
import {Brick} from "./game/Brick";

let game = new ex.Engine({ width: Config.Width, height: Config.Height });
let loader = new ex.Loader();

for (let r in Resources) {
    loader.addResource(Resources[r]);
}

// Padding between bricks
let nrOfBricks = 10;    // per side
let padding = 20;
let width = 30;
let height = (game.drawHeight - ((nrOfBricks+1) * padding) ) / nrOfBricks;

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
        game.drawWidth - padding - (width/2),
        (i+1)*padding + i*height + height/2,
        width,
        height,
        ex.Color.Red
    );

    bricks.push(brick);
    bricks.push(brick2);

    // Add the brick to the current scene to be drawn
    game.add(brick);
    game.add(brick2);
}

let ball = new Ball(100, 300, bricks);
game.add(ball);

let panelLeft = new Panel(200, 200, ex.Color.Blue, ControlType.WASD, bricks, Position.Left);
game.add(panelLeft);

let panelRight = new Panel(800, 200, ex.Color.Red, ControlType.Arrows, bricks, Position.Right);
game.add(panelRight);


game.start(loader).then(() => {

});
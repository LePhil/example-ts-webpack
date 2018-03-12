import * as ex from 'excalibur';
import {Resources} from "./game/Resources";
import {Panel, ControlType} from "./game/Panel";
import {Ball} from "./game/Ball";

let game = new ex.Engine({ width: 1024, height: 768 });
let loader = new ex.Loader();

for (let r in Resources) {
    loader.addResource(Resources[r]);
}

let panelLeft = new Panel(200, 200, ControlType.WASD);
game.add(panelLeft);

let panelRight = new Panel(800, 200, ControlType.Arrows);
game.add(panelRight);

let ball = new Ball(100, 300);
game.add(ball);


game.start(loader).then(() => {

});
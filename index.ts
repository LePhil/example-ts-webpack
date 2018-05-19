import * as ex from 'excalibur';
import {PlayerPosition, Config} from "./game/Config";
import {Resources} from "./game/Resources";
import {MainMenu} from "./game/scenes/MainMenu";
import {GameScene} from "./game/scenes/Game";

let game = new ex.Engine({ width: Config.GAME.WIDTH, height: Config.GAME.HEIGHT });
let loader = new ex.Loader();

game.add("menu", new MainMenu(game));

for (let r in Resources) {
    loader.addResource(Resources[r]);
}

game.start(loader).then(() => {
    game.goToScene("menu");
});
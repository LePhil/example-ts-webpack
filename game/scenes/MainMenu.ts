declare var globals: any;
import * as ex from "excalibur";
import {Pos, Button} from "../ui/Button";
import {Config} from "../Config";
import {Resources} from "../Resources";
import {AudioManager} from "../AudioManager";
import {SimpleDialogue, OptionsDialogue, CustomGameDialogue} from "../ui/HTMLDialogue";
import {GameScene} from "./Game";

const MAIN_SOUND = "Sound_Intro";

export class MainMenu extends ex.Scene {
    private _startButton: Button;
    private _optionsButton: Button;
    private _customButton: Button;

    private _buttons: Array<Button>;

    constructor(engine: ex.Engine) {
        super(engine);
        
        this._buttons = [];
        let buttonPos = Config.GAME.UI.BUTTONS.POSITIONS;

        let optionsDlg = new OptionsDialogue();
        optionsDlg.setup(
            () => {
                optionsDlg.hide();
                this._toggleButtons(true);
            },
            (muted) => {
                this.onMuteChange(muted);
            }
        );

        let customGameDlg = new CustomGameDialogue();
        customGameDlg.setup(
            () => {
                customGameDlg.hide();
                this._toggleButtons(true);
            },
            (settings) => { /* TODO */ }
        );

        this._startButton = new Button(
            Pos.make(buttonPos.center_1),
            "Start",
            () => {
                engine.add("game", new GameScene(engine));
                engine.goToScene("game");
            }
        );

        this._optionsButton = new Button(
            Pos.make(buttonPos.center_2),
            "Options",
            () => {
                optionsDlg.show();
                this._toggleButtons(false);
            }
        );

        this._customButton = new Button(
            Pos.make(buttonPos.center_4),
            "Custom Game",
            () => {
                customGameDlg.show();
                this._toggleButtons(false);
            }
        );

        this._addBtn(this._startButton);
        this._addBtn(this._optionsButton);
        this._addBtn(this._customButton);
    }

    onMuteChange(muted: boolean): void {
        if (muted) {
            AudioManager.stop(MAIN_SOUND);
        } else {
            AudioManager.play(MAIN_SOUND, true);        
        }
    }

    onActivate () {
        AudioManager.play(MAIN_SOUND, true);
    }

    onDeactivate () {
        AudioManager.stop(MAIN_SOUND);
    }

    private _addBtn(btn: Button): void {
        this.add(btn);
        this._buttons.push(btn);
    }

    private _toggleButtons(on: boolean): void {
        this._buttons.forEach(button => {
            button.enableCapturePointer = on;
        });
    }
}

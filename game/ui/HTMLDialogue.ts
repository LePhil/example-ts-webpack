declare var globals: any;
import * as ex from "excalibur";
import {Config} from "../Config";
import {Resources} from "../Resources";
import {AudioManager} from "../AudioManager";

class HTMLDialogue {
    protected dlg: HTMLElement;
    protected title: HTMLElement;
    protected text: HTMLElement;
    protected btnNope: HTMLElement;
    protected btnOkay: HTMLElement;

    constructor(dialogClass: string = ".dlg") {
        this.dlg = document.querySelector(`${dialogClass}`) as HTMLElement;
        this.title = document.querySelector(`${dialogClass} .dlg__title`) as HTMLElement;
        this.text = document.querySelector(`${dialogClass} .dlg__text`) as HTMLElement;
        this.btnNope = document.querySelector(`${dialogClass} .dlg__btn--nope`) as HTMLElement;
        this.btnOkay = document.querySelector(`${dialogClass} .dlg__btn--okay`) as HTMLElement;
    }

    public show(): void {
        document.querySelector('canvas').style.display = 'none';
        this.dlg.style.display = "block";
    }

    public hide(): void {
        document.querySelector('canvas').style.display = 'block';
        this.dlg.style.display = "none";
    }

    /**
     * Returns an <ul> with a <li> for every chiffre in the number.
     * E.g. 123 would return 
     * <ul class="nr-wrapper">
     *  <li class="nr nr--1"></li>
     *  <li class="nr nr--2"></li>
     *  <li class="nr nr--3"></li>
     * </ul>
     *
     * @param nr Number
     */
    static createNumber(nr: number): HTMLElement {
        let nrContainer = document.createElement("ul");
        nrContainer.classList.add("nr-wrapper");

        for(let i = 0; i < nr.toString().length; i++) {
            let chiffreElem = document.createElement("li");
            chiffreElem.classList.add("nr", "nr--"+nr.toString()[i]);
            nrContainer.appendChild(chiffreElem);
        }

        return nrContainer;
    }

    static createBodyText(parentNode: HTMLElement, texts: Array<any>): void {
        parentNode.innerHTML = "";

        texts.forEach(text => {
            let paragraph = document.createElement("p");
            paragraph.innerHTML = text.text ? text.text : text;
            parentNode.appendChild(paragraph);
        });
    }
}

export class SimpleDialogue extends HTMLDialogue {
    constructor() {
        super(".dlg--credits");
    }

    public setup(callback: () => void): void {
        this.btnOkay.addEventListener("click", callback);
    }
}

export class CustomGameDialogue extends HTMLDialogue {
    private _settings: any;

    constructor() {
        super(".dlg--custom-game");

        this._settings = {};
    }

    public setup(onGoBack: () => void, onStartGame: (settings: any) => void): void {

        this.btnOkay.addEventListener("click", () => {
            this.hide();
            onStartGame(this._settings);
        });

        this.btnNope.addEventListener("click", onGoBack);
    }
}

export class OptionsDialogue extends HTMLDialogue {
    protected muteToggle: HTMLInputElement;

    constructor() {
        super(".dlg--options");

        this.muteToggle = document.querySelector('.dlg--options #mute_switch') as HTMLInputElement;

        this.muteToggle.checked = AudioManager.isMuted;
    }

    public setup(onOkay: () => void, onMuteChange: (boolean) => void): void {
        this.btnOkay.addEventListener("click", onOkay);

        this.muteToggle.addEventListener("change", (event) => {
            onMuteChange(AudioManager.toggleMute());
        });
    }
}

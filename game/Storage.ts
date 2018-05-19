import * as ex from "excalibur";
import {Config} from "./Config";

/**
 * Responsibility:
 * Load and save data about the game in a sane and unified way to localstorage (or server if applicable at some point).
 */
export class Storage {
    static set(key:string, value:any):void {
        localStorage.setItem(key, JSON.stringify(value));
    }
    
    static get(key:string, defaultValue?: any):any {
        if (localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key));
        } else if (typeof defaultValue !== "undefined") {
            return defaultValue;
        } else {
            console.warn(`Key "${key}" not found in LocalStorage.`);
            return false;
        }
    }

    /**
     * Mainly used for debugging - clears all saved data.
     */
    static clearAll(): void {
        localStorage.clear();
    }
}

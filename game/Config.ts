import * as ex from "excalibur";

export enum PlayerPosition {
    Left,
    Right
}

export class Config {
    static Width = 1024;
    static Height = 768;

    static Bulletspeed = 150;
    static Bulletsize = 10;

    static BallspeedX = 170;
    static BallspeedY = 80;
    static Ballsize = 25;
    static Ballcolor = ex.Color.Yellow.clone();
}

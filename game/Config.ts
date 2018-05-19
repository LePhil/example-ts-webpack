import * as ex from "excalibur";

export enum PlayerPosition {
    Left,
    Right
}

export class Config {
    static Bulletspeed = 150;
    static Bulletsize = 10;

    static BallspeedX = 170;
    static BallspeedY = 80;
    static Ballsize = 25;
    static Ballcolor = ex.Color.Yellow.clone();


    static GAME = {
        WIDTH: 1024,  // defined by electron wrapper
        HEIGHT: 768,  // defined by electron wrapper
        DEFAULTMAP: {
          W: 840,
          H: 560
        },
        DEFAULT_DURATION_S: 240,
        DEBUG: true,
        DEBUG_PLAYERS: false,
        UI: {
          FONTSIZE: 24,
          TEXTCOLOR: ex.Color.Black,
          GUTTER: 8,
          CHECKBOX: {W: 38, H: 36},
          RADIO: {W: 36, H: 36},
          BUTTON: {W: 190, H: 49},
          OVERLAY: {W: 600, H: 400},
          BUTTONS: {
            POSITIONS: {
              center_1: {X: 1024/2, Y: 768 / 2 - 3 * (49 + 10)},
              center_2: {X: 1024/2, Y: 768 / 2 - 2 * (49 + 10)},
              center_3: {X: 1024/2, Y: 768 / 2 - 1 * (49 + 10)},
              center_4: {X: 1024/2, Y: 768 / 2},
              center_5: {X: 1024/2, Y: 768 / 2 + 1 * (49 + 10)},
              center_6: {X: 1024/2, Y: 768 / 2 + 2 * (49 + 10)},
              center_7: {X: 1024/2, Y: 768 / 2 + 3 * (49 + 10)},
              center:   {X: 1024/2, Y: 768/2},
              bottom_r: {X: 832,    Y: 664},
              bottom_l: {X: 192,     Y: 664}
            },
            W: 190,
            H: 49
          }
        },
      };
}

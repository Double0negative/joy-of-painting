import { incColor, randInt, randIncColor, clamp } from "../utils/util";

export default class Smoke {
    constructor() {
        this.color = undefined;
        this.pos = { x: 0, y: 0 }

        this.options = {
            radius: 20,
            moveAmount: 4,
            colorChangeAmount: 3,
            strokeSize: 3,
            strokeBrightness: 25,
        }
    }
    isIterable() {
        return true;
    }

    setup(painter) {
        this.color = {
            r: randInt(255),
            g: randInt(255),
            b: randInt(255),
            a: .02
        }
        this.pos.x = randInt(painter.w);
        this.pos.y = randInt(painter.h);
    }

    paint(painter) {
        painter.setFill(this.color);
        painter.setStroke(this.color, 0);
        painter.makeCircle(this.pos.x, this.pos.y, randInt(this.options.radius))

        this.color = randIncColor(this.color, this.options.colorChangeAmount);
        this.pos.x = clamp(this.pos.x + randInt(-this.options.moveAmount, this.options.moveAmount), 0, painter.w);
        this.pos.y = clamp(this.pos.y + randInt(-this.options.moveAmount, this.options.moveAmount), 0, painter.h);

    }
}
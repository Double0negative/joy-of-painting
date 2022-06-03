import { randInt, randIncColor, clamp, randColor } from "../utils/util"

const POS_MOVE = 6;
const COLOR_MOVE = 3;


export default class Lines {
    constructor() {
        this.color = undefined;
        this.pos1 = {
            x: 0, y: 0,
        };
        this.pos2 = {
            x: 0, y: 0,
        }
    }
    isIterable() { 
        return true;
    }

    getDefaultOptions() {
        
    }

    setup(painter, options) {
        this.maxIterations = 10000;
        this.color = randColor(.3);

        this.pos1.x = randInt(painter.w);
        this.pos1.y = randInt(painter.h);

        this.pos2.x = randInt(painter.w);
        this.pos2.y = randInt(painter.h);
    }

    paint(painter, options, iteration) {
        if (iteration > this.maxIterations) {
            return true;
        }
        painter.setStroke(this.color, 2);
        painter.makePath([this.pos1, this.pos2])
       // painter.commit();

        this.color = randIncColor(this.color, COLOR_MOVE);
        this.pos1.x = clamp(this.pos1.x + randInt(-POS_MOVE, POS_MOVE), 0, painter.w);
        this.pos2.x = clamp(this.pos2.x + randInt(-POS_MOVE, POS_MOVE), 0, painter.w);
        this.pos1.y = clamp(this.pos1.y + randInt(-POS_MOVE, POS_MOVE), 0, painter.h);
        this.pos2.y = clamp(this.pos2.y + randInt(-POS_MOVE, POS_MOVE), 0, painter.h);
    }
}

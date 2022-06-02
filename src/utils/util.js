
export function randInt(min, max) {
    max += 1;
    if(max)
        return Math.floor(Math.random() * (max - min) + min);
    else
        return Math.floor(Math.random() * min);
}

export function clamp(val, max, min) {
    return Math.min(Math.max(val, max), min);
}

export function randColor(alpha) {
    return {
        r: randInt(255),
        g: randInt(100),
        b: randInt(100),
        a: alpha
    }
}

export function incColor(color, rinc, ginc, binc, ainc) {
    const a = clamp(color.a + (ainc ?? rinc), 0, 255);
    const r = clamp(color.r + (rinc ?? rinc), 0, 255);
    const g = clamp(color.g + (ginc ?? rinc), 0, 255);
    const b = clamp(color.b + (binc ?? rinc), 0, 255);

    return { r, g, b, a };
}

export function randIncColor(color, amount, alpha = false) {
    return incColor(color, randInt(-amount, amount), randInt(-amount, amount), randInt(-amount, amount), alpha ? randInt(-amount, amount) : 0);
}

export function colorToCss(color) {
    if (color.h) {
        return `hsla(${color.h},${color.s}%,${color.l}%,${color.a})`
    } else {
        return `rgba(${color.r},${color.g},${color.b},${color.a > 1 ? color.a / 255 : color.a})`
    }
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

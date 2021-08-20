function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * max);
}

export function factoriseQuadraticEquation() {
    const MAX = 5;
    var a = getRandomInt(-MAX, MAX);
    while (a == 0) {
        a = getRandomInt(-MAX, MAX);
    }
    const b = getRandomInt(-MAX, MAX);
    const c = getRandomInt(-MAX, MAX);
    const d = getRandomInt(-MAX, MAX);
    // (ax + b)(cx + d)
    // acx^2 + (ad + bc)x + bd 
    const A = a * c;
    const B = a * d + b * c;
    const C = b * d;
    const text = `\
        Factorise the following quadratic:<br/>\
        ${A}x²
        ${B > 0 ? '+' : ''} 
        ${Math.abs(B) > 1 ? (B + 'x') : ''} ${C > 0 ? '+' : ''} 
        ${Math.abs(C) > 0 ? C : ''}<br/>\
        in the form (ax + b)(cx + d).<br/>\
    `
    console.log(a, b, c, d);
    return {
        text,
        values: [
            'a',
            'b',
            'c',
            'd',
        ],
        checkAnswer: (values) => {
            console.log(values);
            var {a, b, c, d} = values;
            a = parseInt(a);
            b = parseInt(b);
            c = parseInt(c);
            d = parseInt(d);
            return (a * c == A) && (a * d + b * c == B) && (b * d == C);
        },
    }
}
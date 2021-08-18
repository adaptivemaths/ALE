function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * max);
}

export function factoriseQuadraticEquation() {
    const MAX = 5
    const a = getRandomInt(1, MAX);
    const b = getRandomInt(1, MAX);
    const c = getRandomInt(1, MAX);
    const d = getRandomInt(1, MAX);
    // (ax + b)(cx + d)
    // acx^2 + (ad + bc)x + bd 
    const A = a * c;
    const B = a * d + b * c;
    const C = b * d;

    const question = `
        Factorise the following quadratic:
        ${A > 1 ? A : ''}x² + ${B > 1 ? B : ''}x + ${C}
        in the form (ax + b)(cx + d) where a <= c and b <= d.
    `

    const answer = {
        a: Math.min(a, c),
        b: Math.min(b, d),
        c: Math.max(a, c),
        d: Math.max(b, d),
    }

    return {
        question,
        values: [
            'a',
            'b',
            'c',
            'd',
        ],
        answer,
    }
}

console.log(factoriseQuadraticEquation());
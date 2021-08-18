function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * max);
}

export function factoriseQuadraticEquation() {
    const MAX = 5
    const a = getRandomInt(-MAX, MAX);
    const b = getRandomInt(-MAX, MAX);
    const c = getRandomInt(-MAX, MAX);
    const d = getRandomInt(-MAX, MAX);
    // (ax + b)(cx + d)
    // acx^2 + (ad + bc)x + bd 
    const A = a * c;
    const B = a * d + b * c;
    const C = b * d;

    const question = `
        Factorise the following quadratic:
        ${A > 1 ? A : ''}x² + ${B > 1 ? B : ''}x + ${C}
        in the form (ax + b)(cx + d).
    `

    const answer = {
        a,
        b,
        c,
        d,
    }

    return {
        question,
        values: [
            'a',
            'b',
            'c',
            'd',
        ],
        checkAnswer: (values) => {
            const {a, b, c, d} = values;
            return (a * c == A) && (a * d + b * c == B) && (b * d == C);
        },
    }
}
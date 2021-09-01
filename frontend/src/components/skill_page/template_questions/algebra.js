function getRandomInt(min, max, nonZero = false) {
  let n = min + Math.floor(Math.random() * (max - min));
  if (nonZero) {
    while (n == 0) {
      n = getRandomInt(min, max);
    }
  }
  return n;
}

export function factoriseQuadraticEquation() {
  const MAX = 5;
  const a = getRandomInt(-MAX, MAX, true);
  const b = getRandomInt(-MAX, MAX, true);
  const c = getRandomInt(-MAX, MAX, true);
  const d = getRandomInt(-MAX, MAX, true);

  // (ax + b)(cx + d)
  // acx^2 + (ad + bc)x + bd
  const A = a * c;
  const B = a * d + b * c;
  const C = b * d;
  const text = `\
        Factorise the following quadratic:<br/>\
        ${A == 1 ? "" : A}x²
        ${B > 0 ? "+" : B < 0 ? "-" : ""} 
        ${B != 0 ? Math.abs(B) : ""}x 
        ${C > 0 ? "+" : C < 0 ? "-" : ""} 
        ${C != 0 ? Math.abs(C) : ""}<br/>\
        in the form (ax + b)(cx + d).<br/>\
    `;
  console.log(a, b, c, d);
  return {
    text,

    values: ["a", "b", "c", "d"],

    answer: { a, b, c, d },

    checkAnswer: (values) => {
      console.log(values);
      var { a, b, c, d } = values;
      a = parseInt(a);
      b = parseInt(b);
      c = parseInt(c);
      d = parseInt(d);
      return a * c == A && a * d + b * c == B && b * d == C;
    },
  };
}

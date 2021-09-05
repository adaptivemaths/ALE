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
        Factorise the following quadratic:
        ${A == 1 ? "" : A}x²
        ${B > 0 ? "+" : B < 0 ? "-" : ""} 
        ${B != 0 ? Math.abs(B) : ""}x 
        ${C > 0 ? "+" : C < 0 ? "-" : ""} 
        ${C != 0 ? Math.abs(C) : ""}
        in the form (ax + b)(cx + d).
    `;

  return {
    text,

    values: ["a", "b", "c", "d"],

    answer: { a, b, c, d },

    checkAnswer: (values) => {
      var { a, b, c, d } = values;
      a = parseInt(a);
      b = parseInt(b);
      c = parseInt(c);
      d = parseInt(d);
      return a * c == A && a * d + b * c == B && b * d == C;
    },
  };
}

export function simultaneousEquations() {
  const MAX = 10;
  const a = getRandomInt(0, MAX, true);
  const b = getRandomInt(0, MAX, true);
  const c = getRandomInt(0, MAX, true);
  const d = getRandomInt(0, MAX, true);
  const x = getRandomInt(-MAX, MAX);
  const y = getRandomInt(-MAX, MAX);
  // ax + by = c
  // dx + ey = f
  const e = a * x + b * y;
  const f = c * x + d * y;
  const text = `\
        Solve the following pair of simultaneous equations:
        ${a !== 1 ? a : ""}x + ${b !== 1 ? b : ""}y = ${e}
        ${c !== 1 ? c : ""}x + ${d !== 1 ? d : ""}y = ${f}
    `;

  return {
    text,

    values: ["x", "y"],

    answer: { x, y },

    checkAnswer: (values) => {
      var { x, y } = values;
      x = parseInt(x);
      y = parseInt(y);
      return a * x + b * y === e && c * x + d * y === f;
    },
  };
}

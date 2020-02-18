import * as colorSchemes from "./colorScheme";
import { addRGB, divRGB } from "./rgb";
/*
 * Main renderer equation.
 *
 * Returns number of iterations and values of Z_{n}^2 = Tr + Ti at the time
 * we either converged (n == iterations) or diverged.  We use these to
 * determined the color at the current pixel.
 *
 * The Mandelbrot set is rendered taking
 *
 *     Z_{n+1} = Z_{n}^2 + C
 *
 * with C = x + iy, based on the "look at" coordinates.
 *
 * The Julia set can be rendered by taking
 *
 *     Z_{0} = C = x + iy
 *     Z_{n+1} = Z_{n} + K
 *
 * for some arbitrary constant K.  The point C for Z_{0} must be the
 * current pixel we're rendering, but K could be based on the "look at"
 * coordinate, or by letting the user select a point on the screen.
 */
const iterateEquation = (Cr, Ci, escapeRadius, iterations) => {
  let Zr = 0;
  let Zi = 0;
  let Tr = 0;
  let Ti = 0;
  let n = 0;

  for (; n < iterations && (Tr + Ti) <= escapeRadius; ++n) {
    Zi = 2 * Zr * Zi + Ci;
    Zr = Tr - Ti + Cr;
    Tr = Zr * Zr;
    Ti = Zi * Zi;
  }

  /*
   * Four more iterations to decrease error term;
   * see http://linas.org/art-gallery/escape/escape.html
   */
  for (let e = 0; e < 4; ++e) {
    Zi = 2 * Zr * Zi + Ci;
    Zr = Tr - Ti + Cr;
    Tr = Zr * Zr;
    Ti = Zi * Zi;
  }

  return [n, Tr, Ti];
};

export default (l, r, dx, ci, sup, escapeRadius, iterations, colorScheme) => {
  const pickColor = colorSchemes[colorScheme] || colorSchemes.pickColorGrayscale;
  const buffer = [];
  let cr = l;
  while (cr < r) {
    let p = iterateEquation(cr, ci, escapeRadius, iterations);
    let color = pickColor(iterations, ...p);
    for (let i = 1; i < sup; i++) {
      p = iterateEquation(
        cr - Math.random() * dx / 2,
        ci - Math.random() * dx / 2,
        escapeRadius,
        iterations
      );
      color = addRGB(color, pickColor(iterations, ...p));
    }
    color = divRGB(color, Math.max(sup, 1));
    cr += dx;
    buffer.push(color);
  }
  return buffer;
};

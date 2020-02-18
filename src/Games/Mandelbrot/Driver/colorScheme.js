const interiorColor = [0, 0, 0, 255];
const logBase = 1.0 / Math.log(2.0);
const logHalfBase = Math.log(0.5) * logBase;

function smoothColor (steps, n, Tr, Ti) {
  /*
   * Original smoothing equation is
   *
   * var v = 1 + n - Math.log(Math.log(Math.sqrt(Zr*Zr+Zi*Zi)))/Math.log(2.0);
   *
   * but can be simplified using some elementary logarithm rules to
   */
  return 5 + n - logHalfBase - Math.log(Math.log(Tr + Ti)) * logBase;
}

/*
 * Convert hue-saturation-value/luminosity to RGB.
 *
 * Input ranges:
 *   H =   [0, 360] (integer degrees)
 *   S = [0.0, 1.0] (float)
 *   V = [0.0, 1.0] (float)
 */
function hsv2rgb (h, s, v) {
  if (v > 1.0) v = 1.0;
  const hp = h / 60.0;
  const c = v * s;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let rgb = [0, 0, 0, 0xff];

  if (hp >= 0 && hp < 1) rgb = [c, x, 0];
  if (hp >= 1 && hp < 2) rgb = [x, c, 0];
  if (hp >= 2 && hp < 3) rgb = [0, c, x];
  if (hp >= 3 && hp < 4) rgb = [0, x, c];
  if (hp >= 4 && hp < 5) rgb = [x, 0, c];
  if (hp >= 5 && hp < 6) rgb = [c, 0, x];

  const m = v - c;
  rgb[0] += m;
  rgb[1] += m;
  rgb[2] += m;

  rgb[0] *= 255;
  rgb[1] *= 255;
  rgb[2] *= 255;
  return rgb;
}

export function pickColorHSV1 (steps, n, Tr, Ti) {
  if (n === steps) return interiorColor;

  const v = smoothColor(steps, n, Tr, Ti);
  const c = hsv2rgb(360.0 * v / steps, 1.0, 1.0);
  c.push(255); // alpha
  return c;
}

export function pickColorHSV2 (steps, n, Tr, Ti) {
  if (n === steps) return interiorColor;

  const v = smoothColor(steps, n, Tr, Ti);
  const c = hsv2rgb(360.0 * v / steps, 1.0, 10.0 * v / steps);
  return c;
}

export function pickColorHSV3 (steps, n, Tr, Ti) {
  if (n === steps) return interiorColor;

  const v = smoothColor(steps, n, Tr, Ti);
  const c = hsv2rgb(360.0 * v / steps, 1.0, 10.0 * v / steps);

  // swap red and blue
  const t = c[0];
  c[0] = c[2];
  c[2] = t;

  return c;
}

export function pickColorGrayscale (steps, n, Tr, Ti) {
  if (n === steps) return interiorColor;

  let v = smoothColor(steps, n, Tr, Ti);
  v = Math.floor(512.0 * v / steps);
  if (v > 255) v = 255;
  return [v, v, v, 255];
}

export function pickColorGrayscale2 (steps, n, Tr, Ti) {
  if (n === steps) { // converged?
    let c = 255 - Math.floor(255.0 * Math.sqrt(Tr + Ti)) % 255;
    if (c < 0) c = 0;
    if (c > 255) c = 255;
    return [c, c, c, 255];
  }

  return pickColorGrayscale(steps, n, Tr, Ti);
}

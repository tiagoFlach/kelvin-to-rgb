/**
 * Given a temperature (in Kelvin), estimate an RGB equivalent
 *
 * @param {number} kelvin - Temperature (in Kelvin) between 1000 and 40000
 * @returns {{r:number, g:number, b:number}} - RGB channel intensities (0-255)
 * @description Ported from: http://www.tannerhelland.com/4435/convert-temperature-rgb-algorithm-code/
 */
export function getRgbFromTemperature(kelvin: number): {
  r: number;
  g: number;
  b: number;
} {
  // Temperature is in Kelvin
  const temperature: number = kelvin / 100;
  let r: number, g: number, b: number;

  const clamp = (num: number, min: number, max: number) =>
    num < min ? min : num > max ? max : num;

  if (temperature <= 66) {
    r = 255;
    g = temperature;
    g = 99.4708025861 * Math.log(g) - 161.1195681661;

    if (temperature <= 19) {
      b = 0;
    } else {
      b = temperature - 10;
      b = 138.5177312231 * Math.log(b) - 305.0447927307;
    }
  } else {
    r = temperature - 60;
    r = 329.698727446 * Math.pow(r, -0.1332047592);

    g = temperature - 60;
    g = 288.1221695283 * Math.pow(g, -0.0755148492);

    b = 255;
  }

  r = clamp(Math.round(r), 0, 255);
  g = clamp(Math.round(g), 0, 255);
  b = clamp(Math.round(b), 0, 255);

  return { r, g, b };
}

/**
 * Given RGB channel intensities (0-255), return a hex string
 *
 * @param {{r:number, g:number, b:number}} rgb - RGB channel intensities (0-255)
 * @returns {string} - Hex string
 */
export function getHexFromRgb(rgb: {
  r: number;
  g: number;
  b: number;
}): string {
  let r: string = rgb.r.toString(16);
  let g: string = rgb.g.toString(16);
  let b: string = rgb.b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}

export function getHexFromTemperature(kelvin: number): string {
  return getHexFromRgb(getRgbFromTemperature(kelvin));
}

export function getHslFromRgb(rgb: {
  r: number;
  g: number;
  b: number;
}): { h: number; s: number; l: number } {
  const r: number = rgb.r /= 255;
  const g: number = rgb.g /= 255;
  const b: number = rgb.b /= 255;

  // Find greatest and smallest channel values
  const cmin: number = Math.min(r, g, b);
  const cmax: number = Math.max(r, g, b);
  const delta: number = cmax - cmin;

  let h: number = 0;
  let s: number = 0;
  let l: number = 0;

  // Calculate hue
  // No difference
  if (delta == 0)
    h = 0;
  // Red is max
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g)
    h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0)
    h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
}

export function getHslFromTemperature(kelvin: number): {
  h: number;
  s: number;
  l: number;
} {
  return getHslFromRgb(getRgbFromTemperature(kelvin));
}


export function getSpectre(min: number, max: number, step: number): string[] {
  console.log(min, max, step);
  const spectre: string[] = [];

  for (let i = min; i <= max; i += step) {
    const color: { r: number; g: number; b: number } = getRgbFromTemperature(i);
    spectre.push(`rgb(${color.r}, ${color.g}, ${color.b})`);
  }

  return spectre;
}

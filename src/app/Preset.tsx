import { getHexFromTemperature, getRgbFromTemperature } from "@/lib/functions";
const infinityKelvin: number = 99_999_999_999_999_999_999_999_999_999_999_999_999_999_999;

class Preset {
  constructor(
    public name: string,
    public value: number | null,
    public value_min: number | null,
    public value_max: number | null,
    public category: string = "default",
  ) {
    if (!value && value_min && value_max) {
      this.value = (value_min + value_max) / 2;
    }
  }

  getRange(): number[] {
    if (this.value_min && this.value_max) {
      return [this.value_min, this.value_max];
    }
    return [];
  }

  getRangeString(): string {
    if (this.value) {
      return `${this.getValue()} K`;
    }
    return `${this.value_min} - ${this.value_max}`;
  }

  getValue(): number | string | null {
    if (this.value === infinityKelvin) {
      return "∞";
    }
    return this.value;
  }

  getColorRgb(): { r: number; g: number; b: number } | null {
    if (!this.value) {
      return null;
    }
    return getRgbFromTemperature(this.value);
  }

  getColorHex(): string | null {
    if (!this.value) {
      return null;
    }
    return getHexFromTemperature(this.value);
  }
}

export const presets: Preset[] = [
  new Preset(
    "The draper point, where nearly all solid objects begin to visibly glow due to black-body radiation",
    798,
    null,
    null,
  ),
  new Preset("Most commercial electric heating elements", 1_000, null, null),
  new Preset("Match flame", 1700, null, null),
  new Preset("Low pressure sodium lamps (LPS/SOX)", 1_700, null, null, "lamps"),
  new Preset("Candle flame", 1_850, null, null),
  new Preset(
    "High pressure sodium lamps (HPS/SON)",
    2_200,
    null,
    null,
    "lamps",
  ),
  new Preset("Soft white incandescent lamps", 2_500, null, null, "lamps"),
  new Preset(
    "'Soft white' compact fluorescent and LED lamps",
    2_700,
    null,
    null,
    "lamps",
  ),
  new Preset(
    "Warm white compact fluorescent and LED lamps",
    3_000,
    null,
    null,
    "lamps",
  ),
  new Preset("Studio lamps", 3_200, null, null, "lamps"),
  new Preset("Photofloods", 3_200, null, null, "lamps"),
  new Preset("Studio 'CP' light", 3_350, null, null, "lamps"),
  new Preset("Horizon daylight", 5_000, null, null, "nature"),
  new Preset("Daylight", 5_000, null, null, "nature"),
  new Preset("Overcast", 5_000, null, null, "nature"),
  new Preset("LED screen", null, 3_000, 6_500, "screen"),
  new Preset("LCD/CRT screen", null, 6_500, 9_500, "screen"),
  new Preset("Clear blue poleward sky", null, 15_000, 27_000, "sky"),
  new Preset(
    "Theoretical upper limit based off of black-body radiation calculations",
    infinityKelvin,
    null,
    null,
  ),
];

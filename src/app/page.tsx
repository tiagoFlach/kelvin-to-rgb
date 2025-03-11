"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { ArrowRight, Expand, Shrink } from "lucide-react";
import Link from "next/link";
// import { motion } from "motion/react";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

/**
 * Given a temperature (in Kelvin), estimate an RGB equivalent
 *
 * @param {number} kelvin - Temperature (in Kelvin) between 1000 and 40000
 * @returns {{r:number, g:number, b:number}} - RGB channel intensities (0-255)
 * @description Ported from: http://www.tannerhelland.com/4435/convert-temperature-rgb-algorithm-code/
 */
function getRGBFromTemperature(kelvin: number) {
  // Temperature is in Kelvin
  const temperature = kelvin / 100;
  let r, g, b;
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

function getHexFromRGB(rgb: { r: number; g: number; b: number }) {
  let r = rgb.r.toString(16);
  let g = rgb.g.toString(16);
  let b = rgb.b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}

function getSpectre(min: number, max: number, step: number) {
  const spectre = [];

  for (let i = min; i <= max; i += step) {
    const color = getRGBFromTemperature(i);
    spectre.push(`rgb(${color.r}, ${color.g}, ${color.b})`);
  }

  return spectre;
}

function expand() {
  // const element = document.getElementById("color");
  // element.requestFullscreen();
}

const presets: {
  title: string;
  value_min: number;
  value_max: number;
  value_default: number;
}[] = [
  {
    title: "Candle",
    value_min: 1900,
    value_max: 2000,
    value_default: 1950,
  },
];

export default function Home() {
  const minKelvin = 0;
  const maxKelvin = 15000;
  const defaultKelvin = (maxKelvin - minKelvin) / 2;
  // const extraKelvin = 40000;
  const stepKelvin = 100;

  const [kelvin, setKelvin] = useState(defaultKelvin);
  const [rgb, setRGB] = useState(getRGBFromTemperature(kelvin));
  const [hex, setHex] = useState(getHexFromRGB(rgb));
  // const [expanded, setExpanded] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKelvin(Number(event.target.value));
    updateValues();
  };

  const updateValues = () => {
    setRGB(getRGBFromTemperature(kelvin));
    setHex(getHexFromRGB(rgb));
  };

  const data: { title: string; value: string }[] = [
    {
      title: "Kelvin",
      value: `${kelvin}`,
    },
    {
      title: "RGB",
      value: `(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    },
    {
      title: "HEX",
      value: hex,
    },
  ];

  return (
    <div className="space-y-4">
      <Card className="pt-2 sm:pt-6">
        <CardContent className="px-2 sm:px-6">
          <div className="flex flex-col space-y-8 md:flex-row md:space-x-4">
            <div className="flex-1 flex-col space-y-4">
              <div
                id="color"
                className="group flex h-64 w-full items-end justify-end rounded-lg p-3"
                style={{
                  backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
                }}
                // onMouseEnter={() => showButton()}
              >
                {/* fullscreen icon */}
                <Button
                  variant="secondary"
                  size="icon"
                  // onClick={fullscreen}
                  onClick={expand}
                  className="rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                  <Expand />
                  <Shrink className="hidden" />
                </Button>
              </div>

              <div className="flex flex-col space-y-4">
                <Label htmlFor="default-range">
                  Select the color temperature
                </Label>
                <div className="flex flex-col space-y-1">
                  <Input
                    type="range"
                    id="default-range"
                    min={minKelvin}
                    max={maxKelvin}
                    step={stepKelvin}
                    value={kelvin}
                    onChange={handleChange}
                    className="bg-muted h-2 w-full cursor-pointer appearance-none rounded-lg px-0"
                  />
                  <div className="text-muted-foreground grid grid-cols-7 px-1 text-sm">
                    <span className="col-span-1 col-start-1 text-left">
                      {minKelvin}
                    </span>
                    <span className="col-span-1 col-start-3 -translate-x-1/7 text-center">
                      {minKelvin + (maxKelvin - minKelvin) / 3}
                    </span>
                    <span className="col-span-1 col-start-5 translate-x-1/7 text-center">
                      {minKelvin + ((maxKelvin - minKelvin) / 3) * 2}
                    </span>
                    <span className="col-span-1 col-start-7 text-right">
                      {maxKelvin}
                    </span>
                  </div>
                </div>
                <div className="flex-none">
                  <Input
                    type="number"
                    placeholder="Kelvin"
                    min={minKelvin}
                    step={stepKelvin}
                    value={kelvin}
                    onChange={handleChange}
                    className="w-full text-center"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col">
              <div className="flex flex-col space-y-2">
                {data.map((item) => (
                  <div key={item.title} className="flex justify-between">
                    <span>{item.title}</span>
                    <span className="text-muted-foreground">{item.value}</span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="flex flex-col space-y-4">
                {presets.map((preset) => (
                  <div key={preset.title} className="flex flex-row space-x-4">
                    <span className="my-auto flex-1">{preset.title}</span>
                    <span className="text-muted-foreground my-auto flex-none">
                      {preset.value_min} — {preset.value_max}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      // onClick={setKelvin(preset.value_min)}
                    >
                      <ArrowRight />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card
        className="h-32"
        style={{
          backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
          backgroundImage: `linear-gradient(to right, ${getSpectre(
            minKelvin,
            maxKelvin,
            stepKelvin,
          )})`,
        }}
      ></Card>

      <Card>
        <CardHeader>
          <CardTitle>Espectro de Cores</CardTitle>
          <CardDescription>Origem das informações</CardDescription>
        </CardHeader>
        <CardContent>
          <div>oi</div>
          <p>fonte:</p>
          <Link href="https://tannerhelland.com/2012/09/18/convert-temperature-rgb-algorithm-code.html">
            tannerhelland.com
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Expand,
  RefreshCcw,
  RotateCcw,
  Shrink,
} from "lucide-react";
import Link from "next/link";
// import { motion } from "motion/react";
import React, { JSX, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  getHexFromRgb,
  getHexFromTemperature,
  getHslFromRgb,
  getHslFromTemperature,
  getRgbFromTemperature,
  getSpectre,
} from "@/lib/functions";
import { presets } from "./Preset";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const minKelvin: number = 0;
const maxKelvin: number = 10000;
const defaultKelvin: number = (maxKelvin - minKelvin) / 2;
// const extraKelvin: number = 40000;
const stepKelvin: number = 100;
const spectre: string[] = getSpectre(minKelvin, maxKelvin, stepKelvin);
// const spectre = getSpectre(minKelvin, maxKelvin, stepKelvin);

let animation: boolean = false;

function expand(): void {
  // const element = document.getElementById("color");
  // element.requestFullscreen();
}

export default function Home(): JSX.Element {
  const [kelvin, setKelvin] = useState(defaultKelvin);
  const [rgb, setRgb] = useState(getRgbFromTemperature(kelvin));
  const [hex, setHex] = useState(getHexFromTemperature(kelvin));
  const [hsl, setHsl] = useState(getHslFromTemperature(kelvin));
  // const [expanded, setExpanded] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKelvin(Number(event.target.value));
    updateValues();
  };

  // const setKelvin = (value: number) => {
  //   setKelvin(value);
  //   updateValues();
  // };

  const updateValues = () => {
    setRgb(getRgbFromTemperature(kelvin));
    setHex(getHexFromRgb(rgb));
    setHsl(getHslFromRgb(rgb));
  };

  function animate(): void {
    animation = !animation;
    // let orientation: number = 1;

    if (animation) {
      if (kelvin >= maxKelvin) {
        setKelvin(maxKelvin);
      }
    }

    // while (animation) {
    //   if (kelvin <= minKelvin) {
    //     orientation = 1;
    //   }
    //   if (kelvin >= maxKelvin) {
    //     orientation = -1;
    //   }

    //   setKelvin(kelvin + orientation * stepKelvin);
    //   setTimeout(() => {
    //     updateValues();
    //   }, 1000);
    // }
  }

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
    {
      title: "HLS",
      value: `(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    },
  ];

  return (
    <div className="space-y-4">
      <Card className="py-3 pt-2 sm:py-6">
        <CardContent className="flex flex-col space-y-6 px-2 sm:px-6">
          <Card
            id="color"
            className="group flex h-48 w-full items-end justify-end rounded-lg p-0"
            style={{
              backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
            }}
          >
            <CardContent className="p-3">
              <Button
                variant="outline"
                size="icon"
                // onClick={fullscreen}
                onClick={expand}
                className="rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                <Expand />
                <Shrink className="hidden" />
              </Button>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6 space-x-0 md:flex-row">
            <div className="flex basis-3/5 flex-col space-y-4">
              <Label htmlFor="default-range">
                Select the color temperature:
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
              <div className="flex flex-row gap-2">
                <Input
                  type="number"
                  placeholder="Kelvin"
                  min={minKelvin}
                  step={stepKelvin}
                  value={kelvin}
                  onChange={handleChange}
                  className="w-full text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setKelvin(defaultKelvin)}
                >
                  <RotateCcw />
                </Button>
                <Button variant="outline" size="icon" onClick={() => animate()}>
                  <RefreshCcw />
                </Button>
              </div>
            </div>

            <div className="flex basis-2/5 flex-col space-y-2">
              {data.map((item) => (
                <div key={item.title} className="flex justify-between">
                  <span>{item.title}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* <Card className="py-3 pt-2 sm:py-6"> */}
      {/* <CardContent className="flex flex-col space-y-6 px-2 sm:px-6"> */}
      <Card className="pt-4 pb-3 sm:py-6">
        <CardHeader className="px-2 sm:px-6">
          <CardTitle>Presets</CardTitle>
          <CardDescription>Valores padrão</CardDescription>
        </CardHeader>
        <CardContent className="hidden">
          <Table>
            <TableCaption>Lista de valores.</TableCaption>
            <TableHeader>
              <TableRow className="text-foreground">
                <TableHead>Name</TableHead>
                <TableHead className="w-0">Temperature</TableHead>
                <TableHead className="w-0"></TableHead>
                <TableHead className="w-0"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {presets.map((preset) => (
                <TableRow key={preset.name}>
                  <TableCell>{preset.name}</TableCell>
                  <TableCell className="text-right">
                    {preset.getValue()}
                  </TableCell>
                  <TableCell>
                    <div
                      className="border-input size-9 rounded-md border"
                      style={{
                        backgroundColor: `${preset.getColorHex()}`,
                      }}
                    ></div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setKelvin(preset.value || 0)}
                    >
                      <ArrowRight />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        <CardContent className="flex flex-col space-y-4 px-2 sm:px-6">
          {presets.map((preset) => (
            <div key={preset.name} className="flex flex-row space-x-4">
              <span className="my-auto flex-1">{preset.name}</span>
              <span className="text-muted-foreground my-auto w-18 flex-none text-right">
                {/* {preset.value_min} — {preset.value_max} */}
                {preset.getRangeString()}
              </span>
              <div className="flex flex-row space-x-2">
                <div
                  className="border-input my-auto size-9 rounded-md border"
                  style={{
                    backgroundColor: `${preset.getColorHex()}`,
                  }}
                ></div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setKelvin(preset.value || 0)}
                  className="my-auto"
                >
                  <ArrowRight />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="justify-end px-2 sm:px-6">
          <span className="text-right text-sm">
            Fonte:{" "}
            <Link
              className="text-blue-500 hover:underline"
              href="https://en.wikipedia.org/wiki/Color_temperature#Categorizing_different_lighting"
            >
              Wikipedia
            </Link>
          </span>
        </CardFooter>
      </Card>

      <Card
        className="h-32"
        style={{
          backgroundImage: `linear-gradient(to right, ${spectre.join(", ")})`,
        }}
      ></Card>

      <Card>
        <CardHeader>
          <CardTitle>Espectro de Cores</CardTitle>
          <CardDescription>Origem das informações</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Fonte:</p>
          <Link
            className="text-blue-500 hover:underline"
            href="https://tannerhelland.com/2012/09/18/convert-temperature-rgb-algorithm-code.html"
          >
            tannerhelland.com
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

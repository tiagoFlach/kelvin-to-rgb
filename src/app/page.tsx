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
import {
  ArrowRight,
  Expand,
  Minus,
  Plus,
  RefreshCcw,
  RotateCcw,
  Shrink,
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import React, { JSX, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  getHexFromTemperature,
  getHslFromTemperature,
  getRgbFromTemperature,
  getSpectre,
} from "@/lib/functions";
import { cn } from "@/lib/utils";
import { presets } from "./Preset";
import { useEffect, useMemo } from "react";
import { ButtonGroup } from "@/components/ui/button-group";

const minKelvin: number = 0;
const maxKelvin: number = 15000;
const defaultKelvin: number = (maxKelvin - minKelvin) / 2;
// const extraKelvin: number = 40000;
const stepKelvin: number = 100;

const minBrightness: number = 0;
const maxBrightness: number = 200;
const defaultBrightness: number = 100;
const stepBrightness: number = 1;

const spectre: string[] = getSpectre(minKelvin, maxKelvin, stepKelvin);
// const spectre = getSpectre(minKelvin, maxKelvin, stepKelvin);

let animation: boolean = false;

// function expand(): void {
//   // const element = document.getElementById("color");
//   // element.requestFullscreen();
// }

export default function Home(): JSX.Element {
  const [kelvin, setKelvin] = useState(defaultKelvin);
  const [brightness, setBrightness] = useState(defaultBrightness);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isExpanded]);

  const { rgb, hex, hsl } = useMemo(() => {
    const rgb = getRgbFromTemperature(kelvin, brightness);
    const hex = getHexFromTemperature(kelvin, brightness);
    const hsl = getHslFromTemperature(kelvin, brightness);
    return { rgb, hex, hsl };
  }, [kelvin, brightness]);
  // const [expanded, setExpanded] = useState(false);

  const handleKelvinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKelvin(Number(event.target.value));
  };

  const handleBrightnessChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBrightness(Number(event.target.value));
  };

  function animateBrightness(): void { }
  function animateKelvin(): void {
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
      <Card className="py-3 sm:py-6">
        <CardContent className="flex flex-col space-y-6 px-3 sm:px-6">
          <motion.div
            layout
            transition={{ type: "tween" }}
            id="color"
            className={cn(
              "group flex items-end justify-end p-0 border shadow-sm",
              isExpanded
                ? "fixed inset-0 z-50 h-[100dvh] w-screen rounded-none"
                : "aspect-video max-h-96 w-full rounded-lg",
            )}
            style={{
              backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
            }}
          >
            <CardContent className={cn("p-3", isExpanded && "pb-12 pr-6")}>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
                className="rounded-full"
              >
                {isExpanded ? <Shrink /> : <Expand />}
              </Button>
            </CardContent>
          </motion.div>

          <div className="flex flex-col gap-6 space-x-0 md:flex-row">
            <div className="flex basis-3/5 flex-col gap-6">
              <div className="flex flex-col space-y-4">
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
                    onChange={handleKelvinChange}
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
                  <ButtonGroup className="w-full">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setKelvin(
                          kelvin - stepKelvin >= minKelvin
                            ? kelvin - stepKelvin
                            : minKelvin,
                        )
                      }
                      title="Decrease Kelvin"
                    >
                      <Minus />
                    </Button>
                    <Input
                      type="number"
                      placeholder="Kelvin"
                      min={minKelvin}
                      step={stepKelvin}
                      value={kelvin}
                      onChange={handleKelvinChange}
                      className="w-full text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setKelvin(
                          kelvin + stepKelvin <= maxKelvin
                            ? kelvin + stepKelvin
                            : maxKelvin,
                        )
                      }
                      title="Increase Kelvin"
                    >
                      <Plus />
                    </Button>
                  </ButtonGroup>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setKelvin(defaultKelvin)}
                    title="Reset"
                  >
                    <RotateCcw />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => animateKelvin()}
                    title="Animate"
                  >
                    <RefreshCcw />
                  </Button>
                </div>
              </div>

              <div className="flex basis-3/5 flex-col space-y-4">
                <Label htmlFor="default-range">Select the brightness:</Label>
                <div className="flex flex-col space-y-1">
                  <Input
                    type="range"
                    id="default-range"
                    min={minBrightness}
                    max={maxBrightness}
                    step={stepBrightness}
                    value={brightness}
                    onChange={handleBrightnessChange}
                    className="bg-muted h-2 w-full cursor-pointer appearance-none rounded-lg px-0"
                  />
                  <div className="text-muted-foreground grid grid-cols-5 px-1 text-sm">
                    <span className="col-span-1 col-start-1 text-left">
                      {minBrightness}
                    </span>
                    <span className="col-span-1 col-start-2 -translate-x-1/5 text-center">
                      {minBrightness + (maxBrightness - minBrightness) / 4}
                    </span>
                    <span className="col-span-1 col-start-3 text-center">
                      {minBrightness +
                        ((maxBrightness - minBrightness) / 4) * 2}
                    </span>
                    <span className="col-span-1 col-start-4 translate-x-1/5 text-center">
                      {minBrightness +
                        ((maxBrightness - minBrightness) / 4) * 3}
                    </span>
                    <span className="col-span-1 col-start-5 text-right">
                      {maxBrightness}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <ButtonGroup className="w-full">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setBrightness(
                          brightness - stepBrightness >= minBrightness
                            ? brightness - stepBrightness
                            : minBrightness,
                        )
                      }
                      title="Decrease brightness"
                    >
                      <Minus />
                    </Button>
                    <Input
                      type="number"
                      placeholder="Kelvin"
                      min={minBrightness}
                      step={stepBrightness}
                      value={brightness}
                      onChange={handleBrightnessChange}
                      className="text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setBrightness(
                          brightness + stepBrightness <= maxBrightness
                            ? brightness + stepBrightness
                            : maxBrightness,
                        )
                      }
                      title="Increase brightness"
                    >
                      <Plus />
                    </Button>
                  </ButtonGroup>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setBrightness(defaultBrightness)}
                    title="Reset"
                  >
                    <RotateCcw />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => animateBrightness()}
                    title="Animate"
                  >
                    <RefreshCcw />
                  </Button>
                </div>
              </div>
            </div>

            <div className="my-auto hidden h-32 w-0 border-l md:block"></div>

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

      <Card className="py-3 sm:py-6">
        <CardHeader className="mb-4 px-3 sm:px-6">
          <CardTitle className="text-xl">Presets</CardTitle>
          <CardDescription>Valores padrão</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4 px-3 sm:px-6">
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
        <CardFooter className="justify-end px-3 sm:px-6">
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

"use client";

// import Head from "next/head";
import { ChangeEvent, useState } from "react";

// import { Heroicon } from "heroicons";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";

import Presets from "./components/presets";

/**
 * Given a temperature (in Kelvin), estimate an RGB equivalent
 *
 * @param {number} kelvin - Temperature (in Kelvin) between 1000 and 40000
 * @returns {{r:number, g:number, b:number}} - RGB channel intensities (0-255)
 * @description Ported from: http://www.tannerhelland.com/4435/convert-temperature-rgb-algorithm-code/
 */
export function getRGBFromTemperature(kelvin: number) {
  // Temperature is in Kelvin
  let temperature = kelvin / 100;
  let r, g, b;
  let clamp = (num: number, min: number, max: number) =>
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

export function getHexFromRGB(rgb: any) {
  let r = rgb.r.toString(16);
  let g = rgb.g.toString(16);
  let b = rgb.b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}

export function getEspectre(min: number, max: number, step: number) {
  let espectre = [];

  for (let i = min; i <= max; i += step) {
    let color =
      "rgb(" +
      getRGBFromTemperature(i).r +
      "," +
      getRGBFromTemperature(i).g +
      "," +
      getRGBFromTemperature(i).b +
      ")";

    espectre.push(color);
  }

  return espectre;
}

export default function Home() {
  const minKelvin = 0;
  const maxKelvin = 15000;
  const extraKelvin = 40000;
  const stepKelvin = 100;

  const [kelvin, setKelvin] = useState((maxKelvin - minKelvin) / 2);
  const [rgb, setRGB] = useState(getRGBFromTemperature(kelvin));
  const [hex, setHex] = useState(getHexFromRGB(rgb));

  const handleChange = (event: any) => {
    setKelvin(event.target.value);
  };

  const fullscreen = () => {
    var isInFullScreen =
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null);

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  return (
    <main className="container mx-auto my-16 space-y-4">
      <div className="w-full mb-12">
        <h1 className="text-4xl font-bold text-center">Kelvin to RGB</h1>
        <p className="text-center">Convert Kelvin color temperature to RGB </p>
      </div>
      <div className="w-full flex flex-col border rounded-lg space-y-4 p-4 border-cyan-50">
        <div className="flex flex-row space-x-4">
          {/* Color */}
          <div className="basis-1/2 col-span-2">
            <div
              id="color"
              className="flex justify-end items-end h-64 w-full p-2 mb-4 rounded-lg"
              style={{
                backgroundColor: `rgb(${getRGBFromTemperature(kelvin).r}, ${
                  getRGBFromTemperature(kelvin).g
                }, ${getRGBFromTemperature(kelvin).b})`,
              }}
            >
              {/* fullscreen icon */}
              <button
                className="bg-black bg-opacity-60 hover:bg-black rounded-full h-8 w-8 p-1.5"
                onClick={fullscreen}
              >
                <ArrowsPointingOutIcon
                  style={{
                    opacity: 0.8,
                    color: `rgb(${getRGBFromTemperature(kelvin).r}, ${
                      getRGBFromTemperature(kelvin).g
                    }, ${getRGBFromTemperature(kelvin).b})`,
                  }}
                />
              </button>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <div>Kelvin</div>
                <div>{kelvin}</div>
              </div>
              <div className="flex justify-between">
                <div>RGB</div>
                <div>
                  ({getRGBFromTemperature(kelvin).r},{" "}
                  {getRGBFromTemperature(kelvin).g},{" "}
                  {getRGBFromTemperature(kelvin).b})
                </div>
              </div>
              <div className="flex justify-between">
                <div>HEX</div>
                <div>{getHexFromRGB(rgb)}</div>
              </div>
            </div>
          </div>
          {/* Color Setting */}
          <div className="basis-1/2 flex flex-col space-y-4">
            <div>
              <input
                type="number"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Kelvin"
                min={minKelvin}
                max={maxKelvin}
                step={stepKelvin}
                value={kelvin}
                onChange={handleChange}
              />

              <div className="relative mb-6">
                <label
                  htmlFor="default-range"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Default range
                </label>
                <input
                  type="range"
                  id="default-range"
                  min={minKelvin}
                  max={maxKelvin}
                  step={stepKelvin}
                  value={kelvin}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                  {minKelvin}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  {minKelvin + (maxKelvin - minKelvin) / 3}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  {minKelvin + ((maxKelvin - minKelvin) / 3) * 2}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                  {maxKelvin}
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row space-x-4 ">
                <div className="flex-1">vela</div>
                <div className="flex-none">x - x</div>
                <div className="flex-none">button</div>
              </div>
              <div className="flex flex-row space-x-4 ">
                <div className="flex-1">vela</div>
                <div className="flex-none">x - x</div>
                <div className="flex-none">button</div>
              </div>
              <div className="flex flex-row space-x-4 ">
                <div className="flex-1">vela</div>
                <div className="flex-none">x - x</div>
                <div className="flex-none">button</div>
              </div>
              <div className="flex flex-row space-x-4 ">
                <div className="flex-1">vela</div>
                <div className="flex-none">x - x</div>
                <div className="flex-none">button</div>
              </div>
            </div>
            <Presets />
          </div>
        </div>
        <hr />
        <div className="flex flex-row text-center space-x-4">
          <button
            type="button"
            className="flex-1 p-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            vela
          </button>
          <button
            type="button"
            className="flex-1 p-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            sol
          </button>
          <button
            type="button"
            className="flex-1 p-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            sol
          </button>
        </div>
      </div>
      <div
        className="h-32 w-full rounded-lg"
        style={{
          backgroundColor: `rgb(${getRGBFromTemperature(kelvin).r}, ${
            getRGBFromTemperature(kelvin).g
          }, ${getRGBFromTemperature(kelvin).b})`,
          backgroundImage: `linear-gradient(to right, ${getEspectre(
            minKelvin,
            maxKelvin,
            stepKelvin
          )})`,
        }}
      ></div>
      <div className="flex flex-col w-full border rounded-lg p-4">
        <h1 className="text-2xl font-bold">Espectro de cores</h1>
        <h1 className="text-2xl font-bold">Formula</h1>
        <div>oi</div>

        <h1>fonte:</h1>
        <a href="https://tannerhelland.com/2012/09/18/convert-temperature-rgb-algorithm-code.html">
          tannerhelland.com
        </a>
      </div>
    </main>
  );
}

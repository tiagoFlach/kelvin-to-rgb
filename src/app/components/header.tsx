// import { GithubIcon } from "@heroicons/react/24/solid";

import { SunIcon } from "@heroicons/react/24/solid";

export function getToggleIcon() {
  return <SunIcon className="w-6 h-6" />;
}

export function getGithubIcon() {
  // return <GithubIcon className="w-6 h-6" />;
}

export default function Header() {
  return (
    <header className="p-2 bg-gray-900 text-white">
      <div className="container flex justify-between items-center mx-auto">
        <h1 className="text-xl">Kelvin to RGB</h1>
        <nav className="flex items-center">
          <ul className="flex space-x-2">
            <li className="rounded p-2 hover:bg-gray-950">
              <a href="/">Home</a>
            </li>
            <li className="rounded p-2 hover:bg-gray-950">
              <a href="/presets">Presets</a>
            </li>
            <li className="rounded p-2 hover:bg-gray-950">
              <button>{getToggleIcon()}</button>
            </li>
            <li className="rounded p-2 hover:bg-gray-950">
              <a href="https://github.com/tiagoFlach/kelvin-to-rgb">
                {getToggleIcon()}
              </a>
            </li>

            <li>{/* <GithubIcon className="w-6 h-6" /> */}</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

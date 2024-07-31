// import { GithubIcon } from "@heroicons/react/24/solid";

export default function Header() {
  return (
    <header className="p-4 bg-gray-900 text-white">
      <div className="container flex justify-between items-center mx-auto">
        <h1 className="text-xl">Kelvin to RGB</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/presets">Presets</a>
            </li>

            <li>{/* <GithubIcon className="w-6 h-6" /> */}</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

// const { PresetsData } = require("../data/presets.js");

export default function Presets() {
  // get data from file
  // const presets = PresetsData;
  const presets = require("../data/presets.js");

  console.log(presets);

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {/* {presets.map((object) => (
        <li key={object.name} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {object.name}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {object.kelvin}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <div className="mt-1 flex items-center gap-x-1.5">
              <button>button</button>
            </div>
          </div>
        </li>
      ))} */}
    </ul>
  );
}

const { Presets } = require("./lib/presets");

export default function Presets() {

  // get data from file
  const presets = 

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {presets.map((person) => (
        <li key={person.email} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {person.name}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {person.email}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <div className="mt-1 flex items-center gap-x-1.5">
              <button>button</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

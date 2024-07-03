export default function Footer() {
  return (
    <footer className="items-centers grid grid-cols-1 justify-between gap-4 border-t border-gray-100 py-6 md:grid-cols-2">
      <p className="text-sm/6 text-slate-600 max-md:text-center">
        ©ANO Tailwind Labs Inc. All rights reserved.
      </p>
      <div className="flex items-center justify-center space-x-4 text-sm/6 font-semibold text-slate-900 md:justify-end">
        <a href="/privacy-policy">Privacy policy</a>
        <div className="h-4 w-px bg-slate-200"></div>
        <a href="/changelog">Changelog</a>
      </div>
    </footer>
  );
}

import React from "react";

export default function DockMostTracked({ items = [] }) {
  return (
    <div className="pointer-events-auto relative flex flex-col overflow-hidden rounded-lg bg-slate-900/95 text-slate-300 shadow-lg border border-slate-700 w-[340px] max-w-[90vw]">
        <header className="flex cursor-pointer items-center justify-between px-3 py-2.5">
          <div className="flex flex-1 items-center space-x-2 font-semibold">
            <span className="text-sm">Most tracked drones</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="14" aria-hidden>
              <rect width="32" height="14" rx="2" fill="#e3b021"></rect>
            </svg>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="fill-current size-4 text-slate-800">
                <path fillRule="evenodd" d="M12 24a12 12 0 1 1 12-12 11.98 11.98 0 0 1-12 12m0-22.154A10.154 10.154 0 1 0 22.154 12 10.163 10.163 0 0 0 12 1.846m0 14.524a.95.95 0 0 0 .923-.924 2.16 2.16 0 0 1 .493-1.66 9 9 0 0 1 1.046-1.108 5.57 5.57 0 0 0 1.97-3.384 3.87 3.87 0 0 0-.923-3.139 3.9 3.9 0 0 0-3.2-1.23 3.864 3.864 0 0 0-4.125 3.814.923.923 0 1 0 1.846 0c0-.307.124-1.907 2.34-1.97a2.1 2.1 0 0 1 1.723.617 2.3 2.3 0 0 1 .493 1.723c-.061.86-.554 1.353-1.416 2.277q-.6.574-1.108 1.23a4.06 4.06 0 0 0-.923 2.83.857.857 0 0 0 .861.924m1.17 2.03a1.168 1.168 0 1 0-2.34 0A1.17 1.17 0 0 0 12 19.57a1.21 1.21 0 0 0 1.17-1.17" clipRule="evenodd"></path>
              </svg>
            </span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="fill-current w-4 h-4 transition transform rotate-180">
            <path fillRule="evenodd" d="M11.842 18 .237 7.26a.686.686 0 0 1 0-1.038.8.8 0 0 1 1.105 0L11.842 16l10.816-9.704a.8.8 0 0 1 1.105 0 .686.686 0 0 1 0 1.037z" clipRule="evenodd"></path>
          </svg>
        </header>
        <div className="flex flex-1 flex-col overflow-hidden bg-slate-950">
          <div className="flex-1 overflow-y-auto px-2 py-1">
            {items.map((it, idx) => (
              <div key={it.id} className="cursor-pointer rounded-md bg-slate-800/80 px-2 py-1.5 hover:bg-slate-800 mt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center overflow-hidden text-md uppercase">
                    <span className="font-semibold mr-1">{idx + 1}.</span>
                    <span className="font-semibold uppercase truncate max-w-[7rem]">{it.name}</span>
                    <span className="inline-flex h-4 items-center rounded px-1 text-[10px] font-semibold bg-blue-600 text-white ml-2">
                      <span>{it.slug}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-yellow-500">
                    <span className="text-sm font-semibold">{it.altitude} m</span>
                  </div>
                </div>
                <div className="mt-1 flex items-center space-x-1 whitespace-nowrap text-sm">
                  <span className="truncate">{it.status}</span>
                  <span className="inline-flex h-4 items-center rounded px-1 text-[10px] font-semibold border border-slate-700 text-slate-400">
                    <span>{it.id}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex h-4 items-end justify-center bg-slate-900 pb-1">
            <div className="h-1 w-12 shrink-0 rounded-full bg-slate-700" />
          </div>
        </div>
    </div>
  );
}



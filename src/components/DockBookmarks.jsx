import React from "react";

export default function DockBookmarks() {
  return (
    <div className="pointer-events-auto relative flex flex-col overflow-hidden rounded-lg bg-slate-900/95 text-slate-300 shadow-lg border border-slate-700 w-[340px] max-w-[90vw]" style={{height: 316}}>
      <header className="flex cursor-pointer items-center justify-between px-3 py-2.5">
        <div className="flex flex-1 items-center space-x-2 font-semibold">
          <span className="text-sm">Bookmarks</span>
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
        <div className="h-0.5 w-full bg-slate-800" />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex items-center justify-center p-2">
            <div className="mx-0 my-auto flex flex-col items-center justify-center space-y-2 rounded-md border border-slate-800 p-2 text-white">
              <p className="text-center text-sm">
                Create a free account to add bookmarks
              </p>
            </div>
          </div>
          <div className="shrink-0 pb-1 pt-3">
            <button className="m-0 flex w-full items-center justify-center py-0 text-sm font-semibold text-blue-400 hover:text-blue-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="fill-current mr-1 size-5">
                <path fillRule="evenodd" d="M18.09 11.397h-5.487V5.97c0-.362-.241-.603-.603-.603s-.603.241-.603.603v5.427H5.97c-.362 0-.603.241-.603.603s.241.603.603.603h5.427v5.487c0 .362.241.604.603.604s.603-.242.603-.604v-5.487h5.487c.362 0 .604-.241.604-.603a.604.604 0 0 0-.604-.603M12 0C5.367 0 0 5.367 0 12s5.367 12 12 12 12-5.367 12-12S18.633 0 12 0m0 22.794A10.783 10.783 0 0 1 1.206 12C1.206 6.03 6.03 1.206 12 1.206S22.794 6.03 22.794 12 17.97 22.794 12 22.794" clipRule="evenodd"></path>
              </svg>
              <span>Add bookmark</span>
            </button>
          </div>
        </div>
        <div className="flex h-4 items-end justify-center bg-slate-900 pb-1">
          <div className="h-1 w-12 shrink-0 rounded-full bg-slate-700" />
        </div>
      </div>
    </div>
  );
}

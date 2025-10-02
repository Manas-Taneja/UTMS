import React, { useEffect, useRef, useState } from "react";

export default function DroneDetails({ selectedDrone, onClose }) {
  const detailsRef = useRef(null);
  const [isShown, setIsShown] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // On mount, we trigger the transition by updating state.
    // requestAnimationFrame ensures the component has rendered once
    // with the initial (off-screen) state before the update.
    const animationFrameId = requestAnimationFrame(() => {
      setIsShown(true);
    });
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match transition duration
  };

  if (!selectedDrone) return null;

  // Sample flight-style data to enrich the overlay
  const sample = {
    flightNumber: "UTM-7713",
    operator: "UTMS Demo Ops",
    imageUrl: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1400&auto=format&fit=crop",
    route: {
      origin: { code: "SOF", city: "Sofia", tz: "EEST (UTC+03:00)" },
      destination: { code: "NBE", city: "Enfidha", tz: "CET (UTC+01:00)" },
    },
    times: {
      scheduledDep: "7:50 am",
      actualDep: "8:06 am",
      scheduledArr: "8:05 am",
      estimatedArr: "8:10 am",
    },
    distance: {
      traveledKm: 773,
      remainingKm: 564,
      elapsed: "01:16:09",
      remaining: "00:48",
    },
    aircraft: {
      typeCode: "B733",
      typeName: "Boeing 737-341",
      registration: "UT-BOO",
      country: "DemoLand",
    },
  };

  const progressTotal = sample.distance.traveledKm + sample.distance.remainingKm;
  const progressPct = Math.min(
    100,
    Math.max(0, Math.round((sample.distance.traveledKm / Math.max(progressTotal, 1)) * 100))
  );

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      <div
        ref={detailsRef}
        className={`absolute left-4 top-20 w-[340px] max-w-[90vw] bg-slate-900/95 backdrop-blur-sm text-slate-100 rounded-lg shadow-lg border border-slate-700 pointer-events-auto overflow-hidden transition-transform duration-300 ${isShown && !isClosing ? 'translate-x-0' : '-translate-x-[360px]'}`}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-3 py-2 bg-slate-800/80">
          <div className="flex items-center gap-2 text-sm">
            <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-600/40">
              {sample.flightNumber}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-200 border border-slate-600">
              {sample.aircraft.typeCode}
            </span>
            <span className="text-slate-300">{sample.operator}</span>
          </div>
          <button
            className="text-slate-400 hover:text-white text-xl"
            onClick={handleClose}
            aria-label="Close details"
          >
            &times;
          </button>
        </div>

        {/* Banner image */}
        <div className="h-40 w-full bg-slate-700">
          <img src={sample.imageUrl} alt="Airframe" className="h-full w-full object-cover" />
        </div>

        {/* Route strip */}
        <div className="px-4 py-3 border-b border-slate-700 bg-slate-900/60">
          <div className="grid grid-cols-3 items-center">
            <div className="text-center">
              <div className="text-3xl font-extrabold tracking-tight">{sample.route.origin.code}</div>
              <div className="text-xs text-slate-400 uppercase">{sample.route.origin.city}</div>
              <div className="text-[10px] text-slate-500">{sample.route.origin.tz}</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-600/40">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M2 13h9v7l3-7h8l-8-2-3-7v7H2z"/></svg>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold tracking-tight">{sample.route.destination.code}</div>
              <div className="text-xs text-slate-400 uppercase">{sample.route.destination.city}</div>
              <div className="text-[10px] text-slate-500">{sample.route.destination.tz}</div>
            </div>
          </div>

          {/* Times row */}
          <div className="mt-3 grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-slate-400">Scheduled</div>
              <div className="text-slate-200 font-medium">{sample.times.scheduledDep}</div>
              <div className="mt-1 text-slate-400">Actual</div>
              <div className="text-slate-200 font-medium">{sample.times.actualDep}</div>
            </div>
            <div>
              <div className="text-slate-400">Scheduled</div>
              <div className="text-slate-200 font-medium">{sample.times.scheduledArr}</div>
              <div className="mt-1 text-slate-400">Estimated</div>
              <div className="text-slate-200 font-medium">{sample.times.estimatedArr}</div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="h-2 w-full rounded bg-slate-700 overflow-hidden">
              <div className="h-full bg-yellow-500" style={{ width: `${progressPct}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-slate-400">
              <div>
                {sample.distance.traveledKm} km, {sample.distance.elapsed}
              </div>
              <div>
                {sample.distance.remainingKm} km, in {sample.distance.remaining}
              </div>
            </div>
          </div>
        </div>

        {/* Live drone stats + aircraft block */}
        <div className="px-4 py-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="space-y-1">
              <div><span className="text-slate-400">Altitude:</span> <span className="text-slate-200 font-medium">{selectedDrone.altitude} m</span></div>
              <div><span className="text-slate-400">Speed:</span> <span className="text-slate-200 font-medium">{selectedDrone.speed} m/s</span></div>
              <div><span className="text-slate-400">Heading:</span> <span className="text-slate-200 font-medium">{selectedDrone.heading}°</span></div>
              <div><span className="text-slate-400">Status:</span> <span className="text-slate-200 font-medium">{selectedDrone.status}</span></div>
            </div>
            <div className="space-y-1">
              <div className="text-slate-300">Aircraft type <span className="text-slate-400">({selectedDrone.type})</span></div>
              <div className="text-slate-200 font-semibold">{sample.aircraft.typeName}</div>
              <div className="pt-1 border-t border-slate-700" />
              <div className="text-slate-300">No. of wings</div>
              <div className="text-slate-200 font-semibold">{selectedDrone.wings}</div>
              <div className="text-slate-300">Pilot</div>
              <div className="text-slate-200 font-semibold">{selectedDrone.pilot}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

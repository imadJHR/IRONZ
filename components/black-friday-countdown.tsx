"use client";

import { useSyncExternalStore } from "react";

// Du 11 au 30 novembre 2026 inclus, heure du Maroc.
const endsAt = "2026-12-01T00:00:00+01:00";
const deadline = Date.parse(endsAt);

function getRemainingSeconds() {
  return Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
}

function subscribe(onTick: () => void) {
  if (getRemainingSeconds() === 0) return () => {};

  const interval = window.setInterval(() => {
    onTick();
    if (getRemainingSeconds() === 0) window.clearInterval(interval);
  }, 1000);

  return () => window.clearInterval(interval);
}

function getServerSnapshot() {
  return null;
}

export default function BlackFridayCountdown() {
  const remaining = useSyncExternalStore(subscribe, getRemainingSeconds, getServerSnapshot);
  const seconds = remaining ?? 0;
  const units = [
    { label: "Jours", value: Math.floor(seconds / 86400) },
    { label: "Heures", value: Math.floor(seconds / 3600) % 24 },
    { label: "Minutes", value: Math.floor(seconds / 60) % 60 },
    { label: "Secondes", value: seconds % 60 },
  ];

  return (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-lg border border-white/15 border-l-yellow-400 bg-white/5 px-3 py-3 sm:px-5">
      <div>
        <p className="text-sm font-semibold text-white">
          {remaining === 0 ? "Période Black Friday terminée" : "20 jours de Black Friday"}
        </p>
        <p className="mt-1 text-xs text-zinc-300">
          Jusqu’au <time dateTime={endsAt}>30 novembre 2026 à 23 h 59</time>, heure du Maroc.
        </p>
      </div>
      {remaining !== 0 && (
        <div role="timer" aria-label="Temps restant pour le Black Friday" className="grid w-full grid-cols-4 gap-1.5 sm:w-auto sm:gap-2">
          {units.map(({ label, value }) => (
            <div key={label} className="rounded bg-[#111111] px-1 py-1.5 text-center sm:min-w-16">
              <span className="block font-display text-2xl tabular-nums leading-none text-yellow-400">
                {remaining === null ? "–" : String(value).padStart(2, "0")}
              </span>
              <span className="mt-1 block text-[10px] text-zinc-300">{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

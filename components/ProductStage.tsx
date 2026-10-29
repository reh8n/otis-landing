"use client";

import { useEffect, useState } from "react";
import { launchVideo } from "../lib/site";

type Frame = {
  id: string;
  label: string;
  caption: string;
  light: string;
  dark?: string;
  width: number;
  height: number;
};

const frames: Frame[] = [
  {
    id: "coding",
    label: "Coding Mode",
    caption: "Code, the room and a 3D office of your agents, in one window.",
    light: "/product/coding-light",
    dark: "/product/coding-dark",
    width: 1800,
    height: 1125,
  },
  {
    id: "room",
    label: "Rooms",
    caption: "A room of agents on one problem. Their questions wait for you in one tray.",
    // Only the dark capture shows the questions tray, so both themes use it.
    light: "/product/room-dark",
    width: 1800,
    height: 1125,
  },
  {
    id: "office",
    label: "Office",
    caption: "See who is writing, who is idle and who needs you, without reading a word.",
    light: "/product/office-light",
    dark: "/product/office-dark",
    width: 1800,
    height: 1125,
  },
];

const intervalMs = 5200;

function Shot({ frame, eager }: { frame: Frame; eager: boolean }) {
  return (
    <picture>
      {frame.dark ? (
        <source
          media="(prefers-color-scheme: dark)"
          srcSet={`${frame.dark}-960.jpg 960w, ${frame.dark}.jpg 1800w`}
          sizes="(max-width: 1180px) 100vw, 1120px"
        />
      ) : null}
      <img
        src={`${frame.light}.jpg`}
        srcSet={`${frame.light}-960.jpg 960w, ${frame.light}.jpg 1800w`}
        sizes="(max-width: 1180px) 100vw, 1120px"
        width={frame.width}
        height={frame.height}
        alt={`Otis IDE ${frame.label} screen. ${frame.caption}`}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
      />
    </picture>
  );
}

export default function ProductStage() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (launchVideo.src || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((i) => (i + 1) % frames.length), intervalMs);
    return () => window.clearInterval(timer);
  }, [paused]);

  if (launchVideo.src) {
    return (
      <div className="stage">
        <div className="stage-window stage-window--video">
          <video
            src={launchVideo.src}
            poster={launchVideo.poster ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            controls
            aria-label="Otis IDE launch film"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="stage"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="stage-window">
        <div className="stage-frames">
          {frames.map((frame, i) => (
            <div
              key={frame.id}
              className={`stage-frame${i === active ? " is-active" : ""}`}
              aria-hidden={i !== active}
            >
              <Shot frame={frame} eager={i === 0} />
            </div>
          ))}
        </div>
      </div>
      <div className="stage-tabs" role="tablist" aria-label="Product screens">
        {frames.map((frame, i) => (
          <button
            key={frame.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={i === active ? "is-active" : undefined}
            onClick={() => setActive(i)}
          >
            <span className="stage-tab-label">{frame.label}</span>
            <span className="stage-tab-progress" aria-hidden="true">
              <i key={`${active}-${paused}`} />
            </span>
          </button>
        ))}
      </div>
      <p className="stage-caption" aria-live="polite">{frames[active].caption}</p>
    </div>
  );
}

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { useState, useEffect } from "react";
import ironmanLogo from "../assets/ironman_logo.png";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const STATE_ABBR = {
  Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR", California: "CA",
  Colorado: "CO", Connecticut: "CT", Delaware: "DE", Florida: "FL", Georgia: "GA",
  Hawaii: "HI", Idaho: "ID", Illinois: "IL", Indiana: "IN", Iowa: "IA",
  Kansas: "KS", Kentucky: "KY", Louisiana: "LA", Maine: "ME", Maryland: "MD",
  Massachusetts: "MA", Michigan: "MI", Minnesota: "MN", Mississippi: "MS", Missouri: "MO",
  Montana: "MT", Nebraska: "NE", Nevada: "NV", "New Hampshire": "NH", "New Jersey": "NJ",
  "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", Ohio: "OH",
  Oklahoma: "OK", Oregon: "OR", Pennsylvania: "PA", "Rhode Island": "RI", "South Carolina": "SC",
  "South Dakota": "SD", Tennessee: "TN", Texas: "TX", Utah: "UT", Vermont: "VT",
  Virginia: "VA", Washington: "WA", "West Virginia": "WV", Wisconsin: "WI", Wyoming: "WY"
};

const STATE_NAME = Object.fromEntries(
  Object.entries(STATE_ABBR).map(([name, abbr]) => [abbr, name])
);

const TYPES = {
  marathon: { label: "Marathons", color: "#0d9488" },
  ultra: { label: "Ultras", color: "#7a1d6b" },
  ironman: { label: "IRONMAN", color: "#e4002b" },
};

const RACES = [
  // Marathons
  { type: "marathon", race: "Walt Disney World Marathon", city: "Orlando", state: "FL", coordinates: [-81.3789, 28.5384], years: [2020, 2022, 2023, 2024, 2025] },
  { type: "marathon", race: "Ocean State Marathon", city: "Narragansett", state: "RI", coordinates: [-71.4495, 41.4501], years: [2020] },
  { type: "marathon", race: "Providence Marathon", city: "Providence", state: "RI", coordinates: [-71.4142, 41.8246], years: [2022, 2023] },
  { type: "marathon", race: "Savin Rock Marathon", city: "West Haven", state: "CT", coordinates: [-72.9498, 41.2724], years: [2023] },
  { type: "marathon", race: "Cape Cod Marathon", city: "Falmouth", state: "MA", coordinates: [-70.6129, 41.5522], years: [2023] },
  { type: "marathon", race: "Manchester City Marathon", city: "Manchester", state: "NH", coordinates: [-71.4548, 42.9956], years: [2023] },
  { type: "marathon", race: "BMW Dallas Marathon", city: "Dallas", state: "TX", coordinates: [-96.7970, 32.7767], years: [2023] },
  { type: "marathon", race: "Hyannis Marathon", city: "Hyannis", state: "MA", coordinates: [-70.2881, 41.6525], years: [2024, 2025] },
  { type: "marathon", race: "Maine Coast Marathon", city: "Wells", state: "ME", coordinates: [-70.5805, 43.3222], years: [2024] },
  { type: "marathon", race: "Buffalo Marathon", city: "Buffalo", state: "NY", coordinates: [-78.8789, 42.8869], years: [2024] },
  { type: "marathon", race: "Mad Marathon", city: "Mad River Valley", state: "VT", coordinates: [-72.7893, 44.2203], years: [2024] },
  { type: "marathon", race: "Hartford Marathon", city: "Hartford", state: "CT", coordinates: [-72.6734, 41.7658], years: [2025] },
  { type: "marathon", race: "NipMuck Trail Marathon", city: "Ashford", state: "CT", coordinates: [-72.1214, 41.8731], years: [2026] },
  { type: "marathon", race: "Marine Corps Marathon", city: "Arlington", state: "VA", coordinates: [-77.1083, 38.8802], years: [2026] },

  // Ultras
  { type: "ultra", race: "Spring Fling 600 (10 hrs)", city: "Southington", state: "CT", coordinates: [-72.8776, 41.5965], years: [2024] },
  { type: "ultra", race: "Anchor Down Ultra (24 hrs)", city: "Bristol", state: "RI", coordinates: [-71.2662, 41.6771], years: [2025, 2026] },

  // IRONMAN
  { type: "ironman", race: "IRONMAN 70.3 Western Massachusetts", city: "Springfield", state: "MA", coordinates: [-72.5893, 42.4400], years: [2025] },
  { type: "ironman", race: "IRONMAN 70.3 Maine", city: "Augusta", state: "ME", coordinates: [-69.7800, 44.3106], years: [2026] },
  { type: "ironman", race: "IRONMAN 140.6 Texas", city: "The Woodlands", state: "TX", coordinates: [-95.4611, 30.1658], years: [2026] },
];

// A state is colored only if I've run a marathon there
const RACED_FILL = "#ffeebb";
const EMPTY_FILL = "#e8e8e8";

const racesByState = RACES.reduce((acc, r) => {
  (acc[r.state] ??= []).push(r);
  return acc;
}, {});

const finishes = (races) => races.reduce((sum, r) => sum + r.years.length, 0);
const hasMarathon = (abbr) => (racesByState[abbr] || []).some((r) => r.type === "marathon");

const totals = {
  marathon: finishes(RACES.filter((r) => r.type === "marathon")),
  ultra: finishes(RACES.filter((r) => r.type === "ultra")),
  ironmanFull: finishes(RACES.filter((r) => r.type === "ironman" && r.race.includes("140.6"))),
  ironmanHalf: finishes(RACES.filter((r) => r.type === "ironman" && r.race.includes("70.3"))),
};

function TypeIcon({ type, size = 12 }) {
  if (type === "ironman") {
    return <img src={ironmanLogo} alt="" className="type-icon" style={{ height: size + 4, width: "auto" }} />;
  }
  return (
    <span
      className={`type-icon type-icon-${type}`}
      style={{ width: size, height: size, background: TYPES[type].color }}
    />
  );
}

function StateRaces({ abbr }) {
  const races = racesByState[abbr] || [];
  return (
    <>
      <div className="race-card-header">
        <strong>{STATE_NAME[abbr]}</strong>
      </div>
      <ul className="race-list">
        {races.map((r) => (
          <li key={r.race}>
            <TypeIcon type={r.type} size={10} />
            <div>
              <div className="race-name">{r.race}</div>
              <div className="race-meta">
                {r.city}
                {r.years.map((y) => (
                  <span key={y} className="year-pill">{y}</span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function Personal() {
  const [hover, setHover] = useState(null); // { abbr, x, y }
  const [selected, setSelected] = useState(null); // tapped state on touch devices
  const [activeType, setActiveType] = useState(null);

  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handlers = (abbr) => ({
    onMouseEnter: (e) => !isTouch && setHover({ abbr, x: e.clientX, y: e.clientY }),
    onMouseMove: (e) => !isTouch && setHover({ abbr, x: e.clientX, y: e.clientY }),
    onMouseLeave: () => setHover(null),
    onClick: () => isTouch && setSelected((s) => (s === abbr ? null : abbr)),
  });

  return (
    <section className="teaching personal">
      <h2>Personal</h2>
      <p className="personal-blurb">
        Outside of academia, I love spending time outdoors. I'm usually training for some endurance race (at party pace, of course). Hover below to see which marathons, ultramarathons, and triathlons I've completed so far. And feel free to reach out with any race suggestions!
      </p>

      <div className="race-map">
        <div className="race-stats">
          {Object.entries(TYPES).map(([type, { label }]) => (
            <button
              key={type}
              type="button"
              className={`race-stat${activeType === type ? " is-active" : ""}`}
              style={{ "--stat-color": TYPES[type].color }}
              onMouseEnter={() => !isTouch && setActiveType(type)}
              onMouseLeave={() => !isTouch && setActiveType(null)}
              onClick={() => isTouch && setActiveType((t) => (t === type ? null : type))}
              aria-pressed={activeType === type}
            >
              <TypeIcon type={type} />
              {type === "ironman" ? (
                <>
                  <strong>{totals.ironmanFull}</strong> 140.6 / <strong>{totals.ironmanHalf}</strong> 70.3
                </>
              ) : (
                <>
                  <strong>{totals[type]}</strong> {label}
                </>
              )}
            </button>
          ))}
        </div>
        <ComposableMap projection="geoAlbersUsa">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const abbr = STATE_ABBR[geo.properties.name];
                const races = (abbr && racesByState[abbr]) || [];
                const visited = races.length > 0;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={hasMarathon(abbr) ? RACED_FILL : EMPTY_FILL}
                    stroke="#ffffff"
                    strokeWidth={0.75}
                    {...(visited ? handlers(abbr) : {})}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", cursor: visited ? "pointer" : "default" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {RACES.map(({ race, coordinates, state, type }) => {
            const dimmed = activeType && activeType !== type;
            const style = {
              opacity: dimmed ? 0.15 : 1,
              transition: "opacity 0.2s ease",
              cursor: "pointer",
            };
            return (
              <Marker key={race} coordinates={coordinates} {...handlers(state)}>
                {type === "ironman" ? (
                  <image href={ironmanLogo} width={14} height={14} x={-7} y={-7} style={style} />
                ) : type === "ultra" ? (
                  <rect
                    width={7} height={7} x={-3.5} y={-3.5}
                    transform="rotate(45)"
                    fill={TYPES.ultra.color}
                    stroke="#fff" strokeWidth={1.25}
                    style={style}
                  />
                ) : (
                  <circle
                    r={4}
                    fill={TYPES.marathon.color}
                    stroke="#fff" strokeWidth={1.25}
                    style={style}
                  />
                )}
              </Marker>
            );
          })}
        </ComposableMap>

      </div>

      {isTouch && selected && (
        <div className="race-card race-card-inline">
          <StateRaces abbr={selected} />
        </div>
      )}

      {!isTouch && hover && (
        <div
          className="race-card race-card-tooltip"
          style={{
            top: Math.min(hover.y + 16, window.innerHeight - 220),
            left: Math.min(hover.x + 16, window.innerWidth - 360),
          }}
        >
          <StateRaces abbr={hover.abbr} />
        </div>
      )}
    </section>
  );
}

export default Personal;

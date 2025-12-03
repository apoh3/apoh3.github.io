import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { useState, useEffect } from "react";

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
  Virginia: "VA", Washington: "WA", "West Virginia": "WV", Wisconsin: "WI", Wyoming: "WY",
  "District of Columbia": "DC", "Puerto Rico": "PR"
};

function Personal() {
  const marathons = [
    { name: "Walt Disney World Marathon in Orlando, FL (2020, 2022, 2023, 2024, 2025)", coordinates: [-81.3789, 28.5384], state: "FL" },
    { name: "Ocean State Marathon in Narragansett, RI (2020)", coordinates: [-71.4495, 41.4501], state: "RI" },
    { name: "Providence Marathon in Providence, RI (2022, 2023)", coordinates: [-71.4142, 41.8246], state: "RI" },
    { name: "Savin Rock Marathon in West Haven, CT (2023)", coordinates: [-72.9498, 41.2724], state: "CT" },
    { name: "Cape Cod Marathon in Falmouth, MA (2023)", coordinates: [-70.6129, 41.5522], state: "MA" },
    { name: "Manchester City Marathon in Manchester, NH (2023)", coordinates: [-71.4548, 42.9956], state: "NH" },
    { name: "BMW Dallas Marathon in Dallas, TX (2023)", coordinates: [-96.7970, 32.7767], state: "TX" },
    { name: "Hyannis Marathon in Hyannis, MA (2024, 2025)", coordinates: [-70.2881, 41.6525], state: "MA" },
    { name: "Maine Coast Marathon in Wells, ME (2024)", coordinates: [-70.5805, 43.3222], state: "ME" },
    { name: "Buffalo Marathon in Buffalo, NY (2024)", coordinates: [-78.8789, 42.8869], state: "NY" },
    { name: "Mad Marathon in Mad River Valley, VT (2024)", coordinates: [-72.7893, 44.2203], state: "VT" },
    { name: "Hartford Marathon in Hartford, CT (2025)", coordinates: [-72.6734, 41.7658], state: "CT" }
  ];

  const ultras = [
    { name: "Spring Fling 600 (10 Hrs) in Southington, CT (2024)", coordinates: [-72.8776, 41.5965], state: "CT" },
    { name: "Anchor Down Ultra (24 Hrs) in Bristol, RI (2025)", coordinates: [-71.2662, 41.6771], state: "RI" },
  ];

  const events = [
    ...marathons.map(m => ({ ...m, type: "marathon" })),
    ...ultras.map(u => ({ ...u, type: "ultra" })),
  ];

  const eventsByState = events.reduce((acc, ev) => {
    const text = ev.name.replace(/ in .*?, [A-Z]{2}/, "");
    (acc[ev.state] ??= []).push({ text, type: ev.type });
    return acc;
  }, {});

  const runStates = Object.keys(eventsByState);

  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    state: "",
    items: [],
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const totalMarathons = marathons.reduce((sum, m) => {
    const match = m.name.match(/\(([^)]+)\)/);
    if (!match) return sum;
    const parts = match[1].split(",").map(s => s.trim());
    return sum + parts.length;
  }, 0);

  const totalUltras = ultras.reduce((sum, u) => {
    const match = u.name.match(/\(([^)]+)\)/);
    if (!match) return sum;
    const parts = match[1].split(",").map(s => s.trim());
    return sum + parts.length;
  }, 0);

  return (
    <section className="teaching">
      <h2>Personal</h2>
      <p className="personal-blurb">
        🏃‍♀️ Running is my favorite way to explore new places! I've completed{" "}
        <span style={{ color: "#af0d1a" }}>{totalMarathons} marathons</span>,{" "}
        <span style={{ color: "#0078d7 " }}>{totalUltras} ultras</span>, and countless half marathons. My goal is to run a marathon in every state. Below is a map of my marathon and ultra adventures so far:
      </p>

      <div className="w-full max-w-3xl">
        <ComposableMap projection="geoAlbersUsa">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = geo.properties.name || geo.properties.NAME;
                const abbr = STATE_ABBR[stateName];
                const items = abbr ? eventsByState[abbr] || [] : [];
                const isRunState = items.length > 0;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isRunState ? "#facc15" : "#eaeaea"}
                    stroke="#111"
                    onMouseEnter={(e) => {
                      if (isMobile || items.length === 0) return;
                      setTooltip({
                        show: true,
                        x: e.clientX,
                        y: e.clientY,
                        state: stateName,
                        items,
                      });
                    }}
                    onMouseMove={(e) => {
                      if (isMobile) return;
                      setTooltip((t) => ({ ...t, x: e.clientX, y: e.clientY }));
                    }}
                    onMouseLeave={() => {
                      if (isMobile) return;
                      setTooltip({ show: false, x: 0, y: 0, state: "", items: [] });
                    }}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {events.map(({ name, coordinates, state, type }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle
                r={4}
                fill={type === "marathon" ? "#af0d1a" : "#0078d7"}
                stroke="#fff"
                strokeWidth={1}
                onMouseEnter={(e) => {
                  if (isMobile) return;
                  const fullState = Object.keys(STATE_ABBR).find(key => STATE_ABBR[key] === state);
                  setTooltip({
                    show: true,
                    x: e.clientX,
                    y: e.clientY,
                    state: fullState,
                    items: eventsByState[state] || [],
                  });
                }}
                onMouseMove={(e) => {
                  if (isMobile) return;
                  setTooltip((t) => ({ ...t, x: e.clientX, y: e.clientY }));
                }}
                onMouseLeave={() => {
                  if (isMobile) return;
                  setTooltip({ show: false, x: 0, y: 0, state: "", items: [] });
                }}
              />
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {!isMobile && tooltip.show && (
        <div
          style={{
            position: "fixed",
            top: Math.min(tooltip.y + 15, window.innerHeight - 150),
            left: Math.min(tooltip.x + 15, window.innerWidth - 320),
            zIndex: 9999,
            background: "white",
            border: "1px solid black",
            padding: "10px",
            maxWidth: "360px",
          }}
        >
          <strong className="block">{tooltip.state}</strong>

          <ul className="space-y-1" style={{ listStyle: "none", paddingLeft: 0, marginTop: 10, marginBottom: 4}}>
            {tooltip.items.map((it, i) => {
              const match = it.text.match(/^(.*)\s*\(([^)]*)\)\s*$/);
              if (!match) {
                const icon = it.type === "marathon" ? "🏅" : "🥇";
                return <li key={i}>{icon} {it.text}</li>;
              }

              const race = match[1].trim();
              const yearsArr = match[2]
                .split(",")
                .map(y => `’${y.trim().slice(-2)}`);
              const icon = it.type === "marathon" ? "🏅" : "🥇";
              const icons = icon.repeat(Math.max(1, yearsArr.length));

              return (
                <li key={i}>
                  {icons} {race} ({yearsArr.join(", ")})
                </li>
              );
            })}
          </ul>
        </div>
      )}

    </section>
  );
}

export default Personal;

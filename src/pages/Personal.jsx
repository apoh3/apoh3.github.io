import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { useState } from "react";

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
  const cities = [
    { name: "Orlando, FL (Walt Disney World Marathon, 2020, 2022, 2023, 2024, 2025)", coordinates: [-81.3789, 28.5384], state: "FL" },
    { name: "Narragansett, RI (Ocean State Marathon, 2020)", coordinates: [-71.4495, 41.4501], state: "RI" },
    { name: "Providence, RI (Providence Marathon, 2022, 2023)", coordinates: [-71.4142, 41.8246], state: "RI" },
    { name: "West Haven, CT (Savin Rock Marathon, 2023)", coordinates: [-72.9498, 41.2724], state: "CT" },
    { name: "Falmouth, MA (Cape Cod Marathon, 2023)", coordinates: [-70.6129, 41.5522], state: "MA" },
    { name: "Manchester, NH (Manchester City Marathon, 2023)", coordinates: [-71.4548, 42.9956], state: "NH" },
    { name: "Dallas, TX (BMW Dallas Marathon, 2023)", coordinates: [-96.7970, 32.7767], state: "TX" },
    { name: "Hyannis, MA (Hyannis Marathon, 2024, 2025)", coordinates: [-70.2881, 41.6525], state: "MA" },
    { name: "Wells, ME (Maine Coast Marathon, 2024)", coordinates: [-70.5805, 43.3222], state: "ME" },
    { name: "Buffalo, NY (Buffalo Marathon, 2024)", coordinates: [-78.8789, 42.8869], state: "NY" },
    { name: "Mad River Valley, VT (Mad Marathon, 2024)", coordinates: [-72.7893, 44.2203], state: "VT" },
  ];

  const marathonsByState = cities.reduce((acc, city) => {
    (acc[city.state] ??= []).push(city.name);
    return acc;
  }, {});

  const marathonStates = Object.keys(marathonsByState);

  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, state: "", marathons: [] });

  const totalMarathons = cities.reduce((sum, city) => {
    const match = city.name.match(/\(([^)]+)\)/);
    if (!match) return sum;
    const parts = match[1].split(",").map(s => s.trim());
    return sum + (parts.length - 1);
  }, 0);

  return (
    <section className="teaching">
      <h2>Personal</h2>
      <p>Marathon tracker 🏅 ({totalMarathons})</p>

      <div className="relative w-full max-w-3xl">
        <ComposableMap projection="geoAlbersUsa">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = geo.properties.name || geo.properties.NAME;
                const abbr = STATE_ABBR[stateName];
                const isRunState = abbr && marathonStates.includes(abbr);
                const marathons = abbr ? marathonsByState[abbr] : [];

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isRunState ? "#facc15" : "#eaeaea"}
                    stroke="#111"
                    onMouseEnter={(e) => {
                      if (marathons.length > 0) {
                        setTooltip({
                          show: true,
                          x: e.clientX,
                          y: e.clientY,
                          state: stateName,
                          marathons
                        });
                      }
                    }}
                    onMouseMove={(e) => setTooltip((t) => ({ ...t, x: e.clientX, y: e.clientY }))}
                    onMouseLeave={() => setTooltip({ show: false, x: 0, y: 0, state: "", marathons: [] })}
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

          {cities.map(({ name, coordinates, state }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle
                r={5}
                fill="#ef4444"
                stroke="#fff"
                strokeWidth={2}
                onMouseEnter={(e) => {
                  const fullState = Object.keys(STATE_ABBR).find(
                    key => STATE_ABBR[key] === state
                  );
                  setTooltip({
                    show: true,
                    x: e.clientX,
                    y: e.clientY,
                    state: fullState,
                    marathons: marathonsByState[state],
                  });
                }}
                onMouseMove={(e) =>
                  setTooltip((t) => ({ ...t, x: e.clientX, y: e.clientY }))
                }
                onMouseLeave={() =>
                  setTooltip({ show: false, x: 0, y: 0, state: "", marathons: [] })
                }
              />
            </Marker>
          ))}


        </ComposableMap>

        {tooltip.show && (
          <div
            className="absolute z-50 pointer-events-none bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg p-3 text-sm max-w-xs"
            style={{ top: tooltip.y + 15, left: tooltip.x + 15 }}
          >
            <strong className="block mb-1">{tooltip.state}</strong>
            <ul className="list-disc list-inside space-y-1">
              {tooltip.marathons.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default Personal;

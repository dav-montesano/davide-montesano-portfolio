import { useEffect, useRef, useState } from "react";
import maplibregl, { type StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import svgPaths from "./icons/weatherMapPaths";
import imgImageUser from "figma:asset/61919d90bd86015ca55b0ceeda3ede4a630f3f5a.png";

// Fixed home base — Città Studi, Milan
const HOME = { lat: 45.4784, lon: 9.2263, city: "Milan", timeZone: "Europe/Rome" };
const MAP_ZOOM = 14.5; // below ~14 the vector tiles stop carrying building geometry, so 3D disappears
const MAP_PITCH = 50;
const BUILDING_3D_MINZOOM = 13;

const STYLE_URL = { light: "https://tiles.openfreemap.org/styles/liberty", dark: "https://tiles.openfreemap.org/styles/dark" };

// Strip text labels, POI icons and road shields so the map reads as quiet shapes, not a directory
async function loadCleanStyle(url: string, isDark: boolean): Promise<StyleSpecification | string> {
  try {
    const res = await fetch(url);
    const style = (await res.json()) as StyleSpecification;
    style.layers = style.layers.filter((layer) => layer.type !== "symbol");

    // OpenFreeMap's "dark" style ships buildings as a flat fill (unlike "liberty"), so add the 3D extrusion ourselves
    const buildingExtrusion = style.layers.find((layer) => layer.type === "fill-extrusion");
    if (buildingExtrusion) {
      buildingExtrusion.minzoom = BUILDING_3D_MINZOOM; // native layer defaults to 14, above our map's resting zoom
    } else {
      style.layers.push({
        id: "building-3d",
        type: "fill-extrusion",
        source: "openmaptiles",
        "source-layer": "building",
        minzoom: BUILDING_3D_MINZOOM,
        paint: {
          "fill-extrusion-base": ["get", "render_min_height"],
          "fill-extrusion-height": ["get", "render_height"],
          "fill-extrusion-color": isDark ? "hsl(220,10%,22%)" : "hsl(35,8%,85%)",
          "fill-extrusion-opacity": isDark ? 0.9 : 0.8,
        },
      });
    }

    return style;
  } catch {
    return url; // let MapLibre fetch it directly as a fallback
  }
}

export function MilanMapWidget({ isDark }: { isDark?: boolean }) {
  const [time, setTime] = useState(new Date());
  const [temperature, setTemperature] = useState<number | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${HOME.lat}&longitude=${HOME.lon}&current=temperature_2m`
        );
        const data = await response.json();
        setTemperature(Math.round(data.current.temperature_2m));
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        setTemperature(7); // Fallback to original static value
      }
    };

    fetchWeather();
    // Refresh weather every 30 minutes
    const weatherTimer = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(weatherTimer);
  }, []);

  // (Re)create the map whenever the container mounts or the theme changes
  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    loadCleanStyle(isDark ? STYLE_URL.dark : STYLE_URL.light, !!isDark).then((style) => {
      if (cancelled || !containerRef.current) return;
      mapRef.current?.remove();
      mapRef.current = new maplibregl.Map({
        container: containerRef.current,
        style,
        center: [HOME.lon, HOME.lat],
        zoom: MAP_ZOOM,
        pitch: MAP_PITCH,
        interactive: false,
        attributionControl: false,
      });
      mapRef.current.once("load", () => setIsMapLoaded(true));
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [isDark]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => mapRef.current?.resize());
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="relative isolate rounded-[36px] size-full overflow-hidden" data-name="MilanMapWidget">
      <div ref={containerRef} className="absolute inset-0 size-full" />

      {/* Loading skeleton — masks the style/tile fetch delay, fades out once the map fires "load" */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isMapLoaded ? "opacity-0" : "opacity-100 animate-pulse"} ${isDark ? "bg-[#2C2C2E]" : "bg-neutral-200"}`}
        data-name="map-skeleton"
      />

      {/* Location pin — anchored exactly at the map's center point (HOME coordinates) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" data-name="location">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[50px] rounded-full bg-[rgba(43,127,255,0.2)] opacity-[0.873]" data-name="pulse" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[14px] rounded-full bg-[#2b7fff] border-2 border-solid border-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" data-name="dot" />
        <div className="absolute left-1/2 bottom-[7px] -translate-x-1/2 size-[48px] rounded-full bg-white" data-name="avatar">
          <div className="absolute inset-[3px] rounded-full bg-[rgba(43,127,255,0.3)]" />
          <div className="relative flex flex-col items-center justify-center overflow-hidden p-[2px] rounded-full size-full">
            <div className="relative shrink-0 size-[51px]" data-name="Image (User)">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImageUser} />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 rounded-full shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]" />
        </div>
      </div>

      <div
        className="absolute bottom-[8px] left-[8px] right-[8px] h-[51px] rounded-full shrink-0 bg-black/35 backdrop-blur-md flex items-center justify-between pl-[16px] pr-[16px]"
        data-name="Container"
      >
        <div className="flex items-center gap-[16px] h-full">
          <svg className="size-[20px] shrink-0" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9997 19.9997">
            <path d={svgPaths.p2de4100} fill="var(--fill-0, white)" fillOpacity="0.75" id="Vector" />
          </svg>
          <div className="flex flex-col items-start justify-center">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic text-[17px] text-white text-nowrap">{HOME.city}</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic text-[13px] text-white/75 text-nowrap">
              {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: HOME.timeZone })}
            </p>
          </div>
        </div>
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[22px] not-italic text-[22px] text-white text-nowrap">
          {temperature !== null ? `${temperature}°` : "7°"}
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[36px]" />
    </div>
  );
}

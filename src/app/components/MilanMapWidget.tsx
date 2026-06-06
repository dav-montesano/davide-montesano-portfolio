import { useEffect, useState } from "react";
import svgPaths from "./icons/weatherMapPaths";
import imgImageUser from "figma:asset/61919d90bd86015ca55b0ceeda3ede4a630f3f5a.png";
import imgMilanMapWidget from "figma:asset/a3826e338d4675eb15b7d61a2b8c87dd8084ba2c.png";

export function MilanMapWidget() {
  const [time, setTime] = useState(new Date());
  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=45.4642&longitude=9.1900&current=temperature_2m"
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

  return (
    <div className="relative rounded-[36px] size-full" data-name="MilanMapWidget">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[36px] size-full" src={imgMilanMapWidget} />
      <div className="flex flex-col items-center justify-end size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-center justify-end overflow-clip p-[8px] relative w-full aspect-[4/3] md:aspect-auto md:h-full">
          <div className="absolute right-[40px] size-[56px] top-[calc(50%-51.5px)] translate-y-[-50%]" data-name="location">
            <div className="absolute bg-[rgba(43,127,255,0.2)] left-[-20px] opacity-[0.873] rounded-[1.67772e+07px] size-[96px] top-[-20px]" data-name="Container">
              <div className="absolute bg-[#2b7fff] border-2 border-solid border-white left-1/2 rounded-[1.67772e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] size-[16px] top-[77px] translate-x-[-50%]" data-name="Container" />
            </div>
            <div className="absolute bg-[rgba(43,127,255,0.3)] left-[4px] rounded-[1.67772e+07px] size-[48px] top-[4px]" data-name="Container" />
            <div className="absolute bg-white left-1/2 rounded-[1.67772e+07px] size-[56px] top-0 translate-x-[-50%]" data-name="avatar">
              <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[3px] relative rounded-[inherit] size-full">
                <div className="relative shrink-0 size-[60px]" data-name="Image (User)">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImageUser} />
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border-[3px] border-solid border-white inset-0 pointer-events-none rounded-[1.67772e+07px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]" />
            </div>
          </div>
          <div className="absolute bottom-[8px] left-[8px] right-[8px] backdrop-blur-[1px] backdrop-filter bg-[rgba(25,25,25,0.65)] h-[51px] rounded-[36px] shrink-0" data-name="Container">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center justify-between pl-[6px] pr-[16px] py-[6px] relative size-full overflow-hidden">
                <div className="h-full relative shrink-0 w-[141.641px]" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
                    <div className="aspect-[44/44] bg-[rgba(255,255,255,0.05)] h-full relative rounded-[1.67772e+07px] shrink-0" data-name="Container">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                        <div className="relative shrink-0 size-[20px]" data-name="Vector">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9997 19.9997">
                            <path d={svgPaths.p2de4100} fill="var(--fill-0, white)" fillOpacity="0.7" id="Vector" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 grow h-[40.75px] min-h-px min-w-px relative shrink-0" data-name="Container">
                      <div className="flex flex-col items-start justify-center h-full">
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.25px] not-italic text-[17px] text-[rgba(255,255,255,0.9)] text-nowrap">Milan</p>
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic text-[13px] text-[rgba(255,255,255,0.5)] text-nowrap tracking-[-0.0762px]">
                          {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="font-['Inter:Light',sans-serif] font-light leading-[32px] not-italic relative shrink-0 text-[24px] text-[rgba(255,255,255,0.9)] text-nowrap tracking-[-1.1297px]">
                  {temperature !== null ? `${temperature}°` : "7°"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[36px]" />
    </div>
  );
}

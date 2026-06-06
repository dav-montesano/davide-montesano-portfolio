import { motion } from "motion/react";
import imgSpotifyPrimaryLogoRgbGreen1 from "figma:asset/8246242abee5e59336f06e2b156162defd3b8a1d.png";

export default function ContactCard() {
  return (
    <div className="@container bg-white content-stretch flex flex-wrap gap-[49px] items-end overflow-clip px-[clamp(20px,5cqi,32px)] py-[clamp(16px,4cqi,24px)] relative rounded-[32px] size-full" data-name="ContactCard">
      <div className="basis-auto md:basis-0 content-stretch flex flex-col grow h-auto md:h-full items-start justify-between min-h-px min-w-px relative shrink-0">
        <div className="h-[min(50px,20cqmin)] relative shrink-0 w-[min(50px,20cqmin)]" data-name="Spotify_Primary_Logo_RGB_Green 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgSpotifyPrimaryLogoRgbGreen1} />
        </div>
        <div className="content-stretch flex flex-col gap-[2px] items-start leading-[1.3] not-italic relative shrink-0 w-full">
          <div className="flex items-center gap-2 mt-4 md:mt-0 font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#1ed760] text-[min(14px,5.5cqmin)] w-full">
            <div className="flex items-end gap-[3px] h-[14px] pb-[2px]">
              <motion.div
                animate={{ height: [3, 10, 3] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-[2px] bg-[#1ed760] rounded-full"
              />
              <motion.div
                animate={{ height: [8, 3, 8] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                className="w-[2px] bg-[#1ed760] rounded-full"
              />
              <motion.div
                animate={{ height: [4, 10, 4] }}
                transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="w-[2px] bg-[#1ed760] rounded-full"
              />
            </div>
            <span className="text-[12px]">Offline. Last played</span>
          </div>
          <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[16px] text-black w-full">Stella</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[14px] text-black w-full">Ultramarine</p>
        </div>
      </div>
    </div>
  );
}

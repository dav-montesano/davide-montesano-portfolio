import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCw } from "lucide-react";
import imgScreenshot20260111At1935421 from "figma:asset/1c5c420f11328ce390eae5acc56b299dbb6bbfc5.png";
import imgGreeting from "figma:asset/39873b71415016b901f04aac668480d2e33271df.png";

export default function Container({ isDark }: { isDark?: boolean }) {
  const [isGreeting, setIsGreeting] = useState(false);

  return (
    <div className={`@container content-stretch flex flex-col gap-[clamp(8px,3cqi,16px)] items-start justify-center overflow-clip px-[clamp(20px,5cqi,32px)] py-[clamp(16px,4cqi,24px)] relative rounded-[32px] w-full h-auto md:h-full ${isDark ? "bg-[#2C2C30]" : "bg-white"}`} data-name="Container">
      {/* Toggle Button */}
      <button
        onClick={() => setIsGreeting(!isGreeting)}
        className={`absolute top-[clamp(16px,4cqi,24px)] right-[clamp(20px,5cqi,32px)] z-10 transition-colors cursor-pointer flex items-center justify-center gap-[min(6px,2cqmin)] px-[min(16px,5cqmin)] py-[min(8px,2.5cqmin)] rounded-full border outline-none ${isDark ? "bg-[#3A3A3E] hover:bg-[#45454A] border-white/10" : "bg-white hover:bg-gray-50 border-[#E5E5E5]"}`}
      >
        <RotateCw className={`w-[min(12px,4cqmin)] h-[min(12px,4cqmin)] ${isDark ? "text-white" : "text-[#171717]"}`} />
        <span className={`font-medium leading-[20px] text-[min(12px,4cqmin)] whitespace-nowrap tracking-[-0.15px] ${isDark ? "text-white" : "text-[#171717]"}`}>
          {isGreeting ? "Back to work" : "See greeting"}
        </span>
      </button>

      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          {/* Avatar Container */}
          <div className="relative w-[clamp(45px,12cqi,65.1px)] aspect-[65.108/86.99]" data-name="Screenshot 2026-01-11 at 19.35.42 1">
            <AnimatePresence mode="popLayout" initial={false}>
              {isGreeting ? (
                <motion.div 
                  key="greeting"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                >
                  <img alt="Greeting Avatar" className="absolute h-[417.52%] left-[-66.53%] max-w-none top-[-85.35%] w-[246.12%]" src={imgGreeting} />
                </motion.div>
              ) : (
                <motion.div 
                  key="original"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none"
                >
                  <img alt="" className="absolute h-[407.14%] left-[-75.1%] max-w-none top-[-101.86%] w-[250.21%]" src={imgScreenshot20260111At1935421} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <p className={`line-clamp-none md:line-clamp-3 font-['Inter',sans-serif] font-normal leading-[150%] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[clamp(11px,4cqi,14px)] w-[min-content] ${isDark ? "text-white" : "text-black"}`}>
        <span>{`I'm `}</span>
        <span className="font-['Inter:Bold',sans-serif] font-bold text-[clamp(18px,7cqi,24px)]">Dav</span>
        <span>{`, `}</span>Staff Product Designer and builder. AI is my leverage, craft is my language, together they turn vision into product people believe in.
      </p>
    </div>
  );
}

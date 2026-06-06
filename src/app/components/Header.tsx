import { motion, LayoutGroup, useScroll, useTransform } from "motion/react";
import { X, Menu } from "lucide-react";
import Dav from "./Logo";
import ChatIcon from "./ChatIcon";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 50], [0, 0.9]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-6 py-6">
      <div className="mx-auto flex w-full max-w-[1100px] h-[58px] items-center justify-between">
        <div className="pointer-events-auto">
          <div className="hidden md:block w-[111px] h-[32px]">
            <Dav />
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-4">
          <div className="w-[48px] h-[46px]">
            <ChatIcon />
          </div>
        </div>
      </div>

      <div>
        <motion.div style={{ opacity }} className="fixed top-0 left-0 w-full h-[90px] bg-gradient-to-b from-[#ffad8f] via-[#f3d9ff] via-[50.481%] to-transparent pointer-events-none -z-10" />
        <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 pointer-events-auto flex items-center gap-1 rounded-full border border-white/40 bg-neutral-200/50 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-3xl transition-all hover:bg-neutral-200/60">
        <button 
            onClick={() => onTabChange('work')}
            className={`relative rounded-full px-8 py-3 text-sm transition-all text-neutral-900 ${activeTab !== 'work' ? 'hover:bg-black/5' : ''}`}
        >
          {activeTab === 'work' && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-white/80 shadow-sm rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              style={{ originY: "50%" }}
            />
          )}
          <span className={`relative z-10 ${activeTab === 'work' ? 'font-semibold' : 'font-medium'}`}>
            Work
          </span>
        </button>
        <button 
            onClick={() => onTabChange('about')}
            className={`relative rounded-full px-8 py-3 text-sm transition-all text-neutral-900 ${activeTab !== 'about' ? 'hover:bg-black/5' : ''}`}
        >
          {activeTab === 'about' && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-white/80 shadow-sm rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              style={{ originY: "50%" }}
            />
          )}
          <span className={`relative z-10 ${activeTab === 'about' ? 'font-semibold' : 'font-medium'}`}>
            About
          </span>
        </button>
      </div>
      </div>
    </header>
  );
};

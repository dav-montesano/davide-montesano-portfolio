import { motion, useScroll, useTransform } from "motion/react";
import Dav from "./Logo";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDark: boolean;
  onSetDark: (v: boolean) => void;
}

function SkeuoToggle({ isDark, onSetDark }: { isDark: boolean; onSetDark: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onSetDark(!isDark)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`rounded-full border shadow-[0_4px_16px_rgb(0,0,0,0.14)] backdrop-blur-3xl transition-all ${isDark ? "border-white/10 bg-white/10 hover:bg-white/15" : "border-white/40 bg-neutral-200/50 hover:bg-neutral-200/60"}`}
      style={{
        width: 72,
        height: 40,
        flexShrink: 0,
        padding: 4,
        cursor: "pointer",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* knob */}
      <motion.div
        animate={{ x: isDark ? 32 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "#111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {isDark ? (
          /* Sun icon */
          <svg viewBox="0 0 24 24" width={16} height={16}>
            <circle cx="12" cy="12" r="4" fill="#fde68a" />
            {[0,45,90,135,180,225,270,315].map(deg => (
              <line key={deg}
                x1={12 + 6.5 * Math.cos(deg * Math.PI / 180)}
                y1={12 + 6.5 * Math.sin(deg * Math.PI / 180)}
                x2={12 + 9 * Math.cos(deg * Math.PI / 180)}
                y2={12 + 9 * Math.sin(deg * Math.PI / 180)}
                stroke="#fde68a" strokeWidth="2" strokeLinecap="round"
              />
            ))}
          </svg>
        ) : (
          /* Moon icon */
          <svg viewBox="0 0 24 24" width={15} height={15}>
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
              fill="#fde68a"
            />
          </svg>
        )}
      </motion.div>
    </button>
  );
}

export const Header = ({ activeTab, onTabChange, isDark, onSetDark }: HeaderProps) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 50], [0, 0.9]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-6 py-6">
      <div className="mx-auto flex w-full max-w-[1100px] h-[58px] items-center justify-between">
        <div className="pointer-events-auto">
          <div className="hidden md:block w-[111px] h-[32px]">
            <Dav isDark={isDark} />
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-4">
          <SkeuoToggle isDark={isDark} onSetDark={onSetDark} />
        </div>
      </div>

      <div>
<div className={`fixed top-6 left-1/2 z-50 -translate-x-1/2 pointer-events-auto flex items-center gap-1 rounded-full border p-1.5 shadow-[0_4px_16px_rgb(0,0,0,0.14)] backdrop-blur-3xl transition-all ${isDark ? "border-white/10 bg-white/10 hover:bg-white/15" : "border-white/40 bg-neutral-200/50 hover:bg-neutral-200/60"}`}>
        <button
            onClick={() => onTabChange('work')}
            className={`relative rounded-full px-8 py-3 text-sm transition-all ${isDark ? "text-white" : "text-neutral-900"} ${activeTab !== 'work' ? (isDark ? 'hover:bg-white/10' : 'hover:bg-black/5') : ''}`}
        >
          {activeTab === 'work' && (
            <motion.div
              layoutId="active-pill"
              className={`absolute inset-0 shadow-sm rounded-full ${isDark ? "bg-white/20" : "bg-white/80"}`}
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
            className={`relative rounded-full px-8 py-3 text-sm transition-all ${isDark ? "text-white" : "text-neutral-900"} ${activeTab !== 'about' ? (isDark ? 'hover:bg-white/10' : 'hover:bg-black/5') : ''}`}
        >
          {activeTab === 'about' && (
            <motion.div
              layoutId="active-pill"
              className={`absolute inset-0 shadow-sm rounded-full ${isDark ? "bg-white/20" : "bg-white/80"}`}
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

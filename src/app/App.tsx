import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Clock, Hand, Instagram, Linkedin, Twitter } from "lucide-react";
import { MilanMapWidget } from "./components/MilanMapWidget";
import { Header } from "./components/Header";
import { WorkGrid } from "./components/WorkGrid";
import { ContactCard } from "./components/ContactCard";
import { Typewriter } from "./components/Typewriter";
import { CurrentDate } from "./components/CurrentDate";
import { AboutPage } from "./components/AboutPage";
import { CaseStudy } from "./components/CaseStudy";
// import { PullCord } from "./components/PullCord";

import IntroCard from "./components/IntroCard";
import SpotifyWidget from "./components/SpotifyWidget";

import { PROJECTS } from "./data/projects";

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('work');
  const [isDark, setIsDark] = useState(false);

  const selectedProject = PROJECTS.find((p) => p.id === selectedProjectId);

  return (
    <motion.div
      animate={{ backgroundColor: isDark ? "#1D1D1F" : "#F7F5F2" }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen font-sans selection:bg-white selection:text-black relative overflow-hidden${isDark ? " dark" : ""}`}
      style={{ color: isDark ? "#F7F5F2" : "#1D1D1F" }}
    >
      {/* <PullCord isDark={isDark} onToggle={() => setIsDark((d) => !d)} /> */}
      <div style={{
        visibility: selectedProjectId ? "hidden" : "visible",
        opacity: selectedProjectId ? 0 : 1,
        transition: selectedProjectId ? "none" : "opacity 0.35s ease",
      }}>
        <Header
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
          isDark={isDark}
          onSetDark={setIsDark}
        />
      </div>

      <main
        className="relative z-10 pt-[128px] pb-[80px] max-w-[1800px] mx-auto px-[22px]"
        style={{
          visibility: selectedProjectId ? "hidden" : "visible",
          opacity: selectedProjectId ? 0 : 1,
          transition: selectedProjectId ? "none" : "opacity 0.35s ease",
        }}
      >
        {activeTab === 'work' && (
            <>
                {/* Top Header Text Section */}

                
                <WorkGrid 
                    introContent={(
                        <div className="w-full flex flex-col gap-[16px] md:grid md:grid-rows-2 md:h-full">
                            {/* Row A: Text */}
                            <IntroCard />
        
                            {/* Row B: Bottom Cards */}
                            <div className="w-full h-auto md:h-full grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                                 {/* Map Block */}
                                 <div className="w-full h-auto md:h-full">
                                    <SpotifyWidget />
                                 </div>
        
                                 {/* Socials Block */}
                                 <div className="w-full aspect-[4/3] h-auto md:aspect-auto md:h-full">
                                    <ContactCard />
                                 </div>
                            </div>
                        </div>
                    )}
                    projects={PROJECTS.filter(p => p.id !== '8' && p.id !== '7')}
                    onProjectClick={setSelectedProjectId} className="text-[24px] text-left px-[0px] py-[22px] rounded-[36px]"
                />
            </>
        )}
        
        {activeTab === 'about' && (
            <AboutPage />
        )}
      </main>

      <AnimatePresence>
        {selectedProjectId && selectedProject && (
            <CaseStudy
                project={selectedProject}
                onClose={() => setSelectedProjectId(null)}
            />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

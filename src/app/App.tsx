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

import IntroCard from "./components/IntroCard";
import SpotifyWidget from "./components/SpotifyWidget";

import { PROJECTS } from "./data/projects";

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('work');

  const selectedProject = PROJECTS.find((p) => p.id === selectedProjectId);

  return (
    <motion.div
      style={{ backgroundColor: "#F7F5F2" }}
      className="min-h-screen text-black font-sans selection:bg-black selection:text-white relative overflow-hidden"
    >
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "instant" });
        }}
      />

      <main
        className="relative z-10 pt-[128px] pb-[80px] max-w-[1800px] mx-auto px-[22px]"
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
                    projects={PROJECTS}
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

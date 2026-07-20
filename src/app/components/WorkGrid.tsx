import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

interface WorkGridProps {
  projects: Project[];
  onProjectClick: (id: string) => void;
  introContent?: React.ReactNode;
  isDark?: boolean;
}

const CARD_COLORS_LIGHT = [
  "#FFFFFF", // 1. Earr
  "#FFFFFF", // 2. Swell Club
  "#FFFFFF", // 3. AI Filter
  "#FFFFFF", // 4. Agentic UI Builder
  "#FFFFFF", // 5. AI Global Search
  "#FFFFFF", // 6. Marketplace
  "#FFFFFF", // 7. AI System
  "#FFFFFF", // 8. Sidebar
  "#FFFFFF", // 9. Casavo (hidden)
  "#FFFFFF", // 10. Proprioo (hidden)
];

const CARD_COLORS_DARK = [
  "#2C2C30", // 1. Earr
  "#2C2C30", // 2. Swell Club
  "#2C2C30", // 3. AI Filter
  "#2C2C30", // 4. Agentic UI Builder
  "#2C2C30", // 5. AI Global Search
  "#2C2C30", // 6. Marketplace
  "#2C2C30", // 7. AI System
  "#2C2C30", // 8. Sidebar
  "#2C2C30", // 9. Casavo (hidden)
  "#2C2C30", // 10. Proprioo (hidden)
];

const CARD_HOVER_COLORS: string[] = [
  "#252429", // 1. Earr
  "#C6914D", // 2. Swell Club
  "#498EFF", // 3. AI Filter
  "#86BFE9", // 4. Agentic UI Builder
  "#252429", // 5. AI Global Search
  "#C6914D", // 6. Marketplace
  "#498EFF", // 7. AI System
  "#86BFE9", // 8. Sidebar
  "#252429", // 9. Casavo (hidden)
  "#C6914D", // 10. Proprioo (hidden)
];

export const WorkGrid = ({ projects, onProjectClick, introContent, isDark }: WorkGridProps) => {
  const CARD_COLORS = isDark ? CARD_COLORS_DARK : CARD_COLORS_LIGHT;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      style={{ willChange: "transform, opacity" }}
      className="grid grid-cols-1 gap-[16px] min-[960px]:grid-cols-2 max-w-[1100px] mx-auto mt-6"
    >
      {introContent && (
        <div className="aspect-auto md:aspect-[4/3] w-full">
            {introContent}
        </div>
      )}
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          onClick={() => onProjectClick(project.id)}
          className="group relative cursor-pointer overflow-hidden rounded-[36px] aspect-[4/3]"
          style={{ backgroundColor: CARD_COLORS[index % CARD_COLORS.length] }}
          whileHover={{ backgroundColor: CARD_HOVER_COLORS[index % CARD_HOVER_COLORS.length] }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Animated Image Container */}
          <div
            className="absolute inset-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:inset-[8px] group-hover:bottom-[160px] group-hover:rounded-[28px]"
            style={{ backgroundColor: CARD_COLORS[index % CARD_COLORS.length] }}
          >
            <div className="h-full w-full relative">
                <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                />
                 {/* Top Right Button - Inside Image */}
                <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                    <div className="flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 px-4 h-10 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        <span className="text-sm font-medium text-white whitespace-nowrap">Open Case Study</span>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-sm transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-105">
                        <ArrowUpRight size={20} className="text-white" />
                    </div>
                </div>
            </div>

            {/* Overlay */}
            <div className={`absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/10 rounded-[36px] group-hover:rounded-[28px] ${'ring-[0px]'}`} />
          </div>

          {/* Revealed Text Content */}
          <div className="absolute bottom-0 left-0 w-full px-2 pt-4 flex flex-col justify-start opacity-0 translate-y-4 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0 h-[160px]">
            <h3 className="text-4xl font-bold tracking-[0] text-white mb-2 text-[32px]">{project.title}</h3>
            <p className="text-white/90 leading-snug max-w-[95%] text-[16px]">
                {project.description.replace(/\.$/, "")}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

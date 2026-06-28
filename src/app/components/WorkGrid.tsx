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
}

// Card base background color (also the hover/text-area color)
const CARD_COLORS = [
  "#FFFFFF", // 1. White (Picky)
  "#C6914D", // 2. Golden Brown
  "#498EFF", // 3. Blue
  "#86BFE9", // 4. Light Blue
  "#252429", // 5. Dark Grey
  "#C6914D", // 6. Golden Brown
  "#498EFF", // 7. Blue
  "#86BFE9", // 8. Light Blue
];

// Hover reveal background — shown behind image during hover (dark for text contrast)
// null = use CARD_COLORS (same color, no separate overlay needed)
const CARD_HOVER_COLORS: (string | null)[] = [
  "#252429", // 1. Picky — dark bg revealed on hover for white text
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

export const WorkGrid = ({ projects, onProjectClick, introContent }: WorkGridProps) => {
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
        >
          {/* Hover reveal background (only for cards that need a different hover color) */}
          {CARD_HOVER_COLORS[index % CARD_HOVER_COLORS.length] && (
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ backgroundColor: CARD_HOVER_COLORS[index % CARD_HOVER_COLORS.length] as string }}
            />
          )}

          {/* Animated Image Container */}
          <div
            className="absolute inset-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:inset-[8px] group-hover:bottom-[160px] group-hover:rounded-[28px]"
            style={CARD_HOVER_COLORS[index % CARD_HOVER_COLORS.length] ? { backgroundColor: CARD_COLORS[index % CARD_COLORS.length] } : undefined}
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
            <div className={`absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/10 rounded-[36px] group-hover:rounded-[28px] ${index === 0 ? '' : 'ring-[2px] ring-inset ring-[#E7E7E7]'}`} />
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

import { useMotionValue, useTransform, animate, motion } from "motion/react";

const CORD_BASE = 64;
const HANDLE_H = 14;
const HANDLE_W = 5;
const MAX_DRAG = 200;
const THRESHOLD = 90;

interface PullCordProps {
  onToggle: () => void;
  isDark: boolean;
}

export const PullCord = ({ onToggle, isDark }: PullCordProps) => {
  const dragY = useMotionValue(0);
  const cordHeight = useTransform(dragY, [0, MAX_DRAG], [CORD_BASE, CORD_BASE + MAX_DRAG]);
  const handleScale = useTransform(dragY, [0, THRESHOLD, MAX_DRAG], [1, 1.15, 1.2]);
  const cordOpacity = useTransform(dragY, [0, THRESHOLD], [0.45, 0.9]);

  const color = isDark ? "#d4d4d4" : "#1D1D1F";

  const handleDragEnd = () => {
    if (dragY.get() > THRESHOLD) {
      onToggle();
    }
    animate(dragY, 0, { type: "spring", stiffness: 380, damping: 20, restDelta: 0.01 });
  };

  return (
    <div
      className="fixed top-0 z-[60] pointer-events-none select-none"
      style={{ right: 48, width: 20, height: CORD_BASE + MAX_DRAG + HANDLE_H + 20 }}
    >
      {/* Cord line — stretches with drag */}
      <motion.div
        style={{
          position: "absolute",
          left: `calc(50% - 0.75px)`,
          top: 0,
          width: 1.5,
          height: cordHeight,
          backgroundColor: color,
          opacity: cordOpacity,
          borderRadius: 2,
        }}
      />

      {/* Draggable handle */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: MAX_DRAG }}
        dragElastic={0.04}
        dragMomentum={false}
        style={{
          position: "absolute",
          left: `calc(50% - ${HANDLE_W / 2}px)`,
          top: CORD_BASE - HANDLE_H / 2,
          y: dragY,
          scale: handleScale,
          width: HANDLE_W,
          height: HANDLE_H,
          backgroundColor: color,
          opacity: 0.75,
        }}
        className="rounded-full cursor-grab active:cursor-grabbing pointer-events-auto"
        onDragEnd={handleDragEnd}
        whileDrag={{ opacity: 1 }}
      />
    </div>
  );
};

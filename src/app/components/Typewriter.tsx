import { useState, useEffect } from "react";
import { motion } from "motion/react";

const WORDS = [
  "DESIGNING",
  "PROTOTYPING",
  "PLANNING",
  "BUILDING",
  "SHAPING"
];

export function Typewriter() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(WORDS[0].length + 1);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (index >= WORDS.length) {
      setIndex(0);
      return;
    }

    if (subIndex === WORDS[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => {
        setReverse(true);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      const timeout = setTimeout(() => {
        setReverse(false);
        setIndex((prev) => (prev + 1) % WORDS.length);
      }, 1000);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <h1 className="text-[46px] md:text-[88px] font-bold leading-[1.2] text-white text-center font-['GT_Walsheim_Pro'] min-h-[1.2em] tracking-[-2px]">
      <span>I’M {WORDS[index].substring(0, subIndex)}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        |
      </motion.span>
    </h1>
  );
}

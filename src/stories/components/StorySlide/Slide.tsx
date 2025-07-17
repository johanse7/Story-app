import { motion } from "framer-motion";
import { useRef } from "react";
import type { Story } from "../../interfaces/story";

type SlideProps = {
  story: Story;
  direction: "left" | "right";
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
};

export const Slide = ({
  story,
  direction,
  onSwipeLeft,
  onSwipeRight,
}: SlideProps) => {
  const startX = useRef<number | null>(null);
  const endX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    endX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    endX.current = e.clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (startX.current === null || endX.current === null) return;

    const delta = startX.current - endX.current;
    const threshold = 50;

    if (delta > threshold) {
      onSwipeLeft?.();
    } else if (delta < -threshold) {
      onSwipeRight?.();
    }

    startX.current = null;
    endX.current = null;
  };

  const variants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "left" ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "left" ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      key={story.id}
      className="flex flex-col items-center justify-center h-full p-4  rounded-lg"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4, ease: "easeInOut" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <img
        src={story.image}
        alt="Story image"
        className="w-full lg:max-w-3xl h-auto rounded-lg mb-4 object-cover select-none"
        draggable={false}
      />
    </motion.div>
  );
};

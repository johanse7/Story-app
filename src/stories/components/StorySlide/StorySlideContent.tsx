import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "../../../components/ui/button";
import { useGetStories } from "../../hooks/useGetStories";
import { useSetViewStory } from "../../hooks/useSetViewStory";
import { Slide } from "./Slide";
import { StoryListStatus } from "./StoryListStatus";

type StorySlideProps = {
  onClose?: () => void;
  indexSelected: number;
};

export const StorySlideContent = (props: StorySlideProps) => {
  const { onClose, indexSelected } = props;
  const { stories } = useGetStories();
  const updateViewStory = useSetViewStory();

  const [indexBar, setIndexBar] = useState(indexSelected ?? 0);
  const [direction, setDirection] = useState<"left" | "right">("left");

  const handleNext = useCallback(() => {
    if (indexBar >= stories.length - 1) {
      onClose?.();
      return;
    }
    setDirection("left");
    setIndexBar((prev) => prev + 1);
  }, [indexBar, stories.length, onClose]);

  const handlePrev = () => {
    if (indexBar <= 0) return;
    setDirection("right");
    setIndexBar((prev) => prev - 1);
  };

  useEffect(() => {
    const current = stories[indexBar];
    if (!current?.isView) {
      updateViewStory(current.id);
    }
  }, [indexBar, stories, updateViewStory]);

  const story = stories[indexBar];

  return (
    <div className="fixed inset-0 z-50 w-full h-screen bg-gray-200 animate-fade-in overflow-hidden">
      <Button
        className="absolute top-4 right-4 p-0"
        aria-label="Close"
        variant="ghost"
        onClick={onClose}
      >
        <IoMdClose className="size-7" />
      </Button>

      <div className="flex flex-col gap-6 p-6 mx-auto max-w-6xl mt-20 relative ">
        <StoryListStatus
          count={stories.length}
          indexBar={indexBar}
          onComplete={handleNext}
          onClick={(i) => {
            setDirection(i > indexBar ? "left" : "right");
            setIndexBar(i);
          }}
        />

        <AnimatePresence mode="wait" initial={false}>
          <Slide
            key={story.id}
            story={story}
            direction={direction}
            onSwipeLeft={handleNext}
            onSwipeRight={handlePrev}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

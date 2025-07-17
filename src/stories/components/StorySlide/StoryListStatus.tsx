import { memo } from "react";
import { ProgressBar } from "./ProgressBar";

type StoryProgressProps = {
  count: number;
  indexBar: number;
  onComplete: () => void;
  onClick?: (index: number) => void;
};
export const StoryListStatus = memo(
  ({ count, onComplete, indexBar, onClick }: StoryProgressProps) => {
    const totalStories = Array.from({ length: count }, (_, index) => index);

    return (
      <div className="flex items-center justify-start gap-x-3">
        {totalStories.map((_, index) => (
          <ProgressBar
            key={`progress-${index}`}
            isInProgress={index === indexBar}
            onComplete={onComplete}
            onClick={() => onClick?.(index)}
          />
        ))}
      </div>
    );
  }
);

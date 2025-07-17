import { useEffect, useRef, useState } from "react";
import { Progress } from "../../../components/ui/progress";

const DELAY = 10000;

type ProgressBarProps = {
  isInProgress: boolean;
  delay?: number;
  onComplete?: () => void;
  onClick?: () => void;
};

export const ProgressBar = (props: ProgressBarProps) => {
  const { isInProgress, delay = DELAY, onComplete, onClick } = props;

  const [percent, setPercent] = useState(0);
  const interval = useRef<NodeJS.Timeout | null>(null);
  const counter = useRef(0);
  
  useEffect(() => {
    if (!isInProgress) {
      if (interval.current) clearInterval(interval.current);
      counter.current = 0;
      setPercent(0);
      return;
    }

    const tick = 100;
    const step = (100 * tick) / delay;

    counter.current = 0;

    interval.current = setInterval(() => {
      counter.current += 1;
      const next = counter.current * step;
      setPercent(Math.min(next, 100));

      if (next >= 100 && interval.current) {
        clearInterval(interval.current);
        onComplete?.();
      }
    }, tick);

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [isInProgress, delay, onComplete]);

  return (
    <>
      {/* <div className="relative w-full h-1 rounded-full overflow-hidden bg-gray-700">
        {isInProgress && (
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-white"
            style={{
              width: `${percent}%`,
              transition: "width 0.1s linear",
            }}
          />
        )}
      </div> */}
      <Progress
        value={percent}
        className="w-full  cursor-pointer"
        onClick={onClick}
      />
    </>
  );
};

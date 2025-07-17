import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../../lib/utils";

type StoryItemProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export const StoryItem = (props: StoryItemProps) => {
  const { children, className, ...rest } = props;

  return (
    <div className="flex-shrink-0 select-none">
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full w-16 h-16 cursor-pointer",
          className
        )}
        {...rest}
        role="button"
      >
        {children}
      </div>
    </div>
  );
};

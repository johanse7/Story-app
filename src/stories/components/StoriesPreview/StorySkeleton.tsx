export const StorySkeleton = () => {
  const stories = Array.from({ length: 5 }, (_, index) => index);

  return (
    <div className="flex items-center justify-start gap-x-4 overflow-x-auto snap-x snap-mandatory scrollbar-none">
      {stories.map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="flex-shrink-0 select-none flex flex-col items-center gap-1"
        >
          <div
            key={index}
            className="relative flex items-center justify-center rounded-full w-16 h-16 bg-gray-200 animate-pulse"
          >
            <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
          </div>
          <div className="h-3 w-20 animate-pulse bg-gray-200 rounded-4xl"></div>
        </div>
      ))}
    </div>
  );
};

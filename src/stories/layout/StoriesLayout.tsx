import { useState } from "react";
import { StoryList } from "../components/StoriesPreview/StoryList";
import { StorySlideContent } from "../components/StorySlide/StorySlideContent";

export const StoriesLayout = () => {
  const [indexStorySelected, setIndexStorySelected] = useState<number | null>(
    null
  );

  const handleCloseStory = () => {
    setIndexStorySelected(null);
  };

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-white to-gray-100">
      <header className="flex items-center gap-4 mb-10 px-5">
        <div className="bg-white rounded-full p-3 shadow-md flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#F56040" strokeWidth="2" />
            <circle cx="12" cy="12" r="6" stroke="#FCAF45" strokeWidth="2" />
            <circle cx="12" cy="12" r="2" fill="#FCAF45" />
          </svg>
        </div>
        <span className="text-primary text-4xl font-extrabold tracking-wide drop-shadow">
          Stories
        </span>
      </header>

      <StoryList onClickStory={setIndexStorySelected} />
      {indexStorySelected !== null && (
        <StorySlideContent
          onClose={handleCloseStory}
          indexSelected={indexStorySelected}
        />
      )}
    </div>
  );
};

import { timeAgo } from "@/lib/formatDate";
import clsx from "clsx";
import { FiPlus } from "react-icons/fi";
import { convertFileToBase64 } from "../../../lib/transformFile";
import { useCreateStory } from "../../hooks/useCreateStory";
import { useGetStories } from "../../hooks/useGetStories";
import { StoryItem } from "./StoryItem";
import { StorySkeleton } from "./StorySkeleton";

type StoryListProps = {
  onClickStory: (index: number) => void;
};

export const StoryList = (props: StoryListProps) => {
  const { onClickStory } = props;

  const { stories, isLoading } = useGetStories();

  const { isPending, mutate: createStory, variables } = useCreateStory();

  const handleClickStory = (index: number) => () => {
    onClickStory(index);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileBase64 = await convertFileToBase64(file);

      createStory({ image: fileBase64 });

      event.target.value = "";
    }
  };

  return (
    <div className="px-3">
      <div className="flex gap-x-4  overflow-x-auto snap-mandatory scrollbar-none">
        <StoryItem
          aria-label="Add story"
          title="Add story"
          className="border-2 border-dashed border-gray-300 snap-start hover:scale-105  transition-all "
        >
          <FiPlus size={24} className="text-gray-400" />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer z-20"
          />
        </StoryItem>

        {isPending && (
          <StoryItem className="bg-gradient-to-tr from-pink-500 via-yellow-400 to-purple-50 opacity-50">
            <img
              src={variables.image}
              alt="Story loading"
              className="w-14 h-14 rounded-full object-cover"
            />
          </StoryItem>
        )}

        {isLoading && <StorySkeleton />}
        <div className="flex gap-x-4">
          {stories.map(({ id, isView, image, createdAt }, index) => (
            <div
              key={id}
              className="flex-shrink-0 select-none flex flex-col items-center gap-1"
            >
              <StoryItem
                className={clsx("snap-start ", {
                  "bg-gradient-to-tr  from-gray-100 via-gray-400 to-gray-500":
                    isView,
                  "bg-gradient-to-tr from-pink-500 via-yellow-400 to-purple-500":
                    !isView,
                })}
                aria-label="Story"
                title="Story"
                onClick={handleClickStory(index)}
              >
                <img
                  src={image}
                  alt="Story"
                  className="w-14 h-14 rounded-full object-cover"
                />
              </StoryItem>
              <span className="text-xs text-gray-500">
                {timeAgo(createdAt)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

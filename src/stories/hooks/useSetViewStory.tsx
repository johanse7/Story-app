import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Story } from "../interfaces/story";
import { updateViewedStory } from "../mocks/data";

export const useSetViewStory = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateViewedStory,
    onSuccess: (updatedStory) => {
      if (!updatedStory) return;

      queryClient.setQueryData(["stories"], (old: Array<Story>) => {
        return old.map((story) =>
          story.id === updatedStory.id ? updatedStory : story
        );
      });
    },
  });

  return mutate;
};

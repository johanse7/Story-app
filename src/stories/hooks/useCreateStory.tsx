import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addStory } from "../mocks/data";

export const useCreateStory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addStory,
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["stories"],
      });
      console.log("Story added:", data);
    },
    mutationKey: ["createStory"],
  });

  return mutation;
};

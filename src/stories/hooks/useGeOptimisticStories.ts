import { useMutationState } from "@tanstack/react-query";
import type { Story } from "../interfaces/story";

type StoryOPtimistic = Story & {
  submittedAt: number;
};

export const useGetOPtimisticStories = () => {
  const variablesOptimistic = useMutationState<StoryOPtimistic>({
    filters: { mutationKey: ["createStory"], status: "pending" },
    select: (mutation) => {
      return {
        ...(mutation.state.variables as Story),
        submittedAt: mutation.state.submittedAt,
      };
    },
  }).toSorted((a, b) => b.submittedAt - a.submittedAt);

  return variablesOptimistic;
};
  
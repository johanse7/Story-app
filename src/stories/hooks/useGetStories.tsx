import { useQuery } from "@tanstack/react-query";
import { getStories } from "../mocks/data";

export const useGetStories = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["stories"],
    queryFn: getStories,
    staleTime: 1000 * 60 * 1,
  });

  return {
    stories: data || [],
    ...rest,
  };
};

import { sleep } from "../../lib/sleep";
import type { Story } from "../interfaces/story";

const fakeStories = {
  records: {} as Record<string, Story>,
  getStories: () => {
    return Object.values(fakeStories.records).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  },
  setStory: (story: Story) => {
    fakeStories.records[story.id] = story;
  },
};

const now = new Date();

const STORIES: Story[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=300&h=300&q=80",
    createdAt: new Date(now.getTime() - 1000 * 60 * 5), // hace 5 min
    isView: false,
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&h=300&q=80",
    createdAt: new Date(now.getTime() - 1000 * 60 * 20), // hace 20 min
    isView: false,
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=300&h=300&q=80",
    createdAt: new Date(now.getTime() - 1000 * 60 * 60), // hace 1 hora
    isView: false,
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80",
    createdAt: new Date(now.getTime() - 1000 * 60 * 90), // hace 1.5 horas
    isView: false,
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=300&h=300&q=80",
    createdAt: new Date(now.getTime() - 1000 * 60 * 120), // hace 2 horas
    isView: false,
  },
];

STORIES.forEach((story) => {
  fakeStories.setStory(story);
});

export const getStories = async (): Promise<Story[]> => {
  return structuredClone(fakeStories.getStories());
};

export const addStory = async (
  story: Omit<Story, "id" | "createdAt" | "isView">
): Promise<Story> => {
  await sleep(5000);
  const newStory: Story = {
    id: (fakeStories.getStories().length + 1).toString(),
    image: story.image,
    createdAt: new Date(),
    isView: false,
  };

  fakeStories.setStory(newStory);
  return newStory;
};

export const updateViewedStory = async (
  id: string
): Promise<Story | undefined> => {
  await sleep(2000);
  const story = fakeStories.records[id];
  if (story) {
    story.isView = true;
    return story;
  }
  return undefined;
};

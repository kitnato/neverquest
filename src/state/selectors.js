import { selector } from "recoil";

import { level, progress } from "state/atoms";

export const progressMax = selector({
  key: "progressMax",
  get: ({ get }) => {
    const levelValue = get(level);

    return levelValue * 2 + 1;
  },
});

export const levelCompleted = selector({
  key: "levelCompleted",
  get: ({ get }) => {
    const progressValue = get(progress);
    const progressMaxValue = get(progressMax);

    return progressValue === progressMaxValue;
  },
});

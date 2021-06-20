import { selector } from "recoil";

import { level } from "state/atoms";

// eslint-disable-next-line import/prefer-default-export
export const progressMax = selector({
  key: "progressMax",
  get: ({ get }) => {
    const levelValue = get(level);

    return levelValue * 2 + 1;
  },
});

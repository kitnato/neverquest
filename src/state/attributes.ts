import { atomFamily, selector } from "recoil";

import { characterLevel } from "@neverquest/state/character";
import { essence } from "@neverquest/state/resources";
import { getTriangularNumber } from "@neverquest/utilities/helpers";
import { AttributeType } from "@neverquest/types/enums";

export const attributes = atomFamily<
  {
    canAssign: boolean;
    points: number;
  },
  AttributeType
>({
  default: {
    canAssign: false,
    points: 0,
  },
  key: "attributes",
});

export const attributeCost = selector({
  get: ({ get }) => getTriangularNumber(get(characterLevel) + 1),
  key: "attributeCost",
});

export const attributesIncreasable = selector({
  get: ({ get }) => get(attributeCost) <= get(essence),
  key: "attributesIncreasable",
});

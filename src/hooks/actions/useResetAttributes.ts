import { useRecoilCallback } from "recoil";

import { attributeRank } from "@neverquest/state/attributes";
import { ATTRIBUTE_TYPES } from "@neverquest/types/unions";

export function useResetAttributes() {
  return useRecoilCallback(
    ({ reset }) =>
      () =>
        ATTRIBUTE_TYPES.forEach((current) => reset(attributeRank(current))),
    [],
  );
}

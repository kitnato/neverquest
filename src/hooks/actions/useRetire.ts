/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRecoilCallback } from "recoil";

import type { Trait } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

// TODO
export function useRetire() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        // Reset essence
        // Reset stage & progress
        // Reset name
        // Reset masteries
        // Reset attributes
        // Reset skills
        // Reset crew
        // Reset merchant inventory
        // Empty inventory (except knapsack, antique coin, egg)
        // Get & reset selected trait
        // Add to active traits

        return null;
      },
    [],
  );
}

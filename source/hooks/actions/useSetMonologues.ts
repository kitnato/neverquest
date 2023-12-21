import { useRecoilCallback } from "recoil";

import { CREW, MERCHANT_OFFERS } from "@neverquest/data/caravan";
import { EMPTY_MONOLOGUE } from "@neverquest/data/general";
import { merchantInventory, monologue } from "@neverquest/state/caravan";
import { stage } from "@neverquest/state/encounter";
import { isInheritableItem } from "@neverquest/types/type-guards";
import { CREW_TYPES } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useSetMonologues() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const stageValue = get(stage);

        for (const crew of CREW_TYPES) {
          const { monologues } = CREW[crew];
          const offer = MERCHANT_OFFERS[stageValue];

          // Only set the dialog if it's not the merchant or if if the associated offer is actually being offered (it wouldn't be in the case of having inherited it).
          if (
            crew !== "merchant" ||
            (isInheritableItem(offer) &&
              get(merchantInventory).some(({ name }) => name === offer.name))
          ) {
            set(
              monologue(crew),
              monologues[stageValue] ??
                (() => {
                  for (let index = stageValue; index > 0; index--) {
                    if (monologues[index] !== undefined) {
                      return monologues[index];
                    }
                  }
                })() ??
                EMPTY_MONOLOGUE,
            );
          }
        }
      },
    [],
  );
}

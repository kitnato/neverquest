import { useRecoilCallback } from "recoil";

import { CREW, MERCHANT_OFFERS } from "@neverquest/data/caravan";
import { EMPTY_MONOLOGUE } from "@neverquest/data/general";
import { merchantInventory, monologue } from "@neverquest/state/caravan";
import { stage, stageMaximum } from "@neverquest/state/encounter";
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

          if (stageValue === get(stageMaximum)) {
            set(
              monologue(crew),
              // If it's the merchant, only change their monologue to the item's if it was generated (i.e. not inherited), otherwise proceed to either set the stage's monologue or the most recent one.
              crew === "merchant" &&
                offer !== undefined &&
                "item" in offer &&
                isInheritableItem(offer.item) &&
                get(merchantInventory).some(({ name }) => name === offer.item.name)
                ? offer.monologue
                : monologues[stageValue] ??
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

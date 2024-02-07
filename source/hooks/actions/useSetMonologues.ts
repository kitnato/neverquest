import { useRecoilCallback } from "recoil";

import { CREW, MERCHANT_OFFERS, MONOLOGUE_EMPTY } from "@neverquest/data/caravan";
import { merchantInventory, monologue } from "@neverquest/state/caravan";
import { stage, stageMaximum } from "@neverquest/state/encounter";
import { isGearItem, isInheritableItem } from "@neverquest/types/type-guards";
import { CREW_MEMBER_TYPES } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useSetMonologues() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const stageValue = get(stage);

        for (const crewMember of CREW_MEMBER_TYPES) {
          const { monologues } = CREW[crewMember];
          const merchantOffer = MERCHANT_OFFERS[stageValue];

          if (stageValue === get(stageMaximum)) {
            set(
              monologue(crewMember),
              // If it's the merchant, only change their monologue to the item's if it was generated (i.e. not inherited or sold), otherwise set the current stage's monologue or the most recent one.
              crewMember === "merchant" &&
                merchantOffer !== undefined &&
                get(merchantInventory).some((item) => {
                  const { offer } = merchantOffer;

                  return (
                    !item.isReturned &&
                    ((isInheritableItem(offer) && item.name === offer.name) ||
                      ("gearClass" in offer &&
                        isGearItem(item) &&
                        item.level === stageValue &&
                        item.gearClass === offer.gearClass))
                  );
                }) &&
                merchantOffer.monologue !== undefined
                ? merchantOffer.monologue
                : monologues[stageValue] ??
                    (() => {
                      for (let index = stageValue; index > 0; index--) {
                        if (monologues[index] !== undefined) {
                          return monologues[index];
                        }
                      }
                    })() ??
                    MONOLOGUE_EMPTY,
            );
          }
        }
      },
    [],
  );
}

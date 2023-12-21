import type { GeneratorParameters } from "@kitnato/locran/build/types";
import { useRecoilCallback } from "recoil";

import { MERCHANT_OFFERS } from "@neverquest/data/caravan";
import { merchantInventory } from "@neverquest/state/caravan";
import { stage, stageMaximum } from "@neverquest/state/encounter";
import { ownedItem } from "@neverquest/state/inventory";
import { allowProfanity } from "@neverquest/state/settings";
import { isInheritableItem } from "@neverquest/types/type-guards";
import {
  generateArmor,
  generateMeleeWeapon,
  generateShield,
} from "@neverquest/utilities/generators";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useGenerateMerchantInventory() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const merchantInventoryCurrent = [...get(merchantInventory)];
        const stageValue = get(stage);

        const offer = MERCHANT_OFFERS[stageValue];

        // Only add offer if it's the currently highest stage (to avoid regenerating older gear offers), and in the case of being a trinket or infusable, if it's not in any inventory.
        if (
          offer !== undefined &&
          stageValue === get(stageMaximum) &&
          (isInheritableItem(offer)
            ? !merchantInventoryCurrent.some(({ name }) => name === offer.name) &&
              get(ownedItem(offer.name)) === undefined
            : true)
        ) {
          const gearSettings: GeneratorParameters & { level: number } = {
            affixStructure: "prefix",
            allowProfanity: get(allowProfanity),
            level: stageValue,
            prefixTags: ["lowQuality"],
          };

          const item = (() => {
            if (isInheritableItem(offer)) {
              return offer;
            }

            switch (offer.type) {
              case "armor": {
                return generateArmor({
                  ...gearSettings,
                  ...offer,
                });
              }

              case "shield": {
                return generateShield({
                  ...gearSettings,
                  ...offer,
                });
              }

              case "weapon": {
                return generateMeleeWeapon({
                  ...gearSettings,
                  ...offer,
                });
              }
            }
          })();

          merchantInventoryCurrent.push({
            ...item,
            isEradicated: false,
            isReturned: false,
          });

          set(merchantInventory, merchantInventoryCurrent);
        }
      },
    [],
  );
}

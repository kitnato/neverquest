import type { GeneratorParameters } from "@kitnato/locran/build/types";
import { nanoid } from "nanoid";
import { useRecoilCallback } from "recoil";

import { MERCHANT_OFFERS } from "@neverquest/data/caravan";
import { merchantInventory } from "@neverquest/state/caravan";
import { stage, stageMaximum } from "@neverquest/state/encounter";
import { ownedItem } from "@neverquest/state/inventory";
import type { InheritableItem } from "@neverquest/types";
import { isGearItem, isInheritableItem } from "@neverquest/types/type-guards";
import {
  generateArmor,
  generateMeleeWeapon,
  generateShield,
} from "@neverquest/utilities/generators";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useGenerateMerchantOffer() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const newMerchantInventory = [...get(merchantInventory)];
        const stageValue = get(stage);

        const offer = MERCHANT_OFFERS[stageValue];

        // Only add offer if it's the currently highest stage to avoid regenerating older gear offers.
        if (offer !== undefined && stageValue === get(stageMaximum)) {
          // In the case of being a relic or infusable, make sure it's not in any inventory.
          if (
            "item" in offer &&
            isInheritableItem(offer.item) &&
            (newMerchantInventory.some(({ name }) => name === offer.item.name) ||
              get(ownedItem(offer.item.name)) !== undefined)
          ) {
            return;
          }

          const gearSettings: GeneratorParameters & { level: number } = {
            affixStructure: "prefix",
            level: stageValue,
            prefixTags: ["lowQuality"],
          };

          const item = (() => {
            if ("type" in offer) {
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
            }

            return { ...offer.item, ID: nanoid() } as InheritableItem;
          })();

          if (isGearItem(item)) {
            item.price = Math.round(item.price / 2);
          }

          newMerchantInventory.push({
            ...item,
            isEradicated: false,
            isReturned: false,
          });

          set(merchantInventory, newMerchantInventory);
        }
      },
    [],
  );
}

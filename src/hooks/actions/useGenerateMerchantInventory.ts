import { useRecoilCallback } from "recoil";

import { MERCHANT_OFFERS } from "@neverquest/data/caravan";
import type { GeneratorParameters } from "@neverquest/LOCRAN/types";
import { merchantInventory } from "@neverquest/state/caravan";
import { stage, stageMaximum } from "@neverquest/state/encounter";
import { ownedItem } from "@neverquest/state/inventory";
import { canUseJournal } from "@neverquest/state/quests";
import { allowProfanity } from "@neverquest/state/settings";
import { isGear, isInfusableItem, isTrinketItem } from "@neverquest/types/type-guards";
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

        const allowProfanityValue = get(allowProfanity);
        const merchantInventoryNew = [...get(merchantInventory)];
        const stageValue = get(stage);

        if (stageValue === get(stageMaximum)) {
          const SETTINGS_GEAR: GeneratorParameters & { level: number } = {
            allowProfanity: allowProfanityValue,
            level: stageValue,
            nameStructure: "prefix",
            prefixTags: ["lowQuality"],
          };
          const offer = MERCHANT_OFFERS[stageValue];

          if (offer !== undefined) {
            const item = (() => {
              if (isInfusableItem(offer) || isTrinketItem(offer)) {
                return offer;
              }

              switch (offer.type) {
                case "armor": {
                  return generateArmor({
                    ...SETTINGS_GEAR,
                    ...offer,
                  });
                }

                case "shield": {
                  return generateShield({
                    ...SETTINGS_GEAR,
                    ...offer,
                  });
                }

                case "weapon": {
                  return generateMeleeWeapon({
                    ...SETTINGS_GEAR,
                    ...offer,
                  });
                }
              }
            })();

            if (
              isGear(item) ||
              get(ownedItem(item.name)) === undefined ||
              (item.name === "antique coin" && get(canUseJournal))
            ) {
              merchantInventoryNew.push({
                ...item,
                isReturned: false,
              });
            }
          }
        }

        set(merchantInventory, merchantInventoryNew);
      },
    [],
  );
}

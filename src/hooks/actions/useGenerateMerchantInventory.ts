import { useRecoilCallback } from "recoil";

import { MERCHANT_OFFERS } from "@neverquest/data/caravan";
import type { GeneratorParameters } from "@neverquest/LOCRAN/types";
import { merchantInventory } from "@neverquest/state/caravan";
import { stage, stageMaximum } from "@neverquest/state/encounter";
import { allowNSFW } from "@neverquest/state/settings";
import type { MerchantInventory } from "@neverquest/types";
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

        // Remove all previously returned items, so they no longer appear under buy back.
        const inventory: MerchantInventory = [...get(merchantInventory)].filter(
          ({ isReturned }) => !isReturned,
        );
        const stageValue = get(stage);
        const allowNSFWValue = get(allowNSFW);

        if (stageValue === get(stageMaximum)) {
          const SETTINGS_GEAR: GeneratorParameters & { level: number } = {
            allowNSFW: allowNSFWValue,
            level: stageValue,
            nameStructure: "prefix",
            prefixTags: ["lowQuality"],
          };
          const merchantOffers = MERCHANT_OFFERS[stageValue];

          if (merchantOffers !== undefined) {
            merchantOffers.forEach((offer) => {
              const { type } = offer;

              const item = (() => {
                switch (type) {
                  case "armor": {
                    return {
                      ...generateArmor({
                        ...SETTINGS_GEAR,
                        ...offer,
                      }),
                      isEquipped: false,
                    };
                  }

                  case "shield": {
                    return {
                      ...generateShield({
                        ...SETTINGS_GEAR,
                        ...offer,
                      }),
                      isEquipped: false,
                    };
                  }

                  case "trinket": {
                    return offer.item;
                  }

                  case "weapon": {
                    return {
                      ...generateMeleeWeapon({
                        ...SETTINGS_GEAR,
                        ...offer,
                      }),
                      isEquipped: false,
                    };
                  }
                }
              })();

              inventory.push({
                isReturned: false,
                item,
              });
            });
          }
        }

        set(merchantInventory, inventory);
      },
    [],
  );
}

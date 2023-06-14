import { useRecoilCallback } from "recoil";

import { MERCHANT_OFFERS } from "@neverquest/data/caravan";
import { TRINKETS } from "@neverquest/data/inventory";
import type { AffixTag } from "@neverquest/LOCRA/types";
import { merchantInventory } from "@neverquest/state/caravan";
import { stage, stageMaximum } from "@neverquest/state/encounter";
import { allowNSFW } from "@neverquest/state/settings";
import type { InventoryMerchant } from "@neverquest/types";
import { generateArmor, generateShield, generateWeapon } from "@neverquest/utilities/generators";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useGenerateMerchantInventory() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        // Remove all previously returned items, so they no longer appear under buy back.
        const inventory: InventoryMerchant = [...get(merchantInventory)].filter(
          ({ isReturned }) => !isReturned
        );
        const stageValue = get(stage);
        const allowNSFWValue = get(allowNSFW);

        if (stageValue === get(stageMaximum)) {
          const SETTINGS_GEAR: {
            allowNSFW: boolean;
            hasPrefix: boolean;
            level: number;
            tags: AffixTag[];
          } = {
            allowNSFW: allowNSFWValue,
            hasPrefix: true,
            level: stageValue,
            tags: ["lowQuality"],
          };
          const merchantOffersIndex = stageValue - 1;

          if (merchantOffersIndex < MERCHANT_OFFERS.length) {
            MERCHANT_OFFERS[merchantOffersIndex].forEach((offer) => {
              const { type } = offer;
              const item = (() => {
                if (type === "armor") {
                  return {
                    ...generateArmor({
                      ...SETTINGS_GEAR,
                      ...offer,
                    }),
                    isEquipped: false,
                  };
                }

                if (type === "shield") {
                  return {
                    ...generateShield({
                      ...SETTINGS_GEAR,
                      ...offer,
                    }),
                    isEquipped: false,
                  };
                }

                if (type === "weapon") {
                  return {
                    ...generateWeapon({
                      ...SETTINGS_GEAR,
                      ...offer,
                    }),
                    isEquipped: false,
                  };
                }

                return TRINKETS[offer.name].item;
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
    []
  );
}

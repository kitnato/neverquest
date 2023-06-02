import { nanoid } from "nanoid";
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
        const inventory: InventoryMerchant = Object.fromEntries(
          Object.entries({ ...get(merchantInventory) }).filter(([, { isReturned }]) => !isReturned)
        );
        const stageValue = get(stage);
        const allowNSFWValue = get(allowNSFW);

        const merchantOffersIndex = stageValue - 1;

        if (
          stageValue === get(stageMaximum) &&
          Array.isArray(MERCHANT_OFFERS[merchantOffersIndex])
        ) {
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

          MERCHANT_OFFERS[merchantOffersIndex].forEach((offer) => {
            const id = nanoid();

            const { type } = offer;
            const item = (() => {
              if (type === "armor") {
                return generateArmor({
                  ...SETTINGS_GEAR,
                  ...offer,
                });
              }

              if (type === "shield") {
                return generateShield({
                  ...SETTINGS_GEAR,
                  ...offer,
                });
              }

              if (type === "weapon") {
                return generateWeapon({
                  ...SETTINGS_GEAR,
                  ...offer,
                });
              }

              return TRINKETS[offer.name].item;
            })();

            inventory[id] = {
              isReturned: false,
              item,
            };
          });
        }

        set(merchantInventory, inventory);
      },
    []
  );
}

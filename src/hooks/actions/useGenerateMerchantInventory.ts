import { nanoid } from "nanoid";
import { useRecoilCallback } from "recoil";

import { MERCHANT_OFFERS } from "@neverquest/data/merchant";
import type { AffixTag } from "@neverquest/LOCRA/types";
import { merchantInventory } from "@neverquest/state/caravan";
import { level, maximumLevel } from "@neverquest/state/encounter";
import { allowNSFW } from "@neverquest/state/settings";
import type { InventoryMerchant } from "@neverquest/types";
import { isTrinket } from "@neverquest/types/type-guards";
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
        const levelValue = get(level);
        const isNSFWValue = get(allowNSFW);

        const merchantOffersIndex = levelValue - 1;

        if (
          levelValue === get(maximumLevel) &&
          Array.isArray(MERCHANT_OFFERS[merchantOffersIndex])
        ) {
          const SETTINGS_GEAR: {
            allowNSFW: boolean;
            hasPrefix: boolean;
            level: number;
            tags: AffixTag[];
          } = {
            allowNSFW: isNSFWValue,
            hasPrefix: true,
            level: levelValue,
            tags: ["lowQuality"],
          };

          MERCHANT_OFFERS[merchantOffersIndex].forEach((offer) => {
            const id = nanoid();

            if (isTrinket(offer)) {
              inventory[id] = {
                isReturned: false,
                item: offer,
              };
            } else {
              const { type } = offer;
              const gear = (() => {
                if (type === "armor") {
                  return generateArmor({
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

                return generateShield({
                  ...SETTINGS_GEAR,
                  ...offer,
                });
              })();

              inventory[id] = {
                isReturned: false,
                item: gear,
              };
            }
          });
        }

        set(merchantInventory, inventory);
      },
    []
  );
}

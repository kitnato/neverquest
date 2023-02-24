import { nanoid } from "nanoid";
import { useRecoilCallback } from "recoil";

import { MERCHANT_OFFERS } from "@neverquest/data/merchant";
import { AffixTag } from "@neverquest/LOCRA/types";
import { merchantInventory } from "@neverquest/state/caravan";
import { level } from "@neverquest/state/encounter";
import { isNSFW } from "@neverquest/state/settings";
import { InventoryMerchant } from "@neverquest/types";
import { isTrinket } from "@neverquest/types/type-guards";
import { generateArmor, generateShield, generateWeapon } from "@neverquest/utilities/generators";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useGenerateMerchantInventory() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const inventory: InventoryMerchant = { ...get(merchantInventory) };
        const levelValue = get(level);
        const isNSFWValue = get(isNSFW);

        // Remove all previously returned items, so they no longer appear under buy back.
        Object.getOwnPropertyNames(inventory)
          .filter((id) => inventory[id].isReturned)
          .forEach((id) => delete inventory[id]);

        const merchantOffersIndex = levelValue - 1;

        if (MERCHANT_OFFERS[merchantOffersIndex]) {
          const SETTINGS_GEAR = {
            hasPrefix: true,
            isNSFW: isNSFWValue,
            level: levelValue,
            tags: [AffixTag.LowQuality],
          };

          MERCHANT_OFFERS[merchantOffersIndex].forEach((offer) => {
            const id = nanoid();
            const inventoryContentsBase = {
              isReturned: false,
              key: nanoid(),
            };

            if (isTrinket(offer)) {
              inventory[id] = {
                ...inventoryContentsBase,
                item: offer,
              };
            } else {
              const gear = (() => {
                if ("armorClass" in offer) {
                  return generateArmor({
                    ...SETTINGS_GEAR,
                    ...offer,
                  });
                }

                if ("weaponClass" in offer) {
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
                ...inventoryContentsBase,
                item: gear,
              };
            }
          });

          set(merchantInventory, inventory);
        }
      },
    []
  );
}

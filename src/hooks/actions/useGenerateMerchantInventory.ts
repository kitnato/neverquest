import { nanoid } from "nanoid";
import { useRecoilCallback } from "recoil";

import { MERCHANT_OFFERS } from "@neverquest/constants/merchant";
import { AffixTag } from "@neverquest/locra/types";
import { merchantInventory } from "@neverquest/state/caravan";
import { level } from "@neverquest/state/encounter";
import { isNSFW } from "@neverquest/state/settings";
import { isItem } from "@neverquest/types/type-guards";
import { generateArmor, generateShield, generateWeapon } from "@neverquest/utilities/generators";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export default function () {
  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = getSnapshotGetter(snapshot);

    const inventory = { ...get(merchantInventory) };
    const levelValue = get(level);
    const nsfwValue = get(isNSFW);

    // Remove all previously returned items, so they no longer appear under buy back.
    Object.getOwnPropertyNames(inventory)
      .filter((id) => inventory[id].isReturned)
      .forEach((id) => delete inventory[id]);

    const merchantOffersIndex = levelValue - 1;

    if (MERCHANT_OFFERS[merchantOffersIndex]) {
      const gearSettings = {
        hasPrefix: true,
        isNSFW: nsfwValue,
        level: levelValue,
        tags: [AffixTag.LowQuality],
      };

      MERCHANT_OFFERS[merchantOffersIndex].forEach((offer) => {
        const id = nanoid();
        const inventoryContentsBase = {
          isReturned: false,
          key: nanoid(),
        };

        if (isItem(offer)) {
          inventory[id] = {
            ...inventoryContentsBase,
            possession: offer,
          };
        } else {
          const gear = (() => {
            if ("armorClass" in offer) {
              return generateArmor({
                ...gearSettings,
                ...offer,
              });
            }

            if ("weaponClass" in offer) {
              return generateWeapon({
                ...gearSettings,
                ...offer,
              });
            }

            return generateShield({
              ...gearSettings,
              ...offer,
            });
          })();

          inventory[id] = {
            ...inventoryContentsBase,
            possession: gear,
          };
        }
      });

      set(merchantInventory, inventory);
    }
  });
}

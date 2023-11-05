import { useRecoilCallback } from "recoil";

import { MERCHANT_OFFERS } from "@neverquest/data/caravan";
import type { GeneratorParameters } from "@neverquest/LOCRAN/types";
import { merchantInventory } from "@neverquest/state/caravan";
import { stage, stageMaximum } from "@neverquest/state/encounter";
import { ownedItem } from "@neverquest/state/inventory";
import { allowNSFW } from "@neverquest/state/settings";
import { isGear } from "@neverquest/types/type-guards";
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

        const allowNSFWValue = get(allowNSFW);
        const merchantInventoryNew = [...get(merchantInventory)];
        const stageValue = get(stage);

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
              const item = (() => {
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

                  case "trinket": {
                    return offer.item;
                  }

                  case "weapon": {
                    return generateMeleeWeapon({
                      ...SETTINGS_GEAR,
                      ...offer,
                    });
                  }
                }
              })();

              if (isGear(item) || get(ownedItem(item.name)) === null) {
                merchantInventoryNew.push({
                  isReturned: false,
                  item,
                });
              }
            });
          }
        }

        set(merchantInventory, merchantInventoryNew);
      },
    [],
  );
}

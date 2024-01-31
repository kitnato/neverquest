import { Button, Stack } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { merchantInventory } from "@neverquest/state/caravan";
import { armor, shield, weapon } from "@neverquest/state/gear";
import { inventory } from "@neverquest/state/inventory";
import { isWeaving } from "@neverquest/state/items";
import type { InventoryItem } from "@neverquest/types";
import {
  isArmor,
  isGearItem,
  isShield,
  isUnarmed,
  isUnarmored,
  isUnshielded,
} from "@neverquest/types/type-guards";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getSellPrice } from "@neverquest/utilities/getters";

export function SellItem({ item }: { item: InventoryItem }) {
  const armorValue = useRecoilValue(armor);
  const setInventory = useSetRecoilState(inventory);
  const setMerchantInventory = useSetRecoilState(merchantInventory);
  const shieldValue = useRecoilValue(shield);
  const weaponValue = useRecoilValue(weapon);
  const resetIsWeaving = useResetRecoilState(isWeaving);

  const progressQuest = useProgressQuest();
  const toggleEquipGear = useToggleEquipGear();
  const transactEssence = useTransactEssence();

  const equippedGearIDs = new Set(
    [weaponValue, armorValue, shieldValue]
      .filter((gearItem) =>
        isArmor(gearItem)
          ? !isUnarmored(gearItem)
          : isShield(gearItem)
            ? !isUnshielded(gearItem)
            : !isUnarmed(gearItem),
      )
      .map(({ ID }) => ID),
  );

  return (
    <Stack className="ms-2" direction="horizontal" gap={3}>
      <IconDisplay Icon={IconEssence} tooltip="Value">
        <span>{formatNumber({ value: getSellPrice({ item }) })}</span>
      </IconDisplay>

      <Button
        onClick={() => {
          const { ID, name } = item;

          transactEssence(getSellPrice({ item }));

          if (isGearItem(item) && equippedGearIDs.has(ID)) {
            toggleEquipGear(item);
          }

          setInventory((currentInventory) =>
            currentInventory.filter((currentItem) => currentItem.ID !== ID),
          );
          setMerchantInventory((currentMerchantInventory) => [
            ...currentMerchantInventory,
            { ...item, isEradicated: false, isReturned: true },
          ]);

          if (name === "perpetual loom") {
            resetIsWeaving();
          }

          progressQuest({ quest: "selling" });
        }}
        variant="outline-dark"
      >
        <span>Sell</span>
      </Button>
    </Stack>
  );
}

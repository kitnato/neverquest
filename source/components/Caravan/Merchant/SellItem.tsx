import { Button, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { merchantInventory } from "@neverquest/state/caravan";
import { equippedArmor, equippedShield, equippedWeapon } from "@neverquest/state/gear";
import { inventory } from "@neverquest/state/inventory";
import type { Armor, InventoryItem, Shield, Weapon } from "@neverquest/types";
import { isGearItem } from "@neverquest/types/type-guards";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getSellPrice } from "@neverquest/utilities/getters";

export function SellItem({ item }: { item: InventoryItem }) {
  const equippedArmorValue = useRecoilValue(equippedArmor);
  const equippedShieldValue = useRecoilValue(equippedShield);
  const equippedWeaponValue = useRecoilValue(equippedWeapon);
  const setInventory = useSetRecoilState(inventory);
  const setMerchantInventory = useSetRecoilState(merchantInventory);

  const progressQuest = useProgressQuest();
  const toggleEquipGear = useToggleEquipGear();
  const transactEssence = useTransactEssence();

  const equippedGearIDs = new Set(
    (
      [equippedWeaponValue, equippedArmorValue, equippedShieldValue].filter(Boolean) as (
        | Armor
        | Shield
        | Weapon
      )[]
    ).map(({ ID }) => ID),
  );

  return (
    <Stack className="ms-2" direction="horizontal" gap={3}>
      <IconDisplay Icon={IconEssence} tooltip="Value">
        {formatNumber({ value: getSellPrice(item) })}
      </IconDisplay>

      <Button
        onClick={() => {
          const { ID } = item;

          transactEssence(getSellPrice(item));

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

          progressQuest({ quest: "selling" });
        }}
        variant="outline-dark"
      >
        Sell
      </Button>
    </Stack>
  );
}

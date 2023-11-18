import { Button, Stack } from "react-bootstrap";
import { useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { merchantInventory } from "@neverquest/state/caravan";
import { inventory } from "@neverquest/state/inventory";
import type { InventoryItem } from "@neverquest/types";
import { isGearItem } from "@neverquest/types/type-guards";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getSellPrice } from "@neverquest/utilities/getters";

export function SellItem({ item }: { item: InventoryItem }) {
  const setInventory = useSetRecoilState(inventory);
  const setMerchantInventory = useSetRecoilState(merchantInventory);

  const progressQuest = useProgressQuest();
  const transactEssence = useTransactEssence();

  return (
    <Stack direction="horizontal" gap={3}>
      <IconDisplay Icon={IconEssence} tooltip="Value">
        {formatNumber({ value: getSellPrice(item) })}
      </IconDisplay>

      <Button
        onClick={() => {
          transactEssence(getSellPrice(item));

          setInventory((current) => current.filter((current) => current.ID !== item.ID));
          setMerchantInventory((current) => [
            ...current,
            isGearItem(item)
              ? { ...item, isEquipped: false, isReturned: true }
              : { ...item, isReturned: true },
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

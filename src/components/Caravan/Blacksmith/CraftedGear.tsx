import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { blacksmithInventory } from "@neverquest/state/caravan";
import { canFit } from "@neverquest/state/inventory";
import type { GearItem } from "@neverquest/types";
import { isArmor, isShield, isWeapon } from "@neverquest/types/type-guards";

export function CraftedGear({ gearItem }: { gearItem: GearItem }) {
  const { weight } = gearItem;

  const canFitValue = useRecoilValue(canFit(weight));
  const setBlacksmithInventory = useSetRecoilState(blacksmithInventory);

  const acquireItem = useAcquireItem();
  const toggleEquipGear = useToggleEquipGear();

  const handleAcquire = () => {
    const acquisitionStatus = acquireItem(gearItem);

    if (acquisitionStatus === "noFit") {
      return;
    }

    if (isArmor(gearItem)) {
      setBlacksmithInventory((current) => ({ ...current, armor: null }));
    }

    if (isShield(gearItem)) {
      setBlacksmithInventory((current) => ({ ...current, shield: null }));
    }

    if (isWeapon(gearItem)) {
      setBlacksmithInventory((current) => ({ ...current, weapon: null }));
    }

    if (acquisitionStatus === "autoEquip") {
      toggleEquipGear(gearItem);
    }
  };

  return (
    <Stack gap={3}>
      <ItemDisplay item={gearItem} />

      <OverlayTrigger
        overlay={<Tooltip>Over-encumbered!</Tooltip>}
        trigger={canFitValue ? [] : ["hover", "focus"]}
      >
        <span>
          <Button
            className="w-100"
            disabled={!canFitValue}
            onClick={handleAcquire}
            variant="outline-dark"
          >
            Acquire
          </Button>
        </span>
      </OverlayTrigger>
    </Stack>
  );
}

import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { blacksmithInventory } from "@neverquest/state/caravan";
import { canFit, itemsAcquired } from "@neverquest/state/inventory";
import type { GearItem } from "@neverquest/types";
import { isArmor, isShield, isWeapon } from "@neverquest/types/type-guards";

export function CraftedGear({ gear }: { gear: GearItem }) {
  const { weight } = gear;

  const canFitValue = useRecoilValue(canFit(weight));
  const setBlacksmithInventory = useSetRecoilState(blacksmithInventory);
  const setItemsAcquired = useSetRecoilState(itemsAcquired);

  const acquireItem = useAcquireItem();
  const toggleEquipGear = useToggleEquipGear();

  const handleAcquire = () => {
    const acquisitionStatus = acquireItem(gear);

    if (acquisitionStatus === "noFit") {
      return;
    }

    if (isArmor(gear)) {
      setBlacksmithInventory((current) => ({ ...current, armor: null }));
    }

    if (isShield(gear)) {
      setBlacksmithInventory((current) => ({ ...current, shield: null }));
    }

    if (isWeapon(gear)) {
      setBlacksmithInventory((current) => ({ ...current, weapon: null }));
    }

    setItemsAcquired((current) => [...current, gear]);

    if (acquisitionStatus === "autoEquip") {
      toggleEquipGear(gear);
    }
  };

  return (
    <Stack gap={3}>
      <ItemDisplay item={gear} />

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

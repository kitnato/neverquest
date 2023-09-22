import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { canFit } from "@neverquest/state/inventory";
import type { GearItem } from "@neverquest/types";

export function CraftedGear({
  gearItem,
  onTransfer,
}: {
  gearItem: GearItem;
  onTransfer: () => void;
}) {
  const { weight } = gearItem;

  const canFitValue = useRecoilValue(canFit(weight));

  const acquireItem = useAcquireItem();
  const toggleEquipGear = useToggleEquipGear();

  const handleAcquire = () => {
    const acquisitionStatus = acquireItem(gearItem);

    if (acquisitionStatus === "noFit") {
      return;
    }

    onTransfer();

    if (acquisitionStatus === "autoEquip") {
      toggleEquipGear(gearItem);
    }
  };

  return (
    <Stack gap={3}>
      <ItemDisplay item={gearItem} />

      <OverlayTrigger
        overlay={<Tooltip>Too heavy!</Tooltip>}
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
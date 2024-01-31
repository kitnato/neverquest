import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";

import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { LABEL_OVER_ENCUMBERED, POPOVER_TRIGGER } from "@neverquest/data/general";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useCanFit } from "@neverquest/hooks/actions/useCanFit";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import type { GearItem } from "@neverquest/types";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function CraftedGear({
  gearItem,
  onTransfer,
}: {
  gearItem: GearItem;
  onTransfer: () => void;
}) {
  const { weight } = gearItem;

  const acquireItem = useAcquireItem();
  const canFit = useCanFit();
  const toggleEquipGear = useToggleEquipGear();

  const canFitItem = canFit(weight);

  return (
    <Stack gap={3}>
      <div className={`mx-auto ${getAnimationClass({ animation: "pulse" })}`}>
        <ItemDisplay item={gearItem} />
      </div>

      <OverlayTrigger
        overlay={
          <Tooltip>
            <span>{LABEL_OVER_ENCUMBERED}</span>
          </Tooltip>
        }
        trigger={canFitItem ? [] : POPOVER_TRIGGER}
      >
        <div>
          <Button
            className="w-100"
            disabled={!canFitItem}
            onClick={() => {
              const acquisitionStatus = acquireItem(gearItem);

              if (acquisitionStatus === "failure") {
                return;
              }

              onTransfer();

              if (acquisitionStatus === "equip") {
                toggleEquipGear(gearItem);
              }
            }}
            variant="outline-dark"
          >
            <span>Acquire</span>
          </Button>
        </div>
      </OverlayTrigger>
    </Stack>
  );
}

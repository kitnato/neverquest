import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";

import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { LABEL_OVER_ENCUMBERED } from "@neverquest/data/general";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useCanFit } from "@neverquest/hooks/actions/useCanFit";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import type { GearItem } from "@neverquest/types";

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
      <div className="mx-auto">
        <ItemDisplay item={gearItem} />
      </div>

      <OverlayTrigger
        overlay={<Tooltip>{LABEL_OVER_ENCUMBERED}</Tooltip>}
        trigger={canFitItem ? [] : ["focus", "hover"]}
      >
        <div>
          <Button
            className="w-100"
            disabled={!canFitItem}
            onClick={() => {
              const acquisitionStatus = acquireItem(gearItem);

              if (acquisitionStatus === "noFit") {
                return;
              }

              onTransfer();

              if (acquisitionStatus === "autoEquip") {
                toggleEquipGear(gearItem);
              }
            }}
            variant="outline-dark"
          >
            Acquire
          </Button>
        </div>
      </OverlayTrigger>
    </Stack>
  );
}
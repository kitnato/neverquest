import { nanoid } from "nanoid";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import {
  LABEL_OVER_ENCUMBERED,
  LEVELLING_MAXIMUM,
  POPOVER_TRIGGER,
} from "@neverquest/data/general";
import { RELICS } from "@neverquest/data/items";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useCanFit } from "@neverquest/hooks/actions/useCanFit";
import { inventory, ownedItem } from "@neverquest/state/inventory";
import { infusionLevel } from "@neverquest/state/items";

export function Hatch() {
  const infusionLevelValue = useRecoilValue(infusionLevel("mysterious egg"));
  const ownedItemMysteriousEgg = useRecoilValue(ownedItem("mysterious egg"));
  const setInventory = useSetRecoilState(inventory);

  const acquireItem = useAcquireItem();
  const canFit = useCanFit();

  const { item: familiarItem } = RELICS.familiar;
  const canFitFamiliar = canFit(familiarItem.weight);

  return (
    infusionLevelValue >= LEVELLING_MAXIMUM &&
    ownedItemMysteriousEgg !== undefined && (
      <OverlayTrigger
        overlay={
          <Tooltip>
            <span>{LABEL_OVER_ENCUMBERED}</span>
          </Tooltip>
        }
        trigger={canFitFamiliar ? [] : POPOVER_TRIGGER}
      >
        <div>
          <Button
            disabled={!canFitFamiliar}
            onClick={() => {
              const acquiredStatus = acquireItem({ ...familiarItem, ID: nanoid() });

              if (acquiredStatus === "success") {
                setInventory((currentInventory) =>
                  currentInventory.filter(({ ID }) => ID !== ownedItemMysteriousEgg.ID),
                );
              }
            }}
            variant="outline-dark"
          >
            Hatch
          </Button>
        </div>
      </OverlayTrigger>
    )
  );
}

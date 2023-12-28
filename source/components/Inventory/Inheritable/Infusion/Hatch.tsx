import { nanoid } from "nanoid";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { LABEL_OVER_ENCUMBERED, LEVELLING_MAXIMUM } from "@neverquest/data/general";
import { TRINKETS } from "@neverquest/data/items";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useCanFit } from "@neverquest/hooks/actions/useCanFit";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { inventory, ownedItem } from "@neverquest/state/inventory";
import { infusionLevel } from "@neverquest/state/items";

export function Hatch() {
  const infusionLevelValue = useRecoilValue(infusionLevel("mysterious egg"));
  const ownedItemMysteriousEgg = useRecoilValue(ownedItem("mysterious egg"));
  const setInventory = useSetRecoilState(inventory);

  const acquireItem = useAcquireItem();
  const canFit = useCanFit();
  const progressQuest = useProgressQuest();

  const { item: familiarItem } = TRINKETS.familiar;
  const canFitFamiliar = canFit(familiarItem.weight);

  return (
    infusionLevelValue >= LEVELLING_MAXIMUM &&
    ownedItemMysteriousEgg !== undefined && (
      <OverlayTrigger
        overlay={<Tooltip>{LABEL_OVER_ENCUMBERED}</Tooltip>}
        trigger={canFitFamiliar ? [] : ["focus", "hover"]}
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

                progressQuest({ quest: "acquiringFamiliar" });
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

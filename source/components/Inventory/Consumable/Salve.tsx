import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { POPOVER_TRIGGER } from "@neverquest/data/general";
import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { inventory } from "@neverquest/state/inventory";
import { blight, isBlighted } from "@neverquest/state/reserves";

export function Salve({ ID }: { ID: string }) {
  const isBlightedValue = useRecoilValue(isBlighted);
  const resetBlight = useResetRecoilState(blight);
  const setInventory = useSetRecoilState(inventory);

  const addDelta = useAddDelta();
  const progressQuest = useProgressQuest();

  return (
    <OverlayTrigger
      overlay={
        <Tooltip>
          <span>Not blighted.</span>
        </Tooltip>
      }
      trigger={isBlightedValue ? [] : POPOVER_TRIGGER}
    >
      <div>
        <Button
          disabled={!isBlightedValue}
          onClick={() => {
            resetBlight();

            addDelta({
              contents: {
                color: "text-secondary",
                value: "CURED",
              },
              delta: "stamina",
            });

            setInventory((currentInventory) =>
              currentInventory.filter(({ ID: currentItemID }) => currentItemID !== ID),
            );

            progressQuest({ quest: "potions" });
          }}
          variant="outline-dark"
        >
          <span>Apply</span>
        </Button>
      </div>
    </OverlayTrigger>
  );
}

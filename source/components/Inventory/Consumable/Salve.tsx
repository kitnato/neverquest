import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { POPOVER_TRIGGER } from "@neverquest/data/general";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { inventory } from "@neverquest/state/inventory";
import { blight, isBlighted } from "@neverquest/state/reserves";

export function Salve({ ID }: { ID: string }) {
  const resetBlight = useResetRecoilState(blight);
  const isBlightedValue = useRecoilValue(isBlighted);
  const setInventory = useSetRecoilState(inventory);

  const changeStamina = useChangeStamina();
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

            changeStamina({
              contents: {
                color: "text-muted",
                value: "CURED",
              },
              value: 0,
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

import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { POPOVER_TRIGGER } from "@neverquest/data/general";
import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { inventory } from "@neverquest/state/inventory";
import { isPoisoned, poisonDuration } from "@neverquest/state/reserves";

export function Antidote({ ID }: { ID: string }) {
  const isPoisonedValue = useRecoilValue(isPoisoned);
  const resetPoison = useResetRecoilState(poisonDuration);
  const setInventory = useSetRecoilState(inventory);

  const addDelta = useAddDelta();
  const progressQuest = useProgressQuest();

  return (
    <OverlayTrigger
      overlay={
        <Tooltip>
          <span>Not poisoned.</span>
        </Tooltip>
      }
      trigger={isPoisonedValue ? [] : POPOVER_TRIGGER}
    >
      <div>
        <Button
          disabled={!isPoisonedValue}
          onClick={() => {
            resetPoison();

            addDelta({
              contents: {
                color: "text-secondary",
                value: "REMEDIED",
              },
              delta: "health",
            });

            setInventory((currentInventory) =>
              currentInventory.filter(({ ID: currentItemID }) => currentItemID !== ID),
            );

            progressQuest({ quest: "potions" });
          }}
          variant="outline-dark"
        >
          <span>Drink</span>
        </Button>
      </div>
    </OverlayTrigger>
  );
}

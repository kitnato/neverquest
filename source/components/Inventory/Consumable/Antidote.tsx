import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { POPOVER_TRIGGER } from "@neverquest/data/general";
import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { inventory } from "@neverquest/state/inventory";
import { isPoisoned, poisonDuration } from "@neverquest/state/reserves";

export function Antidote({ ID }: { ID: string }) {
  const isPoisonedValue = useRecoilValue(isPoisoned);
  const resetPoison = useResetRecoilState(poisonDuration);
  const setInventory = useSetRecoilState(inventory);

  const changeHealth = useChangeHealth();
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

            changeHealth({
              delta: {
                color: "text-muted",
                value: "REMEDIED",
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
          Drink
        </Button>
      </div>
    </OverlayTrigger>
  );
}

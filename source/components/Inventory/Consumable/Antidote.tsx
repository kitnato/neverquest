import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { inventory } from "@neverquest/state/inventory";
import { isPoisoned, poisonDuration } from "@neverquest/state/reserves";

export function Antidote({ ID }: { ID: string }) {
  const isPoisonedValue = useRecoilValue(isPoisoned);
  const resetPoisonDuration = useResetRecoilState(poisonDuration);
  const setInventory = useSetRecoilState(inventory);

  const changeHealth = useChangeHealth();
  const progressQuest = useProgressQuest();

  return (
    <OverlayTrigger
      overlay={<Tooltip>Not poisoned.</Tooltip>}
      trigger={isPoisonedValue ? [] : ["focus", "hover"]}
    >
      <div>
        <Button
          disabled={!isPoisonedValue}
          onClick={() => {
            resetPoisonDuration();

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

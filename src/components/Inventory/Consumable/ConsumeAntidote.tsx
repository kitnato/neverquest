import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { inventory } from "@neverquest/state/inventory";
import { poisonDuration } from "@neverquest/state/reserves";

export function ConsumeAntidote({ itemID }: { itemID: string }) {
  const resetPoisonDuration = useResetRecoilState(poisonDuration);
  const poisonDurationValue = useRecoilValue(poisonDuration);
  const setInventory = useSetRecoilState(inventory);

  const changeHealth = useChangeHealth();

  const isPoisoned = poisonDurationValue > 0;

  const cure = () => {
    resetPoisonDuration();

    changeHealth({
      delta: {
        color: "text-success",
        value: "CURED",
      },
      value: 0,
    });

    setInventory((current) => current.filter(({ id }) => itemID !== id));
  };

  return (
    <OverlayTrigger
      overlay={<Tooltip>{!isPoisoned && <div>Not poisoned!</div>}</Tooltip>}
      trigger={!isPoisoned ? ["hover", "focus"] : []}
    >
      <span>
        <Button disabled={!isPoisoned} onClick={cure} variant="outline-dark">
          Drink
        </Button>
      </span>
    </OverlayTrigger>
  );
}

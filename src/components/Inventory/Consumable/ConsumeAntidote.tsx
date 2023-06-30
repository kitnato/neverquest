import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { inventory } from "@neverquest/state/inventory";
import { isPoisoned, poisonDuration } from "@neverquest/state/reserves";

export function ConsumeAntidote({ itemID }: { itemID: string }) {
  const setInventory = useSetRecoilState(inventory);
  const isPoisonedValue = useRecoilValue(isPoisoned);
  const resetPoisonDuration = useResetRecoilState(poisonDuration);

  const changeHealth = useChangeHealth();

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
      overlay={<Tooltip>{!isPoisonedValue && <div>Not poisoned!</div>}</Tooltip>}
      trigger={!isPoisonedValue ? ["hover", "focus"] : []}
    >
      <span>
        <Button disabled={!isPoisonedValue} onClick={cure} variant="outline-dark">
          Drink
        </Button>
      </span>
    </OverlayTrigger>
  );
}

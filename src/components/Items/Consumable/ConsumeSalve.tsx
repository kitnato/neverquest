import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { inventory } from "@neverquest/state/inventory";
import { blight } from "@neverquest/state/reserves";
import type { ConsumableItem } from "@neverquest/types";

export function ConsumeSalve({ consumable }: { consumable: ConsumableItem }) {
  const blightValue = useRecoilValue(blight);
  const resetBlight = useResetRecoilState(blight);
  const setInventory = useSetRecoilState(inventory);

  const changeStamina = useChangeStamina();

  const isBlighted = blightValue > 0;

  const cure = () => {
    resetBlight();

    changeStamina({
      delta: {
        color: "text-success",
        value: "CURED",
      },
      isRegeneration: false,
      value: 0,
    });

    setInventory((current) => current.filter((current) => current.id !== consumable.id));
  };

  return (
    <OverlayTrigger
      overlay={<Tooltip>{!isBlighted && <div>Not blighted!</div>}</Tooltip>}
      trigger={!isBlighted ? ["hover", "focus"] : []}
    >
      <span>
        <Button disabled={!isBlighted} onClick={cure} variant="outline-dark">
          Apply
        </Button>
      </span>
    </OverlayTrigger>
  );
}

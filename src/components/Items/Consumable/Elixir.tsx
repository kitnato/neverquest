import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { inventory } from "@neverquest/state/inventory";
import { isStaminaAtMaximum, stamina, staminaMaximumTotal } from "@neverquest/state/reserves";

export function Elixir({ id }: { id: string }) {
  const isStaminaAtMaximumValue = useRecoilValue(isStaminaAtMaximum);
  const staminaValue = useRecoilValue(stamina);
  const staminaMaximumTotalValue = useRecoilValue(staminaMaximumTotal);
  const setInventory = useSetRecoilState(inventory);

  const changeStamina = useChangeStamina();

  const recover = () => {
    const staminaDifference = staminaMaximumTotalValue - staminaValue;

    changeStamina({
      delta: [
        {
          color: "text-muted",
          value: "RECOVER",
        },
        {
          color: "text-success",
          value: `+${staminaDifference}`,
        },
      ],
      isRegeneration: false,
      value: staminaDifference,
    });

    setInventory((current) => current.filter((current) => current.id !== id));
  };

  return (
    <OverlayTrigger
      overlay={<Tooltip>{isStaminaAtMaximumValue && <div>Already at full stamina.</div>}</Tooltip>}
      trigger={isStaminaAtMaximumValue ? ["hover", "focus"] : []}
    >
      <span>
        <Button disabled={isStaminaAtMaximumValue} onClick={recover} variant="outline-dark">
          Drink
        </Button>
      </span>
    </OverlayTrigger>
  );
}

import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { inventory } from "@neverquest/state/inventory";
import { isStaminaAtMaximum, stamina, staminaMaximumBlighted } from "@neverquest/state/reserves";

export function Elixir({ ID }: { ID: string }) {
  const isStaminaAtMaximumValue = useRecoilValue(isStaminaAtMaximum);
  const staminaValue = useRecoilValue(stamina);
  const staminaMaximumBlightedValue = useRecoilValue(staminaMaximumBlighted);
  const setInventory = useSetRecoilState(inventory);

  const changeStamina = useChangeStamina();
  const progressQuest = useProgressQuest();

  return (
    <OverlayTrigger
      overlay={<Tooltip>Already at full stamina.</Tooltip>}
      trigger={isStaminaAtMaximumValue ? ["focus", "hover"] : []}
    >
      <span>
        <Button
          disabled={isStaminaAtMaximumValue}
          onClick={() => {
            const staminaDifference = staminaMaximumBlightedValue - staminaValue;

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
              value: staminaDifference,
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
      </span>
    </OverlayTrigger>
  );
}

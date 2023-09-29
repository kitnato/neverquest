import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { inventory } from "@neverquest/state/inventory";
import { blight, isBlighted } from "@neverquest/state/reserves";

export function Salve({ id }: { id: string }) {
  const resetBlight = useResetRecoilState(blight);
  const isBlightedValue = useRecoilValue(isBlighted);
  const setInventory = useSetRecoilState(inventory);

  const changeStamina = useChangeStamina();

  const handleCure = () => {
    resetBlight();

    changeStamina({
      delta: {
        color: "text-muted",
        value: "CURED",
      },
      isRegeneration: false,
      value: 0,
    });

    setInventory((current) => current.filter((current) => current.id !== id));
  };

  return (
    <OverlayTrigger
      overlay={<Tooltip>{!isBlightedValue && <div>Not blighted.</div>}</Tooltip>}
      trigger={!isBlightedValue ? ["hover", "focus"] : []}
    >
      <span>
        <Button disabled={!isBlightedValue} onClick={handleCure} variant="outline-dark">
          Apply
        </Button>
      </span>
    </OverlayTrigger>
  );
}

import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { useHeal } from "@neverquest/hooks/actions/useHeal";
import { inventory } from "@neverquest/state/inventory";
import { isHealthAtMaximum } from "@neverquest/state/reserves";

export function ConsumeBandages({ itemID }: { itemID: string }) {
  const isHealthAtMaximumValue = useRecoilValue(isHealthAtMaximum);
  const setInventory = useSetRecoilState(inventory);

  const heal = useHeal();

  const apply = () => {
    heal();

    setInventory((current) => current.filter(({ id }) => itemID !== id));
  };

  return (
    <OverlayTrigger
      overlay={<Tooltip>{isHealthAtMaximumValue && <div>Already at full health!</div>}</Tooltip>}
      trigger={isHealthAtMaximumValue ? ["hover", "focus"] : []}
    >
      <span>
        <Button disabled={isHealthAtMaximumValue} onClick={apply} variant="outline-dark">
          Apply
        </Button>
      </span>
    </OverlayTrigger>
  );
}

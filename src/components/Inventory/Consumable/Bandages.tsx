import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { LABEL_FULL_HEALTH } from "@neverquest/data/general";
import { useHeal } from "@neverquest/hooks/actions/useHeal";
import { inventory } from "@neverquest/state/inventory";
import { isHealthAtMaximum } from "@neverquest/state/reserves";

export function Bandages({ ID }: { ID: string }) {
  const isHealthAtMaximumValue = useRecoilValue(isHealthAtMaximum);
  const setInventory = useSetRecoilState(inventory);

  const heal = useHeal();

  const apply = () => {
    heal();

    setInventory((current) => current.filter((current) => current.ID !== ID));
  };

  return (
    <OverlayTrigger
      overlay={<Tooltip>{LABEL_FULL_HEALTH}</Tooltip>}
      trigger={isHealthAtMaximumValue ? ["hover", "focus"] : []}
    >
      <span>
        <Button disabled={isHealthAtMaximumValue} onClick={apply} variant="outline-dark">
          Use
        </Button>
      </span>
    </OverlayTrigger>
  );
}

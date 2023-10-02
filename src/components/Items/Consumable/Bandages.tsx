import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { useHeal } from "@neverquest/hooks/actions/useHeal";
import { inventory } from "@neverquest/state/inventory";
import { isHealthAtMaximum } from "@neverquest/state/reserves";
import { LABEL_FULL_HEALTH } from "@neverquest/utilities/constants";

export function Bandages({ id }: { id: string }) {
  const isHealthAtMaximumValue = useRecoilValue(isHealthAtMaximum);
  const setInventory = useSetRecoilState(inventory);

  const heal = useHeal();

  const apply = () => {
    heal();

    setInventory((current) => current.filter((current) => current.id !== id));
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

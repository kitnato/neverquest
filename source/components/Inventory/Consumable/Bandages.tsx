import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { LABEL_FULL_HEALTH, POPOVER_TRIGGER } from "@neverquest/data/general";
import { useHeal } from "@neverquest/hooks/actions/useHeal";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { inventory } from "@neverquest/state/inventory";
import { isHealthAtMaximum } from "@neverquest/state/reserves";

export function Bandages({ ID }: { ID: string }) {
  const isHealthAtMaximumValue = useRecoilValue(isHealthAtMaximum);
  const setInventory = useSetRecoilState(inventory);

  const heal = useHeal();
  const progressQuest = useProgressQuest();

  return (
    <OverlayTrigger
      overlay={<Tooltip>{LABEL_FULL_HEALTH}</Tooltip>}
      trigger={isHealthAtMaximumValue ? POPOVER_TRIGGER : []}
    >
      <div>
        <Button
          disabled={isHealthAtMaximumValue}
          onClick={() => {
            heal();
            setInventory((currentInventory) =>
              currentInventory.filter(({ ID: currentItemID }) => currentItemID !== ID),
            );
            progressQuest({ quest: "bandaging" });
          }}
          variant="outline-dark"
        >
          Use
        </Button>
      </div>
    </OverlayTrigger>
  );
}

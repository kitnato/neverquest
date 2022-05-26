import { MouseEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useAtomValue } from "jotai";

import DismissableScreen from "neverquest/components/DismissableScreen";
import ImageIcon from "neverquest/components/ImageIcon";
import Inventory from "neverquest/components/Inventory";
import icon from "neverquest/icons/knapsack.svg";
import { isAttacking } from "neverquest/state/character";
import { showInventoryButton } from "neverquest/state/show";
import { AnimationType, UIVariant } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function InventoryButton() {
  const isAttackingValue = useAtomValue(isAttacking);
  const showInventoryButtonValue = useAtomValue(showInventoryButton);
  const [isScreenShowing, setScreenShowing] = useState(false);

  if (!showInventoryButtonValue) {
    return null;
  }

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Inventory</Tooltip>} placement="top">
        <span className={`${getAnimationClass(AnimationType.FlipInX)} d-inline-block`}>
          <Button
            disabled={isAttackingValue}
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              setScreenShowing(true);
              event.currentTarget.blur();
            }}
            variant={UIVariant.Outline}
          >
            <ImageIcon icon={icon} />
          </Button>
        </span>
      </OverlayTrigger>

      <DismissableScreen
        content={<Inventory />}
        isShowing={isScreenShowing}
        onClose={() => setScreenShowing(false)}
        title="Inventory"
      />
    </>
  );
}

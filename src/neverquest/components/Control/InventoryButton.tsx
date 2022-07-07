import { useAtomValue } from "jotai";
import { MouseEvent, useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import DismissableScreen from "neverquest/components/DismissableScreen";
import ImageIcon from "neverquest/components/ImageIcon";
import Inventory from "neverquest/components/Inventory";
import icon from "neverquest/icons/knapsack.svg";
import { hasKnapsack, isAttacking } from "neverquest/state/character";
import { AnimationType, UIVariant } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function InventoryButton({ isDisabled }: { isDisabled: boolean }) {
  const hasKnapsackValue = useAtomValue(hasKnapsack);
  const isAttackingValue = useAtomValue(isAttacking);
  const [isScreenShowing, setScreenShowing] = useState(false);

  if (!hasKnapsackValue) {
    return null;
  }

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Inventory</Tooltip>} placement="top">
        <span className={`d-inline-block ${getAnimationClass({ type: AnimationType.FlipInX })}`}>
          <Button
            disabled={isAttackingValue || isDisabled}
            onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
              currentTarget.blur();

              setScreenShowing(true);
            }}
            variant={UIVariant.Outline}
          >
            <ImageIcon icon={icon} />
          </Button>
        </span>
      </OverlayTrigger>

      <DismissableScreen
        contents={<Inventory />}
        isShowing={isScreenShowing}
        onClose={() => setScreenShowing(false)}
        title="Inventory"
      />
    </>
  );
}

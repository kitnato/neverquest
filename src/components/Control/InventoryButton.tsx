import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { DismissableScreen } from "@neverquest/components/DismissableScreen";
import { IconImage } from "@neverquest/components/IconImage";
import { Inventory } from "@neverquest/components/Inventory";
import { ReactComponent as IconInventory } from "@neverquest/icons/knapsack.svg";
import { isAttacking } from "@neverquest/state/character";
import { hasKnapsack, isInventoryOpen } from "@neverquest/state/inventory";
import { AnimationType, UIVariant } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function InventoryButton({ isDisabled }: { isDisabled: boolean }) {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const isAttackingValue = useRecoilValue(isAttacking);
  const [isInventoryOpenValue, setIsInventoryOpen] = useRecoilState(isInventoryOpen);

  if (!hasKnapsackValue) {
    return null;
  }

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Inventory</Tooltip>} placement="top">
        <span
          className={`d-inline-block ${getAnimationClass({
            type: AnimationType.BounceIn,
          })}`}
        >
          <Button
            disabled={isAttackingValue || isDisabled}
            onClick={() => setIsInventoryOpen(true)}
            variant={UIVariant.Outline}
          >
            <IconImage Icon={IconInventory} />
          </Button>
        </span>
      </OverlayTrigger>

      <DismissableScreen
        contents={<Inventory />}
        isShowing={isInventoryOpenValue}
        onClose={() => setIsInventoryOpen(false)}
        title="Inventory"
      />
    </>
  );
}

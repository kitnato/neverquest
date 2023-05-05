import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { ButtonBadge } from "@neverquest/components/Controls/ButtonBadge";
import { DismissableScreen } from "@neverquest/components/DismissableScreen";
import { IconImage } from "@neverquest/components/IconImage";
import { Inventory } from "@neverquest/components/Inventory";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { ReactComponent as IconInventory } from "@neverquest/icons/knapsack.svg";
import { isAttacking } from "@neverquest/state/character";
import { hasKnapsack, isInventoryFull, isInventoryOpen } from "@neverquest/state/inventory";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function InventoryButton({ isDisabled }: { isDisabled: boolean }) {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isInventoryFullValue = useRecoilValue(isInventoryFull);
  const [isInventoryOpenValue, setIsInventoryOpen] = useRecoilState(isInventoryOpen);

  if (!hasKnapsackValue) {
    return null;
  }

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Inventory</Tooltip>} placement="top">
        <span
          className={`d-inline-block ${getAnimationClass({
            type: "bounceIn",
          })}`}
        >
          <Button
            disabled={isAttackingValue || isDisabled}
            onClick={() => setIsInventoryOpen(true)}
            variant="outline-dark"
          >
            <IconImage Icon={IconInventory} />

            <ButtonBadge Icon={IconEncumbrance} isShowing={isInventoryFullValue} />
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

import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { ButtonBadge } from "@neverquest/components/Controls/ButtonBadge";
import { ConsumableAcquisition } from "@neverquest/components/Controls/ConsumableAcquisition";
import { DismissableScreen } from "@neverquest/components/DismissableScreen";
import { IconImage } from "@neverquest/components/IconImage";
import { Inventory } from "@neverquest/components/Inventory";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { ReactComponent as IconInventory } from "@neverquest/icons/knapsack.svg";
import { isAttacking, isGameOver } from "@neverquest/state/character";
import { hasKnapsack, isInventoryFull, isInventoryOpen } from "@neverquest/state/inventory";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function InventoryButton() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const isGameOverValue = useRecoilValue(isGameOver);
  const isInventoryFullValue = useRecoilValue(isInventoryFull);
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const [isInventoryOpenValue, setIsInventoryOpen] = useRecoilState(isInventoryOpen);

  if (!hasKnapsackValue) {
    return null;
  }

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Inventory</Tooltip>}>
        <span className={getAnimationClass({ type: "bounceIn" })}>
          <Button
            disabled={isAttackingValue || isGameOverValue}
            onClick={() => setIsInventoryOpen(true)}
            variant="outline-dark"
          >
            <IconImage Icon={IconInventory} />

            <ButtonBadge Icon={IconEncumbrance} isShowing={isInventoryFullValue} />

            <ConsumableAcquisition />
          </Button>
        </span>
      </OverlayTrigger>

      <DismissableScreen
        isShowing={isInventoryOpenValue}
        onClose={() => setIsInventoryOpen(false)}
        title="Inventory"
      >
        <Inventory />
      </DismissableScreen>
    </>
  );
}

import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { ButtonBadge } from "@neverquest/components/Controls/ButtonBadge";
import { ItemAcquisition } from "@neverquest/components/Controls/ItemAcquisition";
import { DismissableScreen } from "@neverquest/components/DismissableScreen";
import { IconImage } from "@neverquest/components/IconImage";
import { Inventory } from "@neverquest/components/Items";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { ReactComponent as IconInventory } from "@neverquest/icons/knapsack.svg";
import { isAttacking, isGameOver } from "@neverquest/state/character";
import {
  hasKnapsack,
  isInventoryFull,
  isInventoryOpen,
  notifyOverEncumbrance,
} from "@neverquest/state/inventory";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function InventoryButton() {
  const [isInventoryOpenValue, setIsInventoryOpen] = useRecoilState(isInventoryOpen);
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isGameOverValue = useRecoilValue(isGameOver);
  const isInventoryFullValue = useRecoilValue(isInventoryFull);
  const notifyOverEncumbranceValue = useRecoilValue(notifyOverEncumbrance);
  const resetNotifyEncumbranceValue = useResetRecoilState(notifyOverEncumbrance);

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

            <ButtonBadge
              animation={notifyOverEncumbranceValue ? "headShake" : undefined}
              Icon={IconEncumbrance}
              isShowing={isInventoryFullValue || notifyOverEncumbranceValue}
              onAnimationEnd={resetNotifyEncumbranceValue}
            />

            <ItemAcquisition />
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

import { useEffect, useRef } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { ButtonBadge } from "@neverquest/components/Controls/ButtonBadge";
import { ItemAcquisition } from "@neverquest/components/Controls/ItemAcquisition";
import { DismissableScreen } from "@neverquest/components/DismissableScreen";
import { IconImage } from "@neverquest/components/IconImage";
import { Inventory } from "@neverquest/components/Inventory";
import IconEncumbrance from "@neverquest/icons/encumbrance.svg?react";
import IconInventory from "@neverquest/icons/knapsack.svg?react";
import { isAttacking, isGameOver } from "@neverquest/state/character";
import {
  hasKnapsack,
  isInventoryFull,
  isInventoryOpen,
  notifyOverEncumbrance,
} from "@neverquest/state/inventory";
import { getAnimationClass } from "@neverquest/utilities/getters";
import { animateElement } from "@neverquest/utilities/helpers";

export function InventoryButton() {
  const [isInventoryOpenValue, setIsInventoryOpen] = useRecoilState(isInventoryOpen);
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isGameOverValue = useRecoilValue(isGameOver);
  const isInventoryFullValue = useRecoilValue(isInventoryFull);
  const notifyOverEncumbranceValue = useRecoilValue(notifyOverEncumbrance);
  const resetNotifyEncumbranceValue = useResetRecoilState(notifyOverEncumbrance);

  const badgeElement = useRef(null);

  useEffect(() => {
    const { current } = badgeElement;

    animateElement({
      element: current,
      name: "headShake",
      onEnd: resetNotifyEncumbranceValue,
    });
  }, [badgeElement, resetNotifyEncumbranceValue]);

  if (!hasKnapsackValue) {
    return null;
  }

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Inventory</Tooltip>}>
        <span className={getAnimationClass({ name: "bounceIn" })}>
          <Button
            disabled={isAttackingValue || isGameOverValue}
            onClick={() => setIsInventoryOpen(true)}
            variant="outline-dark"
          >
            <IconImage Icon={IconInventory} />

            <span ref={badgeElement}>
              <ButtonBadge
                Icon={IconEncumbrance}
                isShowing={isInventoryFullValue || notifyOverEncumbranceValue}
              />
            </span>

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

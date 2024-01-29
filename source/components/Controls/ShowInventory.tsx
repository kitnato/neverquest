import { useEffect, useRef } from "react";
import { Badge, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { ItemAcquisition } from "@neverquest/components/Controls/ItemAcquisition";
import { DismissableScreen } from "@neverquest/components/DismissableScreen";
import { IconImage } from "@neverquest/components/IconImage";
import { Inventory } from "@neverquest/components/Inventory";
import IconEncumbrance from "@neverquest/icons/encumbrance.svg?react";
import IconInventory from "@neverquest/icons/knapsack.svg?react";
import { hasFlatlined, isAttacking } from "@neverquest/state/character";
import { encumbranceExtent, notifyOverEncumbrance, ownedItem } from "@neverquest/state/inventory";
import { activeControl } from "@neverquest/state/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";
import { animateElement } from "@neverquest/utilities/helpers";

export function ShowInventory() {
  const [activeControlValue, setActiveControl] = useRecoilState(activeControl);
  const encumbranceExtentValue = useRecoilValue(encumbranceExtent);
  const isAttackingValue = useRecoilValue(isAttacking);
  const hasFlatlinedValue = useRecoilValue(hasFlatlined);
  const notifyOverEncumbranceValue = useRecoilValue(notifyOverEncumbrance);
  const ownedItemKnapsack = useRecoilValue(ownedItem("knapsack"));
  const resetActiveControl = useResetRecoilState(activeControl);
  const resetNotifyEncumbranceValue = useResetRecoilState(notifyOverEncumbrance);

  const badgeElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { current } = badgeElement;

    if (current !== null && notifyOverEncumbranceValue) {
      animateElement({
        animation: "heartBeat",
        element: current,
        onAnimationEnd: resetNotifyEncumbranceValue,
      });
    }
  }, [notifyOverEncumbranceValue, resetNotifyEncumbranceValue]);

  if (ownedItemKnapsack !== undefined) {
    return (
      <>
        <OverlayTrigger
          overlay={
            <Tooltip>
              <span>Inventory</span>
            </Tooltip>
          }
        >
          <div className={getAnimationClass({ animation: "bounceIn" })}>
            <Button
              disabled={isAttackingValue || hasFlatlinedValue}
              onClick={() => {
                setActiveControl("inventory");
              }}
              variant="outline-dark"
            >
              <IconImage Icon={IconInventory} />

              {(encumbranceExtentValue !== undefined || notifyOverEncumbranceValue) && (
                <div className="position-absolute top-50 start-100 translate-middle">
                  <Badge bg="secondary" ref={badgeElement}>
                    <IconImage className="small" Icon={IconEncumbrance} />
                  </Badge>
                </div>
              )}

              <ItemAcquisition />
            </Button>
          </div>
        </OverlayTrigger>

        <DismissableScreen
          isShowing={activeControlValue === "inventory"}
          onClose={resetActiveControl}
          title="Inventory"
        >
          <Inventory />
        </DismissableScreen>
      </>
    );
  }
}

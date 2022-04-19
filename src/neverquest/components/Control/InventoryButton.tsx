import { useState } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useRecoilValue } from "recoil";

import DismissableScreen from "neverquest/components/DismissableScreen";
import ImageIcon from "neverquest/components/ImageIcon";
import Inventory from "neverquest/components/Inventory";
import { UIVariant } from "neverquest/env.d";
import icon from "neverquest/icons/knapsack.svg";
import { isAttacking } from "neverquest/state/character";
import { showInventoryButton } from "neverquest/state/show";

export default function InventoryButton() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const showInventoryButtonValue = useRecoilValue(showInventoryButton);
  const [isScreenShowing, setScreenShowing] = useState(false);

  if (!showInventoryButtonValue) {
    return null;
  }

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Inventory</Tooltip>} placement="top">
        <span className="d-inline-block">
          <Button
            disabled={isAttackingValue}
            onClick={() => setScreenShowing(true)}
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

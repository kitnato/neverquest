import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useRecoilValue } from "recoil";

import { UIVariant } from "neverquest/env.d";
import { isAttacking } from "neverquest/state/character";
import { show } from "neverquest/state/global";

// TODO
export default function InventoryButton() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const showValue = useRecoilValue(show);
  const [isInventoryOpen, setInventoryOpen] = useState(false);

  if (!showValue.inventoryButton) {
    return null;
  }

  return (
    <div className="d-grid">
      <Button
        disabled={isInventoryOpen || isAttackingValue}
        onClick={() => setInventoryOpen(!isInventoryOpen)}
        variant={UIVariant.Outline}
      >
        Inventory
      </Button>
    </div>
  );
}

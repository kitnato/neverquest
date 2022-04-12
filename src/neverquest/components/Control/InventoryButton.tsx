import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useRecoilValue } from "recoil";

import { UIVariant } from "neverquest/env.d";
import { isAttacking } from "neverquest/state/character";
import { showInventoryButton } from "neverquest/state/show";

// TODO
export default function InventoryButton() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const showInventoryButtonValue = useRecoilValue(showInventoryButton);
  const [isInventoryOpen, setInventoryOpen] = useState(false);

  if (!showInventoryButtonValue) {
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

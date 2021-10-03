import { useState } from "react";
import { useRecoilValue } from "recoil";

import Button from "react-bootstrap/Button";
import { isAttacking } from "state/character";
import { show } from "state/global";

// TODO
export default function InventoryButton() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const showValue = useRecoilValue(show);
  const [isInventoryOpen, setInventoryOpen] = useState(false);

  if (!showValue.inventoryButton) {
    return null;
  }

  return (
    <Button
      block
      disabled={isInventoryOpen || isAttackingValue}
      onClick={() => setInventoryOpen(!isInventoryOpen)}
      variant="outline-dark"
    >
      Inventory
    </Button>
  );
}

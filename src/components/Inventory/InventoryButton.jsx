import { useState } from "react";
import { useRecoilValue } from "recoil";

import Button from "react-bootstrap/Button";
import { show } from "state/global";

// TODO
export default function InventoryButton() {
  const [isInventoryOpen, setInventoryOpen] = useState(false);
  const showValue = useRecoilValue(show);

  return (
    showValue.inventory && (
      <Button
        block
        disabled={isInventoryOpen}
        onClick={() => setInventoryOpen(!isInventoryOpen)}
        variant="outline-dark"
      >
        Inventory
      </Button>
    )
  );
}

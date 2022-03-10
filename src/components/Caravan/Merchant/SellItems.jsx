import { useRecoilValue } from "recoil";

import { isThereInventory } from "state/equipment";

// TODO
export default function SellItems() {
  const isThereInventoryValue = useRecoilValue(isThereInventory);

  if (!isThereInventoryValue) {
    return null;
  }

  return (
    <div>
      <h6>Sell items</h6>
    </div>
  );
}

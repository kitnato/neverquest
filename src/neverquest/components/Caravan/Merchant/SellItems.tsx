import { useRecoilValue } from "recoil";

import { isCarryingItems } from "neverquest/state/equipment";

// TODO
export default function SellItems() {
  const isCarryingItemsValue = useRecoilValue(isCarryingItems);

  if (!isCarryingItemsValue) {
    return null;
  }

  return (
    <div>
      <h6>Sell items</h6>
    </div>
  );
}

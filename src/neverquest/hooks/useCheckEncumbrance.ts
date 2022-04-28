import { useRecoilValue } from "recoil";

import { encumbrance, inventorySize } from "neverquest/state/inventory";

export default function useCheckEncumbrance() {
  const encumbranceValue = useRecoilValue(encumbrance);
  const inventorySizeValue = useRecoilValue(inventorySize);

  return ({ weight }: { weight: number }) => {
    if (encumbranceValue + weight > inventorySizeValue) {
      return false;
    }

    return true;
  };
}

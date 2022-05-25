import { useAtomValue } from "jotai";

import { encumbrance, inventorySize } from "neverquest/state/inventory";

export default function useCheckEncumbrance() {
  const encumbranceValue = useAtomValue(encumbrance);
  const inventorySizeValue = useAtomValue(inventorySize);

  return ({ weight }: { weight: number }) => {
    if (encumbranceValue + weight > inventorySizeValue) {
      return false;
    }

    return true;
  };
}

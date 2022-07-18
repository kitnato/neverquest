import { useAtomValue } from "jotai";

import { encumbrance, encumbranceMaximum } from "@neverquest/state/inventory";

export default function useCheckEncumbrance() {
  const encumbranceValue = useAtomValue(encumbrance);
  const encumbranceMaximumValue = useAtomValue(encumbranceMaximum);

  return ({ weight }: { weight: number }) => {
    if (encumbranceValue + weight > encumbranceMaximumValue) {
      return false;
    }

    return true;
  };
}

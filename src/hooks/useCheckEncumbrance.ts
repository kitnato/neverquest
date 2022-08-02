import { useRecoilValue } from "recoil";

import { encumbrance, encumbranceMaximum } from "@neverquest/state/inventory";

export default function useCheckEncumbrance() {
  const encumbranceValue = useRecoilValue(encumbrance);
  const encumbranceMaximumValue = useRecoilValue(encumbranceMaximum);

  return ({ weight }: { weight: number }) => encumbranceValue + weight <= encumbranceMaximumValue;
}

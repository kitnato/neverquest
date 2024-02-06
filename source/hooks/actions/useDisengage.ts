import { useRecoilCallback } from "recoil";

import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta";
import { useToggleAttacking } from "@neverquest/hooks/actions/useToggleAttacking";
import { hasFlatlined, isAttacking } from "@neverquest/state/character";
import { ownedItem } from "@neverquest/state/inventory";
import { isHealthLow } from "@neverquest/state/reserves";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useDisengage() {
  const addDelta = useAddDelta();
  const toggleAttacking = useToggleAttacking();

  return useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (
          get(isAttacking) &&
          get(isHealthLow) &&
          !get(hasFlatlined) &&
          get(ownedItem("dream catcher")) !== undefined
        ) {
          toggleAttacking();

          addDelta({
            contents: {
              color: "text-muted",
              value: "CAUGHT",
            },
            delta: "health",
          });
        }
      },
    [addDelta, toggleAttacking],
  );
}

import { useRecoilCallback } from "recoil";

import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { attributeCost, attributes } from "@neverquest/state/attributes";
import { characterLevel } from "@neverquest/state/character";
import { AttributeType } from "@neverquest/types/enums";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useIncreaseAttribute() {
  const transactResources = useTransactResources();

  return useRecoilCallback(({ set, snapshot }) => (type: AttributeType) => {
    const get = getSnapshotGetter(snapshot);

    const attributeCostValue = get(attributeCost);

    set(attributes(type), (current) => ({
      ...current,
      points: current.points + 1,
    }));

    transactResources({
      essenceDifference: -attributeCostValue,
    });

    set(characterLevel, (current) => current + 1);
  });
}

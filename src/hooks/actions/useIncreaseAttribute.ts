import { useRecoilCallback } from "recoil";

import useTransactResources from "@neverquest/hooks/actions/useTransactResources";
import { attributeCost, attributes } from "@neverquest/state/attributes";
import { characterLevel } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { AttributeType, DeltaType } from "@neverquest/types/enums";
import { FloatingText } from "@neverquest/types/ui";
import { getSnapshotGetter } from "@neverquest/utilities/helpers";

export default function () {
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
    set(deltas(DeltaType.EssenceAbsorbed), {
      color: FloatingText.Positive,
      value: `+${attributeCostValue}`,
    });

    set(characterLevel, (current) => current + 1);
    set(deltas(DeltaType.CharacterLevel), {
      color: FloatingText.Positive,
      value: "+1",
    });
  });
}

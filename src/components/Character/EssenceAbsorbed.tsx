import { useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/abstract-013.svg";
import { essenceAbsorbed } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { DeltaType } from "@neverquest/types/enums";

export default function () {
  const essenceAbsorbedValue = useRecoilValue(essenceAbsorbed);

  const deltaEssenceAbsorbed = deltas(DeltaType.EssenceAbsorbed);

  useDeltaText({
    atomDelta: deltaEssenceAbsorbed,
    atomValue: essenceAbsorbed,
  });

  return (
    <IconDisplay
      contents={
        <>
          <span>{essenceAbsorbedValue}</span>

          <FloatingText type={DeltaType.EssenceAbsorbed} />
        </>
      }
      Icon={Icon}
      tooltip="Absorbed essence"
    />
  );
}

import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconEssenceAbsorbed } from "@neverquest/icons/abstract-013.svg";
import { essenceAbsorbed } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { DeltaType } from "@neverquest/types/enums";

export function EssenceAbsorbed() {
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
      Icon={IconEssenceAbsorbed}
      tooltip="Absorbed essence"
    />
  );
}

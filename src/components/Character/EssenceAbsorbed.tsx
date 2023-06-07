import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconEssenceAbsorbed } from "@neverquest/icons/essence-absorbed.svg";
import { essenceAbsorbed } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";

export function EssenceAbsorbed() {
  const essenceAbsorbedValue = useRecoilValue(essenceAbsorbed);

  useDeltaText({
    atomDelta: deltas("essenceAbsorbed"),
    atomValue: essenceAbsorbed,
  });

  return (
    <IconDisplay
      contents={
        <>
          <span>{essenceAbsorbedValue}</span>

          <FloatingText deltaType="essenceAbsorbed" />
        </>
      }
      Icon={IconEssenceAbsorbed}
      tooltip="Absorbed essence"
    />
  );
}

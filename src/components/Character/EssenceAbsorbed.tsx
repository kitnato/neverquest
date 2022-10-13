import { useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/abstract-013.svg";
import { essenceAbsorbed } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { DeltaType } from "@neverquest/types/enums";

export default function () {
  const essenceAbsorbedValue = useRecoilValue(essenceAbsorbed);

  return (
    <IconDisplay
      contents={
        <>
          <span>{essenceAbsorbedValue}</span>

          <FloatingText atom={deltas(DeltaType.EssenceAbsorbed)} />
        </>
      }
      Icon={Icon}
      tooltip="Absorbed essence"
    />
  );
}

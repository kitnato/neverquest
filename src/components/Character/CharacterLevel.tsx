import { useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/level-four.svg";
import { characterLevel } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { DeltaType } from "@neverquest/types/enums";

export default function () {
  const characterLevelValue = useRecoilValue(characterLevel);

  return (
    <IconDisplay
      Icon={Icon}
      contents={
        <>
          <span>{characterLevelValue}</span>

          <FloatingText atom={deltas(DeltaType.CharacterLevel)} />
        </>
      }
      tooltip="Power level"
    />
  );
}

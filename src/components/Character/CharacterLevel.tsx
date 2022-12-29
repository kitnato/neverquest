import { useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/level-four.svg";
import { characterLevel } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { DeltaType } from "@neverquest/types/enums";

export default function () {
  const characterLevelValue = useRecoilValue(characterLevel);

  const deltaCharacterLevel = deltas(DeltaType.CharacterLevel);

  useDeltaText({
    deltaAtom: deltaCharacterLevel,
    valueAtom: characterLevel,
  });

  return (
    <IconDisplay
      contents={
        <>
          <span>{characterLevelValue}</span>

          <FloatingText atom={deltaCharacterLevel} />
        </>
      }
      Icon={Icon}
      tooltip="Power level"
    />
  );
}

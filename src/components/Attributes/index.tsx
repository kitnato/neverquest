import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { AttributesList } from "@neverquest/components/Attributes/AttributesList";
import { CharacterLevel } from "@neverquest/components/Character/CharacterLevel";
import { EssenceAbsorbed } from "@neverquest/components/Character/EssenceAbsorbed";
import { isLevelCompleted, isLevelStarted } from "@neverquest/state/encounter";

export function Attributes() {
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const isLevelStartedValue = useRecoilValue(isLevelStarted);

  return (
    <Stack gap={5}>
      <Stack className="position-sticky" direction="horizontal" gap={3}>
        <CharacterLevel />

        <EssenceAbsorbed />

        {isLevelStartedValue && !isLevelCompletedValue && (
          <span>Cannot increase attributes while monsters are lurking!</span>
        )}
      </Stack>

      <AttributesList />
    </Stack>
  );
}

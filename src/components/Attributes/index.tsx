import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { AttributePoints } from "./AttributePoints";
import { AttributesList } from "@neverquest/components/Attributes/AttributesList";
import { CharacterLevel } from "@neverquest/components/Character/CharacterLevel";
import { EssenceAbsorbed } from "@neverquest/components/Character/EssenceAbsorbed";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/constants";
import { isLevelCompleted, isLevelStarted } from "@neverquest/state/encounter";

export function Attributes() {
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const isLevelStartedValue = useRecoilValue(isLevelStarted);

  return (
    <Stack gap={5}>
      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <Stack className="position-sticky" direction="horizontal" gap={3}>
          <CharacterLevel />

          <EssenceAbsorbed />

          {isLevelStartedValue && !isLevelCompletedValue && (
            <span>Cannot increase attributes while monsters are lurking!</span>
          )}
        </Stack>

        <AttributePoints />
      </div>

      <AttributesList />
    </Stack>
  );
}

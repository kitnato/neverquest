import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { AttributePoints } from "@neverquest/components/Attributes/AttributePoints";
import { AttributesList } from "@neverquest/components/Attributes/AttributesList";
import { EssenceAbsorbed } from "@neverquest/components/Character/EssenceAbsorbed";
import { PowerLevel } from "@neverquest/components/Character/PowerLevel";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/constants";
import { isLevelCompleted, isLevelStarted } from "@neverquest/state/encounter";

export function Attributes() {
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const isLevelStartedValue = useRecoilValue(isLevelStarted);

  return (
    <Stack gap={5}>
      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <Stack className="position-sticky" direction="horizontal" gap={3}>
          <PowerLevel />

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

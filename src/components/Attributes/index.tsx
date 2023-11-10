import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { AttributeDisplay } from "@neverquest/components/Attributes/AttributeDisplay";
import { AttributePointProgress } from "@neverquest/components/Attributes/AttributePointProgress";
import { AttributePoints } from "@neverquest/components/Attributes/AttributePoints";
import { Level } from "@neverquest/components/Status/Level";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general";
import { showEssenceRequired } from "@neverquest/state/settings";
import { ATTRIBUTE_TYPES } from "@neverquest/types/unions";

export function Attributes() {
  const showEssenceRequiredValue = useRecoilValue(showEssenceRequired);

  return (
    <Stack gap={5}>
      {showEssenceRequiredValue ? (
        <Stack direction="horizontal" gap={5}>
          <Level />

          <AttributePointProgress />

          <AttributePoints />
        </Stack>
      ) : (
        <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
          <Level />

          <AttributePoints />
        </div>
      )}

      <Stack gap={3}>
        {ATTRIBUTE_TYPES.map((current, index) => (
          <AttributeDisplay attribute={current} key={index} />
        ))}
      </Stack>
    </Stack>
  );
}

import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { AttributeDisplay } from "@neverquest/components/Attributes/AttributeDisplay";
import { AttributePointProgress } from "@neverquest/components/Attributes/AttributePointProgress";
import { AttributePoints } from "@neverquest/components/Attributes/AttributePoints";
import { Level } from "@neverquest/components/Status/Level";
import { ATTRIBUTES_ORDER } from "@neverquest/data/attributes";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general";
import { showEssenceRequired } from "@neverquest/state/settings";

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
        {ATTRIBUTES_ORDER.map((current, index) => (
          <AttributeDisplay attribute={current} key={index} />
        ))}
      </Stack>
    </Stack>
  );
}

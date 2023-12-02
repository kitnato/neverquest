import { Stack } from "react-bootstrap";

import { AttributeDisplay } from "@neverquest/components/Attributes/AttributeDisplay";
import { AttributePointProgress } from "@neverquest/components/Attributes/AttributePointProgress";
import { AttributePoints } from "@neverquest/components/Attributes/AttributePoints";
import { Level } from "@neverquest/components/Status/Level";
import { ATTRIBUTE_TYPES } from "@neverquest/types/unions";

export function Attributes() {
  return (
    <Stack gap={5}>
      <Stack direction="horizontal" gap={5}>
        <Level />

        <AttributePointProgress />

        <AttributePoints />
      </Stack>

      <Stack gap={3}>
        {ATTRIBUTE_TYPES.map((current, index) => (
          <AttributeDisplay attribute={current} key={index} />
        ))}
      </Stack>
    </Stack>
  );
}

import { Stack } from "react-bootstrap";

import { AttributeDisplay } from "@neverquest/components/Attributes/AttributeDisplay";
import { AttributePointProgress } from "@neverquest/components/Attributes/AttributePointProgress";
import { AttributePoints } from "@neverquest/components/Attributes/AttributePoints";
import { PowerLevel } from "@neverquest/components/Status/PowerLevel";
import { ATTRIBUTE_TYPES } from "@neverquest/types/unions";

export function Attributes() {
  return (
    <Stack gap={5}>
      <Stack direction="horizontal" gap={5}>
        <PowerLevel />

        <AttributePointProgress />

        <AttributePoints />
      </Stack>

      <Stack gap={3}>
        {ATTRIBUTE_TYPES.map((attribute, index) => (
          <AttributeDisplay attribute={attribute} key={index} />
        ))}
      </Stack>
    </Stack>
  );
}

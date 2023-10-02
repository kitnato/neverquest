import { Stack } from "react-bootstrap";

import { AttributePointProgress } from "@neverquest/components/Attributes/AttributePointProgress";
import { AttributePoints } from "@neverquest/components/Attributes/AttributePoints";
import { AttributesList } from "@neverquest/components/Attributes/AttributesList";
import { Level } from "@neverquest/components/Status/Level";

export function Attributes() {
  return (
    <Stack gap={5}>
      <Stack direction="horizontal" gap={5}>
        <Level />

        <AttributePointProgress />

        <AttributePoints />
      </Stack>

      <AttributesList />
    </Stack>
  );
}

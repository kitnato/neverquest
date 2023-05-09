import { Stack } from "react-bootstrap";

import { AttributePoints } from "@neverquest/components/Attributes/AttributePoints";
import { AttributesList } from "@neverquest/components/Attributes/AttributesList";
import { EssenceAbsorbed } from "@neverquest/components/Character/EssenceAbsorbed";
import { PowerLevel } from "@neverquest/components/Character/PowerLevel";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/constants";

export function Attributes() {
  return (
    <Stack gap={5}>
      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <Stack className="position-sticky" direction="horizontal" gap={3}>
          <PowerLevel />

          <EssenceAbsorbed />
        </Stack>

        <AttributePoints />
      </div>

      <AttributesList />
    </Stack>
  );
}

import { Stack } from "react-bootstrap";

import { AttributePoints } from "@neverquest/components/Attributes/AttributePoints";
import { AttributesList } from "@neverquest/components/Attributes/AttributesList";
import { EssenceAbsorbed } from "@neverquest/components/Character/EssenceAbsorbed";
import { Level } from "@neverquest/components/Character/Level";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";

export function Attributes() {
  return (
    <Stack gap={5}>
      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <Stack className="position-sticky" direction="horizontal" gap={3}>
          <Level />

          <EssenceAbsorbed />
        </Stack>

        <AttributePoints />
      </div>

      <AttributesList />
    </Stack>
  );
}

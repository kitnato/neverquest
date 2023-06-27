import { Stack } from "react-bootstrap";

import { AttributePoints } from "@neverquest/components/Attributes/AttributePoints";
import { AttributesList } from "@neverquest/components/Attributes/AttributesList";
import { EssenceAbsorbed } from "@neverquest/components/Attributes/EssenceAbsorbed";
import { Level } from "@neverquest/components/Status/Level";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";

export function Attributes() {
  return (
    <Stack gap={5}>
      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <Level />

        <EssenceAbsorbed />

        <AttributePoints />
      </div>

      <AttributesList />
    </Stack>
  );
}

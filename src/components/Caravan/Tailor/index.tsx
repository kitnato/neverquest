import { Stack } from "react-bootstrap";

import { ExpandInventory } from "@neverquest/components/Caravan/Tailor/ExpandInventory";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconTailoring } from "@neverquest/icons/tailoring.svg";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";

export function Tailor() {
  return (
    <Stack gap={3}>
      <h6>Expand inventory</h6>

      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <IconDisplay
          contents="Sow pockets"
          description="Increase maximum encumbrance"
          Icon={IconTailoring}
          tooltip="Tailoring"
        />

        <ExpandInventory />
      </div>
    </Stack>
  );
}

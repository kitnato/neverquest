import { Stack } from "react-bootstrap";

import { ExpandInventory } from "@neverquest/components/Caravan/Tailor/ExpandInventory";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Encumbrance } from "@neverquest/components/Items/Encumbrance";
import { ReactComponent as IconTailoring } from "@neverquest/icons/tailoring.svg";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";

export function Tailor() {
  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <h6>Current knapsack</h6>

        <Encumbrance />
      </Stack>

      <Stack gap={3}>
        <h6>Expand knapsack</h6>

        <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
          <IconDisplay
            contents="Sow pockets"
            description="Increases maximum encumbrance by 3."
            Icon={IconTailoring}
            tooltip="Tailoring"
          />

          <ExpandInventory />
        </div>
      </Stack>
    </Stack>
  );
}

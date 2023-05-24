import { ExpandInventory } from "@neverquest/components/Caravan/Tailor/ExpandInventory";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/constants";
import { ReactComponent as IconTailoring } from "@neverquest/icons/tailoring.svg";

export function Tailor() {
  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <IconDisplay
        contents="Adds extra pockets to the knapsack to expand maximum encumbrance by 1."
        Icon={IconTailoring}
        tooltip="Expand inventory"
      />

      <ExpandInventory />
    </div>
  );
}

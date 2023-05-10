import { ExpandInventory } from "@neverquest/components/Caravan/Tailor/ExpandInventory";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/constants";
import { TRINKET_ICONS, TRINKET_KNAPSACK } from "@neverquest/data/trinkets";

export function Tailor() {
  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <IconDisplay
        contents="Adds extra pockets to expand maximum encumbrance by 1."
        // TODO - add icon inset "+"
        Icon={TRINKET_ICONS[TRINKET_KNAPSACK.name]}
        tooltip="Expand inventory"
      />

      <ExpandInventory />
    </div>
  );
}

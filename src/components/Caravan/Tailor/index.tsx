import { ExpandInventory } from "./ExpandInventory";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/constants";
import { TRINKET_KNAPSACK } from "@neverquest/data/trinkets";

// TODO - add icon inset "+"
export function Tailor() {
  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <IconDisplay
        contents="Adds extra pockets to expand maximum encumbrance by 1."
        Icon={TRINKET_KNAPSACK.Icon}
        tooltip="Expand inventory"
      />

      <ExpandInventory />
    </div>
  );
}

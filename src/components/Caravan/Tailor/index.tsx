import { ExpandInventory } from "@neverquest/components/Caravan/Tailor/ExpandInventory";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconTailoring } from "@neverquest/icons/tailoring.svg";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";

export function Tailor() {
  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <IconDisplay
        contents="Increase maximum encumbrance"
        Icon={IconTailoring}
        tooltip="Expand inventory"
      />

      <ExpandInventory />
    </div>
  );
}

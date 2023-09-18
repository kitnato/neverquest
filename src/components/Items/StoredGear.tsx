import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { inventory } from "@neverquest/state/inventory";
import { skills } from "@neverquest/state/skills";
import type { GearItem } from "@neverquest/types";
import { isArmor, isGear, isRanged, isShield, isWeapon } from "@neverquest/types/type-guards";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";

export function StoredGear() {
  const inventoryValue = useRecoilValue(inventory);
  const archeryValue = useRecoilValue(skills("archery"));
  const armorcraftValue = useRecoilValue(skills("armorcraft"));
  const siegecraftValue = useRecoilValue(skills("siegecraft"));
  const shieldcraftValue = useRecoilValue(skills("shieldcraft"));

  const toggleEquipGear = useToggleEquipGear();

  const canEquip = (gear: GearItem) => {
    if (isArmor(gear) && gear.gearClass === "plate") {
      return armorcraftValue;
    }

    if (isRanged(gear)) {
      return archeryValue;
    }

    if (isShield(gear) && gear.gearClass === "tower") {
      return shieldcraftValue;
    }

    if (isWeapon(gear) && gear.grip === "two-handed") {
      return siegecraftValue;
    }

    return true;
  };

  return inventoryValue
    .filter((item) => !isGear(item) || (isGear(item) && !item.isEquipped))
    .filter(isGear)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((current) => {
      const canEquipGear = canEquip(current);

      return (
        <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={current.id}>
          <ItemDisplay item={current} />

          <OverlayTrigger
            overlay={<Tooltip>Skill required!</Tooltip>}
            trigger={canEquipGear ? [] : ["hover", "focus"]}
          >
            <span>
              <Button
                disabled={!canEquipGear}
                onClick={() => toggleEquipGear(current)}
                variant="outline-dark"
              >
                Equip
              </Button>
            </span>
          </OverlayTrigger>
        </div>
      );
    });
}

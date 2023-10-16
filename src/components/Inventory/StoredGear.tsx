import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { equippableItems, inventory } from "@neverquest/state/inventory";
import { isGear } from "@neverquest/types/type-guards";

export function StoredGear() {
  const equippableItemsValue = useRecoilValue(equippableItems);
  const inventoryValue = useRecoilValue(inventory);

  const toggleEquipGear = useToggleEquipGear();

  return inventoryValue
    .filter((current) => isGear(current) && !current.isEquipped)
    .filter(isGear)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((current) => {
      const { id } = current;
      const canEquipGear = equippableItemsValue[id];

      return (
        <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
          <ItemDisplay item={current} overlayPlacement="right" />

          <OverlayTrigger
            overlay={<Tooltip>Skill required.</Tooltip>}
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

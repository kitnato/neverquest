import { Button, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import Encumbrance from "@neverquest/components/Inventory/Encumbrance";
import InventoryElement from "@neverquest/components/Inventory/InventoryElement";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/constants";
import useToggleEquipGear from "@neverquest/hooks/actions/useToggleEquipGear";
import { inventory } from "@neverquest/state/inventory";
import { isGear, isItem } from "@neverquest/types/type-guards";
import { UIVariant } from "@neverquest/types/ui";
import { getItemFunctionComponents } from "@neverquest/utilities/helpers";

export default function () {
  const inventoryValue = useRecoilValue(inventory);

  const toggleEquipGear = useToggleEquipGear();

  const equippedInventoryIDs = Object.getOwnPropertyNames(inventoryValue).filter(
    (id) => inventoryValue[id].isEquipped
  );
  const storedInventoryValueIDs = Object.getOwnPropertyNames(inventoryValue).filter(
    (id) => !inventoryValue[id].isEquipped
  );

  const handleToggleEquipGear = (id: string) => () => toggleEquipGear(id);

  return (
    <Stack gap={5}>
      <div className="position-sticky">
        <Encumbrance />
      </div>

      <Stack gap={3}>
        <h6>Equipped</h6>

        {equippedInventoryIDs.length === 0 && <span className="fst-italic">Nothing equipped.</span>}

        {equippedInventoryIDs.map((id) => {
          const { key, possession } = inventoryValue[id];

          return (
            <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={key}>
              <InventoryElement possession={possession} />

              <Button onClick={handleToggleEquipGear(id)} variant={UIVariant.Outline}>
                Unequip
              </Button>
            </div>
          );
        })}
      </Stack>

      <Stack gap={3}>
        <h6>Stored</h6>

        {storedInventoryValueIDs.length === 0 && (
          <span className="fst-italic">Nothing stored.</span>
        )}

        {storedInventoryValueIDs.map((id) => {
          const { key, possession } = inventoryValue[id];
          let PossessionAction;

          if (isGear(possession)) {
            PossessionAction = () => (
              <Button onClick={handleToggleEquipGear(id)} variant={UIVariant.Outline}>
                Equip
              </Button>
            );
          }

          if (isItem(possession)) {
            const { Action } = getItemFunctionComponents(possession);

            PossessionAction = Action;
          }

          return (
            <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={key}>
              <InventoryElement possession={possession} />

              {PossessionAction && <PossessionAction />}
            </div>
          );
        })}
      </Stack>
    </Stack>
  );
}

import type { FunctionComponent } from "react";
import { Button, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { UseBandages } from "@neverquest/components/Inventory/Consumable/UseBandages";
import { Encumbrance } from "@neverquest/components/Inventory/Encumbrance";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { UseCompass } from "@neverquest/components/Inventory/Trinket/UseCompass";
import { UseHearthstone } from "@neverquest/components/Inventory/Trinket/UseHearthstone";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/internal";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { equippedGearIDs, inventory } from "@neverquest/state/inventory";
import type { ConsumableName, TrinketName } from "@neverquest/types";
import { isGear } from "@neverquest/types/type-guards";

const ITEM_ACTIONS: Record<ConsumableName | TrinketName, FunctionComponent> = {
  Bandages: UseBandages,
  Compass: UseCompass,
  Elixir: () => null,
  Hearthstone: UseHearthstone,
  Knapsack: () => null,
  Salve: () => null,
};

export function Inventory() {
  const equippedGearIDValues = useRecoilValue(equippedGearIDs);
  const inventoryValue = useRecoilValue(inventory);

  const toggleEquipGear = useToggleEquipGear();

  const storedItemIDs = Object.getOwnPropertyNames(inventoryValue).filter(
    (id) => !equippedGearIDValues.includes(id)
  );

  return (
    <Stack gap={5}>
      <div className="position-sticky">
        <Encumbrance />
      </div>

      <Stack gap={3}>
        <h6>Equipped</h6>

        {equippedGearIDValues.length === 0 && <span className="fst-italic">Nothing equipped.</span>}

        {equippedGearIDValues.map((id) => {
          const item = inventoryValue[id];

          return (
            <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
              <ItemDisplay item={item} overlayPlacement="right" />

              <Button onClick={() => toggleEquipGear(id)} variant="outline-dark">
                Unequip
              </Button>
            </div>
          );
        })}
      </Stack>

      <Stack gap={3}>
        <h6>Stored</h6>

        {storedItemIDs.length === 0 && <span className="fst-italic">Nothing stored.</span>}

        {storedItemIDs.map((id) => {
          const item = inventoryValue[id];

          const ItemAction = isGear(item)
            ? () => (
                <Button onClick={() => toggleEquipGear(id)} variant="outline-dark">
                  Equip
                </Button>
              )
            : ITEM_ACTIONS[item.name];

          return (
            <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
              <ItemDisplay item={item} />

              <ItemAction />
            </div>
          );
        })}
      </Stack>
    </Stack>
  );
}

import type { FunctionComponent } from "react";
import { Button, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { CompassUseButton } from "./Trinket/CompassUseButton";
import { HearthstoneUseButton } from "./Trinket/HearthstoneUseButton";
import { Encumbrance } from "@neverquest/components/Inventory/Encumbrance";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/internal";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { equippedGearIDs, inventory } from "@neverquest/state/inventory";
import type { TrinketName } from "@neverquest/types";
import { isGear, isTrinket } from "@neverquest/types/type-guards";

const TRINKET_ACTIONS: Record<TrinketName, FunctionComponent> = {
  Compass: CompassUseButton,
  Hearthstone: HearthstoneUseButton,
  Knapsack: () => null,
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
          let ItemAction: FunctionComponent = () => null;

          if (isGear(item)) {
            const EquipButton = () => (
              <Button onClick={() => toggleEquipGear(id)} variant="outline-dark">
                Equip
              </Button>
            );

            ItemAction = EquipButton;
          }

          if (isTrinket(item)) {
            ItemAction = TRINKET_ACTIONS[item.name];
          }

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

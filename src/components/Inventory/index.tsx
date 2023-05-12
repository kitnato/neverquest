import type { FunctionComponent } from "react";
import { Button, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Encumbrance } from "@neverquest/components/Inventory/Encumbrance";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { CompassUseButton } from "@neverquest/components/Inventory/Trinket/CompassUseButton";
import { HearthstoneUseButton } from "@neverquest/components/Inventory/Trinket/HearthstoneUseButton";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/constants";
import { TRINKET_COMPASS, TRINKET_HEARTHSTONE } from "@neverquest/data/trinkets";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { equippedGearIDs, inventory } from "@neverquest/state/inventory";
import { isGear, isTrinket } from "@neverquest/types/type-guards";

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
              <ItemDisplay item={item} />

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
          let PossessionAction: FunctionComponent = () => null;

          if (isGear(item)) {
            const EquipButton = () => (
              <Button onClick={() => toggleEquipGear(id)} variant="outline-dark">
                Equip
              </Button>
            );

            PossessionAction = EquipButton;
          }

          if (isTrinket(item)) {
            PossessionAction = (() => {
              switch (item.name) {
                case TRINKET_COMPASS.name: {
                  return CompassUseButton;
                }
                case TRINKET_HEARTHSTONE.name: {
                  return HearthstoneUseButton;
                }
                default: {
                  return () => null;
                }
              }
            })();
          }

          return (
            <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
              <ItemDisplay item={item} />

              <PossessionAction />
            </div>
          );
        })}
      </Stack>
    </Stack>
  );
}

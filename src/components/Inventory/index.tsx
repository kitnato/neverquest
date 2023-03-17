import { FunctionComponent } from "react";
import { Button, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Encumbrance } from "@neverquest/components/Inventory/Encumbrance";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { CompassUseButton } from "@neverquest/components/Inventory/Trinket/CompassUseButton";
import { HearthstoneUseButton } from "@neverquest/components/Inventory/Trinket/HearthstoneUseButton";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/constants";
import { TRINKET_COMPASS, TRINKET_HEARTHSTONE } from "@neverquest/data/trinkets";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { inventory } from "@neverquest/state/inventory";
import { isGear, isTrinket } from "@neverquest/types/type-guards";
import { UIVariant } from "@neverquest/types/ui";

export function Inventory() {
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
          const { item, key } = inventoryValue[id];

          return (
            <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={key}>
              <ItemDisplay item={item} />

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
          const { item, key } = inventoryValue[id];
          let PossessionAction: FunctionComponent = () => null;

          if (isGear(item)) {
            const EquipButton = () => (
              <Button onClick={handleToggleEquipGear(id)} variant={UIVariant.Outline}>
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
            <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={key}>
              <ItemDisplay item={item} />

              <PossessionAction />
            </div>
          );
        })}
      </Stack>
    </Stack>
  );
}

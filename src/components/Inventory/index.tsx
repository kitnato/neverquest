import { FunctionComponent } from "react";
import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import Encumbrance from "@neverquest/components/Inventory/Encumbrance";
import InventoryElement from "@neverquest/components/Inventory/InventoryElement";
import CompassUseButton from "@neverquest/components/Inventory/Item/CompassUseButton";
import HearthstoneUseButton from "@neverquest/components/Inventory/Item/HearthstoneUseButton";
import LodestoneUseButton from "@neverquest/components/Inventory/Item/LodestoneUseButton";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/constants";
import { ITEM_COMPASS, ITEM_HEARTHSTONE, ITEM_LODESTONE } from "@neverquest/data/items";
import useToggleEquipGear from "@neverquest/hooks/actions/useToggleEquipGear";
import { canEquipArmor, inventory } from "@neverquest/state/inventory";
import { isArmor, isGear, isItem } from "@neverquest/types/type-guards";
import { UIVariant } from "@neverquest/types/ui";

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
          let PossessionAction: FunctionComponent = () => null;

          if (isGear(possession)) {
            const cannotEquipArmor = isArmor(possession) && !canEquipArmor(possession.armorClass);

            PossessionAction = () => (
              <OverlayTrigger
                overlay={<Tooltip>Using this is a mystery.</Tooltip>}
                placement="top"
                trigger={cannotEquipArmor ? ["hover", "focus"] : []}
              >
                <span className="d-inline-block">
                  <Button
                    disabled={cannotEquipArmor}
                    onClick={handleToggleEquipGear(id)}
                    variant={UIVariant.Outline}
                  >
                    Equip
                  </Button>
                </span>
              </OverlayTrigger>
            );
          }

          if (isItem(possession)) {
            PossessionAction = (() => {
              switch (possession.name) {
                case ITEM_COMPASS.name: {
                  return CompassUseButton;
                }
                case ITEM_HEARTHSTONE.name: {
                  return HearthstoneUseButton;
                }
                case ITEM_LODESTONE.name: {
                  return LodestoneUseButton;
                }
                default: {
                  return () => null;
                }
              }
            })();
          }

          return (
            <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={key}>
              <InventoryElement possession={possession} />

              <PossessionAction />
            </div>
          );
        })}
      </Stack>
    </Stack>
  );
}

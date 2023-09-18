import { Button, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ApplyGem } from "@neverquest/components/Items/ApplyGem";
import { ConsumeAntidote } from "@neverquest/components/Items/Consumable/ConsumeAntidote";
import { ConsumeBandages } from "@neverquest/components/Items/Consumable/ConsumeBandages";
import { ConsumeElixir } from "@neverquest/components/Items/Consumable/ConsumeElixir";
import { ConsumeSalve } from "@neverquest/components/Items/Consumable/ConsumeSalve";
import { Encumbrance } from "@neverquest/components/Items/Encumbrance";
import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { StoredGear } from "@neverquest/components/Items/StoredGear";
import { Trinket } from "@neverquest/components/Items/Trinket";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { inventory } from "@neverquest/state/inventory";
import {
  isArmor,
  isConsumable,
  isGear,
  isGem,
  isShield,
  isTrinket,
  isWeapon,
} from "@neverquest/types/type-guards";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";
import { stackItems } from "@neverquest/utilities/helpers";

export function Inventory() {
  const inventoryValue = useRecoilValue(inventory);

  const toggleEquipGear = useToggleEquipGear();

  const equippedGear = inventoryValue.filter((item) => isGear(item) && item.isEquipped);
  const storedItems = inventoryValue.filter(
    (item) => !isGear(item) || (isGear(item) && !item.isEquipped),
  );

  return (
    <Stack gap={5}>
      <div className="position-sticky">
        <Encumbrance />
      </div>

      <Stack gap={3}>
        <h6>Equipped</h6>

        {equippedGear.length === 0 && <span className="fst-italic">Nothing equipped.</span>}

        {[equippedGear.find(isWeapon), equippedGear.find(isArmor), equippedGear.find(isShield)]
          .filter(isGear)
          .map((current) => {
            const { id } = current;

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
                <ItemDisplay item={current} overlayPlacement="right" />

                <Button onClick={() => toggleEquipGear(current)} variant="outline-dark">
                  Unequip
                </Button>
              </div>
            );
          })}
      </Stack>

      <Stack gap={3}>
        <h6>Stored</h6>

        {storedItems.length === 0 && <span className="fst-italic">Nothing stored.</span>}

        <StoredGear />

        {storedItems
          .filter(isTrinket)
          .sort((a, b) => a.type.localeCompare(b.type))
          .map((current) => (
            <Trinket item={current} key={current.id} />
          ))}

        {[
          ...stackItems(
            storedItems.filter(isConsumable).sort((a, b) => a.type.localeCompare(b.type)),
          ),
          ...stackItems(storedItems.filter(isGem).sort((a, b) => a.type.localeCompare(b.type))),
        ].map((current) => {
          const { item, stack } = current;
          const { id, type } = item;

          const action = (() => {
            if (isConsumable(item)) {
              switch (type) {
                case "antidote": {
                  return <ConsumeAntidote consumable={item} />;
                }
                case "bandages": {
                  return <ConsumeBandages consumable={item} />;
                }
                case "elixir": {
                  return <ConsumeElixir consumable={item} />;
                }
                case "salve": {
                  return <ConsumeSalve consumable={item} />;
                }
              }
            }

            if (isGem(item)) {
              return <ApplyGem gem={item} />;
            }

            return null;
          })();

          return (
            <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
              <ItemDisplay item={item} stack={stack} />

              {action}
            </div>
          );
        })}
      </Stack>
    </Stack>
  );
}

import { Button, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ApplyShard } from "@neverquest/components/Items/ApplyShard";
import { ConsumeAntidote } from "@neverquest/components/Items/Consumable/ConsumeAntidote";
import { ConsumeBandages } from "@neverquest/components/Items/Consumable/ConsumeBandages";
import { ConsumeElixir } from "@neverquest/components/Items/Consumable/ConsumeElixir";
import { ConsumeSalve } from "@neverquest/components/Items/Consumable/ConsumeSalve";
import { Encumbrance } from "@neverquest/components/Items/Encumbrance";
import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { ActivateCompass } from "@neverquest/components/Items/Trinket/ActivateCompass";
import { ActivateHearthstone } from "@neverquest/components/Items/Trinket/ActivateHearthstone";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { inventory } from "@neverquest/state/inventory";
import {
  isArmor,
  isConsumable,
  isGear,
  isShard,
  isShield,
  isStackable,
  isTrinket,
  isWeapon,
} from "@neverquest/types/type-guards";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";
import { stackItems } from "@neverquest/utilities/helpers";

export function Inventory() {
  const inventoryValue = useRecoilValue(inventory);

  const toggleEquipGear = useToggleEquipGear();

  const equippedGear = [...inventoryValue.filter((item) => isGear(item) && item.isEquipped)];
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
          .map((item) => {
            const { id } = item;

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
                <ItemDisplay item={item} overlayPlacement="right" />

                <Button onClick={() => toggleEquipGear(item)} variant="outline-dark">
                  Unequip
                </Button>
              </div>
            );
          })}
      </Stack>

      <Stack gap={3}>
        <h6>Stored</h6>

        {storedItems.length === 0 && <span className="fst-italic">Nothing stored.</span>}

        {storedItems
          .filter(isGear)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item) => (
            <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={item.id}>
              <ItemDisplay item={item} />

              <Button onClick={() => toggleEquipGear(item)} variant="outline-dark">
                Equip
              </Button>
            </div>
          ))}

        {[...storedItems.filter(isTrinket).sort((a, b) => a.type.localeCompare(b.type))].map(
          (item) => {
            const { id, type } = item;

            const action = (() => {
              switch (type) {
                case "compass": {
                  return <ActivateCompass />;
                }
                case "hearthstone": {
                  return <ActivateHearthstone />;
                }
              }

              return null;
            })();

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
                <ItemDisplay item={item} />

                {action}
              </div>
            );
          },
        )}
      </Stack>

      {[
        ...stackItems(
          storedItems.filter(isConsumable).sort((a, b) => a.type.localeCompare(b.type)),
        ),
        ...stackItems(storedItems.filter(isShard).sort((a, b) => a.type.localeCompare(b.type))),
      ].map((stackedItem) => {
        const { item, stack } = stackedItem;

        if (!isStackable(item)) {
          return null;
        }

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

          if (isShard(item)) {
            return <ApplyShard shard={item} />;
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
  );
}

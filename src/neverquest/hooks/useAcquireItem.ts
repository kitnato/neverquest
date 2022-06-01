import { useAtomValue, useSetAtom } from "jotai";
import { nanoid } from "nanoid";

import useCheckEncumbrance from "neverquest/hooks/useCheckEncumbrance";
import { hasKnapsack } from "neverquest/state/character";
import { armor, inventory, itemEquip, shield, trinket, weapon } from "neverquest/state/inventory";
import { autoEquip } from "neverquest/state/global";
import { Equipment, Item } from "neverquest/types/core";
import {
  ITEM_KNAPSACK,
  NO_ARMOR,
  NO_SHIELD,
  NO_TRINKET,
  NO_WEAPON,
} from "neverquest/utilities/constants";
import { isTrinket, isArmor, isShield, isWeapon } from "neverquest/utilities/type-guards";

export default function useAcquireItem() {
  const checkEncumbrance = useCheckEncumbrance();
  const armorValue = useAtomValue(armor);
  const autoEquipValue = useAtomValue(autoEquip);
  const shieldValue = useAtomValue(shield);
  const trinketValue = useAtomValue(trinket);
  const weaponValue = useAtomValue(weapon);
  const setHasKnapsack = useSetAtom(hasKnapsack);
  const setInventory = useSetAtom(inventory);
  const equipItem = useSetAtom(itemEquip);

  return ({ item }: { item: Equipment | Item }) => {
    if (!checkEncumbrance({ weight: item.weight })) {
      return false;
    }

    if (item.name === ITEM_KNAPSACK.name) {
      setHasKnapsack(true);
      return true;
    }

    const id = Symbol();
    const key = nanoid();

    setInventory((current) => ({
      ...current,
      [id]: { item, key },
    }));

    if (
      autoEquipValue &&
      ((armorValue === NO_ARMOR && isArmor(item)) ||
        (shieldValue === NO_SHIELD && isShield(item)) ||
        (weaponValue === NO_WEAPON && isWeapon(item)) ||
        (trinketValue === NO_TRINKET && isTrinket(item)))
    ) {
      equipItem(id);
    }

    return true;
  };
}

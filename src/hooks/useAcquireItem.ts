import { nanoid } from "nanoid";
import { useRecoilValue, useSetRecoilState } from "recoil";

import useCheckEncumbrance from "@neverquest/hooks/useCheckEncumbrance";
import { hasKnapsack } from "@neverquest/state/character";
import { autoEquip } from "@neverquest/state/global";
import {
  armor,
  encumbranceMaximum,
  inventory,
  itemEquip,
  shield,
  trinket,
  weapon,
} from "@neverquest/state/inventory";
import { Gear, Item } from "@neverquest/types";
import {
  ITEM_KNAPSACK,
  NO_ARMOR,
  NO_SHIELD,
  NO_TRINKET,
  NO_WEAPON,
} from "@neverquest/utilities/constants-gear";
import { isArmor, isItem, isShield, isTrinket, isWeapon } from "@neverquest/utilities/type-guards";

export default function useAcquireItem() {
  const armorValue = useRecoilValue(armor);
  const autoEquipValue = useRecoilValue(autoEquip);
  const shieldValue = useRecoilValue(shield);
  const trinketValue = useRecoilValue(trinket);
  const weaponValue = useRecoilValue(weapon);
  const setEncumbranceMaximum = useSetRecoilState(encumbranceMaximum);
  const setHasKnapsack = useSetRecoilState(hasKnapsack);
  const setInventory = useSetRecoilState(inventory);
  const equipItem = useSetRecoilState(itemEquip);

  const checkEncumbrance = useCheckEncumbrance();

  return ({ item }: { item: Gear | Item }) => {
    if (!checkEncumbrance({ weight: item.weight })) {
      return false;
    }

    if (item.name === ITEM_KNAPSACK.name) {
      setEncumbranceMaximum((current) => current + 1);
      setHasKnapsack(true);
    }

    if (isItem(item) && !item.isPortable) {
      return true;
    }

    const id = Symbol();
    const key = nanoid();

    setInventory((current) => ({
      ...current,
      [id]: { isEquipped: false, item, key },
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

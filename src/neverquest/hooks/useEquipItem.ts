import { useSetRecoilState, useRecoilState } from "recoil";

import {
  Armor,
  InventoryItemStatus,
  Accessory,
  Shield,
  EquipmentType,
  Weapon,
} from "neverquest/env.d";
import { accessory, armor, shield, weapon } from "neverquest/state/equipment";
import { show } from "neverquest/state/global";

export default function useEquipItem() {
  const [showValue, setShow] = useRecoilState(show);
  const setArmor = useSetRecoilState(armor);
  const setAccessory = useSetRecoilState(accessory);
  const setShield = useSetRecoilState(shield);
  const setWeapon = useSetRecoilState(weapon);

  return ({ item, type }: { item: Armor | Accessory | Shield | Weapon; type: EquipmentType }) => {
    switch (type) {
      case EquipmentType.Accessory:
        setAccessory(item as Accessory);

        if (!showValue.accessory) {
          setShow({ ...showValue, accessory: true });
        }

        return InventoryItemStatus.Equipped;
      case EquipmentType.Armor:
        setArmor(item as Armor);

        if (!showValue.armor) {
          setShow({ ...showValue, armor: true });
        }

        return InventoryItemStatus.Equipped;
      case EquipmentType.Shield:
        setShield(item as Shield);

        if (!showValue.shield) {
          setShow({ ...showValue, shield: true });
        }

        return InventoryItemStatus.Equipped;
      case EquipmentType.Weapon:
        setWeapon(item as Weapon);

        if (!showValue.stamina && (item as Weapon).staminaCost > 0) {
          setShow({ ...showValue, stamina: true });
        }

        if (!showValue.totalDamageSummary) {
          setShow((currentShow) => ({ ...currentShow, totalDamageSummary: true }));
        }

        if (!showValue.weapon) {
          setShow((currentShow) => ({ ...currentShow, weapon: true }));
        }

        return InventoryItemStatus.Equipped;
    }
  };
}

import { useResetRecoilState } from "recoil";

import { EquipmentType } from "neverquest/env";
import { armor, shield, weapon } from "neverquest/state/inventory";

export default function useUnequipItem() {
  const resetArmor = useResetRecoilState(armor);
  const resetShield = useResetRecoilState(shield);
  const resetWeapon = useResetRecoilState(weapon);

  return (type: EquipmentType) => {
    // TODO - other types
    switch (type) {
      case EquipmentType.Armor:
        resetArmor();
        break;
      case EquipmentType.Shield:
        resetShield();
        break;
      case EquipmentType.Weapon:
        resetWeapon();
        break;
    }
  };
}

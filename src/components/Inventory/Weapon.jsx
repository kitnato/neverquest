import { useRecoilValue } from "recoil";

import WithIcon from "components/WithIcon";
import { weapon } from "state/equipment";

import icon from "icons/axe-sword.svg";

export default function Weapon() {
  const weaponValue = useRecoilValue(weapon);

  return (
    <WithIcon alt="Weapon" icon={icon}>
      {weaponValue.name}

      {` (${weaponValue.damage.min} - ${weaponValue.damage.max})`}
    </WithIcon>
  );
}

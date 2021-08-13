import { useRecoilValue } from "recoil";

import WithIcon from "components/WithIcon";
import { criticalChance, criticalDamage } from "state/stats";

import icon from "icons/striking-splinter.svg";

export default function CritDamage() {
  const critChanceValue = useRecoilValue(criticalChance);
  const critDamageValue = useRecoilValue(criticalDamage);

  return (
    <WithIcon
      alt="Critical damage bonus"
      className={`${critChanceValue.max === 0 ? "invisible" : ""}`}
      icon={icon}
    >
      {critDamageValue.current * 100}%
    </WithIcon>
  );
}

import { useRecoilValue } from "recoil";

import WithIcon from "components/WithIcon";
import { criticalChance } from "state/stats";

import icon from "icons/spiky-eclipse.svg";

export default function CritChance() {
  const critChanceValue = useRecoilValue(criticalChance);

  return (
    <WithIcon
      alt="Critical hit chance"
      className={`${critChanceValue.max === 0 ? "invisible" : ""}`}
      icon={icon}
    >
      {critChanceValue.current * 100}%
    </WithIcon>
  );
}

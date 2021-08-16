import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import { criticalChance, criticalDamage } from "state/stats";

import icon from "icons/striking-splinter.svg";

export default function CritDamage() {
  const critChanceValue = useRecoilValue(criticalChance);
  const critDamageValue = useRecoilValue(criticalDamage);

  if (critChanceValue.max === 0) {
    return null;
  }

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Critical damage bonus" />

      <span>{critDamageValue.current * 100}%</span>
    </div>
  );
}

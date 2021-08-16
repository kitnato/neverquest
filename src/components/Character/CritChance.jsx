import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import { criticalChance } from "state/stats";

import icon from "icons/spiky-eclipse.svg";

export default function CritChance() {
  const critChanceValue = useRecoilValue(criticalChance);

  if (critChanceValue.max === 0) {
    return null;
  }

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Critical hit chance" />

      <span>{critChanceValue.current * 100}%</span>
    </div>
  );
}

import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/spiky-eclipse.svg";
import { totalCriticalChance } from "state/character";
import { show } from "state/global";

export default function CritChance() {
  const criticalChanceValue = useRecoilValue(totalCriticalChance);
  const showValue = useRecoilValue(show);

  if (!showValue.critical) {
    return null;
  }

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Critical hit chance" />

      <span>{criticalChanceValue * 100}%</span>
    </div>
  );
}

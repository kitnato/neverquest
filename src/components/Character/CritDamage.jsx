import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/striking-splinter.svg";
import { show } from "state/global";
import { totalCriticalDamage } from "state/stats";

export default function CritDamage() {
  const criticalDamageValue = useRecoilValue(totalCriticalDamage);
  const showValue = useRecoilValue(show);

  if (!showValue.critical) {
    return null;
  }

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Critical damage bonus" />

      <span>{criticalDamageValue * 100}%</span>
    </div>
  );
}

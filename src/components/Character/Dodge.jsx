import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/wingfoot.svg";
import { show } from "state/global";
import { totalDodgeChance } from "state/stats";

export default function Dodge() {
  const dodgeChanceValue = useRecoilValue(totalDodgeChance);
  const showValue = useRecoilValue(show);

  if (!showValue.dodgeChance) {
    return null;
  }

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Dodge" />

      <span>{dodgeChanceValue * 100}%</span>
    </div>
  );
}

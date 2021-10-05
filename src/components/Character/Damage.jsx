import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/fist.svg";
import { totalDamage } from "state/stats";

export default function Damage() {
  const dphValue = useRecoilValue(totalDamage);

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Total damage" />

      <span>
        {dphValue.min}-{dphValue.max}
      </span>
    </div>
  );
}

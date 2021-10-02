import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import { totalDamage } from "state/character";

import icon from "icons/fist.svg";

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

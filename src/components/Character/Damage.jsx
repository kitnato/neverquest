import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import { damagePerHit } from "state/character";

import damageIcon from "icons/fist.svg";

export default function Damage() {
  const dphValue = useRecoilValue(damagePerHit);

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={damageIcon} tooltip="Total damage" />

      <span>
        {dphValue.min}-{dphValue.max}
      </span>
    </div>
  );
}

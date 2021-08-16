import { useRecoilValue } from "recoil";

import WithIcon from "components/WithIcon";
import { damagePerHit } from "state/character";

import damageIcon from "icons/fist.svg";

export default function Damage() {
  const dphValue = useRecoilValue(damagePerHit);

  return (
    <WithIcon alt="Total damage" icon={damageIcon}>
      {dphValue.min}-{dphValue.max}
    </WithIcon>
  );
}

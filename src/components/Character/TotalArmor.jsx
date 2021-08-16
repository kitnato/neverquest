import { useRecoilValue } from "recoil";

import icon from "icons/barbute.svg";
import WithIcon from "components/WithIcon";
import { totalArmor } from "state/character";

export default function TotalArmor() {
  const totalArmorValue = useRecoilValue(totalArmor);

  return (
    <WithIcon alt="Total armor" icon={icon}>
      {totalArmorValue}
    </WithIcon>
  );
}

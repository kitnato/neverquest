import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/barbute.svg";
import { totalArmor } from "state/character";

export default function TotalArmor() {
  const totalArmorValue = useRecoilValue(totalArmor);

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Total armor" />

      <span>{totalArmorValue}</span>
    </div>
  );
}

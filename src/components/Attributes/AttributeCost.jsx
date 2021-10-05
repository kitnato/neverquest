import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/level-two.svg";
import { attributeCost } from "state/character";

export default function AttributeCost() {
  const attributeCostValue = useRecoilValue(attributeCost);

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Cost per attribute" />

      <span>{attributeCostValue}</span>
    </div>
  );
}

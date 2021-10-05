import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/level-two-advanced.svg";
import { attributesAvailable } from "state/character";

export default function AttributesAvailable() {
  const attributesAvailableValue = useRecoilValue(attributesAvailable);

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Attribute points" />

      <span>{attributesAvailableValue}</span>
    </div>
  );
}

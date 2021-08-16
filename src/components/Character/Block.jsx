import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/round-shield.svg";
import { shield } from "state/equipment";

export default function Block() {
  const shieldValue = useRecoilValue(shield);

  if (shieldValue.name === null) {
    return null;
  }

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Block" />

      <span>{shieldValue.block * 100}</span>
    </div>
  );
}

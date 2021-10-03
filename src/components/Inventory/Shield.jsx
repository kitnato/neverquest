import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/round-shield.svg";
import { shield } from "state/equipment";
import { show } from "state/global";

// TODO
export default function Shield() {
  const shieldValue = useRecoilValue(shield);
  const showValue = useRecoilValue(show);

  if (!showValue.shield) {
    return null;
  }

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Shield" />

      <span>{shieldValue.name}</span>
    </div>
  );
}

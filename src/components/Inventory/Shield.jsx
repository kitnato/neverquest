import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import { shield } from "state/equipment";

import icon from "icons/round-shield.svg";

export default function Shield() {
  const shieldValue = useRecoilValue(shield);

  if (shieldValue.name === null) {
    return null;
  }

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Armor" />

      <span>{shieldValue.name}</span>
    </div>
  );
}

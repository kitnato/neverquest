import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import { characterLevel } from "state/character";

import icon from "icons/level-four-advanced.svg";

export default function Level() {
  const characterLevelValue = useRecoilValue(characterLevel);

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Level" />

      <span>{characterLevelValue}</span>
    </div>
  );
}

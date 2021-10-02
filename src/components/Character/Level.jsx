import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/level-four-advanced.svg";
import { characterLevel } from "state/character";

export default function Level() {
  const characterLevelValue = useRecoilValue(characterLevel);

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Level" />

      <span>{characterLevelValue}</span>
    </div>
  );
}

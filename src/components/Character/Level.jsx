import { useRecoilValue } from "recoil";

import WithIcon from "components/WithIcon";
import { characterLevel } from "state/character";

import icon from "icons/level-four-advanced.svg";

export default function Level() {
  const characterLevelValue = useRecoilValue(characterLevel);

  return (
    <WithIcon alt="Level" icon={icon}>
      {characterLevelValue}
    </WithIcon>
  );
}

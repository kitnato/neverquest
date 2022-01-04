import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import attackingIcon from "icons/carnivore-mouth.svg";
import deadIcon from "icons/dinosaur-bones.svg";
import lurkingIcon from "icons/mouth-watering.svg";
import { isAttacking } from "state/character";
import { isMonsterDead, monsterName } from "state/monster";

export default function MonsterName() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const monsterNameValue = useRecoilValue(monsterName);

  const icon = (() => {
    if (isMonsterDeadValue) {
      return deadIcon;
    }

    if (isAttackingValue) {
      return attackingIcon;
    }

    return lurkingIcon;
  })();

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Monster" />

      <span>{monsterNameValue}</span>
    </Stack>
  );
}

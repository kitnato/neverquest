import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "@neverquest/components/ImageIcon";
import attackingIcon from "@neverquest/icons/carnivore-mouth.svg";
import deadIcon from "@neverquest/icons/dinosaur-bones.svg";
import lurkingIcon from "@neverquest/icons/mouth-watering.svg";
import { isAttacking } from "@neverquest/state/character";
import { isMonsterDead, monsterName } from "@neverquest/state/monster";

export default function MonsterName() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const monsterNameValue = useRecoilValue(monsterName);

  const { icon, tooltip } = (() => {
    if (isMonsterDeadValue) {
      return { icon: deadIcon, tooltip: "Dead monster" };
    }

    if (isAttackingValue) {
      return { icon: attackingIcon, tooltip: "Monster" };
    }

    return { icon: lurkingIcon, tooltip: "Lurking monster" };
  })();

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip={tooltip} />

      <span>{monsterNameValue}</span>
    </Stack>
  );
}

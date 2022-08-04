import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "@neverquest/components/ImageIcon";
import { ReactComponent as IconAttacking } from "@neverquest/icons/carnivore-mouth.svg";
import { ReactComponent as IconDead } from "@neverquest/icons/dinosaur-bones.svg";
import { ReactComponent as IconLurking } from "@neverquest/icons/mouth-watering.svg";
import { isAttacking } from "@neverquest/state/character";
import { isMonsterDead, monsterName } from "@neverquest/state/monster";

export default function MonsterName() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const monsterNameValue = useRecoilValue(monsterName);

  const { Icon, tooltip } = (() => {
    if (isMonsterDeadValue) {
      return { Icon: IconDead, tooltip: "Dead monster" };
    }

    if (isAttackingValue) {
      return { Icon: IconAttacking, tooltip: "Monster" };
    }

    return { Icon: IconLurking, tooltip: "Lurking monster" };
  })();

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon Icon={Icon} tooltip={tooltip} />

      <span>{monsterNameValue}</span>
    </Stack>
  );
}

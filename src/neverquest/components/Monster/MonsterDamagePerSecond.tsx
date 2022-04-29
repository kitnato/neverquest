import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/wolverine-claws.svg";
import { damagePerSecondMonster } from "neverquest/state/monster";
import { showDamagePerSecond } from "neverquest/state/show";
import { AnimationType } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function MonsterDamagePerSecond() {
  const damagePerSecondMonsterValue = useRecoilValue(damagePerSecondMonster);
  const showDamagePerSecondValue = useRecoilValue(showDamagePerSecond);

  if (!showDamagePerSecondValue) {
    return null;
  }

  return (
    <Stack className={getAnimationClass(AnimationType.FlipInX)} direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Monster damage per second (DPS)" />

      <span>{damagePerSecondMonsterValue}</span>
    </Stack>
  );
}

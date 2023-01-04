import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/wolverine-claws.svg";
import { damageMonster, damagePerSecondMonster } from "@neverquest/state/monster";
import { isShowingDamagePerSecond } from "@neverquest/state/settings";

export default function () {
  const damageMonsterValue = useRecoilValue(damageMonster);
  const damagePerSecondMonsterValue = useRecoilValue(damagePerSecondMonster);
  const isShowingDamagePerSecondValue = useRecoilValue(isShowingDamagePerSecond);

  return (
    <IconDisplay
      contents={damageMonsterValue}
      description={isShowingDamagePerSecondValue ? `${damagePerSecondMonsterValue} DPS` : null}
      Icon={Icon}
      tooltip="Monster damage"
    />
  );
}

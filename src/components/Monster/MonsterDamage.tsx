import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/wolverine-claws.svg";
import { damagePerSecondMonster, totalDamageMonster } from "@neverquest/state/monster";
import { isShowingDamagePerSecond } from "@neverquest/state/settings";

export default function () {
  const damagePerSecondMonsterValue = useRecoilValue(damagePerSecondMonster);
  const isShowingDamagePerSecondValue = useRecoilValue(isShowingDamagePerSecond);
  const totalDamageMonsterValue = useRecoilValue(totalDamageMonster);

  return (
    <IconDisplay
      contents={
        isShowingDamagePerSecondValue ? `${totalDamageMonsterValue} Total` : totalDamageMonsterValue
      }
      description={isShowingDamagePerSecondValue ? `${damagePerSecondMonsterValue} DPS` : null}
      Icon={Icon}
      tooltip="Monster damage"
    />
  );
}

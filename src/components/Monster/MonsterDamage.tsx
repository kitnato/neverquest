import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/wolverine-claws.svg";
import { monsterDamage, monsterDamagePerSecond } from "@neverquest/state/monster";
import { isShowingDamagePerSecond } from "@neverquest/state/settings";

export default function () {
  const monsterDamageValue = useRecoilValue(monsterDamage);
  const monsterDamagePerSecondValue = useRecoilValue(monsterDamagePerSecond);
  const isShowingDamagePerSecondValue = useRecoilValue(isShowingDamagePerSecond);

  return (
    <IconDisplay
      contents={monsterDamageValue}
      description={isShowingDamagePerSecondValue ? `${monsterDamagePerSecondValue} DPS` : null}
      Icon={Icon}
      tooltip="Monster damage"
    />
  );
}

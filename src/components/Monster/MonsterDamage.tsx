import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/wolverine-claws.svg";
import { totalDamageMonster } from "@neverquest/state/monster";

export default function () {
  const totalDamageMonsterValue = useRecoilValue(totalDamageMonster);

  return <IconDisplay Icon={Icon} contents={totalDamageMonsterValue} tooltip="Monster damage" />;
}

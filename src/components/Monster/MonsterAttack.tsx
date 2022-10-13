import IconDisplay from "@neverquest/components/IconDisplay";
import MonsterAttackMeter from "@neverquest/components/Monster/MonsterAttackMeter";
import { ReactComponent as Icon } from "@neverquest/icons/striking-splinter.svg";

export default function () {
  return (
    <IconDisplay Icon={Icon} contents={<MonsterAttackMeter />} tooltip="Monster attack rate" />
  );
}

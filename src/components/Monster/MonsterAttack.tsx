import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterAttackMeter } from "@neverquest/components/Monster/MonsterAttackMeter";
import { ReactComponent as Icon } from "@neverquest/icons/striking-splinter.svg";

export function MonsterAttack() {
  return (
    <IconDisplay contents={<MonsterAttackMeter />} Icon={Icon} tooltip="Monster attack rate" />
  );
}

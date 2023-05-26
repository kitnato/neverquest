import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterAttackMeter } from "@neverquest/components/Monster/MonsterAttackMeter";
import { ReactComponent as IconAttackRate } from "@neverquest/icons/attack-rate.svg";

export function MonsterAttack() {
  return (
    <IconDisplay
      contents={<MonsterAttackMeter />}
      Icon={IconAttackRate}
      tooltip="Monster attack rate"
    />
  );
}

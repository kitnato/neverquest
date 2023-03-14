import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterAttackMeter } from "@neverquest/components/Monster/MonsterAttackMeter";
import { ATTACK_RATE_ICON } from "@neverquest/data/attributes";

export function MonsterAttack() {
  return (
    <IconDisplay
      contents={<MonsterAttackMeter />}
      Icon={ATTACK_RATE_ICON}
      tooltip="Monster attack rate"
    />
  );
}

import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterAilmentMeter } from "@neverquest/components/Monster/MonsterAilmentMeter";
import { ReactComponent as IconStunned } from "@neverquest/icons/stunned.svg";
import { masteryStatistic } from "@neverquest/state/masteries";
import { canReceiveAilment } from "@neverquest/state/monster";

export function MonsterStunned() {
  const canBeStunned = useRecoilValue(canReceiveAilment("stunned"));
  const mightValue = useRecoilValue(masteryStatistic("might"));

  if (!canBeStunned) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <MonsterAilmentMeter ailment="stunned" format="integer" totalDuration={mightValue} />
      }
      Icon={IconStunned}
      isAnimated
      tooltip="Stunned"
    />
  );
}

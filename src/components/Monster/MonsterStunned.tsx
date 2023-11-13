import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterAilmentMeter } from "@neverquest/components/Monster/MonsterAilmentMeter";
import IconStunned from "@neverquest/icons/stunned.svg?react";
import { masteryStatistic } from "@neverquest/state/masteries";
import { canReceiveAilment } from "@neverquest/state/monster";

export function MonsterStunned() {
  const canBeStunned = useRecoilValue(canReceiveAilment("stunned"));
  const mightValue = useRecoilValue(masteryStatistic("might"));

  if (canBeStunned) {
    return (
      <IconDisplay Icon={IconStunned} isAnimated tooltip="Stunned">
        <MonsterAilmentMeter ailment="stunned" format="integer" totalDuration={mightValue} />
      </IconDisplay>
    );
  }
}

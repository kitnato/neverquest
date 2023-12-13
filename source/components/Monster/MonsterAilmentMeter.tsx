import { OverlayTrigger, Popover, PopoverBody } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { LABEL_EMPTY, PERCENTAGE_POINTS } from "@neverquest/data/general";
import { AILMENT_DESCRIPTION } from "@neverquest/data/monster";
import { isMonsterAiling, monsterAilmentDuration } from "@neverquest/state/monster";
import type { MonsterAilment, NumberFormat } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export function MonsterAilmentMeter({
  ailment,
  format = "time",
  totalDuration,
}: {
  ailment: MonsterAilment;
  format?: NumberFormat;
  totalDuration: number;
}) {
  const isMonsterAilingValue = useRecoilValue(isMonsterAiling(ailment));
  const monsterAilmentDurationValue = useRecoilValue(monsterAilmentDuration(ailment));

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <PopoverBody>{AILMENT_DESCRIPTION[ailment]}</PopoverBody>
        </Popover>
      }
    >
      <div className="w-100">
        <LabelledProgressBar
          disableTransitions
          value={
            isMonsterAilingValue
              ? (monsterAilmentDurationValue / totalDuration) * PERCENTAGE_POINTS
              : 0
          }
          variant="secondary"
        >
          <span>
            {isMonsterAilingValue
              ? format === "time"
                ? formatNumber({ format, value: monsterAilmentDurationValue })
                : `${monsterAilmentDurationValue} hits`
              : LABEL_EMPTY}
          </span>
        </LabelledProgressBar>
      </div>
    </OverlayTrigger>
  );
}
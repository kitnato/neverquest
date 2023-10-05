import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { AILMENT_DESCRIPTION } from "@neverquest/data/monster";
import { isMonsterAiling, monsterAilmentDuration } from "@neverquest/state/monster";
import type { MonsterAilment, NumberFormat } from "@neverquest/types/unions";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatValue } from "@neverquest/utilities/formatters";

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
    <OverlayTrigger overlay={<Tooltip>{AILMENT_DESCRIPTION[ailment]}</Tooltip>}>
      <span className="w-100">
        <LabelledProgressBar
          disableTransitions
          label={
            isMonsterAilingValue
              ? format === "time"
                ? formatValue({ format: "time", value: monsterAilmentDurationValue })
                : monsterAilmentDurationValue
              : LABEL_EMPTY
          }
          value={isMonsterAilingValue ? (monsterAilmentDurationValue / totalDuration) * 100 : 0}
          variant="secondary"
        />
      </span>
    </OverlayTrigger>
  );
}

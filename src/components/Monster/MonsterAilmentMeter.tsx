import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { AILMENT_DESCRIPTION } from "@neverquest/data/monster";
import { isMonsterAiling, monsterAilmentDuration } from "@neverquest/state/monster";
import type { MonsterAilment, NumberFormat } from "@neverquest/types/unions";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatValue } from "@neverquest/utilities/formatters";

export function MonsterAilmentMeter({
  format = "time",
  totalDuration,
  type,
}: {
  format?: NumberFormat;
  totalDuration: number;
  type: MonsterAilment;
}) {
  const isMonsterAilingValue = useRecoilValue(isMonsterAiling(type));
  const monsterAilmentDurationValue = useRecoilValue(monsterAilmentDuration(type));

  return (
    <OverlayTrigger overlay={<Tooltip>{AILMENT_DESCRIPTION[type]}</Tooltip>}>
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

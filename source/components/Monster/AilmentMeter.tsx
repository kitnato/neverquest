import { OverlayTrigger, Popover, PopoverBody } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DescriptionDisplay } from "@neverquest/components/DescriptionDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { LABEL_EMPTY, PERCENTAGE_POINTS } from "@neverquest/data/general";
import { AILMENT_DESCRIPTION } from "@neverquest/data/monster";
import { isMonsterAiling, monsterAilmentDuration } from "@neverquest/state/monster";
import type { Ailment } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export function AilmentMeter({
  ailment,
  totalDuration,
}: {
  ailment: Ailment;
  totalDuration: number;
}) {
  const isMonsterAilingValue = useRecoilValue(isMonsterAiling(ailment));
  const monsterAilmentDurationValue = useRecoilValue(monsterAilmentDuration(ailment));

  const { description, descriptionIcons } = AILMENT_DESCRIPTION[ailment];

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <PopoverBody className="text-center">
            <DescriptionDisplay description={description} descriptionIcons={descriptionIcons} />
          </PopoverBody>
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
              ? formatNumber({ format: "time", value: monsterAilmentDurationValue })
              : LABEL_EMPTY}
          </span>
        </LabelledProgressBar>
      </div>
    </OverlayTrigger>
  );
}

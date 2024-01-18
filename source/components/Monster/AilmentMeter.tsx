import { Fragment } from "react";
import { OverlayTrigger, Popover, PopoverBody } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
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
            {description.split("#").map((part, index) => {
              if (descriptionIcons?.[index] === undefined) {
                return <span key={index}>{part}</span>;
              }

              const descriptionIcon = descriptionIcons[index];

              if (descriptionIcon !== undefined) {
                return (
                  <Fragment key={index}>
                    <span>{part}</span>

                    {descriptionIcons[index] !== undefined && (
                      <IconImage className="small" Icon={descriptionIcon} />
                    )}
                  </Fragment>
                );
              }
            })}
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

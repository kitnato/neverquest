import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LABEL_SEPARATOR } from "@neverquest/data/general";
import { PARRY_ABSORPTION, PARRY_DAMAGE } from "@neverquest/data/statistics";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconFinesse from "@neverquest/icons/finesse.svg?react";
import IconParryRating from "@neverquest/icons/parry-rating.svg?react";
import IconParry from "@neverquest/icons/parry.svg?react";
import { weapon } from "@neverquest/state/gear";
import { masteryStatistic } from "@neverquest/state/masteries";
import { isSkillAcquired } from "@neverquest/state/skills";
import { parryChance, parryRating } from "@neverquest/state/statistics";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function ParryRating() {
  const escrimeValue = useRecoilValue(isSkillAcquired("escrime"));
  const finesseValue = useRecoilValue(masteryStatistic("finesse"));
  const parryChanceValue = useRecoilValue(parryChance);
  const parryRatingValue = useRecoilValue(parryRating);
  const { gearClass } = useRecoilValue(weapon);

  const isEmpty = !escrimeValue || gearClass !== "slashing" || parryRatingValue === 0;

  useDeltaText({
    delta: "parryRating",
    state: parryRating,
    stop: () => isEmpty,
  });

  if (!isEmpty) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconParryRating}
        tooltip="Parry rating"
      >
        <Stack direction="horizontal" gap={1}>
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverHeader className="text-center">
                  <span>Parry rating details</span>
                </PopoverHeader>

                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td>
                        <span>Chance on hit:</span>
                      </td>

                      <td>
                        <IconDisplay Icon={IconParry} iconProps={{ className: "small" }}>
                          <span>
                            {formatNumber({ format: "percentage", value: parryChanceValue })}
                          </span>
                        </IconDisplay>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <span>Damage reflected:</span>
                      </td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <span>
                            {formatNumber({
                              decimals: 0,
                              format: "percentage",
                              value: PARRY_DAMAGE,
                            })}
                          </span>

                          {LABEL_SEPARATOR}

                          <IconDisplay Icon={IconFinesse} iconProps={{ className: "small" }}>
                            <span>
                              +
                              {formatNumber({
                                format: "percentage",
                                value: finesseValue,
                              })}
                            </span>
                          </IconDisplay>
                        </Stack>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <span>Damage absorbed:</span>
                      </td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <span>
                            {formatNumber({
                              decimals: 0,
                              format: "percentage",
                              value: PARRY_ABSORPTION,
                            })}
                          </span>

                          {LABEL_SEPARATOR}

                          <IconDisplay Icon={IconFinesse} iconProps={{ className: "small" }}>
                            <span>
                              +
                              {formatNumber({
                                format: "percentage",
                                value: finesseValue,
                              })}
                            </span>
                          </IconDisplay>
                        </Stack>
                      </td>
                    </tr>
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
          >
            <span>{formatNumber({ value: parryRatingValue })}</span>
          </OverlayTrigger>

          <DeltasDisplay delta="parryRating" />
        </Stack>
      </IconDisplay>
    );
  }
}

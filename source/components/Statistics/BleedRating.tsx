import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconBleedRating from "@neverquest/icons/bleed-rating.svg?react";
import IconBleed from "@neverquest/icons/bleed.svg?react";
import IconBleeding from "@neverquest/icons/bleeding.svg?react";
import IconCruelty from "@neverquest/icons/cruelty.svg?react";
import { bleed, bleedChance } from "@neverquest/state/ailments";
import { weapon } from "@neverquest/state/gear";
import { masteryStatistic } from "@neverquest/state/masteries";
import { isSkillAcquired } from "@neverquest/state/skills";
import { bleedRating, damage } from "@neverquest/state/statistics";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function BleedRating() {
  const { duration } = useRecoilValue(bleed);
  const bleedChanceValue = useRecoilValue(bleedChance);
  const bleedRatingValue = useRecoilValue(bleedRating);
  const damageValue = useRecoilValue(damage);
  const crueltyValue = useRecoilValue(masteryStatistic("cruelty"));
  const anatomyValue = useRecoilValue(isSkillAcquired("anatomy"));
  const { gearClass } = useRecoilValue(weapon);

  const isEmpty = !anatomyValue || gearClass !== "piercing" || bleedRatingValue === 0;

  useDeltaText({
    delta: "bleedRating",
    state: bleedRating,
    stop: () => isEmpty,
  });

  if (!isEmpty) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconBleedRating}
        tooltip="Bleed rating"
      >
        <Stack direction="horizontal" gap={1}>
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverHeader className="text-center">
                  <span>Bleed rating details</span>
                </PopoverHeader>

                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <span>Chance on hit:</span>
                      </td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage className="small" Icon={IconBleed} />

                          {`${
                            bleedChanceValue === 0
                              ? LABEL_EMPTY
                              : formatNumber({ format: "percentage", value: bleedChanceValue })
                          }`}
                        </Stack>
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage className="small" Icon={IconCruelty} />

                          <span>Cruelty:</span>
                        </Stack>
                      </td>

                      <td>
                        <span>
                          {`${formatNumber({
                            format: "percentage",
                            value: crueltyValue,
                          })} of total damage`}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <span>Bleed damage:</span>
                      </td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage className="small" Icon={IconBleeding} />

                          <span>
                            {`${formatNumber({
                              value: damageValue * crueltyValue,
                            })} over ${formatNumber({
                              format: "time",
                              value: duration,
                            })}`}
                          </span>
                        </Stack>
                      </td>
                    </tr>
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
          >
            <span>{bleedRatingValue}</span>
          </OverlayTrigger>

          <DeltasDisplay delta="bleedRating" />
        </Stack>
      </IconDisplay>
    );
  }
}

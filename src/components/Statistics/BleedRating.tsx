import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconBleedRating from "@neverquest/icons/bleed-rating.svg?react";
import IconBleed from "@neverquest/icons/bleed.svg?react";
import IconCruelty from "@neverquest/icons/cruelty.svg?react";
import { weapon } from "@neverquest/state/gear";
import { masteryStatistic } from "@neverquest/state/masteries";
import { bleed, bleedingDeltaLength } from "@neverquest/state/monster";
import { isSkillAcquired } from "@neverquest/state/skills";
import { bleedChance, bleedDamage, bleedRating, damageTotal } from "@neverquest/state/statistics";
import { formatNumber } from "@neverquest/utilities/formatters";

export function BleedRating() {
  const { duration, ticks } = useRecoilValue(bleed);
  const bleedChanceValue = useRecoilValue(bleedChance);
  const bleedDamageValue = useRecoilValue(bleedDamage);
  const bleedingDeltaLengthValue = useRecoilValue(bleedingDeltaLength);
  const bleedRatingValue = useRecoilValue(bleedRating);
  const damageTotalValue = useRecoilValue(damageTotal);
  const crueltyValue = useRecoilValue(masteryStatistic("cruelty"));
  const anatomyValue = useRecoilValue(isSkillAcquired("anatomy"));
  const { gearClass } = useRecoilValue(weapon);

  const isEmpty = !anatomyValue || gearClass !== "piercing" || bleedRatingValue === 0;

  useDeltaText({
    delta: "bleedRating",
    state: bleedRating,
    stop: () => isEmpty,
  });

  if (isEmpty) {
    return null;
  }

  return (
    <IconDisplay Icon={IconBleedRating} isAnimated tooltip="Bleed rating">
      <Stack direction="horizontal">
        <OverlayTrigger
          overlay={
            <Popover>
              <PopoverHeader className="text-center">Bleed rating details</PopoverHeader>

              <PopoverBody>
                <DetailsTable>
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Chance on hit:</td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage Icon={IconBleed} size="small" />

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
                        <IconImage Icon={IconCruelty} size="small" />
                        Cruelty:
                      </Stack>
                    </td>

                    <td>{`${formatNumber({
                      format: "percentage",
                      value: crueltyValue,
                    })} of total damage`}</td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Duration:</td>

                    <td>{formatNumber({ format: "time", value: duration })}</td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Ticks:</td>

                    <td>{`${ticks} (every ${formatNumber({
                      format: "time",
                      value: bleedingDeltaLengthValue,
                    })})`}</td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Bleed damage:</td>

                    <td>{`${formatNumber({
                      value: damageTotalValue * crueltyValue,
                    })} (${formatNumber({
                      value: bleedDamageValue,
                    })} per tick)`}</td>
                  </tr>
                </DetailsTable>
              </PopoverBody>
            </Popover>
          }
          trigger={anatomyValue ? ["hover", "focus"] : []}
        >
          <span>{anatomyValue ? bleedRatingValue : LABEL_EMPTY}</span>
        </OverlayTrigger>

        <FloatingTextQueue delta="bleedRating" />
      </Stack>
    </IconDisplay>
  );
}

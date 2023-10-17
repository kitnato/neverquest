import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconBleedRating } from "@neverquest/icons/bleed-rating.svg";
import { ReactComponent as IconBleed } from "@neverquest/icons/bleed.svg";
import { ReactComponent as IconCruelty } from "@neverquest/icons/cruelty.svg";
import { weapon } from "@neverquest/state/gear";
import { masteryStatistic } from "@neverquest/state/masteries";
import { bleed, bleedingDeltaLength } from "@neverquest/state/monster";
import { isSkillAcquired } from "@neverquest/state/skills";
import { bleedChance, bleedDamage, bleedRating, damageTotal } from "@neverquest/state/statistics";
import { formatValue } from "@neverquest/utilities/formatters";

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

  useDeltaText({
    delta: "bleedRating",
    value: bleedRating,
  });

  if (!anatomyValue || gearClass !== "piercing") {
    return null;
  }

  return (
    <IconDisplay
      contents={
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
                              : formatValue({ format: "percentage", value: bleedChanceValue })
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

                      <td>{`${formatValue({
                        format: "percentage",
                        value: crueltyValue,
                      })} of total damage`}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Duration:</td>

                      <td>{formatValue({ format: "time", value: duration })}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Ticks:</td>

                      <td>{`${ticks} (every ${formatValue({
                        format: "time",
                        value: bleedingDeltaLengthValue,
                      })})`}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Bleed damage:</td>

                      <td>{`${formatValue({
                        value: damageTotalValue * crueltyValue,
                      })} (${formatValue({
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
      }
      Icon={IconBleedRating}
      isAnimated
      tooltip="Bleed rating"
    />
  );
}

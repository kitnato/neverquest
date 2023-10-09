import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/data/general";
import { BLEED, BLEED_DELTA } from "@neverquest/data/statistics";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconBleedRating } from "@neverquest/icons/bleed-rating.svg";
import { ReactComponent as IconBleed } from "@neverquest/icons/bleed.svg";
import { ReactComponent as IconCruelty } from "@neverquest/icons/cruelty.svg";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/items";
import { masteryStatistic } from "@neverquest/state/masteries";
import { isSkillAcquired } from "@neverquest/state/skills";
import { bleed, bleedDamage, bleedRating, damageTotal } from "@neverquest/state/statistics";
import { formatValue } from "@neverquest/utilities/formatters";

export function BleedRating() {
  const bleedValue = useRecoilValue(bleed);
  const bleedDamageValue = useRecoilValue(bleedDamage);
  const bleedRatingValue = useRecoilValue(bleedRating);
  const damageTotalValue = useRecoilValue(damageTotal);
  const crueltyValue = useRecoilValue(masteryStatistic("cruelty"));
  const anatomyValue = useRecoilValue(isSkillAcquired("anatomy"));
  const { gearClass } = useRecoilValue(weapon);

  const { duration, ticks } = BLEED;

  useDeltaText({
    delta: deltas("bleedRating"),
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
                <Popover.Header className="text-center">Bleed rating details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Chance on hit:</td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconBleed} size="small" />

                          {`${
                            bleedValue === 0
                              ? LABEL_EMPTY
                              : formatValue({ format: "percentage", value: bleedValue })
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
                        value: BLEED_DELTA,
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
                </Popover.Body>
              </Popover>
            }
            trigger={anatomyValue ? ["hover", "focus"] : []}
          >
            <span>{anatomyValue ? bleedRatingValue : LABEL_EMPTY}</span>
          </OverlayTrigger>

          <FloatingText delta="bleedRating" />
        </Stack>
      }
      Icon={IconBleedRating}
      isAnimated
      tooltip="Bleed rating"
    />
  );
}

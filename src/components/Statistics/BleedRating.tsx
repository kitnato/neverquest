import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { BLEED, BLEED_DELTA } from "@neverquest/data/statistics";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconBleedRating } from "@neverquest/icons/bleed-rating.svg";
import { ReactComponent as IconBleed } from "@neverquest/icons/bleed.svg";
import { ReactComponent as IconCruelty } from "@neverquest/icons/cruelty.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { masteryStatistic } from "@neverquest/state/masteries";
import { skills } from "@neverquest/state/skills";
import { bleed, bleedDamage, bleedRating, damageTotal } from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatPercentage, formatTime } from "@neverquest/utilities/formatters";

export function BleedRating() {
  const bleedValue = useRecoilValue(bleed);
  const bleedRatingValue = useRecoilValue(bleedRating);
  const bleedDamageValue = useRecoilValue(bleedDamage);
  const damageTotalValue = useRecoilValue(damageTotal);
  const isShowingBleed = useRecoilValue(isShowing("bleed"));
  const crueltyValue = useRecoilValue(masteryStatistic("cruelty"));
  const skillAnatomy = useRecoilValue(skills("anatomy"));

  const { duration, ticks } = BLEED;

  useDeltaText({
    atomDelta: deltas("bleedRating"),
    atomValue: bleedRating,
    stop: ({ previous }) => previous === null || !skillAnatomy,
  });

  if (!isShowingBleed) {
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
                        <IconImage Icon={IconBleed} size="tiny" />
                        &nbsp;{`${bleedValue === 0 ? LABEL_EMPTY : formatPercentage(bleedValue)}`}
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <IconImage Icon={IconCruelty} size="tiny" />
                        &nbsp;Cruelty:
                      </td>

                      <td>{`${formatPercentage(crueltyValue)} of total damage`}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Duration:</td>

                      <td>{formatTime(duration)}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Ticks:</td>

                      <td>{`${ticks} (every ${formatTime(BLEED_DELTA)})`}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Bleed damage:</td>

                      <td>{`${Math.round(
                        damageTotalValue * crueltyValue,
                      )} (${bleedDamageValue} per tick)`}</td>
                    </tr>
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={skillAnatomy ? ["hover", "focus"] : []}
          >
            <span>{skillAnatomy ? bleedRatingValue : LABEL_EMPTY}</span>
          </OverlayTrigger>

          <FloatingText deltaType="bleedRating" />
        </Stack>
      }
      Icon={IconBleedRating}
      isAnimated
      tooltip="Bleed rating"
    />
  );
}

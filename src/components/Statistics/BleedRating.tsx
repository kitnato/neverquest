import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { BLEED } from "@neverquest/data/combat";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconBleedRating } from "@neverquest/icons/bleed-rating.svg";
import { ReactComponent as IconCruelty } from "@neverquest/icons/cruelty.svg";
import { ReactComponent as IconWeaponBleed } from "@neverquest/icons/weapon-bleed.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { rawMasteryStatistic } from "@neverquest/state/masteries";
import { skills } from "@neverquest/state/skills";
import { bleed, bleedRating, bleedTick, damageTotal } from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";

export function BleedRating() {
  const bleedValue = useRecoilValue(bleed);
  const bleedRatingValue = useRecoilValue(bleedRating);
  const { damage, duration: bleedTickDuration } = useRecoilValue(bleedTick);
  const damageTotalValue = useRecoilValue(damageTotal);
  const isShowingBleed = useRecoilValue(isShowing("bleed"));
  const crueltyValue = useRecoilValue(rawMasteryStatistic("cruelty"));
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
                        <IconImage Icon={IconWeaponBleed} size="tiny" />
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

                      <td>{formatMilliseconds(duration)}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Ticks:</td>

                      <td>{`${ticks} (every ${formatMilliseconds(bleedTickDuration)})`}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Bleed damage:</td>

                      <td>{`${Math.round(
                        damageTotalValue * crueltyValue,
                      )} (${damage} per tick)`}</td>
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

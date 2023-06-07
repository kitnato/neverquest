import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { MASTERIES } from "@neverquest/data/masteries";
import { BLEED } from "@neverquest/data/statistics";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconBleedRating } from "@neverquest/icons/bleed-rating.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { bleed, bleedDamage, bleedRating, bleedTick, damage } from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";

export function BleedRating() {
  const bleedValue = useRecoilValue(bleed);
  const bleedDamageValue = useRecoilValue(bleedDamage);
  const bleedRatingValue = useRecoilValue(bleedRating);
  const bleedTickValue = useRecoilValue(bleedTick);
  const damageValue = useRecoilValue(damage);
  const isShowingBleed = useRecoilValue(isShowing("bleed"));
  const skillAnatomy = useRecoilValue(skills("anatomy"));

  const { duration } = BLEED;
  const { name } = MASTERIES.cruelty;

  useDeltaText({
    atomDelta: deltas("bleedRating"),
    atomValue: bleedRating,
    stop: (previous) => previous === null || !skillAnatomy,
  });

  if (!isShowingBleed) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header className="text-center">Bleed rating details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Weapon:</td>

                      <td>{`${formatPercentage(bleedValue)} chance`}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>{`${name} mastery:`}</td>

                      <td>{`${formatPercentage(bleedDamageValue)} of damage`}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Bleed damage:</td>

                      <td>{`${Math.round(
                        damageValue * bleedDamageValue
                      )} (${bleedTickValue} per tick)`}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Duration:</td>

                      <td>{formatMilliseconds(duration)}</td>
                    </tr>
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={skillAnatomy ? ["hover", "focus"] : []}
          >
            <span>{skillAnatomy ? bleedRatingValue : LABEL_EMPTY}</span>
          </OverlayTrigger>

          <FloatingText type="bleedRating" />
        </>
      }
      Icon={IconBleedRating}
      isAnimated
      tooltip="Bleed rating"
    />
  );
}

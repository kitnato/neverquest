import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconStability } from "@neverquest/icons/stability.svg";
import { ReactComponent as IconStaggerRating } from "@neverquest/icons/stagger-rating.svg";
import { ReactComponent as IconStagger } from "@neverquest/icons/stagger.svg";
import { deltas } from "@neverquest/state/deltas";
import { shield, weapon } from "@neverquest/state/items";
import { masteryStatistic } from "@neverquest/state/masteries";
import { skills } from "@neverquest/state/skills";
import { staggerRating } from "@neverquest/state/statistics";
import { isMelee, isRanged } from "@neverquest/types/type-guards";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatPercentage, formatTime } from "@neverquest/utilities/formatters";

export function StaggerRating() {
  const stabilityValue = useRecoilValue(masteryStatistic("stability"));
  const { stagger } = useRecoilValue(shield);
  const shieldcraftValue = useRecoilValue(skills("shieldcraft"));
  const staggerRatingValue = useRecoilValue(staggerRating);
  const weaponValue = useRecoilValue(weapon);

  useDeltaText({
    delta: deltas("staggerRating"),
    stop: ({ previous }) => previous === null || !shieldcraftValue,
    value: staggerRating,
  });

  if (
    isRanged(weaponValue) ||
    (isMelee(weaponValue) && weaponValue.grip === "two-handed") ||
    !shieldcraftValue ||
    staggerRatingValue === 0
  ) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header className="text-center">Stagger rating details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Chance:</td>

                      <td>
                        <IconImage Icon={IconStagger} size="tiny" />
                        &nbsp;
                        {formatPercentage(stagger)}
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <IconImage Icon={IconStability} size="tiny" />
                        &nbsp;Stability:
                      </td>

                      <td>{`${formatTime(stabilityValue)} duration`}</td>
                    </tr>
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={shieldcraftValue ? ["hover", "focus"] : []}
          >
            <span>{shieldcraftValue ? staggerRatingValue : LABEL_EMPTY}</span>
          </OverlayTrigger>

          <FloatingText deltaType="staggerRating" />
        </Stack>
      }
      Icon={IconStaggerRating}
      isAnimated
      tooltip="Stagger rating"
    />
  );
}

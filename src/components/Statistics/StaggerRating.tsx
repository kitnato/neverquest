import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconStability } from "@neverquest/icons/stability.svg";
import { ReactComponent as IconStaggerRating } from "@neverquest/icons/stagger-rating.svg";
import { ReactComponent as IconStagger } from "@neverquest/icons/stagger.svg";
import { shield, weapon } from "@neverquest/state/gear";
import { masteryStatistic } from "@neverquest/state/masteries";
import { isSkillAcquired } from "@neverquest/state/skills";
import { staggerRating } from "@neverquest/state/statistics";
import { isTraitAcquired } from "@neverquest/state/traits";
import { isMelee, isRanged } from "@neverquest/types/type-guards";
import { formatValue } from "@neverquest/utilities/formatters";

export function StaggerRating() {
  const isTraitAcquiredColossus = useRecoilValue(isTraitAcquired("colossus"));
  const stabilityValue = useRecoilValue(masteryStatistic("stability"));
  const { stagger } = useRecoilValue(shield);
  const shieldcraftValue = useRecoilValue(isSkillAcquired("shieldcraft"));
  const staggerRatingValue = useRecoilValue(staggerRating);
  const weaponValue = useRecoilValue(weapon);

  useDeltaText({
    delta: "staggerRating",
    stop: () => !shieldcraftValue,
    value: staggerRating,
  });

  if (
    isRanged(weaponValue) ||
    (isMelee(weaponValue) && !isTraitAcquiredColossus && weaponValue.grip === "two-handed") ||
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
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconStagger} size="small" />

                          {formatValue({ format: "percentage", value: stagger })}
                        </Stack>
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconStability} size="small" />
                          Stability:
                        </Stack>
                      </td>

                      <td>{`${formatValue({
                        format: "time",
                        value: stabilityValue,
                      })} duration`}</td>
                    </tr>
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={shieldcraftValue ? ["hover", "focus"] : []}
          >
            <span>{shieldcraftValue ? staggerRatingValue : LABEL_EMPTY}</span>
          </OverlayTrigger>

          <FloatingTextQueue delta="staggerRating" />
        </Stack>
      }
      Icon={IconStaggerRating}
      isAnimated
      tooltip="Stagger rating"
    />
  );
}

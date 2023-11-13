import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconStability from "@neverquest/icons/stability.svg?react";
import IconStaggerRating from "@neverquest/icons/stagger-rating.svg?react";
import IconStagger from "@neverquest/icons/stagger.svg?react";
import { shield, weapon } from "@neverquest/state/gear";
import { masteryStatistic } from "@neverquest/state/masteries";
import { isSkillAcquired } from "@neverquest/state/skills";
import { staggerRating } from "@neverquest/state/statistics";
import { isTraitAcquired } from "@neverquest/state/traits";
import { isMelee, isRanged } from "@neverquest/types/type-guards";
import { formatNumber } from "@neverquest/utilities/formatters";

export function StaggerRating() {
  const isTraitAcquiredColossus = useRecoilValue(isTraitAcquired("colossus"));
  const stabilityValue = useRecoilValue(masteryStatistic("stability"));
  const { stagger } = useRecoilValue(shield);
  const shieldcraftValue = useRecoilValue(isSkillAcquired("shieldcraft"));
  const staggerRatingValue = useRecoilValue(staggerRating);
  const weaponValue = useRecoilValue(weapon);

  const isEmpty =
    isRanged(weaponValue) ||
    (isMelee(weaponValue) && !isTraitAcquiredColossus && weaponValue.grip === "two-handed") ||
    !shieldcraftValue ||
    staggerRatingValue === 0;

  useDeltaText({
    delta: "staggerRating",
    state: staggerRating,
    stop: () => isEmpty,
  });

  if (!isEmpty) {
    return (
      <IconDisplay Icon={IconStaggerRating} isAnimated tooltip="Stagger rating">
        <Stack direction="horizontal" gap={1}>
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverHeader className="text-center">Stagger rating details</PopoverHeader>

                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Chance:</td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconStagger} size="small" />

                          {formatNumber({ format: "percentage", value: stagger })}
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

                      <td>{`${formatNumber({
                        format: "time",
                        value: stabilityValue,
                      })} duration`}</td>
                    </tr>
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
            trigger={shieldcraftValue ? ["hover", "focus"] : []}
          >
            <span>{shieldcraftValue ? staggerRatingValue : LABEL_EMPTY}</span>
          </OverlayTrigger>

          <DeltasDisplay delta="staggerRating" />
        </Stack>
      </IconDisplay>
    );
  }
}

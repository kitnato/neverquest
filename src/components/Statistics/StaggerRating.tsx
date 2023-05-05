import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/data/constants";
import { MASTERIES } from "@neverquest/data/masteries";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconStaggerRating } from "@neverquest/icons/stagger-rating.svg";
import { deltas } from "@neverquest/state/deltas";
import { shield } from "@neverquest/state/inventory";
import { skills } from "@neverquest/state/skills";
import { staggerChanceWeapon, staggerDuration, staggerRating } from "@neverquest/state/statistics";
import { DeltaType, MasteryType, SkillType } from "@neverquest/types/enums";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";

export function StaggerRating() {
  const { staggerChance } = useRecoilValue(shield);
  const staggerSkill = useRecoilValue(skills(SkillType.Stagger));
  const staggerChanceWeaponValue = useRecoilValue(staggerChanceWeapon);
  const staggerDurationValue = useRecoilValue(staggerDuration);
  const staggerRatingValue = useRecoilValue(staggerRating);

  const deltaStaggerRating = deltas(DeltaType.StaggerRating);

  const { name } = MASTERIES[MasteryType.StaggerDuration];

  useDeltaText({
    atomDelta: deltaStaggerRating,
    atomValue: staggerRating,
  });

  if (!staggerSkill) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header>Stagger rating details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Stagger chance on hit:</td>

                      <td>{formatPercentage(staggerChanceWeaponValue)}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Stagger chance on block:</td>

                      <td>{formatPercentage(staggerChance)}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>{`${name} mastery:`}</td>

                      <td>{`${formatMilliseconds(staggerDurationValue)} duration`}</td>
                    </tr>
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            placement="top"
          >
            <span>{staggerRatingValue}</span>
          </OverlayTrigger>

          <FloatingText type={DeltaType.StaggerRating} />
        </>
      }
      Icon={IconStaggerRating}
      isAnimated
      tooltip="Stagger rating"
    />
  );
}

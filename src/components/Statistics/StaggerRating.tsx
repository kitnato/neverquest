import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/data/internal";
import { MASTERIES } from "@neverquest/data/masteries";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconStaggerRating } from "@neverquest/icons/stagger-rating.svg";
import { deltas } from "@neverquest/state/deltas";
import { shield } from "@neverquest/state/inventory";
import { skills } from "@neverquest/state/skills";
import { staggerDuration, staggerRating, staggerWeapon } from "@neverquest/state/statistics";
import { Delta, Mastery, Skill } from "@neverquest/types/enums";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";

export function StaggerRating() {
  const { stagger } = useRecoilValue(shield);
  const staggerSkill = useRecoilValue(skills(Skill.Traumatology));
  const staggerDurationValue = useRecoilValue(staggerDuration);
  const staggerRatingValue = useRecoilValue(staggerRating);
  const staggerWeaponValue = useRecoilValue(staggerWeapon);

  const deltaStaggerRating = deltas(Delta.StaggerRating);

  const { name } = MASTERIES[Mastery.Might];

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
                <Popover.Header className="text-center">Stagger rating details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Stagger chance on hit:</td>

                      <td>{formatPercentage(staggerWeaponValue)}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Stagger chance on block:</td>

                      <td>{formatPercentage(stagger)}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>{`${name} mastery:`}</td>

                      <td>{`${formatMilliseconds(staggerDurationValue)} duration`}</td>
                    </tr>
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
          >
            <span>{staggerRatingValue}</span>
          </OverlayTrigger>

          <FloatingText type={Delta.StaggerRating} />
        </>
      }
      Icon={IconStaggerRating}
      isAnimated
      tooltip="Stagger rating"
    />
  );
}

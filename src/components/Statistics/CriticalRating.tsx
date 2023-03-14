import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/constants";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconCriticalRating } from "@neverquest/icons/spiky-eclipse.svg";
import { deltas } from "@neverquest/state/deltas";
import { skills } from "@neverquest/state/skills";
import { criticalChance, criticalDamage, criticalRating } from "@neverquest/state/statistics";
import { DeltaType, SkillType } from "@neverquest/types/enums";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function CriticalRating() {
  const criticalChanceValue = useRecoilValue(criticalChance);
  const criticalDamageValue = useRecoilValue(criticalDamage);
  const criticalRatingValue = useRecoilValue(criticalRating);
  const criticalsSkill = useRecoilValue(skills(SkillType.Criticals));

  const deltaCriticalRating = deltas(DeltaType.CriticalRating);

  useDeltaText({
    atomDelta: deltaCriticalRating,
    atomValue: criticalRating,
  });

  if (!criticalsSkill) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header>Critical rating details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Critical strike chance:</td>

                      <td>{formatPercentage(criticalChanceValue)}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Critical strike damage:</td>

                      <td>{`${formatPercentage(criticalDamageValue)} of damage`}</td>
                    </tr>
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            placement="top"
          >
            <span>{criticalRatingValue}</span>
          </OverlayTrigger>

          <FloatingText type={DeltaType.CriticalRating} />
        </>
      }
      Icon={IconCriticalRating}
      isAnimated
      tooltip="Critical rating"
    />
  );
}

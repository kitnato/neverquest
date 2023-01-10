import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/constants";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/striking-splinter.svg";
import { deltas } from "@neverquest/state/deltas";
import { skills } from "@neverquest/state/skills";
import { criticalChance, criticalDamage, criticalRating } from "@neverquest/state/statistics";
import { DeltaType, SkillType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { formatPercentage } from "@neverquest/utilities/formatters";

export default function () {
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
      animation={AnimationType.FlipInX}
      contents={
        <>
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header as="h4">Critical rating details</Popover.Header>

                <Popover.Body>
                  <Table borderless size="sm">
                    <tbody>
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Critical strike chance:</td>

                        <td>{formatPercentage(criticalChanceValue)}</td>
                      </tr>

                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Critical strike damage:</td>

                        <td>{`${formatPercentage(criticalDamageValue)} of damage`}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Popover.Body>
              </Popover>
            }
            placement="top"
          >
            <span>{criticalRatingValue}</span>
          </OverlayTrigger>

          <FloatingText atom={deltaCriticalRating} />
        </>
      }
      Icon={Icon}
      isAnimated
      tooltip="Critical rating"
    />
  );
}

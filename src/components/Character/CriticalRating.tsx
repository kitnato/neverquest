import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/constants";
import { ReactComponent as Icon } from "@neverquest/icons/striking-splinter.svg";
import { skills } from "@neverquest/state/skills";
import { totalCriticalChance, totalCriticalDamage } from "@neverquest/state/statistics";
import { SkillType } from "@neverquest/types/enums";
import { formatPercentage } from "@neverquest/utilities/formatters";

export default function () {
  const criticalChanceValue = useRecoilValue(totalCriticalChance);
  const criticalDamageValue = useRecoilValue(totalCriticalDamage);
  const criticalsSkill = useRecoilValue(skills(SkillType.Criticals));

  if (!criticalsSkill) {
    return null;
  }

  return (
    <IconDisplay
      contents={
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
          <span>{criticalChanceValue * criticalDamageValue * 100}</span>
        </OverlayTrigger>
      }
      Icon={Icon}
      isAnimated
      tooltip="Critical rating"
    />
  );
}

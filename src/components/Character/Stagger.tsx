import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/constants";
import { MASTERIES } from "@neverquest/constants/masteries";
import { ReactComponent as Icon } from "@neverquest/icons/star-swirl.svg";
import { WeaponClass } from "@neverquest/locra/types";
import { shield, weapon } from "@neverquest/state/inventory";
import { skills } from "@neverquest/state/skills";
import { totalStaggerDuration } from "@neverquest/state/statistics";
import { MasteryType, SkillType } from "@neverquest/types/enums";
import {
  formatMilliseconds,
  formatPercentage,
  formatToFixed,
} from "@neverquest/utilities/formatters";

// TODO - revise Stagger formula
export default function () {
  const totalStaggerDurationValue = useRecoilValue(totalStaggerDuration);
  const { staggerChance } = useRecoilValue(shield);
  const staggerSkill = useRecoilValue(skills(SkillType.Stagger));
  const { abilityChance, weaponClass } = useRecoilValue(weapon);

  const { name } = MASTERIES[MasteryType.StaggerDuration];
  const weaponStaggerChance = weaponClass === WeaponClass.Blunt ? abilityChance : 0;

  if (!staggerSkill) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <OverlayTrigger
          overlay={
            <Popover>
              <Popover.Header as="h4">Stagger details</Popover.Header>

              <Popover.Body>
                <Table borderless size="sm">
                  <tbody>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Stagger chance on hit:</td>

                      <td>{formatPercentage(weaponStaggerChance)}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Stagger chance on block:</td>

                      <td>{formatPercentage(staggerChance)}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>{`${name} mastery:`}</td>

                      <td>{`${formatMilliseconds(totalStaggerDurationValue)} duration`}</td>
                    </tr>
                  </tbody>
                </Table>
              </Popover.Body>
            </Popover>
          }
          placement="top"
        >
          <span>
            {formatToFixed(
              (staggerChance * totalStaggerDurationValue +
                weaponStaggerChance * totalStaggerDurationValue) /
                1000
            )}
          </span>
        </OverlayTrigger>
      }
      Icon={Icon}
      isAnimated
      tooltip="Stagger"
    />
  );
}

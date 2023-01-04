import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { BLEED_DURATION, CLASS_TABLE_CELL_ITALIC } from "@neverquest/constants";
import { MASTERIES } from "@neverquest/data/masteries";
import { ReactComponent as Icon } from "@neverquest/icons/bleeding-wound.svg";
import { skills } from "@neverquest/state/skills";
import { bleedChance, bleedDamage, damage } from "@neverquest/state/statistics";
import { MasteryType, SkillType } from "@neverquest/types/enums";
import {
  formatMilliseconds,
  formatPercentage,
  formatToFixed,
} from "@neverquest/utilities/formatters";
import { getDamagePerRate } from "@neverquest/utilities/getters";

export default function () {
  const bleedDamageValue = useRecoilValue(bleedDamage);
  const bleedChanceValue = useRecoilValue(bleedChance);
  const bleedSkill = useRecoilValue(skills(SkillType.Bleed));
  const damageValue = useRecoilValue(damage);

  const { name } = MASTERIES[MasteryType.BleedDamage];

  if (!bleedSkill) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <OverlayTrigger
          overlay={
            <Popover>
              <Popover.Header as="h4">Bleed details</Popover.Header>

              <Popover.Body>
                <Table borderless size="sm">
                  <tbody>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Weapon:</td>

                      <td>{`${formatPercentage(bleedChanceValue)} chance`}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>{`${name} mastery:`}</td>

                      <td>{`${formatPercentage(bleedDamageValue)} of damage`}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Bleed damage:</td>

                      <td>{formatToFixed(damageValue * bleedDamageValue)}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Duration:</td>

                      <td>{formatMilliseconds(BLEED_DURATION)}</td>
                    </tr>
                  </tbody>
                </Table>
              </Popover.Body>
            </Popover>
          }
          placement="top"
        >
          <span>
            {getDamagePerRate({
              damage: damageValue,
              damageModifier: bleedDamageValue,
              damageModifierChance: bleedChanceValue,
              rate: BLEED_DURATION,
            })}
          </span>
        </OverlayTrigger>
      }
      Icon={Icon}
      isAnimated
      tooltip="Bleed damage"
    />
  );
}

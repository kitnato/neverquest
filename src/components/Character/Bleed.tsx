import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/constants";
import { ATTRIBUTES, BLEED_DURATION } from "@neverquest/constants/attributes";
import { ReactComponent as Icon } from "@neverquest/icons/spiky-eclipse.svg";
import { skills } from "@neverquest/state/skills";
import { totalBleedChance, totalBleedDamage, totalDamage } from "@neverquest/state/statistics";
import { AttributeType, SkillType } from "@neverquest/types/enums";
import {
  formatMilliseconds,
  formatPercentage,
  formatToFixed,
  getDamagePerRate,
} from "@neverquest/utilities/helpers";

export default function () {
  const totalBleedDamageValue = useRecoilValue(totalBleedDamage);
  const totalBleedChanceValue = useRecoilValue(totalBleedChance);
  const totalDamageValue = useRecoilValue(totalDamage);
  const bleedSkill = useRecoilValue(skills(SkillType.Bleed));

  const { name } = ATTRIBUTES[AttributeType.BleedDamage];

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

                      <td>{`${formatPercentage(totalBleedChanceValue)} chance`}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>{`${name} attribute:`}:</td>

                      <td>{`${formatPercentage(totalBleedDamageValue)} of damage`}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Bleed damage:</td>

                      <td>{formatToFixed(totalDamageValue * totalBleedDamageValue)}</td>
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
              damage: totalDamageValue,
              damageModifier: totalBleedDamageValue,
              damageModifierChance: totalBleedChanceValue,
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

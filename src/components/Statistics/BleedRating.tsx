import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { BLEED, CLASS_TABLE_CELL_ITALIC } from "@neverquest/constants";
import { MASTERIES } from "@neverquest/data/masteries";
import { ReactComponent as Icon } from "@neverquest/icons/bleeding-wound.svg";
import { skills } from "@neverquest/state/skills";
import { bleedChance, bleedDamage, damage } from "@neverquest/state/statistics";
import { MasteryType, SkillType } from "@neverquest/types/enums";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";
import { getDamagePerTick } from "@neverquest/utilities/getters";

export default function () {
  const bleedChanceValue = useRecoilValue(bleedChance);
  const bleedDamageValue = useRecoilValue(bleedDamage);
  const damageValue = useRecoilValue(damage);
  const bleedSkill = useRecoilValue(skills(SkillType.Bleed));

  const { duration, ticks } = BLEED;
  const { name } = MASTERIES[MasteryType.BleedDamage];
  const bleedPerTick = Math.round(
    getDamagePerTick({
      damage: damageValue,
      duration,
      proportion: bleedDamageValue,
      ticks,
    }) *
      bleedChanceValue *
      100
  );

  if (!bleedSkill) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <OverlayTrigger
          overlay={
            <Popover>
              <Popover.Header as="h4">Bleed rating details</Popover.Header>

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

                      <td>{`${Math.ceil(
                        damageValue * bleedDamageValue
                      )} (${bleedPerTick} per tick)`}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Duration:</td>

                      <td>{formatMilliseconds(duration)}</td>
                    </tr>
                  </tbody>
                </Table>
              </Popover.Body>
            </Popover>
          }
          placement="top"
        >
          <span>{bleedPerTick}</span>
        </OverlayTrigger>
      }
      Icon={Icon}
      isAnimated
      tooltip="Bleed rating"
    />
  );
}

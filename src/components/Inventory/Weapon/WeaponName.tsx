import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { CLASS_TABLE_CELL_ITALIC, UNKNOWN } from "@neverquest/constants";
import { WEAPON_ICONS } from "@neverquest/data/gear";
import { hasKnapsack } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { isShowingDamagePerSecond } from "@neverquest/state/settings";
import { skills } from "@neverquest/state/skills";
import { Weapon } from "@neverquest/types";
import { ShowingType } from "@neverquest/types/enums";
import {
  capitalizeAll,
  formatMilliseconds,
  formatPercentage,
} from "@neverquest/utilities/formatters";
import { getDamagePerRate, getSkillTypeFromWeaponClass } from "@neverquest/utilities/getters";

export default function ({ weapon }: { weapon: Weapon }) {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const isShowingDamagePerSecondValue = useRecoilValue(isShowingDamagePerSecond);
  const showStaminaValue = useRecoilValue(isShowing(ShowingType.Stamina));

  const { abilityChance, damage, name, rate, staminaCost, weaponClass, weight } = weapon;
  const Icon = WEAPON_ICONS[weaponClass];

  const skillType = getSkillTypeFromWeaponClass(weaponClass);
  const showWeaponClass = useRecoilValue(skills(skillType));

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <Table borderless size="sm" style={{ margin: 0 }}>
              <tbody>
                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Damage:</td>

                  <td>{`${damage}${
                    isShowingDamagePerSecondValue
                      ? ` (${getDamagePerRate({
                          damage,
                          rate,
                        })} DPS)`
                      : ""
                  }`}</td>
                </tr>

                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Attack rate:</td>

                  <td>{formatMilliseconds(rate)}</td>
                </tr>

                <tr>
                  {showStaminaValue ? (
                    <>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Stamina cost:</td>

                      <td>{staminaCost}</td>
                    </>
                  ) : (
                    <td className="text-end">{UNKNOWN}</td>
                  )}
                </tr>

                {showWeaponClass ? (
                  <>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Class:</td>

                      <td>
                        <Icon width={16} />
                        &nbsp;{capitalizeAll(weaponClass)}
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>{skillType} chance:</td>

                      <td>{formatPercentage(abilityChance)}</td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td className="text-end">{UNKNOWN}</td>
                  </tr>
                )}

                <tr>
                  {hasKnapsackValue ? (
                    <>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Weight:</td>

                      <td>{weight}</td>
                    </>
                  ) : (
                    <td className="text-end">{UNKNOWN}</td>
                  )}
                </tr>
              </tbody>
            </Table>
          </Popover.Body>
        </Popover>
      }
      placement="top"
    >
      <span>{name}</span>
    </OverlayTrigger>
  );
}

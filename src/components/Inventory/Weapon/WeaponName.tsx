import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/data/constants";
import { type WEAPON_NONE, WEAPON_SPECIFICATIONS } from "@neverquest/data/gear";
import { ReactComponent as IconDamagePerSecond } from "@neverquest/icons/damage-per-second.svg";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { ReactComponent as IconGearLevel } from "@neverquest/icons/gear-level.svg";
import { ReactComponent as IconStaminaCost } from "@neverquest/icons/stamina-cost.svg";
import { ReactComponent as IconWeaponAttackRate } from "@neverquest/icons/weapon-attack-rate.svg";
import { ReactComponent as IconWeaponDamage } from "@neverquest/icons/weapon-damage.svg";
import { hasKnapsack } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { isShowingDamagePerSecond, isShowingGearLevel } from "@neverquest/state/settings";
import { skills } from "@neverquest/state/skills";
import type { Weapon } from "@neverquest/types";
import { ShowingType } from "@neverquest/types/enums";
import {
  capitalizeAll,
  formatMilliseconds,
  formatPercentage,
} from "@neverquest/utilities/formatters";
import { getDamagePerRate } from "@neverquest/utilities/getters";

export function WeaponName({
  placement = "top",
  weapon,
}: {
  placement?: Placement;
  weapon: Weapon | typeof WEAPON_NONE;
}) {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const isShowingDamagePerSecondValue = useRecoilValue(isShowingDamagePerSecond);
  const isShowingGearDetails = useRecoilValue(isShowing(ShowingType.GearDetails));
  const isShowingGearLevelValue = useRecoilValue(isShowingGearLevel);
  const isShowingStamina = useRecoilValue(isShowing(ShowingType.Stamina));

  const { abilityChance, damage, gearClass, level, name, rate, staminaCost, weight } = weapon;
  const { abilityName, IconAbility, IconGearClass, skillType } = WEAPON_SPECIFICATIONS[gearClass];

  const skillValue = useRecoilValue(skills(skillType));

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <DetailsTable>
              {isShowingGearLevelValue && (
                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Gear level:</td>

                  <td>
                    <IconGearLevel className="inlay" />
                    &nbsp;{level}
                  </td>
                </tr>
              )}

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Damage:</td>

                <td>
                  <IconWeaponDamage className="inlay" />
                  &nbsp;{damage}
                </td>
              </tr>

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Attack rate:</td>

                <td>
                  <IconWeaponAttackRate className="inlay" />
                  &nbsp;{formatMilliseconds(rate)}
                </td>
              </tr>

              {isShowingDamagePerSecondValue && (
                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Damage per second:</td>

                  <td>
                    <IconDamagePerSecond className="inlay" />
                    &nbsp;
                    {getDamagePerRate({
                      damage,
                      rate,
                    })}
                  </td>
                </tr>
              )}

              <tr>
                {isShowingStamina ? (
                  <>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Stamina cost:</td>

                    <td>
                      <IconStaminaCost className="inlay" />
                      &nbsp;{staminaCost}
                    </td>
                  </>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                )}
              </tr>

              <tr>
                {isShowingGearDetails ? (
                  <>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Class:</td>

                    <td>
                      <IconGearClass className="inlay" />
                      &nbsp;{capitalizeAll(gearClass)}
                    </td>
                  </>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                )}
              </tr>

              {skillValue ? (
                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>{abilityName} chance:</td>

                  <td>
                    <IconAbility className="inlay" />
                    &nbsp;{formatPercentage(abilityChance)}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                </tr>
              )}

              <tr>
                {hasKnapsackValue ? (
                  <>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Weight:</td>

                    <td>
                      <IconEncumbrance className="inlay" />
                      &nbsp;{weight}
                    </td>
                  </>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                )}
              </tr>
            </DetailsTable>
          </Popover.Body>
        </Popover>
      }
      placement={placement}
    >
      <span>{name}</span>
    </OverlayTrigger>
  );
}

import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { GearComparison } from "@neverquest/components/Inventory/GearComparison";
import { GearLevelDetail } from "@neverquest/components/Inventory/GearLevelDetail";
import { StaminaCostDetail } from "@neverquest/components/Inventory/StaminaCostDetail";
import { WeightDetail } from "@neverquest/components/Inventory/WeightDetail";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/data/constants";
import { type WEAPON_NONE, WEAPON_SPECIFICATIONS } from "@neverquest/data/gear";
import { ReactComponent as IconDamagePerSecond } from "@neverquest/icons/damage-per-second.svg";
import { ReactComponent as IconWeaponAttackRate } from "@neverquest/icons/weapon-attack-rate.svg";
import { ReactComponent as IconWeaponDamage } from "@neverquest/icons/weapon-damage.svg";
import { weapon as weaponEquipped } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { showDamagePerSecond } from "@neverquest/state/settings";
import { skills } from "@neverquest/state/skills";
import type { Weapon } from "@neverquest/types";
import { ShowingType } from "@neverquest/types/enums";
import {
  capitalizeAll,
  formatMilliseconds,
  formatPercentage,
  formatToFixed,
} from "@neverquest/utilities/formatters";
import { getDamagePerRate } from "@neverquest/utilities/getters";

export function WeaponName({
  placement,
  weapon,
}: {
  placement?: Placement;
  weapon: Weapon | typeof WEAPON_NONE;
}) {
  const isShowingGearClass = useRecoilValue(isShowing(ShowingType.GearClass));
  const showDamagePerSecondValue = useRecoilValue(showDamagePerSecond);
  const weaponEquippedValue = useRecoilValue(weaponEquipped);

  const { abilityChance, damage, gearClass, level, name, rate, staminaCost, weight } = weapon;
  const { abilityName, IconAbility, IconGearClass, skillType } = WEAPON_SPECIFICATIONS[gearClass];
  const damagePerSecond = getDamagePerRate({
    damage,
    rate,
  });
  const isEquipped = JSON.stringify(weaponEquippedValue) === JSON.stringify(weapon);

  const skillValue = useRecoilValue(skills(skillType));

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <DetailsTable>
              <GearLevelDetail
                comparison={
                  isEquipped
                    ? null
                    : { showingType: ShowingType.Weapon, subtrahend: weaponEquippedValue.level }
                }
                level={level}
              />

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Damage:</td>

                <td>
                  <IconImage Icon={IconWeaponDamage} isSmall />
                  &nbsp;{damage}
                  {!isEquipped && (
                    <GearComparison
                      difference={damage - weaponEquippedValue.damage}
                      showingType={ShowingType.Weapon}
                    />
                  )}
                </td>
              </tr>

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Attack rate:</td>

                <td>
                  <IconImage Icon={IconWeaponAttackRate} isSmall />
                  &nbsp;{formatMilliseconds(rate)}
                  {!isEquipped && (
                    <GearComparison
                      difference={rate - weaponEquippedValue.rate}
                      isDownPositive
                      showingType={ShowingType.Weapon}
                    />
                  )}
                </td>
              </tr>

              {showDamagePerSecondValue && (
                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Damage per second:</td>

                  <td>
                    <IconImage Icon={IconDamagePerSecond} isSmall />
                    &nbsp;
                    {formatToFixed(damagePerSecond)}
                    {!isEquipped && (
                      <GearComparison
                        difference={
                          damagePerSecond -
                          getDamagePerRate({
                            damage: weaponEquippedValue.damage,
                            rate: weaponEquippedValue.rate,
                          })
                        }
                        showingType={ShowingType.Weapon}
                      />
                    )}
                  </td>
                </tr>
              )}

              <StaminaCostDetail
                comparison={
                  isEquipped
                    ? null
                    : {
                        showingType: ShowingType.Weapon,
                        subtrahend: weaponEquippedValue.staminaCost,
                      }
                }
                cost={staminaCost}
              />

              <tr>
                {isShowingGearClass ? (
                  <>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Class:</td>

                    <td>
                      <IconImage Icon={IconGearClass} isSmall />
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
                    <IconImage Icon={IconAbility} isSmall />
                    &nbsp;{formatPercentage(abilityChance)}
                    {!isEquipped && (
                      <GearComparison
                        difference={abilityChance - weaponEquippedValue.abilityChance}
                        showingType={ShowingType.Weapon}
                      />
                    )}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                </tr>
              )}

              <WeightDetail
                comparison={
                  isEquipped
                    ? null
                    : { showingType: ShowingType.Weapon, subtrahend: weaponEquippedValue.weight }
                }
                weight={weight}
              />
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

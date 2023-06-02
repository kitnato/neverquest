import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { GearComparison } from "@neverquest/components/Inventory/GearComparison";
import { GearLevelDetail } from "@neverquest/components/Inventory/GearLevelDetail";
import { StaminaCostDetail } from "@neverquest/components/Inventory/StaminaCostDetail";
import { WeightDetail } from "@neverquest/components/Inventory/WeightDetail";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { type WEAPON_NONE, WEAPON_SPECIFICATIONS } from "@neverquest/data/inventory";
import { ReactComponent as IconWeaponAttackRate } from "@neverquest/icons/weapon-attack-rate.svg";
import { ReactComponent as IconWeaponDamagePerSecond } from "@neverquest/icons/weapon-damage-per-second.svg";
import { ReactComponent as IconWeaponDamage } from "@neverquest/icons/weapon-damage.svg";
import { weapon as weaponEquipped } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { showDamagePerSecond } from "@neverquest/state/settings";
import type { Weapon } from "@neverquest/types";
import { Showing } from "@neverquest/types/enums";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/utilities/constants";
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
  const isShowingGearClass = useRecoilValue(isShowing(Showing.GearClass));
  const showDamagePerSecondValue = useRecoilValue(showDamagePerSecond);
  const weaponEquippedValue = useRecoilValue(weaponEquipped);

  const { abilityChance, damage, gearClass, level, name, rate, staminaCost, weight } = weapon;
  const { abilityName, IconAbility, IconGearClass, showingType } = WEAPON_SPECIFICATIONS[gearClass];
  const damagePerSecond = getDamagePerRate({
    damage,
    rate,
  });
  const isEquipped = JSON.stringify(weaponEquippedValue) === JSON.stringify(weapon);

  const isShowingAbility = useRecoilValue(isShowing(showingType));

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
                    : { showingType: Showing.Weapon, subtrahend: weaponEquippedValue.level }
                }
                level={level}
              />

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Damage:</td>

                <td>
                  <IconImage Icon={IconWeaponDamage} size="tiny" />
                  &nbsp;{damage}
                  {!isEquipped && (
                    <GearComparison
                      difference={damage - weaponEquippedValue.damage}
                      showingType={Showing.Weapon}
                    />
                  )}
                </td>
              </tr>

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Attack rate:</td>

                <td>
                  <IconImage Icon={IconWeaponAttackRate} size="tiny" />
                  &nbsp;{formatMilliseconds(rate)}
                  {!isEquipped && (
                    <GearComparison
                      difference={rate - weaponEquippedValue.rate}
                      isDownPositive
                      showingType={Showing.Weapon}
                    />
                  )}
                </td>
              </tr>

              {showDamagePerSecondValue && (
                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Damage per second:</td>

                  <td>
                    <IconImage Icon={IconWeaponDamagePerSecond} size="tiny" />
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
                        showingType={Showing.Weapon}
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
                        showingType: Showing.Weapon,
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
                      <IconImage Icon={IconGearClass} size="tiny" />
                      &nbsp;{capitalizeAll(gearClass)}
                    </td>
                  </>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                )}
              </tr>

              <tr>
                {isShowingAbility ? (
                  <>
                    <td className={CLASS_TABLE_CELL_ITALIC}>{abilityName} chance:</td>

                    <td>
                      <IconImage Icon={IconAbility} size="tiny" />
                      &nbsp;{formatPercentage(abilityChance)}
                      {!isEquipped && (
                        <GearComparison
                          difference={abilityChance - weaponEquippedValue.abilityChance}
                          showingType={Showing.Weapon}
                        />
                      )}
                    </td>
                  </>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                )}
              </tr>

              <WeightDetail
                comparison={
                  isEquipped
                    ? null
                    : { showingType: Showing.Weapon, subtrahend: weaponEquippedValue.weight }
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

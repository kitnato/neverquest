import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconImage } from "@neverquest/components/IconImage";
import { AppliedGems } from "@neverquest/components/Items/AppliedGems";
import { GearComparison } from "@neverquest/components/Items/GearComparison";
import { GearLevelDetail } from "@neverquest/components/Items/GearLevelDetail";
import { StaminaCostDetail } from "@neverquest/components/Items/StaminaCostDetail";
import { WeightDetail } from "@neverquest/components/Items/WeightDetail";
import { type WEAPON_NONE, WEAPON_SPECIFICATIONS } from "@neverquest/data/inventory";
import { ReactComponent as IconWeaponAttackRate } from "@neverquest/icons/weapon-attack-rate.svg";
import { ReactComponent as IconWeaponDamagePerSecond } from "@neverquest/icons/weapon-damage-per-second.svg";
import { ReactComponent as IconWeaponDamage } from "@neverquest/icons/weapon-damage.svg";
import { weapon as weaponEquipped } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { showDamagePerSecond } from "@neverquest/state/settings";
import type { Weapon } from "@neverquest/types";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import {
  capitalizeAll,
  formatFloat,
  formatMilliseconds,
  formatPercentage,
} from "@neverquest/utilities/formatters";
import { getDamagePerRate } from "@neverquest/utilities/getters";

export function WeaponName({
  placement,
  weapon,
}: {
  placement?: Placement;
  weapon: Weapon | typeof WEAPON_NONE;
}) {
  const isShowingGearClass = useRecoilValue(isShowing("gearClass"));
  const showDamagePerSecondValue = useRecoilValue(showDamagePerSecond);
  const weaponEquippedValue = useRecoilValue(weaponEquipped);

  const { abilityChance, damage, gearClass, level, name, rate, staminaCost, weight } = weapon;
  const { abilityName, IconAbility, IconGearClass, showingType } = WEAPON_SPECIFICATIONS[gearClass];
  const damagePerSecond = getDamagePerRate({
    damage,
    rate,
  });
  const showComparison = weaponEquippedValue.id !== weapon.id;

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
                  showComparison
                    ? { showingType: "weapon", subtrahend: weaponEquippedValue.level }
                    : null
                }
                level={level}
              />

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Damage:</td>

                <td>
                  <IconImage Icon={IconWeaponDamage} size="tiny" />
                  &nbsp;{damage}
                  {showComparison && (
                    <GearComparison
                      difference={damage - weaponEquippedValue.damage}
                      showingType="weapon"
                    />
                  )}
                </td>
              </tr>

              <AppliedGems slot="weapon" />

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Attack rate:</td>

                <td>
                  <IconImage Icon={IconWeaponAttackRate} size="tiny" />
                  &nbsp;{formatMilliseconds(rate)}
                  {showComparison && (
                    <GearComparison
                      difference={rate - weaponEquippedValue.rate}
                      isDownPositive
                      showingType="weapon"
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
                    {formatFloat(damagePerSecond)}
                    {showComparison && (
                      <GearComparison
                        difference={
                          damagePerSecond -
                          getDamagePerRate({
                            damage: weaponEquippedValue.damage,
                            rate: weaponEquippedValue.rate,
                          })
                        }
                        showingType="weapon"
                      />
                    )}
                  </td>
                </tr>
              )}

              <StaminaCostDetail
                comparison={
                  showComparison
                    ? {
                        showingType: "weapon",
                        subtrahend: weaponEquippedValue.staminaCost,
                      }
                    : null
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
                      {showComparison && (
                        <GearComparison
                          difference={abilityChance - weaponEquippedValue.abilityChance}
                          showingType="weapon"
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
                  showComparison
                    ? { showingType: "weapon", subtrahend: weaponEquippedValue.weight }
                    : null
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
import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconImage } from "@neverquest/components/IconImage";
import { AppliedGems } from "@neverquest/components/Inventory/AppliedGems";
import { GearComparison } from "@neverquest/components/Inventory/GearComparison";
import { GearLevelDetail } from "@neverquest/components/Inventory/GearLevelDetail";
import { StaminaCostDetail } from "@neverquest/components/Inventory/StaminaCostDetail";
import { WeightDetail } from "@neverquest/components/Inventory/WeightDetail";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/data/general";
import { WEAPON_NONE, WEAPON_SPECIFICATIONS } from "@neverquest/data/inventory";
import { WEAPON_ABILITY_SKILLS } from "@neverquest/data/skills";
import IconAmmunition from "@neverquest/icons/ammunition.svg?react";
import IconGrip from "@neverquest/icons/grip.svg?react";
import IconWeaponAttackRate from "@neverquest/icons/weapon-attack-rate.svg?react";
import IconWeaponDamagePerSecond from "@neverquest/icons/weapon-damage-per-second.svg?react";
import IconWeaponDamage from "@neverquest/icons/weapon-damage.svg?react";
import { weapon as weaponEquipped } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { showDamagePerSecond } from "@neverquest/state/settings";
import { isSkillAcquired } from "@neverquest/state/skills";
import type { Weapon } from "@neverquest/types";
import { isMelee, isRanged } from "@neverquest/types/type-guards";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";
import { getDamagePerRate } from "@neverquest/utilities/getters";

export function WeaponName({
  placement,
  weapon,
}: {
  placement?: Placement;
  weapon: Weapon | typeof WEAPON_NONE;
}) {
  const isShowingGearClass = useRecoilValue(isShowing("gearClass"));
  const isShowingGrip = useRecoilValue(isShowing("grip"));
  const showDamagePerSecondValue = useRecoilValue(showDamagePerSecond);
  const weaponEquippedValue = useRecoilValue(weaponEquipped);

  const { abilityChance, damage, gearClass, level, name, rate, staminaCost, weight } = weapon;
  const { ability, IconAbility, IconGearClass } = WEAPON_SPECIFICATIONS[gearClass];
  const damagePerSecond = getDamagePerRate({
    damage,
    rate,
  });
  const isUnarmed = weapon.name === WEAPON_NONE.name;
  const showComparison = weaponEquippedValue.ID !== weapon.ID;

  const skillValue = useRecoilValue(isSkillAcquired(WEAPON_ABILITY_SKILLS[ability]));

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <PopoverHeader className="text-center">{name}</PopoverHeader>

          <PopoverBody>
            <DetailsTable>
              <GearLevelDetail
                comparison={
                  showComparison
                    ? { showing: "weapon", subtrahend: weaponEquippedValue.level }
                    : null
                }
                level={level}
              />

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Damage:</td>

                <td>
                  <Stack direction="horizontal" gap={1}>
                    <IconImage Icon={IconWeaponDamage} size="small" />

                    {formatNumber({ value: damage })}

                    {showComparison && (
                      <GearComparison
                        difference={damage - weaponEquippedValue.damage}
                        showing="weapon"
                      />
                    )}
                  </Stack>
                </td>
              </tr>

              <AppliedGems gearItem={weapon} />

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Attack rate:</td>

                <td>
                  <Stack direction="horizontal" gap={1}>
                    <IconImage Icon={IconWeaponAttackRate} size="small" />

                    {formatNumber({ format: "time", value: rate })}

                    {showComparison && (
                      <GearComparison
                        difference={rate - weaponEquippedValue.rate}
                        isDownPositive
                        showing="weapon"
                      />
                    )}
                  </Stack>
                </td>
              </tr>

              {showDamagePerSecondValue && (
                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Damage per second:</td>

                  <td>
                    <Stack direction="horizontal" gap={1}>
                      <IconImage Icon={IconWeaponDamagePerSecond} size="small" />

                      {formatNumber({ format: "float", value: damagePerSecond })}

                      {showComparison && (
                        <GearComparison
                          difference={
                            damagePerSecond -
                            getDamagePerRate({
                              damage: weaponEquippedValue.damage,
                              rate: weaponEquippedValue.rate,
                            })
                          }
                          showing="weapon"
                        />
                      )}
                    </Stack>
                  </td>
                </tr>
              )}

              {isMelee(weapon) && isShowingGrip && (
                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Grip:</td>

                  <td>
                    <Stack direction="horizontal" gap={1}>
                      <IconImage Icon={IconGrip} size="small" />

                      {capitalizeAll(weapon.grip)}
                    </Stack>
                  </td>
                </tr>
              )}

              {isRanged(weapon) && (
                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Ammunition cost:</td>

                  <td>
                    <Stack direction="horizontal" gap={1}>
                      <IconImage Icon={IconAmmunition} size="small" />

                      {formatNumber({ value: weapon.ammunitionCost })}
                    </Stack>
                  </td>
                </tr>
              )}

              <StaminaCostDetail
                comparison={
                  showComparison
                    ? {
                        showing: "weapon",
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
                      <Stack direction="horizontal" gap={1}>
                        <IconImage Icon={IconGearClass} size="small" />

                        {capitalizeAll(gearClass)}
                      </Stack>
                    </td>
                  </>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                )}
              </tr>

              <tr>
                {skillValue ? (
                  <>
                    <td className={CLASS_TABLE_CELL_ITALIC}>{capitalizeAll(ability)} chance:</td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage Icon={IconAbility} size="small" />

                        {formatNumber({ format: "percentage", value: abilityChance })}

                        {showComparison && gearClass === weaponEquippedValue.gearClass && (
                          <GearComparison
                            difference={abilityChance - weaponEquippedValue.abilityChance}
                            showing="weapon"
                          />
                        )}
                      </Stack>
                    </td>
                  </>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                )}
              </tr>

              {!isUnarmed && (
                <WeightDetail
                  comparison={
                    showComparison
                      ? { showing: "weapon", subtrahend: weaponEquippedValue.weight }
                      : null
                  }
                  weight={weight}
                />
              )}
            </DetailsTable>
          </PopoverBody>
        </Popover>
      }
      placement={placement}
    >
      <span>{name}</span>
    </OverlayTrigger>
  );
}

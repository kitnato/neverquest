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
import { type WEAPON_NONE, WEAPON_SPECIFICATIONS } from "@neverquest/data/gear";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/data/general";
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
import { isMelee, isRanged, isUnarmed } from "@neverquest/types/type-guards";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";
import { getDamagePerRate } from "@neverquest/utilities/getters";

export function WeaponName({
  overlayPlacement,
  weapon,
}: {
  overlayPlacement: Placement;
  weapon: Weapon | typeof WEAPON_NONE;
}) {
  const isShowingGearClass = useRecoilValue(isShowing("gearClass"));
  const isShowingGrip = useRecoilValue(isShowing("grip"));
  const showDamagePerSecondValue = useRecoilValue(showDamagePerSecond);
  const weaponEquippedValue = useRecoilValue(weaponEquipped);

  const { abilityChance, damage, gearClass, ID, level, name, rate, staminaCost, weight } = weapon;
  const { ability, IconAbility, IconGearClass } = WEAPON_SPECIFICATIONS[gearClass];
  const damagePerSecond = getDamagePerRate({
    damage,
    rate,
  });
  const showComparison = ID !== weaponEquippedValue.ID;

  const skillValue = useRecoilValue(isSkillAcquired(WEAPON_ABILITY_SKILLS[ability]));

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <PopoverHeader className="text-center">
            <span>{name}</span>
          </PopoverHeader>

          <PopoverBody>
            <DetailsTable>
              <GearLevelDetail
                comparison={
                  showComparison && {
                    showing: "weapon",
                    subtrahend: weaponEquippedValue.level,
                  }
                }
                level={level}
              />

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>
                  <span>Damage:</span>
                </td>

                <td>
                  <Stack direction="horizontal" gap={1}>
                    <IconImage className="small" Icon={IconWeaponDamage} />

                    <span>{formatNumber({ value: damage })}</span>

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
                <td className={CLASS_TABLE_CELL_ITALIC}>
                  <span>Attack rate:</span>
                </td>

                <td>
                  <Stack direction="horizontal" gap={1}>
                    <IconImage className="small" Icon={IconWeaponAttackRate} />

                    <span>{formatNumber({ format: "time", value: rate })}</span>

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
                  <td className={CLASS_TABLE_CELL_ITALIC}>
                    <span>Damage per second:</span>
                  </td>

                  <td>
                    <Stack direction="horizontal" gap={1}>
                      <IconImage className="small" Icon={IconWeaponDamagePerSecond} />

                      <span>{formatNumber({ format: "float", value: damagePerSecond })}</span>

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
                  <td className={CLASS_TABLE_CELL_ITALIC}>
                    <span>Grip:</span>
                  </td>

                  <td>
                    <Stack direction="horizontal" gap={1}>
                      <IconImage className="small" Icon={IconGrip} />

                      {/* eslint-disable-next-line unicorn/consistent-destructuring */}
                      <span>{capitalizeAll(weapon.grip)}</span>
                    </Stack>
                  </td>
                </tr>
              )}

              {isRanged(weapon) && (
                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>
                    <span>Ammunition cost:</span>
                  </td>

                  <td>
                    <Stack direction="horizontal" gap={1}>
                      <IconImage className="small" Icon={IconAmmunition} />

                      {/* eslint-disable-next-line unicorn/consistent-destructuring */}
                      <span>{formatNumber({ value: weapon.ammunitionCost })}</span>
                    </Stack>
                  </td>
                </tr>
              )}

              <StaminaCostDetail
                comparison={
                  showComparison && {
                    showing: "weapon",
                    subtrahend: weaponEquippedValue.staminaCost,
                  }
                }
                cost={staminaCost}
              />

              <tr>
                {isShowingGearClass ? (
                  <>
                    <td className={CLASS_TABLE_CELL_ITALIC}>
                      <span>Class:</span>
                    </td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage className="small" Icon={IconGearClass} />

                        <span>{capitalizeAll(gearClass)}</span>
                      </Stack>
                    </td>
                  </>
                ) : (
                  <td className="text-end">
                    <span>{LABEL_UNKNOWN}</span>
                  </td>
                )}
              </tr>

              <tr>
                {skillValue ? (
                  <>
                    <td className={CLASS_TABLE_CELL_ITALIC}>
                      <span>{capitalizeAll(ability)} chance:</span>
                    </td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage className="small" Icon={IconAbility} />

                        <span>{formatNumber({ format: "percentage", value: abilityChance })}</span>

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
                  <td className="text-end">
                    <span>{LABEL_UNKNOWN}</span>
                  </td>
                )}
              </tr>

              {!isUnarmed(weapon) && (
                <WeightDetail
                  comparison={
                    showComparison && { showing: "weapon", subtrahend: weaponEquippedValue.weight }
                  }
                  weight={weight}
                />
              )}
            </DetailsTable>
          </PopoverBody>
        </Popover>
      }
      placement={overlayPlacement}
    >
      <span>{name}&nbsp;</span>
    </OverlayTrigger>
  );
}

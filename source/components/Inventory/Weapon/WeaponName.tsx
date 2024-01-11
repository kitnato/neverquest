import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { AppliedGems } from "@neverquest/components/Inventory/AppliedGems";
import { BurdenDetail } from "@neverquest/components/Inventory/BurdenDetail";
import { GearComparison } from "@neverquest/components/Inventory/GearComparison";
import { GearLevelDetail } from "@neverquest/components/Inventory/GearLevelDetail";
import { WeightDetail } from "@neverquest/components/Inventory/WeightDetail";
import { type WEAPON_NONE, WEAPON_SPECIFICATIONS } from "@neverquest/data/gear";
import { LABEL_UNKNOWN } from "@neverquest/data/general";
import { WEAPON_ABILITY_SKILLS } from "@neverquest/data/skills";
import IconAmmunition from "@neverquest/icons/ammunition.svg?react";
import IconGrip from "@neverquest/icons/grip.svg?react";
import IconWeaponAttackRate from "@neverquest/icons/weapon-attack-rate.svg?react";
import IconWeaponDamagePerSecond from "@neverquest/icons/weapon-damage-per-second.svg?react";
import IconWeaponDamage from "@neverquest/icons/weapon-damage.svg?react";
import { bleedChance, stunChance } from "@neverquest/state/ailments";
import { weapon as weaponEquipped } from "@neverquest/state/gear";
import { ownedItem } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { isSkillAcquired } from "@neverquest/state/skills";
import { parryChance } from "@neverquest/state/statistics";
import type { Weapon } from "@neverquest/types";
import { isMelee, isRanged, isUnarmed } from "@neverquest/types/type-guards";
import type { WeaponAbility } from "@neverquest/types/unions";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";
import { getDamagePerRate } from "@neverquest/utilities/getters";

export function WeaponName({
  overlayPlacement,
  weapon,
}: {
  overlayPlacement: Placement;
  weapon: Weapon | typeof WEAPON_NONE;
}) {
  const abilityChances: Record<WeaponAbility, number> = {
    bleed: useRecoilValue(bleedChance),
    parry: useRecoilValue(parryChance),
    stun: useRecoilValue(stunChance),
  };
  const isShowingGearClass = useRecoilValue(isShowing("gearClass"));
  const isShowingGrip = useRecoilValue(isShowing("grip"));
  const ownedItemThaumaturgicGoggles = useRecoilValue(ownedItem("thaumaturgic goggles"));
  const weaponEquippedValue = useRecoilValue(weaponEquipped);

  const { abilityChance, burden, damage, gearClass, ID, level, name, rate, weight } = weapon;
  const { ability, IconAbility, IconGearClass } = WEAPON_SPECIFICATIONS[gearClass];
  const damagePerSecond = getDamagePerRate({
    damage,
    rate,
  });
  const isEquipped = ID === weaponEquippedValue.ID;

  const isSkillAcquiredAbility = useRecoilValue(isSkillAcquired(WEAPON_ABILITY_SKILLS[ability]));

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <PopoverBody>
            <DetailsTable>
              <GearLevelDetail
                comparison={
                  !isEquipped && {
                    showing: "weapon",
                    subtrahend: weaponEquippedValue.level,
                  }
                }
                level={level}
              />

              <tr>
                <td>
                  <span>Damage:</span>
                </td>

                <td>
                  <Stack direction="horizontal" gap={1}>
                    <IconDisplay Icon={IconWeaponDamage} iconProps={{ className: "small" }}>
                      <span>{formatNumber({ value: damage })}</span>
                    </IconDisplay>

                    {!isEquipped && (
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
                <td>
                  <span>Attack rate:</span>
                </td>

                <td>
                  <Stack direction="horizontal" gap={1}>
                    <IconDisplay Icon={IconWeaponAttackRate} iconProps={{ className: "small" }}>
                      <span>{formatNumber({ format: "time", value: rate })}</span>
                    </IconDisplay>

                    {!isEquipped && (
                      <GearComparison
                        difference={rate - weaponEquippedValue.rate}
                        lowerIsPositive
                        showing="weapon"
                      />
                    )}
                  </Stack>
                </td>
              </tr>

              {ownedItemThaumaturgicGoggles !== undefined && (
                <tr>
                  <td>
                    <span>Damage per second:</span>
                  </td>

                  <td>
                    <Stack direction="horizontal" gap={1}>
                      <IconDisplay
                        Icon={IconWeaponDamagePerSecond}
                        iconProps={{ className: "small" }}
                      >
                        <span>{formatNumber({ format: "float", value: damagePerSecond })}</span>
                      </IconDisplay>

                      {!isEquipped && (
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
                  <td>
                    <span>Grip:</span>
                  </td>

                  <td>
                    <IconDisplay Icon={IconGrip} iconProps={{ className: "small" }}>
                      {/* eslint-disable-next-line unicorn/consistent-destructuring */}
                      <span>{capitalizeAll(weapon.grip)}</span>
                    </IconDisplay>
                  </td>
                </tr>
              )}

              {isRanged(weapon) && (
                <tr>
                  <td>
                    <span>Ammunition cost:</span>
                  </td>

                  <td>
                    <IconDisplay Icon={IconAmmunition} iconProps={{ className: "small" }}>
                      {/* eslint-disable-next-line unicorn/consistent-destructuring */}
                      <span>{formatNumber({ value: weapon.ammunitionCost })}</span>
                    </IconDisplay>
                  </td>
                </tr>
              )}

              <BurdenDetail
                burden={burden}
                comparison={
                  !isEquipped && {
                    showing: "weapon",
                    subtrahend: weaponEquippedValue.burden,
                  }
                }
              />

              <tr>
                {isShowingGearClass ? (
                  <>
                    <td>
                      <span>Class:</span>
                    </td>

                    <td>
                      <IconDisplay Icon={IconGearClass} iconProps={{ className: "small" }}>
                        <span>{capitalizeAll(gearClass)}</span>
                      </IconDisplay>
                    </td>
                  </>
                ) : (
                  <td className="text-end">
                    <span>{LABEL_UNKNOWN}</span>
                  </td>
                )}
              </tr>

              <tr>
                {isSkillAcquiredAbility ? (
                  <>
                    <td>
                      <span>{capitalizeAll(ability)} chance:</span>
                    </td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <IconDisplay Icon={IconAbility} iconProps={{ className: "small" }}>
                          <span>
                            {formatNumber({
                              format: "percentage",
                              value: isEquipped ? abilityChances[ability] : abilityChance,
                            })}
                          </span>
                        </IconDisplay>

                        {!isEquipped && gearClass === weaponEquippedValue.gearClass && (
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
                    !isEquipped && { showing: "weapon", subtrahend: weaponEquippedValue.weight }
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

import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
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
import { WEAPON_ABILITY_SKILLS } from "@neverquest/data/skills";
import { ReactComponent as IconAmmunition } from "@neverquest/icons/ammunition.svg";
import { ReactComponent as IconGrip } from "@neverquest/icons/grip.svg";
import { ReactComponent as IconWeaponAttackRate } from "@neverquest/icons/weapon-attack-rate.svg";
import { ReactComponent as IconWeaponDamagePerSecond } from "@neverquest/icons/weapon-damage-per-second.svg";
import { ReactComponent as IconWeaponDamage } from "@neverquest/icons/weapon-damage.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { weapon as weaponEquipped } from "@neverquest/state/items";
import { showDamagePerSecond } from "@neverquest/state/settings";
import { skills } from "@neverquest/state/skills";
import type { Weapon } from "@neverquest/types";
import { isMelee, isRanged } from "@neverquest/types/type-guards";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { capitalizeAll, formatValue } from "@neverquest/utilities/formatters";
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
  const { ability, IconAbility, IconGearClass } = WEAPON_SPECIFICATIONS[gearClass];
  const damagePerSecond = getDamagePerRate({
    damage,
    rate,
  });
  const showComparison = weaponEquippedValue.id !== weapon.id;

  const skillValue = useRecoilValue(skills(WEAPON_ABILITY_SKILLS[ability]));

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
                    {damage}

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

                    {formatValue({ format: "time", value: rate })}

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

                      {formatValue({ format: "float", value: damagePerSecond })}

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

              {isMelee(weapon) && (
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
                      {weapon.ammunitionCost}
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

                        {formatValue({ format: "percentage", value: abilityChance })}

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

              <WeightDetail
                comparison={
                  showComparison
                    ? { showing: "weapon", subtrahend: weaponEquippedValue.weight }
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

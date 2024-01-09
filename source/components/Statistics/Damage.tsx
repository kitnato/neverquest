import { useEffect } from "react";
import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DamagePerSecond } from "@neverquest/components/Statistics/DamagePerSecond";
import { ElementalDetails } from "@neverquest/components/Statistics/ElementalDetails";
import { LABEL_SEPARATOR, POPOVER_TRIGGER } from "@neverquest/data/general";
import { BRAWLER_DAMAGE_BONUS } from "@neverquest/data/traits";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconBrawler from "@neverquest/icons/brawler.svg?react";
import IconBruiser from "@neverquest/icons/bruiser.svg?react";
import IconBurden from "@neverquest/icons/burden.svg?react";
import IconDamage from "@neverquest/icons/damage.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import IconStrength from "@neverquest/icons/strength.svg?react";
import IconTomeOfPower from "@neverquest/icons/tome-of-power.svg?react";
import IconWeaponDamage from "@neverquest/icons/weapon-damage.svg?react";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { shield, weapon } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { questProgress, questsBonus } from "@neverquest/state/quests";
import { stamina } from "@neverquest/state/reserves";
import { damage } from "@neverquest/state/statistics";
import { isTraitAcquired } from "@neverquest/state/traits";
import { isUnarmed, isUnshielded } from "@neverquest/types/type-guards";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getWeaponIcon } from "@neverquest/utilities/getters";

export function Damage() {
  const attributePowerBonusStrength = useRecoilValue(attributePowerBonus("strength"));
  const attributeStatisticStrength = useRecoilValue(attributeStatistic("strength"));
  const damageValue = useRecoilValue(damage);
  const isShowingDamage = useRecoilValue(isShowing("damage"));
  const isTraitAcquiredBrawler = useRecoilValue(isTraitAcquired("brawler"));
  const isTraitAcquiredBruiser = useRecoilValue(isTraitAcquired("bruiser"));
  const questsBonusDamage = useRecoilValue(questsBonus("damageBonus"));
  const shieldValue = useRecoilValue(shield);
  const staminaValue = useRecoilValue(stamina);
  const weaponValue = useRecoilValue(weapon);
  const resetQuestProgressDamage = useResetRecoilState(questProgress("damage"));

  const progressQuest = useProgressQuest();

  const { burden, damage: weaponDamage } = weaponValue;

  useDeltaText({
    delta: "damage",
    state: damage,
  });

  useEffect(() => {
    resetQuestProgressDamage();
    progressQuest({ amount: damageValue, quest: "damage" });
  }, [damageValue, progressQuest, resetQuestProgressDamage]);

  if (isShowingDamage) {
    return (
      <IconDisplay description={<DamagePerSecond />} Icon={IconDamage} tooltip="Total damage">
        <Stack direction="horizontal" gap={1}>
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td>
                        <IconDisplay
                          Icon={getWeaponIcon(weaponValue)}
                          iconProps={{ className: "small" }}
                        >
                          <span>{isUnarmed(weaponValue) ? "Base" : "Weapon"}:</span>
                        </IconDisplay>
                      </td>

                      <td>
                        <IconDisplay Icon={IconWeaponDamage} iconProps={{ className: "small" }}>
                          <span>{formatNumber({ value: weaponDamage })}</span>
                        </IconDisplay>
                      </td>
                    </tr>

                    <ElementalDetails slot="weapon" />

                    {attributeStatisticStrength > 0 && (
                      <tr>
                        <td>
                          <IconDisplay Icon={IconStrength} iconProps={{ className: "small" }}>
                            <span>Strength:</span>
                          </IconDisplay>
                        </td>

                        <td>
                          <Stack direction="horizontal" gap={1}>
                            <span>
                              +
                              {formatNumber({
                                value: attributeStatisticStrength,
                              })}
                            </span>

                            {attributePowerBonusStrength > 0 && (
                              <>
                                {LABEL_SEPARATOR}

                                <IconDisplay
                                  Icon={IconTomeOfPower}
                                  iconProps={{ className: "small" }}
                                >
                                  <span>
                                    {formatNumber({
                                      format: "multiplier",
                                      value: attributePowerBonusStrength,
                                    })}
                                  </span>
                                </IconDisplay>
                              </>
                            )}
                          </Stack>
                        </td>
                      </tr>
                    )}

                    {questsBonusDamage > 0 && (
                      <tr>
                        <td>
                          <span>Quest bonus:</span>
                        </td>

                        <td>
                          <IconDisplay Icon={IconDamage} iconProps={{ className: "small" }}>
                            <span>
                              +
                              {formatNumber({
                                decimals: 0,
                                format: "percentage",
                                value: questsBonusDamage,
                              })}
                            </span>
                          </IconDisplay>
                        </td>
                      </tr>
                    )}

                    {isTraitAcquiredBruiser && isUnarmed(weaponValue) && (
                      <tr>
                        <td>
                          <IconDisplay Icon={IconBruiser} iconProps={{ className: "small" }}>
                            <span>Bruiser:</span>
                          </IconDisplay>
                        </td>

                        <td>
                          <span>+{staminaValue}</span>
                        </td>
                      </tr>
                    )}

                    {isTraitAcquiredBrawler && isUnshielded(shieldValue) && (
                      <tr>
                        <td>
                          <IconDisplay Icon={IconBrawler} iconProps={{ className: "small" }}>
                            <span>Brawler:</span>
                          </IconDisplay>
                        </td>

                        <td>
                          <span>
                            +{formatNumber({ format: "percentage", value: BRAWLER_DAMAGE_BONUS })}
                          </span>
                        </td>
                      </tr>
                    )}

                    {burden > 0 && (
                      <tr>
                        <td>
                          <IconDisplay Icon={IconBurden} iconProps={{ className: "small" }}>
                            <span>On attack:</span>
                          </IconDisplay>
                        </td>

                        <td>
                          <IconDisplay Icon={IconStamina} iconProps={{ className: "small" }}>
                            <span>-{formatNumber({ value: burden })}</span>
                          </IconDisplay>
                        </td>
                      </tr>
                    )}
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
            trigger={burden > 0 || damageValue !== weaponDamage ? POPOVER_TRIGGER : []}
          >
            <span>{formatNumber({ value: damageValue })}</span>
          </OverlayTrigger>

          <DeltasDisplay delta="damage" />
        </Stack>
      </IconDisplay>
    );
  }
}

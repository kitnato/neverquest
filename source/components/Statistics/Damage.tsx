import { useEffect } from "react";
import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { DamagePerSecond } from "@neverquest/components/Statistics/DamagePerSecond";
import { ElementalDetails } from "@neverquest/components/Statistics/ElementalDetails";
import { CLASS_TABLE_CELL_ITALIC, LABEL_SEPARATOR } from "@neverquest/data/general";
import { BRAWLER_DAMAGE_BONUS } from "@neverquest/data/traits";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconBrawler from "@neverquest/icons/brawler.svg?react";
import IconBruiser from "@neverquest/icons/bruiser.svg?react";
import IconDamage from "@neverquest/icons/damage.svg?react";
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

export function Damage() {
  const attributePowerBonusStrength = useRecoilValue(attributePowerBonus("strength"));
  const attributeStatisticStrength = useRecoilValue(attributeStatistic("strength"));
  const damageValue = useRecoilValue(damage);
  const isShowingDamageDetails = useRecoilValue(isShowing("damageDetails"));
  const isTraitAcquiredBrawler = useRecoilValue(isTraitAcquired("brawler"));
  const isTraitAcquiredBruiser = useRecoilValue(isTraitAcquired("bruiser"));
  const questsBonusDamage = useRecoilValue(questsBonus("damageBonus"));
  const shieldValue = useRecoilValue(shield);
  const staminaValue = useRecoilValue(stamina);
  const weaponValue = useRecoilValue(weapon);
  const resetQuestProgressDamage = useResetRecoilState(questProgress("damage"));

  const progressQuest = useProgressQuest();

  const { damage: weaponDamage, gems } = weaponValue;

  useDeltaText({
    delta: "damage",
    state: damage,
  });

  useEffect(() => {
    resetQuestProgressDamage();
    progressQuest({ amount: damageValue, quest: "damage" });
  }, [damageValue, progressQuest, resetQuestProgressDamage]);

  return (
    <IconDisplay description={<DamagePerSecond />} Icon={IconDamage} tooltip="Total damage">
      <Stack direction="horizontal" gap={1}>
        <OverlayTrigger
          overlay={
            <Popover>
              <PopoverHeader className="text-center">
                <span>Total damage details</span>
              </PopoverHeader>

              <PopoverBody>
                <DetailsTable>
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>
                      <span>Weapon:</span>
                    </td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage className="small" Icon={IconWeaponDamage} />

                        <span>{formatNumber({ value: weaponDamage })}</span>
                      </Stack>
                    </td>
                  </tr>

                  {gems.length > 0 && <ElementalDetails slot="weapon" />}

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage className="small" Icon={IconStrength} />

                        <span>Strength:</span>
                      </Stack>
                    </td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <span>
                          +
                          {formatNumber({
                            decimals: 0,
                            format: "percentage",
                            value: attributeStatisticStrength,
                          })}
                        </span>

                        {attributePowerBonusStrength > 0 && (
                          <>
                            {LABEL_SEPARATOR}

                            <IconImage className="small" Icon={IconTomeOfPower} />

                            <span>
                              {formatNumber({
                                format: "multiplier",
                                value: attributePowerBonusStrength,
                              })}
                            </span>
                          </>
                        )}
                      </Stack>
                    </td>
                  </tr>

                  {questsBonusDamage > 0 && (
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <span>Quest bonus:</span>
                      </td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage className="small" Icon={IconDamage} />

                          <span>
                            +
                            {formatNumber({
                              decimals: 0,
                              format: "percentage",
                              value: questsBonusDamage,
                            })}
                          </span>
                        </Stack>
                      </td>
                    </tr>
                  )}

                  {isTraitAcquiredBruiser && isUnarmed(weaponValue) && (
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage className="small" Icon={IconBruiser} />

                          <span>Bruiser:</span>
                        </Stack>
                      </td>

                      <td>
                        <span>+{staminaValue}</span>
                      </td>
                    </tr>
                  )}

                  {isTraitAcquiredBrawler && isUnshielded(shieldValue) && (
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage className="small" Icon={IconBrawler} />

                          <span>Brawler:</span>
                        </Stack>
                      </td>

                      <td>
                        <span>
                          +{formatNumber({ format: "percentage", value: BRAWLER_DAMAGE_BONUS })}
                        </span>
                      </td>
                    </tr>
                  )}
                </DetailsTable>
              </PopoverBody>
            </Popover>
          }
          trigger={isShowingDamageDetails ? ["focus", "hover"] : []}
        >
          <span>{formatNumber({ value: damageValue })}</span>
        </OverlayTrigger>

        <DeltasDisplay delta="damage" />
      </Stack>
    </IconDisplay>
  );
}

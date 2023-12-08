import { useEffect } from "react";
import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { DamagePerSecond } from "@neverquest/components/Statistics/DamagePerSecond";
import { ElementalDetails } from "@neverquest/components/Statistics/ElementalDetails";
import { SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/gear";
import { CLASS_TABLE_CELL_ITALIC, LABEL_SEPARATOR } from "@neverquest/data/general";
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
import { formatNumber } from "@neverquest/utilities/formatters";

export function Damage() {
  const attributePowerBonusStrength = useRecoilValue(attributePowerBonus("strength"));
  const attributeStatisticStrength = useRecoilValue(attributeStatistic("strength"));
  const damageValue = useRecoilValue(damage);
  const isShowingDamageDetails = useRecoilValue(isShowing("damageDetails"));
  const isTraitAcquiredBrawler = useRecoilValue(isTraitAcquired("brawler"));
  const isTraitAcquiredBruiser = useRecoilValue(isTraitAcquired("bruiser"));
  const questsBonusDamage = useRecoilValue(questsBonus("damageBonus"));
  const isUnshielded = useRecoilValue(shield).name === SHIELD_NONE.name;
  const staminaValue = useRecoilValue(stamina);
  const { damage: weaponDamage, gems, name } = useRecoilValue(weapon);
  const resetQuestProgressDamage = useResetRecoilState(questProgress("damage"));

  const progressQuest = useProgressQuest();

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
              <PopoverHeader className="text-center">Total damage details</PopoverHeader>

              <PopoverBody>
                <DetailsTable>
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Weapon:</td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage Icon={IconWeaponDamage} isSmall />

                        {formatNumber({ value: weaponDamage })}
                      </Stack>
                    </td>
                  </tr>

                  {gems.length > 0 && <ElementalDetails slot="weapon" />}

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage Icon={IconStrength} isSmall />
                        Strength:
                      </Stack>
                    </td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        {`+${formatNumber({ value: attributeStatisticStrength })}`}

                        {attributePowerBonusStrength > 0 && (
                          <>
                            <span>{LABEL_SEPARATOR}</span>

                            <IconImage Icon={IconTomeOfPower} isSmall />

                            {formatNumber({
                              format: "multiplier",
                              value: attributePowerBonusStrength,
                            })}
                          </>
                        )}
                      </Stack>
                    </td>
                  </tr>

                  {questsBonusDamage > 0 && (
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Quest bonus:</td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconDamage} isSmall />

                          {`+${formatNumber({
                            decimals: 0,
                            format: "percentage",
                            value: questsBonusDamage,
                          })}`}
                        </Stack>
                      </td>
                    </tr>
                  )}

                  {isTraitAcquiredBruiser && name === WEAPON_NONE.name && (
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconBruiser} isSmall />
                          Bruiser:
                        </Stack>
                      </td>

                      <td>{`+${staminaValue}`}</td>
                    </tr>
                  )}

                  {isTraitAcquiredBrawler && isUnshielded && (
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconBrawler} isSmall />
                          Brawler:
                        </Stack>
                      </td>

                      <td>x2</td>
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

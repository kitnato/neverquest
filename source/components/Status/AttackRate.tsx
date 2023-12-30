import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { AttackMeter } from "@neverquest/components/Status/AttackMeter";
import { CLASS_TABLE_CELL_ITALIC, LABEL_SEPARATOR } from "@neverquest/data/general";
import { useAttack } from "@neverquest/hooks/actions/useAttack";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { useTimerDelta } from "@neverquest/hooks/useTimerDelta";
import IconAttackRate from "@neverquest/icons/attack-rate.svg?react";
import IconWeaponSpeed from "@neverquest/icons/speed.svg?react";
import IconTomeOfPower from "@neverquest/icons/tome-of-power.svg?react";
import IconWeaponAttackRate from "@neverquest/icons/weapon-attack-rate.svg?react";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import {
  attackDuration,
  canAttackOrParry,
  isAttacking,
  isLooting,
  isRecovering,
} from "@neverquest/state/character";
import { weapon } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { isMonsterDead } from "@neverquest/state/monster";
import { attackRate } from "@neverquest/state/statistics";
import { isUnarmed } from "@neverquest/types/type-guards";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function AttackRate() {
  const attributePowerBonusSpeed = useRecoilValue(attributePowerBonus("speed"));
  const attributeStatisticSpeed = useRecoilValue(attributeStatistic("speed"));
  const canAttackOrParryValue = useRecoilValue(canAttackOrParry);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isLootingValue = useRecoilValue(isLooting);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isRecoveringValue = useRecoilValue(isRecovering);
  const isShowingAttackRate = useRecoilValue(isShowing("attackRate"));
  const isShowingAttackRateDetails = useRecoilValue(isShowing("attackRateDetails"));
  const weaponValue = useRecoilValue(weapon);
  const setAttackDuration = useSetRecoilState(attackDuration);

  const attack = useAttack();

  useTimerDelta({
    delta: setAttackDuration,
    onDelta: attack,
    stop:
      !canAttackOrParryValue ||
      !isAttackingValue ||
      isLootingValue ||
      isMonsterDeadValue ||
      isRecoveringValue,
  });

  useDeltaText({
    delta: "attackRate",
    format: "time",
    state: attackRate,
    stop: ({ current, previous }) => Math.abs((previous ?? 0) - current) < 1,
  });

  if (!isShowingAttackRate) {
    return;
  }

  return (
    <IconDisplay
      className={getAnimationClass({ animation: "flipInX" })}
      Icon={IconAttackRate}
      tooltip="Total attack rate"
    >
      <Stack className="w-100" direction="horizontal">
        <OverlayTrigger
          overlay={
            <Popover>
              <PopoverHeader className="text-center">
                <span>Attack rate details</span>
              </PopoverHeader>

              <PopoverBody>
                <DetailsTable>
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>
                      <span>{`${isUnarmed(weaponValue) ? "Base" : "Weapon"}:`}</span>
                    </td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage className="small" Icon={IconWeaponAttackRate} />

                        <span>{formatNumber({ format: "time", value: weaponValue.rate })}</span>
                      </Stack>
                    </td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage className="small" Icon={IconWeaponSpeed} />

                        <span>Speed:</span>
                      </Stack>
                    </td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <span>
                          -
                          {formatNumber({
                            decimals: 0,
                            format: "percentage",
                            value: attributeStatisticSpeed,
                          })}
                        </span>

                        {attributePowerBonusSpeed > 0 && (
                          <>
                            {LABEL_SEPARATOR}

                            <IconImage className="small" Icon={IconTomeOfPower} />

                            <span>
                              {formatNumber({
                                format: "multiplier",
                                value: attributePowerBonusSpeed,
                              })}
                            </span>
                          </>
                        )}
                      </Stack>
                    </td>
                  </tr>
                </DetailsTable>
              </PopoverBody>
            </Popover>
          }
          trigger={isShowingAttackRateDetails ? ["focus", "hover"] : []}
        >
          <div className="w-100">
            <AttackMeter />
          </div>
        </OverlayTrigger>

        <DeltasDisplay delta="attackRate" />
      </Stack>
    </IconDisplay>
  );
}

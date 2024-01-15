import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { AttackMeter } from "@neverquest/components/Status/AttackMeter";
import { LABEL_SEPARATOR, POPOVER_TRIGGER } from "@neverquest/data/general";
import { useAttack } from "@neverquest/hooks/actions/useAttack";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { useTimerDelta } from "@neverquest/hooks/useTimerDelta";
import IconAttackRate from "@neverquest/icons/attack-rate.svg?react";
import IconEldritchCodex from "@neverquest/icons/eldritch-codex.svg?react";
import IconWeaponSpeed from "@neverquest/icons/speed.svg?react";
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
  });

  if (isShowingAttackRate) {
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
                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td>
                        <span>{`${isUnarmed(weaponValue) ? "Base" : "Weapon"}:`}</span>
                      </td>

                      <td>
                        <IconDisplay Icon={IconWeaponAttackRate} iconProps={{ className: "small" }}>
                          <span>{formatNumber({ format: "time", value: weaponValue.rate })}</span>
                        </IconDisplay>
                      </td>
                    </tr>

                    {attributeStatisticSpeed > 0 && (
                      <tr>
                        <td>
                          <IconDisplay Icon={IconWeaponSpeed} iconProps={{ className: "small" }}>
                            <span>Speed:</span>
                          </IconDisplay>
                        </td>

                        <td>
                          <Stack direction="horizontal" gap={1}>
                            <span>
                              -
                              {formatNumber({
                                format: "percentage",
                                value: attributeStatisticSpeed,
                              })}
                            </span>

                            {attributePowerBonusSpeed > 0 && (
                              <>
                                {LABEL_SEPARATOR}

                                <IconDisplay
                                  Icon={IconEldritchCodex}
                                  iconProps={{ className: "small" }}
                                >
                                  <span>
                                    {formatNumber({
                                      format: "multiplier",
                                      value: attributePowerBonusSpeed,
                                    })}
                                  </span>
                                </IconDisplay>
                              </>
                            )}
                          </Stack>
                        </td>
                      </tr>
                    )}
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
            trigger={
              attributeStatisticSpeed > 0 || attributePowerBonusSpeed > 0 || !canAttackOrParryValue
                ? POPOVER_TRIGGER
                : []
            }
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
}

import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { AttackRateMeter } from "@neverquest/components/Status/AttackRateMeter";
import { POPOVER_TRIGGER } from "@neverquest/data/general";
import { useAttack } from "@neverquest/hooks/actions/useAttack";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { useTimer } from "@neverquest/hooks/useTimer";
import IconAttackRate from "@neverquest/icons/attack-rate.svg?react";
import IconWeaponSpeed from "@neverquest/icons/speed.svg?react";
import IconWeaponAttackRate from "@neverquest/icons/weapon-attack-rate.svg?react";
import { attributeStatistic } from "@neverquest/state/attributes";
import {
  attackDuration,
  canAttackOrParry,
  isAttacking,
  isLooting,
  isRecovering,
} from "@neverquest/state/character";
import { weapon } from "@neverquest/state/gear";
import { isMonsterDead } from "@neverquest/state/monster";
import { attackRate } from "@neverquest/state/statistics";
import { isShowing } from "@neverquest/state/ui";
import { isUnarmed } from "@neverquest/types/type-guards";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function AttackRate() {
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

  useTimer({
    onElapsed: attack,
    setDuration: setAttackDuration,
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
                        </Stack>
                      </td>
                    </tr>
                  )}
                </DetailsTable>
              </PopoverBody>
            </Popover>
          }
          trigger={attributeStatisticSpeed > 0 || !canAttackOrParryValue ? POPOVER_TRIGGER : []}
        >
          <div className="w-100">
            <AttackRateMeter />
          </div>
        </OverlayTrigger>
      </IconDisplay>
    );
  }
}

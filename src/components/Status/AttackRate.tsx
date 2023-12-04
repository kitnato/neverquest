import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { AttackMeter } from "@neverquest/components/Status/AttackMeter";
import { WEAPON_NONE } from "@neverquest/data/gear";
import { CLASS_TABLE_CELL_ITALIC, LABEL_SEPARATOR } from "@neverquest/data/general";
import { useAttack } from "@neverquest/hooks/actions/useAttack";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
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
import { attackRate, attackRateReduction } from "@neverquest/state/statistics";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function AttackRate() {
  const attackRateReductionValue = useRecoilValue(attackRateReduction);
  const attributePowerBonusSpeed = useRecoilValue(attributePowerBonus("speed"));
  const attributeStatisticSpeed = useRecoilValue(attributeStatistic("speed"));
  const canAttackOrParryValue = useRecoilValue(canAttackOrParry);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isLootingValue = useRecoilValue(isLooting);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isRecoveringValue = useRecoilValue(isRecovering);
  const isShowingAttackRate = useRecoilValue(isShowing("attackRate"));
  const isShowingAttackRateDetails = useRecoilValue(isShowing("attackRateDetails"));
  const { name, rate: weaponAttackRate } = useRecoilValue(weapon);
  const setAttackDuration = useSetRecoilState(attackDuration);

  const attack = useAttack();

  useAnimate({
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
              <PopoverHeader className="text-center">Attack rate details</PopoverHeader>

              <PopoverBody>
                <DetailsTable>
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>{`${
                      name === WEAPON_NONE.name ? "Base" : "Weapon"
                    }:`}</td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage Icon={IconWeaponAttackRate} isSmall />

                        {formatNumber({ format: "time", value: weaponAttackRate })}
                      </Stack>
                    </td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage Icon={IconWeaponSpeed} isSmall />
                        Speed:
                      </Stack>
                    </td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        {`-${formatNumber({
                          format: "percentage",
                          value: attributeStatisticSpeed,
                        })}`}

                        {attributePowerBonusSpeed > 0 && (
                          <>
                            <span>{LABEL_SEPARATOR}</span>

                            <IconImage Icon={IconTomeOfPower} isSmall />

                            {`-${formatNumber({
                              format: "percentage",
                              value: attackRateReductionValue - attributeStatisticSpeed,
                            })}`}
                          </>
                        )}
                      </Stack>
                    </td>
                  </tr>
                </DetailsTable>
              </PopoverBody>
            </Popover>
          }
          trigger={isShowingAttackRateDetails ? ["hover", "focus"] : []}
        >
          <span className="w-100">
            <AttackMeter />
          </span>
        </OverlayTrigger>

        <DeltasDisplay delta="attackRate" />
      </Stack>
    </IconDisplay>
  );
}

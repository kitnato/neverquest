import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { AttackMeter } from "@neverquest/components/Status/AttackMeter";
import { CLASS_TABLE_CELL_ITALIC, LABEL_SEPARATOR } from "@neverquest/data/general";
import { WEAPON_NONE } from "@neverquest/data/inventory";
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
import { attackRate } from "@neverquest/state/statistics";
import { formatNumber } from "@neverquest/utilities/formatters";

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
    stop: ({ current, previous }) => (previous ?? 0) - current < 10,
  });

  if (!isShowingAttackRate) {
    return null;
  }

  return (
    <IconDisplay Icon={IconAttackRate} isAnimated tooltip="Total attack rate">
      <Stack className="w-100" direction="horizontal">
        <OverlayTrigger
          overlay={
            <Popover>
              <PopoverHeader className="text-center">Attack rate details</PopoverHeader>

              <PopoverBody>
                <DetailsTable>
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>{`${
                      weaponValue.name === WEAPON_NONE.name ? "Base" : "Weapon"
                    }:`}</td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage Icon={IconWeaponAttackRate} size="small" />

                        {formatNumber({ format: "time", value: weaponValue.rate })}
                      </Stack>
                    </td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage Icon={IconWeaponSpeed} size="small" />
                        Speed:
                      </Stack>
                    </td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        {`-${formatNumber({
                          decimals: 0,
                          format: "percentage",
                          value: attributePowerBonusSpeed,
                        })}`}

                        {attributeStatisticSpeed > 0 && (
                          <>
                            <span>{LABEL_SEPARATOR}</span>

                            <IconImage Icon={IconTomeOfPower} size="small" />

                            {`+${formatNumber({
                              format: "percentage",
                              value: attributeStatisticSpeed,
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

        <FloatingTextQueue delta="attackRate" />
      </Stack>
    </IconDisplay>
  );
}

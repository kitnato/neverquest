import { useEffect } from "react";
import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { AttackMeter } from "@neverquest/components/Status/AttackMeter";
import { CLASS_TABLE_CELL_ITALIC, LABEL_SEPARATOR } from "@neverquest/data/general";
import { WEAPON_NONE } from "@neverquest/data/inventory";
import { useAttack } from "@neverquest/hooks/actions/useAttack";
import { useRegenerate } from "@neverquest/hooks/actions/useRegenerate";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconAttackRate } from "@neverquest/icons/attack-rate.svg";
import { ReactComponent as IconWeaponSpeed } from "@neverquest/icons/speed.svg";
import { ReactComponent as IconTomeOfPower } from "@neverquest/icons/tome-of-power.svg";
import { ReactComponent as IconWeaponAttackRate } from "@neverquest/icons/weapon-attack-rate.svg";
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
import { attackRateTotal } from "@neverquest/state/statistics";
import { formatValue } from "@neverquest/utilities/formatters";

export function Attack() {
  const speedPowerBonus = useRecoilValue(attributePowerBonus("speed"));
  const speed = useRecoilValue(attributeStatistic("speed"));
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
  const regenerate = useRegenerate();

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
    value: attackRateTotal,
  });

  useEffect(regenerate, [isAttackingValue, regenerate]);

  if (!isShowingAttackRate) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack className="w-100" direction="horizontal">
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header className="text-center">Attack rate details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>{`${
                        weaponValue.name === WEAPON_NONE.name ? "Base" : "Weapon"
                      }:`}</td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconWeaponAttackRate} size="small" />

                          {formatValue({ format: "time", value: weaponValue.rate })}
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
                          {`-${formatValue({
                            decimals: 0,
                            format: "percentage",
                            value: speed,
                          })}`}

                          {speedPowerBonus > 0 && (
                            <>
                              <span>{LABEL_SEPARATOR}</span>

                              <IconImage Icon={IconTomeOfPower} size="small" />

                              {`+${formatValue({
                                format: "percentage",
                                value: speedPowerBonus,
                              })}`}
                            </>
                          )}
                        </Stack>
                      </td>
                    </tr>
                  </DetailsTable>
                </Popover.Body>
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
      }
      Icon={IconAttackRate}
      isAnimated
      tooltip="Total attack rate"
    />
  );
}

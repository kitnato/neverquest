import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { AttackMeter } from "@neverquest/components/Status/AttackMeter";
import { WEAPON_NONE } from "@neverquest/data/inventory";
import { useAttack } from "@neverquest/hooks/actions/useAttack";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconAttackRate } from "@neverquest/icons/attack-rate.svg";
import { ReactComponent as IconWeaponSpeed } from "@neverquest/icons/speed.svg";
import { ReactComponent as IconTomeOfPower } from "@neverquest/icons/tome-of-power.svg";
import { ReactComponent as IconWeaponAttackRate } from "@neverquest/icons/weapon-attack-rate.svg";
import { attributeStatistic } from "@neverquest/state/attributes";
import {
  attackDuration,
  canAttackOrParry,
  isAttacking,
  isLooting,
  isRecovering,
} from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { weapon } from "@neverquest/state/items";
import { isMonsterDead } from "@neverquest/state/monster";
import { attackRateTotal, attributePowerBonus } from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC, LABEL_SEPARATOR } from "@neverquest/utilities/constants";
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
    delta: deltas("attackRate"),
    format: "time",
    value: attackRateTotal,
  });

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
                        weaponValue === WEAPON_NONE ? "Base" : "Weapon"
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
                          })} `}

                          {speedPowerBonus > 0 && (
                            <>
                              {LABEL_SEPARATOR}

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

          <FloatingText delta="attackRate" />
        </Stack>
      }
      Icon={IconAttackRate}
      isAnimated
      tooltip="Total attack rate"
    />
  );
}

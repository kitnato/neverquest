import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { RegenerationMeter } from "@neverquest/components/Reserves/RegenerationMeter";
import { LABEL_SEPARATOR, POPOVER_TRIGGER } from "@neverquest/data/general";
import { RESERVES } from "@neverquest/data/reserves";
import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { useTimer } from "@neverquest/hooks/useTimer";
import IconEldritchCodex from "@neverquest/icons/eldritch-codex.svg?react";
import IconFortitude from "@neverquest/icons/fortitude.svg?react";
import IconRegenerationAmount from "@neverquest/icons/regeneration-amount.svg?react";
import IconRegenerationRate from "@neverquest/icons/regeneration-rate.svg?react";
import IconVigor from "@neverquest/icons/vigor.svg?react";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { hasFlatlined, isRecovering } from "@neverquest/state/character";
import {
  isHealthAtMaximum,
  isStaminaAtMaximum,
  regenerationDuration,
  regenerationRate,
} from "@neverquest/state/reserves";
import { isSkillAcquired } from "@neverquest/state/skills";
import type { Reserve } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export function Regeneration({ reserve }: { reserve: Reserve }) {
  const attributeStatisticFortitudeState = attributeStatistic("fortitude");
  const regenerateRateState = regenerationRate(reserve);

  const attributePowerBonusFortitude = useRecoilValue(attributePowerBonus("fortitude"));
  const attributePowerBonusVigor = useRecoilValue(attributePowerBonus("vigor"));
  const attributeStatisticFortitude = useRecoilValue(attributeStatisticFortitudeState);
  const attributeStatisticVigor = useRecoilValue(attributeStatistic("vigor"));
  const hasFlatlinedValue = useRecoilValue(hasFlatlined);
  const isReserveAtMaximum = useRecoilValue(
    reserve === "health" ? isHealthAtMaximum : isStaminaAtMaximum,
  );
  const isRecoveringValue = useRecoilValue(isRecovering);
  const isSkillAcquiredCalisthenics = useRecoilValue(isSkillAcquired("calisthenics"));
  const setRegenerationDuration = useSetRecoilState(regenerationDuration(reserve));

  const {
    baseRegenerationAmount,
    baseRegenerationRate,
    regenerationDeltaAmount,
    regenerationDeltaRate,
  } = RESERVES[reserve];

  const changeReserve = {
    health: useChangeHealth,
    stamina: useChangeStamina,
  }[reserve]();

  useTimer({
    onElapsed: () => {
      changeReserve({ isRegeneration: true });
    },
    setTick: setRegenerationDuration,
    stop: hasFlatlinedValue || isRecoveringValue || isReserveAtMaximum,
  });

  useDeltaText({
    delta: regenerationDeltaAmount,
    state: attributeStatisticFortitudeState,
  });

  useDeltaText({
    delta: regenerationDeltaRate,
    format: "time",
    state: regenerateRateState,
  });

  return (
    <Stack direction="horizontal">
      <OverlayTrigger
        overlay={
          <Popover>
            <PopoverBody>
              <DetailsTable>
                <tr>
                  <td>
                    <span>Base rate:</span>
                  </td>

                  <td>
                    <IconDisplay Icon={IconRegenerationRate} iconProps={{ className: "small" }}>
                      <span>{formatNumber({ format: "time", value: baseRegenerationRate })}</span>
                    </IconDisplay>
                  </td>
                </tr>

                <tr>
                  <td>
                    <IconDisplay Icon={IconVigor} iconProps={{ className: "small" }}>
                      <span>Vigor:</span>
                    </IconDisplay>
                  </td>

                  <td>
                    <Stack direction="horizontal" gap={1}>
                      <span>
                        -
                        {formatNumber({
                          format: "percentage",
                          value: attributeStatisticVigor,
                        })}
                      </span>

                      {attributePowerBonusVigor > 0 && (
                        <>
                          {LABEL_SEPARATOR}

                          <IconDisplay Icon={IconEldritchCodex} iconProps={{ className: "small" }}>
                            <span>
                              {formatNumber({
                                format: "multiplier",
                                value: attributePowerBonusVigor,
                              })}
                            </span>
                          </IconDisplay>
                        </>
                      )}
                    </Stack>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span>Base amount:</span>
                  </td>

                  <td>
                    <IconDisplay Icon={IconRegenerationAmount} iconProps={{ className: "small" }}>
                      <span>{baseRegenerationAmount}</span>
                    </IconDisplay>
                  </td>
                </tr>

                <tr>
                  <td>
                    <IconDisplay Icon={IconFortitude} iconProps={{ className: "small" }}>
                      <span>Fortitude:</span>
                    </IconDisplay>
                  </td>

                  <td>
                    <Stack direction="horizontal" gap={1}>
                      <span>+{attributeStatisticFortitude}</span>

                      {attributePowerBonusFortitude > 0 && (
                        <>
                          {LABEL_SEPARATOR}

                          <IconDisplay Icon={IconEldritchCodex} iconProps={{ className: "small" }}>
                            <span>
                              {formatNumber({
                                format: "multiplier",
                                value: attributePowerBonusFortitude,
                              })}
                            </span>
                          </IconDisplay>
                        </>
                      )}
                    </Stack>
                  </td>
                </tr>
              </DetailsTable>
            </PopoverBody>
          </Popover>
        }
        placement="right"
        trigger={isSkillAcquiredCalisthenics ? POPOVER_TRIGGER : []}
      >
        <div className="w-100">
          <RegenerationMeter reserve={reserve} />
        </div>
      </OverlayTrigger>

      <DeltasDisplay delta={regenerationDeltaAmount} />

      <DeltasDisplay delta={regenerationDeltaRate} />
    </Stack>
  );
}

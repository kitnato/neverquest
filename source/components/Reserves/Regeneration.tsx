import { useEffect } from "react";
import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconImage } from "@neverquest/components/IconImage";
import { RegenerationMeter } from "@neverquest/components/Reserves/RegenerationMeter";
import { CLASS_TABLE_CELL_ITALIC, LABEL_SEPARATOR } from "@neverquest/data/general";
import { RESERVES } from "@neverquest/data/reserves";
import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { useTimerDelta } from "@neverquest/hooks/useTimerDelta";
import IconFortitude from "@neverquest/icons/fortitude.svg?react";
import IconRegenerationAmount from "@neverquest/icons/regeneration-amount.svg?react";
import IconRegenerationRate from "@neverquest/icons/regeneration-rate.svg?react";
import IconTomeOfPower from "@neverquest/icons/tome-of-power.svg?react";
import IconVigor from "@neverquest/icons/vigor.svg?react";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { isRecovering } from "@neverquest/state/character";
import {
  isHealthAtMaximum,
  isRegenerating,
  isStaminaAtMaximum,
  regenerationDuration,
  regenerationRate,
  reserveRegenerationRateReduction,
} from "@neverquest/state/reserves";
import { isSkillAcquired } from "@neverquest/state/skills";
import type { Reserve } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

const RESERVE_CHANGE = {
  health: useChangeHealth,
  stamina: useChangeStamina,
};

export function Regeneration({ reserve }: { reserve: Reserve }) {
  const attributeStatisticFortitudeState = attributeStatistic("fortitude");
  const regenerateRateState = regenerationRate(reserve);

  const attributePowerBonusFortitude = useRecoilValue(attributePowerBonus("fortitude"));
  const attributePowerBonusVigor = useRecoilValue(attributePowerBonus("vigor"));
  const attributeStatisticFortitude = useRecoilValue(attributeStatisticFortitudeState);
  const attributeStatisticVigor = useRecoilValue(attributeStatistic("vigor"));
  const isReserveAtMaximum = useRecoilValue(
    reserve === "health" ? isHealthAtMaximum : isStaminaAtMaximum,
  );
  const isRecoveringValue = useRecoilValue(isRecovering);
  const isRegeneratingValue = useRecoilValue(isRegenerating(reserve));
  const setRegenerationDuration = useSetRecoilState(regenerationDuration(reserve));
  const regenerationRateValue = useRecoilValue(regenerateRateState);
  const reserveRegenerationRateReductionValue = useRecoilValue(reserveRegenerationRateReduction);
  const calisthenicsValue = useRecoilValue(isSkillAcquired("calisthenics"));

  const {
    baseRegenerationAmount,
    baseRegenerationRate,
    label,
    regenerationDeltaAmount,
    regenerationDeltaRate,
  } = RESERVES[reserve];

  const changeReserve = RESERVE_CHANGE[reserve]();

  useTimerDelta({
    delta: setRegenerationDuration,
    onDelta: () => {
      changeReserve({ isRegeneration: true });
    },
    stop: isRecoveringValue || isReserveAtMaximum,
  });

  useDeltaText({
    delta: regenerationDeltaAmount,
    state: attributeStatisticFortitudeState,
  });

  useDeltaText({
    delta: regenerationDeltaRate,
    format: "time",
    state: regenerateRateState,
    stop: ({ current, previous }) => (previous ?? 0) - current < 10,
  });

  useEffect(() => {
    if (!isReserveAtMaximum && !isRegeneratingValue) {
      setRegenerationDuration(regenerationRateValue);
    }
  }, [isRegeneratingValue, isReserveAtMaximum, regenerationRateValue, setRegenerationDuration]);

  return (
    <Stack className="w-100" direction="horizontal">
      <OverlayTrigger
        overlay={
          <Popover>
            <PopoverHeader className="text-center">
              <span>{label} regeneration details</span>
            </PopoverHeader>

            <PopoverBody>
              <DetailsTable>
                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>
                    <span>Base rate:</span>
                  </td>

                  <td>
                    <Stack direction="horizontal" gap={1}>
                      <IconImage className="small" Icon={IconRegenerationRate} />

                      <span>{formatNumber({ format: "time", value: baseRegenerationRate })}</span>
                    </Stack>
                  </td>
                </tr>

                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>
                    <Stack direction="horizontal" gap={1}>
                      <IconImage className="small" Icon={IconVigor} />

                      <span>Vigor:</span>
                    </Stack>
                  </td>

                  <td>
                    <Stack direction="horizontal" gap={1}>
                      <span>
                        {`-${formatNumber({
                          format: "percentage",
                          value: attributeStatisticVigor,
                        })}`}
                      </span>

                      {attributePowerBonusVigor > 0 && (
                        <>
                          {LABEL_SEPARATOR}

                          <IconImage className="small" Icon={IconTomeOfPower} />

                          <span>
                            {`-${formatNumber({
                              format: "percentage",
                              value:
                                reserveRegenerationRateReductionValue - attributeStatisticVigor,
                            })}`}
                          </span>
                        </>
                      )}
                    </Stack>
                  </td>
                </tr>

                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>
                    <span>Base amount:</span>
                  </td>

                  <td>
                    <Stack direction="horizontal" gap={1}>
                      <IconImage className="small" Icon={IconRegenerationAmount} />

                      <span>{baseRegenerationAmount}</span>
                    </Stack>
                  </td>
                </tr>

                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>
                    <Stack direction="horizontal" gap={1}>
                      <IconImage className="small" Icon={IconFortitude} />

                      <span>Fortitude:</span>
                    </Stack>
                  </td>

                  <td>
                    <Stack direction="horizontal" gap={1}>
                      <span>{`+${attributeStatisticFortitude}`}</span>

                      {attributePowerBonusFortitude > 0 && (
                        <>
                          {LABEL_SEPARATOR}

                          <IconImage className="small" Icon={IconTomeOfPower} />

                          <span>
                            {formatNumber({
                              format: "multiplier",
                              value: attributePowerBonusFortitude,
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
        placement="right"
        trigger={calisthenicsValue ? ["focus", "hover"] : []}
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

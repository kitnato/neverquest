import { useEffect } from "react";
import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconImage } from "@neverquest/components/IconImage";
import { RegenerationMeter } from "@neverquest/components/Reserves/RegenerationMeter";
import { RESERVES } from "@neverquest/data/reserves";
import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconFortitude } from "@neverquest/icons/fortitude.svg";
import { ReactComponent as IconRegenerationAmount } from "@neverquest/icons/regeneration-amount.svg";
import { ReactComponent as IconRegenerationRate } from "@neverquest/icons/regeneration-rate.svg";
import { ReactComponent as IconPower } from "@neverquest/icons/tome-of-power.svg";
import { ReactComponent as IconVigor } from "@neverquest/icons/vigor.svg";
import { rawAttributeStatistic } from "@neverquest/state/attributes";
import { isRecovering } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import {
  isHealthAtMaximum,
  isRegenerating,
  isStaminaAtMaximum,
  regenerationDuration,
  regenerationRate,
} from "@neverquest/state/reserves";
import { powerBonus } from "@neverquest/state/statistics";
import type { Reserve } from "@neverquest/types/unions";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatPercentage, formatTime } from "@neverquest/utilities/formatters";

const RESERVE_CHANGE = {
  health: useChangeHealth,
  stamina: useChangeStamina,
};

export function Regeneration({ type }: { type: Reserve }) {
  const isHealth = type === "health";

  const isRecoveringValue = useRecoilValue(isRecovering);
  const isRegeneratingValue = useRecoilValue(isRegenerating(type));
  const isReserveAtMaximum = useRecoilValue(isHealth ? isHealthAtMaximum : isStaminaAtMaximum);
  const isShowingReserveDetails = useRecoilValue(isShowing("reserveDetails"));
  const powerBonusAmountValue = useRecoilValue(powerBonus("fortitude"));
  const powerBonusRateValue = useRecoilValue(powerBonus("vigor"));
  const fortitudeValue = useRecoilValue(rawAttributeStatistic("fortitude"));
  const vigorValue = useRecoilValue(rawAttributeStatistic("vigor"));
  const regenerationRateValue = useRecoilValue(regenerationRate(type));
  const setRegenerationDuration = useSetRecoilState(regenerationDuration(type));

  const { baseRegenerationAmount, baseRegenerationRate, label, regenerationDelta } = RESERVES[type];

  const changeReserve = RESERVE_CHANGE[type]();

  useAnimate({
    delta: setRegenerationDuration,
    onDelta: () => {
      changeReserve({ isRegeneration: true });
    },
    stop: isRecoveringValue || isReserveAtMaximum,
  });

  useDeltaText({
    atomDelta: deltas(regenerationDelta),
    atomValue: regenerationRate(type),
    type: "time",
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
            <Popover.Header className="text-center">{label} regeneration details</Popover.Header>

            <Popover.Body>
              <DetailsTable>
                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Base rate:</td>

                  <td>
                    <IconImage Icon={IconRegenerationRate} size="tiny" />
                    &nbsp;{formatTime(baseRegenerationRate)}
                  </td>
                </tr>

                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>
                    <IconImage Icon={IconVigor} size="tiny" />
                    &nbsp;Vigor:
                  </td>

                  <td>{`-${formatPercentage(vigorValue)}`}</td>
                </tr>

                {powerBonusRateValue > 0 && (
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>
                      <IconImage Icon={IconPower} size="tiny" />
                      &nbsp;Empowered:
                    </td>

                    <td>{`+${formatPercentage(powerBonusRateValue)}`}</td>
                  </tr>
                )}

                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Base amount:</td>

                  <td>
                    <IconImage Icon={IconRegenerationAmount} size="tiny" />
                    &nbsp;{baseRegenerationAmount}
                  </td>
                </tr>

                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>
                    <IconImage Icon={IconFortitude} size="tiny" />
                    &nbsp;Fortitude:
                  </td>

                  <td>{`+${fortitudeValue}`}</td>
                </tr>

                {powerBonusAmountValue > 0 && (
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>
                      <IconImage Icon={IconPower} size="tiny" />
                      &nbsp;Empowered:
                    </td>

                    <td>{`+${formatPercentage(powerBonusAmountValue, 0)}`}</td>
                  </tr>
                )}
              </DetailsTable>
            </Popover.Body>
          </Popover>
        }
        placement="right"
        trigger={isShowingReserveDetails ? ["hover", "focus"] : []}
      >
        <div className="w-100">
          <RegenerationMeter type={type} />
        </div>
      </OverlayTrigger>

      <FloatingText deltaType={isHealth ? "healthRegenerationRate" : "staminaRegenerationRate"} />
    </Stack>
  );
}

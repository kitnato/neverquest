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
import { attributeStatistic } from "@neverquest/state/attributes";
import { isRecovering } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import {
  isHealthAtMaximum,
  isRegenerating,
  isStaminaAtMaximum,
  regenerationDuration,
  regenerationRate,
} from "@neverquest/state/reserves";
import { skills } from "@neverquest/state/skills";
import { powerBonus } from "@neverquest/state/statistics";
import type { Reserve } from "@neverquest/types/unions";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatValue } from "@neverquest/utilities/formatters";

const RESERVE_CHANGE = {
  health: useChangeHealth,
  stamina: useChangeStamina,
};

export function Regeneration({ reserve }: { reserve: Reserve }) {
  const isHealth = reserve === "health";

  const fortitudeValue = useRecoilValue(attributeStatistic("fortitude"));
  const vigorValue = useRecoilValue(attributeStatistic("vigor"));
  const isReserveAtMaximum = useRecoilValue(isHealth ? isHealthAtMaximum : isStaminaAtMaximum);
  const isRecoveringValue = useRecoilValue(isRecovering);
  const isRegeneratingValue = useRecoilValue(isRegenerating(reserve));
  const powerBonusAmountValue = useRecoilValue(powerBonus("fortitude"));
  const powerBonusRateValue = useRecoilValue(powerBonus("vigor"));
  const regenerationRateValue = useRecoilValue(regenerationRate(reserve));
  const calisthenicsValue = useRecoilValue(skills("calisthenics"));
  const setRegenerationDuration = useSetRecoilState(regenerationDuration(reserve));

  const { baseRegenerationAmount, baseRegenerationRate, label, regenerationDelta } =
    RESERVES[reserve];

  const changeReserve = RESERVE_CHANGE[reserve]();

  useAnimate({
    delta: setRegenerationDuration,
    onDelta: () => {
      changeReserve({ isRegeneration: true });
    },
    stop: isRecoveringValue || isReserveAtMaximum,
  });

  useDeltaText({
    delta: deltas(regenerationDelta),
    format: "time",
    value: regenerationRate(reserve),
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
                    &nbsp;{formatValue({ format: "time", value: baseRegenerationRate })}
                  </td>
                </tr>

                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>
                    <IconImage Icon={IconVigor} size="tiny" />
                    &nbsp;Vigor:
                  </td>

                  <td>{`-${formatValue({ format: "percentage", value: vigorValue })}`}</td>
                </tr>

                {powerBonusRateValue > 0 && (
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>
                      <IconImage Icon={IconPower} size="tiny" />
                      &nbsp;Empowered:
                    </td>

                    <td>{`+${formatValue({
                      format: "percentage",
                      value: powerBonusRateValue,
                    })}`}</td>
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

                    <td>{`+${formatValue({
                      decimals: 0,
                      format: "percentage",
                      value: powerBonusAmountValue,
                    })}`}</td>
                  </tr>
                )}
              </DetailsTable>
            </Popover.Body>
          </Popover>
        }
        placement="right"
        trigger={calisthenicsValue ? ["hover", "focus"] : []}
      >
        <div className="w-100">
          <RegenerationMeter reserve={reserve} />
        </div>
      </OverlayTrigger>

      <FloatingText deltaType={isHealth ? "healthRegenerationRate" : "staminaRegenerationRate"} />
    </Stack>
  );
}

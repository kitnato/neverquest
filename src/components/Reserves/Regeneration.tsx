import { useEffect } from "react";
import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconImage } from "@neverquest/components/IconImage";
import { RegenerationMeter } from "@neverquest/components/Reserves/RegenerationMeter";
import { CLASS_TABLE_CELL_ITALIC, LABEL_SEPARATOR } from "@neverquest/data/general";
import { RESERVES } from "@neverquest/data/reserves";
import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconFortitude } from "@neverquest/icons/fortitude.svg";
import { ReactComponent as IconRegenerationAmount } from "@neverquest/icons/regeneration-amount.svg";
import { ReactComponent as IconRegenerationRate } from "@neverquest/icons/regeneration-rate.svg";
import { ReactComponent as IconTomeOfPower } from "@neverquest/icons/tome-of-power.svg";
import { ReactComponent as IconVigor } from "@neverquest/icons/vigor.svg";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { isRecovering } from "@neverquest/state/character";
import {
  isHealthAtMaximum,
  isRegenerating,
  isStaminaAtMaximum,
  regenerationDuration,
  regenerationRate,
} from "@neverquest/state/reserves";
import { isSkillAcquired } from "@neverquest/state/skills";
import type { Reserve } from "@neverquest/types/unions";
import { formatValue } from "@neverquest/utilities/formatters";

const RESERVE_CHANGE = {
  health: useChangeHealth,
  stamina: useChangeStamina,
};

export function Regeneration({ reserve }: { reserve: Reserve }) {
  const isHealth = reserve === "health";

  const fortitudePowerBonus = useRecoilValue(attributePowerBonus("fortitude"));
  const vigorPowerBonus = useRecoilValue(attributePowerBonus("vigor"));
  const fortitude = useRecoilValue(attributeStatistic("fortitude"));
  const vigor = useRecoilValue(attributeStatistic("vigor"));
  const isReserveAtMaximum = useRecoilValue(isHealth ? isHealthAtMaximum : isStaminaAtMaximum);
  const isRecoveringValue = useRecoilValue(isRecovering);
  const isRegeneratingValue = useRecoilValue(isRegenerating(reserve));
  const setRegenerationDuration = useSetRecoilState(regenerationDuration(reserve));
  const regenerationRateValue = useRecoilValue(regenerationRate(reserve));
  const calisthenicsValue = useRecoilValue(isSkillAcquired("calisthenics"));

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
    delta: regenerationDelta,
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
                    <Stack direction="horizontal" gap={1}>
                      <IconImage Icon={IconRegenerationRate} size="small" />

                      {formatValue({ format: "time", value: baseRegenerationRate })}
                    </Stack>
                  </td>
                </tr>

                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>
                    <Stack direction="horizontal" gap={1}>
                      <IconImage Icon={IconVigor} size="small" />
                      Vigor:
                    </Stack>
                  </td>

                  <td>
                    <Stack direction="horizontal" gap={1}>
                      {`-${formatValue({ decimals: 0, format: "percentage", value: vigor })}`}

                      {vigorPowerBonus > 0 && (
                        <>
                          <span>{LABEL_SEPARATOR}</span>

                          <IconImage Icon={IconTomeOfPower} size="small" />

                          {`+${formatValue({
                            format: "percentage",
                            value: vigorPowerBonus,
                          })}`}
                        </>
                      )}
                    </Stack>
                  </td>
                </tr>

                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Base amount:</td>

                  <td>
                    <Stack direction="horizontal" gap={1}>
                      <IconImage Icon={IconRegenerationAmount} size="small" />

                      {baseRegenerationAmount}
                    </Stack>
                  </td>
                </tr>

                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>
                    <Stack direction="horizontal" gap={1}>
                      <IconImage Icon={IconFortitude} size="small" />
                      Fortitude:
                    </Stack>
                  </td>

                  <td>
                    <Stack direction="horizontal" gap={1}>
                      {`+${fortitude}`}

                      {vigorPowerBonus > 0 && (
                        <>
                          <span>{LABEL_SEPARATOR}</span>

                          <IconImage Icon={IconTomeOfPower} size="small" />

                          {`+${formatValue({
                            format: "percentage",
                            value: fortitudePowerBonus,
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
        placement="right"
        trigger={calisthenicsValue ? ["hover", "focus"] : []}
      >
        <span className="w-100">
          <RegenerationMeter reserve={reserve} />
        </span>
      </OverlayTrigger>

      <FloatingTextQueue delta={isHealth ? "healthRegenerationRate" : "staminaRegenerationRate"} />
    </Stack>
  );
}

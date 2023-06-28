import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { RegenerationMeter } from "@neverquest/components/Reserves/RegenerationMeter";
import { RESERVES } from "@neverquest/data/reserves";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import {
  healthRegenerationAmount,
  healthRegenerationRate,
  staminaRegenerationAmount,
  staminaRegenerationRate,
} from "@neverquest/state/reserves";
import {
  powerBonus,
  rawAttributeStatistic,
  reserveRegenerationRate,
} from "@neverquest/state/statistics";
import type { Reserve } from "@neverquest/types/unions";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";

export function Regeneration({ type }: { type: Reserve }) {
  const { baseRegenerationAmount, baseRegenerationRate, label, regenerationDelta } = RESERVES[type];
  const isHealth = type === "health";

  const isShowingReserveDetails = useRecoilValue(isShowing("reserveDetails"));
  const powerBonusAmountValue = useRecoilValue(powerBonus("fortitude"));
  const powerBonusRateValue = useRecoilValue(powerBonus("vigor"));
  const statisticAmountValue = useRecoilValue(rawAttributeStatistic("fortitude"));
  const statisticRateValue = useRecoilValue(rawAttributeStatistic("vigor"));
  const regenerationAmountValue = useRecoilValue(
    isHealth ? healthRegenerationAmount : staminaRegenerationAmount
  );
  const reserveRegenerationRateValue = useRecoilValue(reserveRegenerationRate);

  useDeltaText({
    atomDelta: deltas(regenerationDelta),
    atomValue: isHealth ? healthRegenerationRate : staminaRegenerationRate,
    type: "time",
  });

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

                  <td>{formatMilliseconds(baseRegenerationRate)}</td>
                </tr>

                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Vigor attribute:</td>

                  <td>{`-${formatPercentage(reserveRegenerationRateValue)}`}</td>
                </tr>

                {powerBonusRateValue > 0 && (
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Power bonus:</td>

                    <td>{`-${formatPercentage(statisticRateValue)} +${formatPercentage(
                      powerBonusRateValue
                    )}`}</td>
                  </tr>
                )}

                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Base amount:</td>

                  <td>{baseRegenerationAmount}</td>
                </tr>

                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Fortitude attribute:</td>

                  <td>{`+${regenerationAmountValue - baseRegenerationAmount}`}</td>
                </tr>

                {powerBonusAmountValue > 0 && (
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Power bonus:</td>

                    <td>{`${statisticAmountValue - baseRegenerationAmount} +${formatPercentage(
                      powerBonusAmountValue
                    )}`}</td>
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

      <FloatingText
        deltaType={type === "health" ? "healthRegenerationRate" : "staminaRegenerationRate"}
      />
    </Stack>
  );
}

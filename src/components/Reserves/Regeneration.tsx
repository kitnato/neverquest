import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { RegenerationMeter } from "@neverquest/components/Reserves/RegenerationMeter";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { RESERVES } from "@neverquest/data/reserves";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import {
  healthRegenerationAmount,
  healthRegenerationRate,
  reserveRegenerationRate,
  staminaRegenerationAmount,
  staminaRegenerationRate,
} from "@neverquest/state/statistics";
import type { Reserve } from "@neverquest/types/unions";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";

export function Regeneration({ type }: { type: Reserve }) {
  const { baseRegenerationAmount, baseRegenerationRate, label, regenerationDelta } = RESERVES[type];
  const isHealth = type === "health";

  const regenerationAmountValue = useRecoilValue(
    isHealth ? healthRegenerationAmount : staminaRegenerationAmount
  );
  const regenerationRateValue = useRecoilValue(
    isHealth ? healthRegenerationRate : staminaRegenerationRate
  );
  const isShowingReserveDetails = useRecoilValue(isShowing("reserveDetails"));
  const reserveRegenerationRateValue = useRecoilValue(reserveRegenerationRate);

  const { name: amountName } = ATTRIBUTES.fortitude;
  const { name: rateName } = ATTRIBUTES.vigor;

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
                  <td className={CLASS_TABLE_CELL_ITALIC}>Current rate:</td>

                  <td>{formatMilliseconds(regenerationRateValue)}</td>
                </tr>

                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Base rate:</td>

                  <td>{formatMilliseconds(baseRegenerationRate)}</td>
                </tr>

                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>{rateName} attribute:</td>

                  <td>{`-${formatPercentage(reserveRegenerationRateValue)}`}</td>
                </tr>

                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Total amount:</td>

                  <td>{regenerationAmountValue}</td>
                </tr>

                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Base amount:</td>

                  <td>{baseRegenerationAmount}</td>
                </tr>

                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>{amountName} attribute:</td>

                  <td>{`+${regenerationAmountValue - baseRegenerationAmount}`}</td>
                </tr>
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

import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { RegenerationMeter } from "@neverquest/components/Character/RegenerationMeter";
import { FloatingText } from "@neverquest/components/FloatingText";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { RESERVES } from "@neverquest/data/reserves";
import {
  REGENERATION_AMOUNT_HEALTH,
  REGENERATION_AMOUNT_STAMINA,
  REGENERATION_RATE_HEALTH,
  REGENERATION_RATE_STAMINA,
} from "@neverquest/data/statistics";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { isShowing } from "@neverquest/state/isShowing";
import { reserveRegenerationRate } from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";

export function Regeneration({ type }: { type: "health" | "stamina" }) {
  const { atomDeltaRegenerationRate, atomRegenerationAmount, atomRegenerationRate } =
    RESERVES[type];
  const isHealth = type === "health";

  const regenerationAmountValue = useRecoilValue(atomRegenerationAmount);
  const regenerationRateValue = useRecoilValue(atomRegenerationRate);
  const isShowingReserveDetails = useRecoilValue(isShowing("reserveDetails"));
  const reserveRegenerationRateValue = useRecoilValue(reserveRegenerationRate);

  const { name: amountName } = ATTRIBUTES.fortitude;
  const { name: rateName } = ATTRIBUTES.vigor;
  const baseAmount = isHealth ? REGENERATION_AMOUNT_HEALTH : REGENERATION_AMOUNT_STAMINA;
  const baseRate = isHealth ? REGENERATION_RATE_HEALTH : REGENERATION_RATE_STAMINA;
  const title = isHealth ? "Health" : "Stamina";

  useDeltaText({
    atomDelta: atomDeltaRegenerationRate,
    atomValue: atomRegenerationRate,
    type: "time",
  });

  return (
    <Stack className="w-100" direction="horizontal">
      <OverlayTrigger
        overlay={
          <Popover>
            <Popover.Header className="text-center">{title} regeneration details</Popover.Header>

            <Popover.Body>
              <DetailsTable>
                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Current rate:</td>

                  <td>{formatMilliseconds(regenerationRateValue)}</td>
                </tr>

                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>Base rate:</td>

                  <td>{formatMilliseconds(baseRate)}</td>
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

                  <td>{baseAmount}</td>
                </tr>

                <tr>
                  <td className={CLASS_TABLE_CELL_ITALIC}>{amountName} attribute:</td>

                  <td>{`+${regenerationAmountValue - baseAmount}`}</td>
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

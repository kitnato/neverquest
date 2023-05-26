import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { RegenerationMeter } from "@neverquest/components/Character/RegenerationMeter";
import { FloatingText } from "@neverquest/components/FloatingText";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/data/internal";
import { RESERVES } from "@neverquest/data/reserves";
import {
  REGENERATION_AMOUNT_HEALTH,
  REGENERATION_AMOUNT_STAMINA,
  REGENERATION_RATE_HEALTH,
  REGENERATION_RATE_STAMINA,
} from "@neverquest/data/statistics";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { reserveRegenerationRate } from "@neverquest/state/statistics";
import { Attribute, Delta, DeltaText, Reserve } from "@neverquest/types/enums";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";

export function Regeneration({ type }: { type: Reserve.Health | Reserve.Stamina }) {
  const { atomDeltaRegenerationRate, atomRegenerationAmount, atomRegenerationRate } =
    RESERVES[type];
  const isHealth = type === Reserve.Health;

  const regenerationAmountValue = useRecoilValue(atomRegenerationAmount);
  const regenerationRateValue = useRecoilValue(atomRegenerationRate);
  const reserveRegenerationRateValue = useRecoilValue(reserveRegenerationRate);

  const { name: amountName } = ATTRIBUTES[Attribute.Fortitude];
  const { name: rateName } = ATTRIBUTES[Attribute.Vigor];
  const baseAmount = isHealth ? REGENERATION_AMOUNT_HEALTH : REGENERATION_AMOUNT_STAMINA;
  const baseRate = isHealth ? REGENERATION_RATE_HEALTH : REGENERATION_RATE_STAMINA;
  const showAmount = regenerationAmountValue - baseAmount > 0;
  const showRate = regenerationRateValue - baseRate > 0;
  const title = isHealth ? "Health" : "Stamina";

  useDeltaText({
    atomDelta: atomDeltaRegenerationRate,
    atomValue: atomRegenerationRate,
    type: DeltaText.Time,
  });

  return (
    <>
      <OverlayTrigger
        overlay={
          <Popover>
            <Popover.Header className="text-center">{title} regeneration details</Popover.Header>

            <Popover.Body>
              <DetailsTable>
                {showRate && (
                  <>
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
                  </>
                )}

                {showAmount && (
                  <>
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
                  </>
                )}
              </DetailsTable>
            </Popover.Body>
          </Popover>
        }
        placement="right"
        trigger={showAmount || showRate ? ["hover", "focus"] : []}
      >
        <>
          <RegenerationMeter type={type} />
        </>
      </OverlayTrigger>

      <FloatingText
        type={
          type === Reserve.Health ? Delta.HealthRegenerationRate : Delta.StaminaRegenerationRate
        }
      />
    </>
  );
}

import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { Regeneration } from "@neverquest/components/Reserves/Regeneration";
import { ReserveMeter } from "@neverquest/components/Reserves/ReserveMeter";
import { RESERVES } from "@neverquest/data/reserves";
import { ReactComponent as IconEndurance } from "@neverquest/icons/endurance.svg";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { ReactComponent as IconPower } from "@neverquest/icons/tome-of-power.svg";
import { attributeStatistic } from "@neverquest/state/attributes";
import { isShowing } from "@neverquest/state/isShowing";
import { powerBonus } from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatValue } from "@neverquest/utilities/formatters";

export function Stamina() {
  const isShowingStamina = useRecoilValue(isShowing("stamina"));
  const isShowingStaminaDetails = useRecoilValue(isShowing("staminaDetails"));
  const powerBonusValue = useRecoilValue(powerBonus("endurance"));
  const enduranceValue = useRecoilValue(attributeStatistic("endurance"));

  const { baseAmount } = RESERVES.stamina;

  if (!isShowingStamina) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack>
          <Stack className="w-100" direction="horizontal">
            <OverlayTrigger
              overlay={
                <Popover>
                  <Popover.Header className="text-center">Stamina details</Popover.Header>

                  <Popover.Body>
                    <DetailsTable>
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Base:</td>

                        <td>
                          <Stack direction="horizontal" gap={1}>
                            <IconImage Icon={IconStamina} size="small" />

                            {baseAmount}
                          </Stack>
                        </td>
                      </tr>

                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>
                          <Stack direction="horizontal" gap={1}>
                            <IconImage Icon={IconEndurance} size="small" />
                            Endurance:
                          </Stack>
                        </td>

                        <td>
                          <Stack direction="horizontal" gap={1}>
                            <IconImage Icon={IconStamina} size="small" />

                            {`+${enduranceValue - baseAmount}`}
                          </Stack>
                        </td>
                      </tr>

                      {powerBonusValue > 0 && (
                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>
                            <Stack direction="horizontal" gap={1}>
                              <IconImage Icon={IconPower} size="small" />
                              Empowered:
                            </Stack>
                          </td>

                          <td>{`+${formatValue({
                            decimals: 0,
                            format: "percentage",
                            value: powerBonusValue,
                          })}`}</td>
                        </tr>
                      )}
                    </DetailsTable>
                  </Popover.Body>
                </Popover>
              }
              placement="right"
              trigger={isShowingStaminaDetails ? ["hover", "focus"] : []}
            >
              <div className="w-100">
                <ReserveMeter reserve="stamina" />
              </div>
            </OverlayTrigger>

            <FloatingText delta="stamina" />
          </Stack>

          <Regeneration reserve="stamina" />
        </Stack>
      }
      Icon={IconStamina}
      isAnimated
      tooltip="Stamina"
    />
  );
}

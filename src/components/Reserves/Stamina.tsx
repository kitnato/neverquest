import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Regeneration } from "@neverquest/components/Reserves/Regeneration";
import { StaminaMeter } from "@neverquest/components/Reserves/StaminaMeter";
import { RESERVES } from "@neverquest/data/reserves";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { powerBonus, rawAttributeStatistic } from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Stamina() {
  const isShowingStamina = useRecoilValue(isShowing("stamina"));
  const isShowingStaminaDetails = useRecoilValue(isShowing("staminaDetails"));
  const powerBonusValue = useRecoilValue(powerBonus("endurance"));
  const statisticValue = useRecoilValue(rawAttributeStatistic("endurance"));

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
                        <td className={CLASS_TABLE_CELL_ITALIC}>Base stamina:</td>

                        <td>{baseAmount}</td>
                      </tr>

                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Endurance attribute:</td>

                        <td>{`+${statisticValue - baseAmount}`}</td>
                      </tr>

                      {powerBonusValue > 0 && (
                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Power bonus:</td>

                          <td>{`+${formatPercentage(powerBonusValue)}`}</td>
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
                <StaminaMeter />
              </div>
            </OverlayTrigger>

            <FloatingText deltaType="stamina" />
          </Stack>

          <Regeneration type="stamina" />
        </Stack>
      }
      Icon={IconStamina}
      isAnimated
      tooltip="Stamina"
    />
  );
}

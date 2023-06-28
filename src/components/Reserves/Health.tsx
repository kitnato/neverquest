import { OverlayTrigger, Popover, Stack } from "react-bootstrap";

import { useRecoilValue } from "recoil";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { HealthMeter } from "@neverquest/components/Reserves/HealthMeter";
import { Regeneration } from "@neverquest/components/Reserves/Regeneration";
import { RESERVES } from "@neverquest/data/reserves";
import { ReactComponent as IconHealth } from "@neverquest/icons/health.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { powerBonus, rawAttributeStatistic } from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Health() {
  const isShowingHealthDetails = useRecoilValue(isShowing("healthDetails"));
  const powerBonusValue = useRecoilValue(powerBonus("vitality"));
  const statisticValue = useRecoilValue(rawAttributeStatistic("vitality"));

  const { baseAmount } = RESERVES.health;

  return (
    <IconDisplay
      contents={
        <Stack>
          <Stack className="w-100" direction="horizontal">
            <OverlayTrigger
              overlay={
                <Popover>
                  <Popover.Header className="text-center">Health details</Popover.Header>

                  <Popover.Body>
                    <DetailsTable>
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Base health:</td>

                        <td>{baseAmount}</td>
                      </tr>

                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Vitality attribute:</td>

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
              trigger={isShowingHealthDetails ? ["hover", "focus"] : []}
            >
              <div className="w-100">
                <HealthMeter />
              </div>
            </OverlayTrigger>

            <FloatingText deltaType="health" />
          </Stack>

          <Regeneration type="health" />
        </Stack>
      }
      Icon={IconHealth}
      tooltip="Health"
    />
  );
}

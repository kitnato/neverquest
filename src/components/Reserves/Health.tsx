import { OverlayTrigger, Popover, Stack } from "react-bootstrap";

import { useRecoilValue } from "recoil";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { HealthMeter } from "@neverquest/components/Reserves/HealthMeter";
import { Regeneration } from "@neverquest/components/Reserves/Regeneration";
import { RESERVES } from "@neverquest/data/reserves";
import { ReactComponent as IconHealth } from "@neverquest/icons/health.svg";
import { ReactComponent as IconPower } from "@neverquest/icons/tome-of-power.svg";
import { ReactComponent as IconVitality } from "@neverquest/icons/vitality.svg";
import { rawAttributeStatistic } from "@neverquest/state/attributes";
import { isShowing } from "@neverquest/state/isShowing";
import { powerBonus } from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Health() {
  const isShowingHealthDetails = useRecoilValue(isShowing("healthDetails"));
  const powerBonusValue = useRecoilValue(powerBonus("vitality"));
  const vitalityValue = useRecoilValue(rawAttributeStatistic("vitality"));

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
                        <td className={CLASS_TABLE_CELL_ITALIC}>Base:</td>

                        <td>{baseAmount}</td>
                      </tr>

                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>
                          <IconImage Icon={IconVitality} size="tiny" />
                          &nbsp;Vitality:
                        </td>

                        <td>{`+${vitalityValue - baseAmount}`}</td>
                      </tr>

                      {powerBonusValue > 0 && (
                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>
                            <IconImage Icon={IconPower} size="tiny" />
                            &nbsp;Empowered:
                          </td>

                          <td>{`+${formatPercentage(powerBonusValue, 0)}`}</td>
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

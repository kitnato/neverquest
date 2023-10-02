import { OverlayTrigger, Popover, Stack } from "react-bootstrap";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { Regeneration } from "@neverquest/components/Reserves/Regeneration";
import { ReserveMeter } from "@neverquest/components/Reserves/ReserveMeter";
import { RESERVES } from "@neverquest/data/reserves";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { ReactComponent as IconHealth } from "@neverquest/icons/health.svg";
import { ReactComponent as IconPower } from "@neverquest/icons/tome-of-power.svg";
import { ReactComponent as IconVitality } from "@neverquest/icons/vitality.svg";
import { attributeStatistic } from "@neverquest/state/attributes";
import { isShowing } from "@neverquest/state/isShowing";
import { isPoisoned, poisonDuration } from "@neverquest/state/reserves";
import { powerBonus } from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatValue } from "@neverquest/utilities/formatters";

export function Health() {
  const isPoisonedValue = useRecoilValue(isPoisoned);
  const isShowingHealthDetails = useRecoilValue(isShowing("healthDetails"));
  const powerBonusValue = useRecoilValue(powerBonus("vitality"));
  const vitalityValue = useRecoilValue(attributeStatistic("vitality"));
  const setPoisonDuration = useSetRecoilState(poisonDuration);

  const { baseAmount } = RESERVES.health;

  useAnimate({
    delta: setPoisonDuration,
    stop: !isPoisonedValue,
  });

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

                        <td>
                          <Stack direction="horizontal" gap={1}>
                            <IconImage Icon={IconHealth} size="small" />

                            {baseAmount}
                          </Stack>
                        </td>
                      </tr>

                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>
                          <Stack direction="horizontal" gap={1}>
                            <IconImage Icon={IconVitality} size="small" />
                            Vitality:
                          </Stack>
                        </td>

                        <td>
                          <Stack direction="horizontal" gap={1}>
                            <IconImage Icon={IconHealth} size="small" />

                            {`+${formatValue({ value: vitalityValue - baseAmount })}`}
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
              trigger={isShowingHealthDetails ? ["hover", "focus"] : []}
            >
              <div className="w-100">
                <ReserveMeter reserve="health" />
              </div>
            </OverlayTrigger>

            <FloatingText delta="health" />
          </Stack>

          <Regeneration reserve="health" />
        </Stack>
      }
      Icon={IconHealth}
      tooltip="Health"
    />
  );
}

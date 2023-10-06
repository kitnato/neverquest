import { OverlayTrigger, Popover, Stack } from "react-bootstrap";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { Regeneration } from "@neverquest/components/Reserves/Regeneration";
import { ReserveMeter } from "@neverquest/components/Reserves/ReserveMeter";
import { CLASS_TABLE_CELL_ITALIC, LABEL_SEPARATOR } from "@neverquest/data/general";
import { RESERVES } from "@neverquest/data/reserves";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { ReactComponent as IconHealth } from "@neverquest/icons/health.svg";
import { ReactComponent as IconTomeOfPower } from "@neverquest/icons/tome-of-power.svg";
import { ReactComponent as IconVitality } from "@neverquest/icons/vitality.svg";
import { attributeStatistic } from "@neverquest/state/attributes";
import { isShowing } from "@neverquest/state/isShowing";
import { isPoisoned, poisonDuration } from "@neverquest/state/reserves";
import { attributePowerBonus } from "@neverquest/state/statistics";
import { formatValue } from "@neverquest/utilities/formatters";

export function Health() {
  const vitalityPowerBonus = useRecoilValue(attributePowerBonus("vitality"));
  const vitality = useRecoilValue(attributeStatistic("vitality"));
  const isPoisonedValue = useRecoilValue(isPoisoned);
  const isShowingHealthDetails = useRecoilValue(isShowing("healthDetails"));
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

                            {`+${formatValue({ value: vitality - baseAmount })} `}

                            {vitalityPowerBonus > 0 && (
                              <>
                                {LABEL_SEPARATOR}

                                <IconImage Icon={IconTomeOfPower} size="small" />

                                {`+${formatValue({
                                  format: "percentage",
                                  value: vitalityPowerBonus,
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
              trigger={isShowingHealthDetails ? ["hover", "focus"] : []}
            >
              <span className="w-100">
                <ReserveMeter reserve="health" />
              </span>
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

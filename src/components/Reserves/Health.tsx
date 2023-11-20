import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { Regeneration } from "@neverquest/components/Reserves/Regeneration";
import { ReserveMeter } from "@neverquest/components/Reserves/ReserveMeter";
import { CLASS_TABLE_CELL_ITALIC, LABEL_SEPARATOR } from "@neverquest/data/general";
import { RESERVES } from "@neverquest/data/reserves";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import IconHealth from "@neverquest/icons/health.svg?react";
import IconTomeOfPower from "@neverquest/icons/tome-of-power.svg?react";
import IconVitality from "@neverquest/icons/vitality.svg?react";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { isShowing } from "@neverquest/state/isShowing";
import { questsBonus } from "@neverquest/state/quests";
import { isPoisoned, poisonDuration } from "@neverquest/state/reserves";
import { formatNumber } from "@neverquest/utilities/formatters";

export function Health() {
  const attributePowerBonusVitality = useRecoilValue(attributePowerBonus("vitality"));
  const attributeStatisticVitality = useRecoilValue(attributeStatistic("vitality"));
  const isShowingHealth = useRecoilValue(isShowing("health"));
  const isShowingHealthDetails = useRecoilValue(isShowing("healthDetails"));
  const isPoisonedValue = useRecoilValue(isPoisoned);
  const questsBonusHealth = useRecoilValue(questsBonus("healthBonus"));
  const setPoisonDuration = useSetRecoilState(poisonDuration);

  const { baseAmount } = RESERVES.health;

  useAnimate({
    delta: setPoisonDuration,
    stop: !isPoisonedValue,
  });

  if (isShowingHealth) {
    return (
      <IconDisplay Icon={IconHealth} tooltip="Health">
        <Stack>
          <Stack className="w-100" direction="horizontal">
            <OverlayTrigger
              overlay={
                <Popover>
                  <PopoverHeader className="text-center">Health details</PopoverHeader>

                  <PopoverBody>
                    <DetailsTable>
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Base:</td>

                        <td>
                          <Stack direction="horizontal" gap={1}>
                            <IconImage Icon={IconHealth} isSmall />

                            {baseAmount}
                          </Stack>
                        </td>
                      </tr>

                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>
                          <Stack direction="horizontal" gap={1}>
                            <IconImage Icon={IconVitality} isSmall />
                            Vitality:
                          </Stack>
                        </td>

                        <td>
                          <Stack direction="horizontal" gap={1}>
                            <IconImage Icon={IconHealth} isSmall />

                            {`+${formatNumber({ value: attributeStatisticVitality - baseAmount })}`}

                            {attributePowerBonusVitality > 0 && (
                              <>
                                <span>{LABEL_SEPARATOR}</span>

                                <IconImage Icon={IconTomeOfPower} isSmall />

                                {`+${formatNumber({
                                  format: "percentage",
                                  value: attributePowerBonusVitality,
                                })}`}
                              </>
                            )}
                          </Stack>
                        </td>
                      </tr>

                      {questsBonusHealth > 0 && (
                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Quest bonus:</td>

                          <td>
                            <Stack direction="horizontal" gap={1}>
                              <IconImage Icon={IconHealth} isSmall />

                              {`+${formatNumber({
                                decimals: 0,
                                format: "percentage",
                                value: questsBonusHealth,
                              })}`}
                            </Stack>
                          </td>
                        </tr>
                      )}
                    </DetailsTable>
                  </PopoverBody>
                </Popover>
              }
              placement="right"
              trigger={isShowingHealthDetails ? ["hover", "focus"] : []}
            >
              <span className="w-100">
                <ReserveMeter reserve="health" />
              </span>
            </OverlayTrigger>

            <DeltasDisplay delta="health" />
          </Stack>

          <Regeneration reserve="health" />
        </Stack>
      </IconDisplay>
    );
  }
}
